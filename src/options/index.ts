import path from 'node:path'
import process from 'node:process'
import { blue } from 'ansis'
import Debug from 'debug'
import { glob } from 'tinyglobby'
import { resolveClean } from '../features/clean'
import { resolveEntry } from '../features/entry'
import { resolveTarget } from '../features/target'
import { resolveTsconfig } from '../features/tsconfig'
import { logger } from '../utils/logger'
import { normalizeFormat, readPackageJson } from '../utils/package'
import type { CopyOptions, CopyOptionsFn } from '../features/copy'
import type { TsdownHooks } from '../features/hooks'
import type { OutExtensionFactory } from '../features/output'
import type { ReportOptions } from '../features/report'
import type {
  Arrayable,
  Awaitable,
  MarkPartial,
  Overwrite,
} from '../utils/types'
import { loadConfigFile, loadViteConfig } from './config'
import type { Hookable } from 'hookable'
import type { PackageJson } from 'pkg-types'
import type { Options as PublintOptions } from 'publint'
import type {
  ExternalOption,
  InputOption,
  InputOptions,
  InternalModuleFormat,
  MinifyOptions,
  ModuleFormat,
  OutputOptions,
} from 'rolldown'
import type { Options as DtsOptions } from 'rolldown-plugin-dts'
import type { Options as UnusedOptions } from 'unplugin-unused'

const debug = Debug('tsdown:options')

export type Sourcemap = boolean | 'inline' | 'hidden'
export type Format = Exclude<ModuleFormat, 'experimental-app'>
export type NormalizedFormat = Exclude<InternalModuleFormat, 'app'>
export type ModuleTypes = Record<
  string,
  | 'js'
  | 'jsx'
  | 'ts'
  | 'tsx'
  | 'json'
  | 'text'
  | 'base64'
  | 'dataurl'
  | 'binary'
  | 'empty'
  | 'css'
  | 'asset'
>

const DEFAULT_EXCLUDE_WORKSPACE = [
  '**/node_modules/**',
  '**/dist/**',
  '**/test?(s)/**',
  '**/t?(e)mp/**',
]
export interface Workspace {
  /**
   * Workspace directories. Glob patterns are supported.
   * - `auto`: Automatically detect `package.json` files in the workspace.
   * @default 'auto'
   */
  include?: Arrayable<string> | 'auto'
  /**
   * Exclude directories from workspace.
   * Defaults to all `node_modules`, `dist`, `test`, `tests`, `temp`, and `tmp` directories.
   */
  exclude?: Arrayable<string>

  /**
   * Path to the workspace configuration file.
   */
  config?: boolean | string
}

/**
 * Options for tsdown.
 */
export interface Options {
  /// build options
  entry?: InputOption
  external?: ExternalOption
  noExternal?:
    | Arrayable<string | RegExp>
    | ((
        id: string,
        importer: string | undefined,
      ) => boolean | null | undefined | void)
  alias?: Record<string, string>
  tsconfig?: string | boolean
  /** @default 'node' */
  platform?: 'node' | 'neutral' | 'browser'
  inputOptions?:
    | InputOptions
    | ((
        options: InputOptions,
        format: NormalizedFormat,
      ) => Awaitable<InputOptions | void | null>)

  /// output options
  /** @default ['es'] */
  format?: Format | Format[]
  globalName?: string
  /** @default 'dist' */
  outDir?: string
  /** @default false */
  sourcemap?: Sourcemap
  /**
   * Clean directories before build.
   *
   * Default to output directory.
   * @default true
   */
  clean?: boolean | string[]
  /** @default false */
  minify?: boolean | 'dce-only' | MinifyOptions
  /**
   * Specifies the compilation target environment(s).
   *
   * Determines the JavaScript version or runtime(s) for which the code should be compiled.
   * If not set, defaults to the value of `engines.node` in your project's `package.json`.
   *
   * Accepts a single target (e.g., `'es2020'`, `'node18'`) or an array of targets.
   *
   * @see {@link https://tsdown.dev/options/target#supported-targets} for a list of valid targets and more details.
   *
   * @example
   * ```jsonc
   * // Target a single environment
   * { "target": "node18" }
   * ```
   *
   * @example
   * ```jsonc
   * // Target multiple environments
   * { "target": ["node18", "es2020"] }
   * ```
   */
  target?: string | string[] | false

  define?: Record<string, string>
  /** @default false */
  shims?: boolean

  /**
   * The name to show in CLI output. This is useful for monorepos or workspaces.
   * Defaults to the package name from `package.json`.
   */
  name?: string

  /**
   * Use a fixed extension for output files.
   * The extension will always be `.cjs` or `.mjs`.
   * Otherwise, it will depend on the package type.
   * @default false
   */
  fixedExtension?: boolean
  /**
   * Custom extensions for output files.
   * `fixedExtension` will be overridden by this option.
   */
  outExtensions?: OutExtensionFactory

  outputOptions?:
    | OutputOptions
    | ((
        options: OutputOptions,
        format: NormalizedFormat,
      ) => Awaitable<OutputOptions | void | null>)

  /** @default true */
  treeshake?: boolean
  plugins?: InputOptions['plugins']
  /**
   * Sets how input files are processed.
   * For example, use 'js' to treat files as JavaScript or 'base64' for images.
   * Lets you import or require files like images or fonts.
   * @example
   * ```json
   * { '.jpg': 'asset', '.png': 'base64' }
   * ```
   */
  loader?: ModuleTypes

  /** @default false */
  silent?: boolean
  /**
   * Config file path
   */
  config?: boolean | string
  /** @default false */
  watch?: boolean | string | string[]

