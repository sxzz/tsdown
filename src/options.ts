import { stat } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import { underline } from 'ansis'
import Debug from 'debug'
import { loadConfig } from 'unconfig'
import { resolveClean } from './features/clean'
import { resolveEntry } from './features/entry'
import { resolveTsconfig } from './features/tsconfig'
import { resolveComma, toArray } from './utils/general'
import { logger } from './utils/logger'
import { normalizeFormat, readPackageJson } from './utils/package'
import type { TsdownHooks } from './features/hooks'
import type { OutExtensionFactory } from './features/output'
import type { ReportOptions } from './features/report'
import type {
  Arrayable,
  Awaitable,
  MarkPartial,
  Overwrite,
} from './utils/types'
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
import type { ConfigEnv, UserConfigExport as ViteUserConfigExport } from 'vite'

const debug = Debug('tsdown:options')

export type Sourcemap = boolean | 'inline' | 'hidden'
export type Format = Exclude<ModuleFormat, 'experimental-app'>
export type NormalizedFormat = Exclude<InternalModuleFormat, 'app'>

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
  /** @default 'es' */
  format?: Format | Format[]
  globalName?: string
  /** @default 'dist' */
  outDir?: string
  sourcemap?: Sourcemap
  /**
   * Clean directories before build.
   *
   * Default to output directory.
   */
  clean?: boolean | string[]
  /** @default false */
  minify?: boolean | 'dce-only' | MinifyOptions
  target?: string | string[]
  define?: Record<string, string>
  /** @default false */
  shims?: boolean
  /** @default false */
  stub?: boolean

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

  silent?: boolean
  /**
   * Config file path
   */
  config?: boolean | string
  watch?: boolean | string | string[]

  /**
   * You can specify command to be executed after a successful build, specially useful for Watch mode
   */
  onSuccess?: string | ((config: ResolvedOptions) => void | Promise<void>)

  /**
   * Skip bundling node_modules.
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
   */
  unused?: boolean | UnusedOptions

  /**
   * Run publint after bundling.
   * Requires `publint` to be installed.
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

  hooks?:
    | Partial<TsdownHooks>
    | ((hooks: Hookable<TsdownHooks>) => Awaitable<void>)
}

/**
 * Options without specifying config file path.
 */
export type UserConfig = Arrayable<Omit<Options, 'config'>>
export type UserConfigFn = (cliOptions: Options) => Awaitable<UserConfig>
export type ResolvedConfigs = Extract<UserConfig, any[]>

export type ResolvedOptions = Omit<
  Overwrite<
    MarkPartial<
      Options,
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
    >,
    {
      format: NormalizedFormat[]
      target?: string[]
      clean: string[]
      dts: false | DtsOptions
      report: false | ReportOptions
      tsconfig: string | false
      cwd: string
      pkg?: PackageJson
      stub: boolean
    }
  >,
  'config' | 'fromVite'
>

export async function resolveOptions(options: Options): Promise<{
  configs: ResolvedOptions[]
  file?: string
}> {
  const { configs: userConfigs, file, cwd } = await loadConfigFile(options)
  if (userConfigs.length === 0) {
    userConfigs.push({})
  }

  debug('Loaded config file %s from %s', file, cwd)
  debug('User configs %o', userConfigs)

  const configs = await Promise.all(
    userConfigs.map(async (subConfig): Promise<ResolvedOptions> => {
      const subOptions = { ...subConfig, ...options }

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
        stub = false,
        skipNodeModulesBundle = false,
        publint = false,
        fromVite,
        alias,
        tsconfig,
        report = true,
        target,
        env = {},
      } = subOptions

      outDir = path.resolve(outDir)
      entry = await resolveEntry(entry, cwd)
      clean = resolveClean(clean, outDir)

      const pkg = await readPackageJson(cwd)

      if (dts == null) {
        dts = !!(pkg?.types || pkg?.typings)
      }

      tsconfig = await resolveTsconfig(tsconfig, cwd)
      if (publint === true) publint = {}

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
        ...subOptions,
        entry,
        plugins,
        format: normalizeFormat(format),
        target: target ? resolveComma(toArray(target)) : undefined,
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
        stub,
        skipNodeModulesBundle,
        publint,
        alias,
        tsconfig,
        cwd,
        env,
        pkg,
      }

      return config
    }),
  )

  return { configs, file }
}

let loaded = false

async function loadConfigFile(options: Options): Promise<{
  configs: ResolvedConfigs
  file?: string
  cwd: string
}> {
  let cwd = process.cwd()
  let overrideConfig = false

  let { config: filePath } = options
  if (filePath === false) return { configs: [], cwd }

  if (typeof filePath === 'string') {
    const stats = await stat(filePath).catch(() => null)
    if (stats) {
      const resolved = path.resolve(filePath)
      if (stats.isFile()) {
        overrideConfig = true
        filePath = resolved
        cwd = path.dirname(filePath)
      } else if (stats.isDirectory()) {
        cwd = resolved
      }
    }
  }

  const nativeTS =
    process.features.typescript || process.versions.bun || process.versions.deno

  let { config, sources } = await loadConfig
    .async<UserConfig | UserConfigFn>({
      sources: overrideConfig
        ? [{ files: filePath as string, extensions: [] }]
        : [
            {
              files: 'tsdown.config',
              extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
              parser:
                loaded || !nativeTS
                  ? 'auto'
                  : async (filepath) => {
                      const mod = await import(pathToFileURL(filepath).href)
                      const config = mod.default || mod
                      return config
                    },
            },
            {
              files: 'package.json',
              extensions: [],
              rewrite: (config: any) => config?.tsdown,
            },
          ],
      cwd,
      defaults: {},
    })
    .finally(() => (loaded = true))

  const file = sources[0]
  if (file) {
    logger.info(`Using tsdown config: ${underline(file)}`)
  }

  if (typeof config === 'function') {
    config = await config(options)
  }

  return {
    configs: toArray(config),
    file,
    cwd,
  }
}

async function loadViteConfig(prefix: string, cwd: string) {
  const {
    config,
    sources: [source],
  } = await loadConfig<ViteUserConfigExport>({
    sources: [
      {
        files: `${prefix}.config`,
        extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
      },
    ],
    cwd,
    defaults: {},
  })
  if (!source) return
  logger.info(`Using Vite config: ${underline(source)}`)

  const resolved = await config
  if (typeof resolved === 'function') {
    return resolved({
      command: 'build',
      mode: 'production',
    } satisfies ConfigEnv)
  }
  return resolved
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
