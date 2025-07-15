import path from 'node:path'
import process from 'node:process'
import { blue } from 'ansis'
import Debug from 'debug'
import { glob } from 'tinyglobby'
import { resolveClean } from '../features/clean'
import { resolveEntry } from '../features/entry'
import { resolveTarget } from '../features/target'
import { resolveTsconfig } from '../features/tsconfig'
import { resolveRegex, toArray } from '../utils/general'
import { logger } from '../utils/logger'
import { normalizeFormat, readPackageJson } from '../utils/package'
import type { Awaitable } from '../utils/types'
import { loadConfigFile, loadViteConfig } from './config'
import type { NormalizedUserConfig, Options, ResolvedOptions } from './types'

export * from './types'

const debug = Debug('tsdown:options')

const DEFAULT_EXCLUDE_WORKSPACE = [
  '**/node_modules/**',
  '**/dist/**',
  '**/test?(s)/**',
  '**/t?(e)mp/**',
]

// Options (cli)
//  -> Options + UserConfig (maybe array, maybe promise)
//  -> Options + NormalizedUserConfig[] (Options without config)
//  -> Options + NormalizedUserConfig[] (Options without config and workspace)
//  -> ResolvedOptions

// resolved options count = 1 (options) * root config count * workspace count * sub config count (1 minimum)

export async function resolveOptions(options: Options): Promise<{
  configs: ResolvedOptions[]
  files: string[]
}> {
  const files: string[] = []

  debug('options %O', options)
  debug('loading config file: %s', options.config)
  const { configs: rootConfigs, file } = await loadConfigFile(options)
  if (file) {
    files.push(file)
    debug('loaded root config file %s', file)
    debug('root configs %o', rootConfigs)
  } else {
    debug('no root config file found')
  }

  const configs = (
    await Promise.all(
      rootConfigs.map(async (rootConfig) => {
        const { configs: workspaceConfigs, files: workspaceFiles } =
          await resolveWorkspace(rootConfig, options)
        if (workspaceFiles) {
          files.push(...workspaceFiles)
        }
        return Promise.all(
          workspaceConfigs
            .filter((config) => !config.workspace || config.entry)
            .map((config) => resolveConfig(config)),
        )
      }),
    )
  ).flat()
  debug('resolved configs %O', configs)
  return { configs, files }
}

async function resolveWorkspace(
  config: NormalizedUserConfig,
  options: Options,
): Promise<{ configs: NormalizedUserConfig[]; files?: string[] }> {
  const normalized = { ...config, ...options }
  const rootCwd = normalized.cwd || process.cwd()
  let { workspace } = normalized
  if (!workspace) return { configs: [normalized], files: [] }

  if (workspace === true) {
    workspace = {}
  } else if (typeof workspace === 'string' || Array.isArray(workspace)) {
    workspace = { include: workspace }
  }

  let {
    include: packages = 'auto',
    exclude = DEFAULT_EXCLUDE_WORKSPACE,
    config: workspaceConfig,
  } = workspace
  if (packages === 'auto') {
    packages = (
      await glob({
        patterns: '**/package.json',
        ignore: exclude,
        cwd: rootCwd,
      })
    )
      .filter((file) => file !== 'package.json') // exclude root package.json
      .map((file) => path.resolve(rootCwd, file, '..'))
  } else {
    packages = (
      await glob({
        patterns: packages,
        ignore: exclude,
        cwd: rootCwd,
        onlyDirectories: true,
        absolute: true,
      })
    ).map((file) => path.resolve(file))
  }

  if (packages.length === 0) {
    throw new Error('No workspace packages found, please check your config')
  }

  if (options.filter) {
    if (
      typeof options.filter === 'string' &&
      options.filter.length > 2 &&
      options.filter[0] === '/' &&
      options.filter.at(-1) === '/'
    ) {
      options.filter = new RegExp(options.filter.slice(1, -1))
    }
    packages = packages.filter((path) => {
      return typeof options.filter === 'string'
        ? path.includes(options.filter)
        : Array.isArray(options.filter)
          ? options.filter.some((filter) => path.includes(filter))
          : options.filter!.test(path)
    })
    if (packages.length === 0) {
      throw new Error('No packages matched the filters')
    }
  }

  const files: string[] = []
  const configs = (
    await Promise.all(
      packages.map(async (cwd) => {
        debug('loading workspace config %s', cwd)
        const { configs, file } = await loadConfigFile(
          {
            ...options,
            config: workspaceConfig,
            cwd,
          },
          cwd,
        )
        if (file) {
          debug('loaded workspace config file %s', file)
          files.push(file)
        } else {
          debug('no workspace config file found in %s', cwd)
        }
        return configs.map(
          (config): NormalizedUserConfig => ({
            ...normalized,
            cwd,
            ...config,
          }),
        )
      }),
    )
  ).flat()

  return { configs, files }
}