  /**
   * You can specify command to be executed after a successful build, specially useful for Watch mode
   */
  onSuccess?: string | ((config: ResolvedOptions) => void | Promise<void>)

  /**
   * Skip bundling `node_modules`.
   * @default false
   */
  skipNodeModulesBundle?: boolean

  /**
   * Reuse config from Vite or Vitest (experimental)
   * @default false
   */
  fromVite?: boolean | 'vitest'

  /// addons
  /**
   * Emit TypeScript declaration files (.d.ts).
   *
   * By default, this feature is auto-detected based on the presence of the `types` field in the `package.json` file.
   * - If the `types` field is present in `package.json`, declaration file emission is enabled.
   * - If the `types` field is absent, declaration file emission is disabled by default.
   */
  dts?: boolean | DtsOptions

  /**
   * Enable unused dependencies check with `unplugin-unused`
   * Requires `unplugin-unused` to be installed.
   * @default false
   */
  unused?: boolean | UnusedOptions

  /**
   * Run publint after bundling.
   * Requires `publint` to be installed.
   * @default false
   */
  publint?: boolean | PublintOptions

  /**
   * Enable size reporting after bundling.
   * @default true
   */
  report?: boolean | ReportOptions

  /**
   * Compile-time env variables.
   * @example
   * ```json
   * {
   *   "DEBUG": true,
   *   "NODE_ENV": "production"
   * }
   * ```
   */
  env?: Record<string, any>

  /**
   * @deprecated Alias for `copy`, will be removed in the future.
   */
  publicDir?: CopyOptions | CopyOptionsFn

  /**
   * Copy files to another directory.
   * @example
   * ```ts
   * [
   *   'src/assets',
   *   { from: 'src/assets', to: 'dist/assets' },
   * ]
   * ```
   */
  copy?: CopyOptions | CopyOptionsFn

  hooks?:
    | Partial<TsdownHooks>
    | ((hooks: Hookable<TsdownHooks>) => Awaitable<void>)

  /**
   * If enabled, strips the `node:` protocol prefix from import source.
   *
   * @default false
   *
   * @example
   * // With removeNodeProtocol enabled:
   * import('node:fs'); // becomes import('fs')
   */
  removeNodeProtocol?: boolean

  /**
   * If enabled, appends hash to chunk filenames.
   * @default true
   */
  hash?: boolean

  /**
   * The working directory of the config file.
   * - Defaults to `process.cwd()` for root config.
   * - Defaults to the package directory for workspace config.
   */
  cwd?: string

  /**
   * **[experimental]** Enable workspace mode.
   * This allows you to build multiple packages in a monorepo.
   */
  workspace?: Workspace | Arrayable<string> | true
}

/**
 * Options without specifying config file path.
 */
export type UserConfig = Arrayable<Omit<Options, 'config'>>
export type UserConfigFn = (cliOptions: Options) => Awaitable<UserConfig>
export type NormalizedUserConfig = Exclude<UserConfig, any[]>

export type ResolvedOptions = Omit<
  Overwrite<
    MarkPartial<
      Omit<Options, 'publicDir' | 'workspace'>,
      | 'globalName'
      | 'inputOptions'
      | 'outputOptions'
      | 'minify'
      | 'define'
      | 'alias'
      | 'external'
      | 'noExternal'
      | 'onSuccess'
      | 'fixedExtension'
      | 'outExtensions'
      | 'hooks'
      | 'removeNodeProtocol'
      | 'copy'
      | 'loader'
      | 'name'
    >,
    {
      format: NormalizedFormat[]
      target?: string[]
      clean: string[]
      dts: false | DtsOptions
      report: false | ReportOptions
      tsconfig: string | false
      pkg?: PackageJson
    }
  >,
  'config' | 'fromVite'
>

// Options (cli)
//  -> Options + UserConfig (maybe array, maybe promise)
//  -> Options + NormalizedUserConfig[] (Options without config)
//  -> Options + NormalizedUserConfig[] (Options without config and workspace)
//  -> ResolvedOptions

// resolved options count = 1 (options) * root config count * workspace count * sub config count (1 minimum)

export async function resolveOptions(options: Options): Promise<{
  configs: ResolvedOptions[]
  file?: string
}> {
  const { configs: rootConfigs, file } = await loadConfigFile(options)
  if (file) {
    debug('Loaded config file %s', file)
    debug('Root configs %o', rootConfigs)
  }

  const configs = (
    await Promise.all(
      rootConfigs.map(async (rootConfig) => {
        const workspaceConfigs = await resolveWorkspace(rootConfig, options)
        return Promise.all(
          workspaceConfigs.map((config) => resolveConfig(config)),
        )
      }),
    )
  ).flat()
  debug('Resolved configs %O', configs)
  return { configs, file }
}

async function resolveWorkspace(
  config: NormalizedUserConfig,
  options: Options,
): Promise<NormalizedUserConfig[]> {
  const normalized = { ...config, ...options }
  const rootCwd = normalized.cwd || process.cwd()
  let { workspace } = normalized
  if (!workspace) return [normalized]

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

  const configs = (
    await Promise.all(
      packages.map(async (cwd) => {
        const { configs } = await loadConfigFile(
          {
            ...options,
            config: workspaceConfig,
            cwd,
          },
          cwd,
        )
        return configs.map((config) => ({ ...normalized, cwd, ...config }))
      }),
    )
  ).flat()

  return configs
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
    shims = false,
    skipNodeModulesBundle = false,
    publint = false,
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
  } = userConfig

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

  if (publint === true) publint = {}

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
    shims,
    skipNodeModulesBundle,
    publint,
    alias,
    tsconfig,
    cwd,
    env,
    pkg,
    copy: publicDir || copy,
    hash: hash ?? true,
    name,
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