async function resolveConfig(
  userConfig: NormalizedUserConfig,
): Promise<ResolvedOptions> {
  let {
    entry,
    format = ['es'],
    plugins = [],
    clean = true,
    silent = false,
    treeshake = true,
    platform = 'node',
    outDir = 'dist',
    sourcemap = false,
    dts,
    unused = false,
    watch = false,
    ignoreWatch = [],
    shims = false,
    skipNodeModulesBundle = false,
    publint = false,
    attw = false,
    fromVite,
    alias,
    tsconfig,
    report = true,
    target,
    env = {},
    copy,
    publicDir,
    hash,
    cwd = process.cwd(),
    name,
    workspace,
    external,
    noExternal,
    exports = false,
    bundle,
    unbundle = typeof bundle === 'boolean' ? !bundle : false,
    removeNodeProtocol,
    nodeProtocol,
  } = userConfig

  if (typeof bundle === 'boolean') {
    logger.warn('`bundle` option is deprecated. Use `unbundle` instead.')
  }

  // Resolve nodeProtocol option with backward compatibility for removeNodeProtocol
  nodeProtocol =
    nodeProtocol ??
    // `removeNodeProtocol: true` means stripping the `node:` protocol which equals to `nodeProtocol: 'strip'`
    // `removeNodeProtocol: false` means keeping the `node:` protocol which equals to `nodeProtocol: false` (ignore it)
    (removeNodeProtocol ? 'strip' : false)

  outDir = path.resolve(cwd, outDir)
  clean = resolveClean(clean, outDir, cwd)

  const pkg = await readPackageJson(cwd)
  if (workspace) {
    name ||= pkg?.name
  }
  entry = await resolveEntry(entry, cwd, name)
  if (dts == null) {
    dts = !!(pkg?.types || pkg?.typings)
  }
  target = resolveTarget(target, pkg, name)
  tsconfig = await resolveTsconfig(tsconfig, cwd, name)
  if (typeof external === 'string') {
    external = resolveRegex(external)
  }
  if (typeof noExternal === 'string') {
    noExternal = resolveRegex(noExternal)
  }

  if (publint === true) publint = {}
  if (attw === true) attw = {}
  if (exports === true) exports = {}

  if (publicDir) {
    if (copy) {
      throw new TypeError(
        '`publicDir` is deprecated. Cannot be used with `copy`',
      )
    } else {
      logger.warn(
        `${blue`publicDir`} is deprecated. Use ${blue`copy`} instead.`,
      )
    }
  }

  if (fromVite) {
    const viteUserConfig = await loadViteConfig(
      fromVite === true ? 'vite' : fromVite,
      cwd,
    )
    if (viteUserConfig) {
      // const alias = viteUserConfig.resolve?.alias
      if ((Array.isArray as (arg: any) => arg is readonly any[])(alias)) {
        throw new TypeError(
          'Unsupported resolve.alias in Vite config. Use object instead of array',
        )
      }

      if (viteUserConfig.plugins) {
        plugins = [viteUserConfig.plugins as any, plugins]
      }

      const viteAlias = viteUserConfig.resolve?.alias
      if (
        viteAlias &&
        !(Array.isArray as (arg: any) => arg is readonly any[])(viteAlias)
      ) {
        alias = viteAlias
      }
    }
  }

  const config: ResolvedOptions = {
    ...userConfig,
    entry,
    plugins,
    format: normalizeFormat(format),
    target,
    outDir,
    clean,
    silent,
    treeshake,
    platform,
    sourcemap,
    dts: dts === true ? {} : dts,
    report: report === true ? {} : report,
    unused,
    watch,
    ignoreWatch: toArray(ignoreWatch),
    shims,
    skipNodeModulesBundle,
    publint,
    attw,
    alias,
    tsconfig,
    cwd,
    env,
    pkg,
    copy: publicDir || copy,
    hash: hash ?? true,
    name,
    external,
    noExternal,
    exports,
    unbundle,
    nodeProtocol,
  }

  return config
}

export async function mergeUserOptions<T extends object, A extends unknown[]>(
  defaults: T,
  user:
    | T
    | undefined
    | null
    | ((options: T, ...args: A) => Awaitable<T | void | null>),
  args: A,
): Promise<T> {
  const userOutputOptions =
    typeof user === 'function' ? await user(defaults, ...args) : user
  return { ...defaults, ...userOutputOptions }
}
