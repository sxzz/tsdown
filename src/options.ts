import { stat } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import { underline } from 'ansis'
import { loadConfig } from 'unconfig'
import { resolveEntry } from './features/entry'
import { toArray } from './utils/general'
import { logger } from './utils/logger'
import { normalizeFormat } from './utils/package'
import type {
  Arrayable,
  Awaitable,
  MarkPartial,
  Overwrite,
} from './utils/types'
import type { Options as PublintOptions } from 'publint'
import type {
  ExternalOption,
  InputOptions,
  InternalModuleFormat,
  ModuleFormat,
  OutputOptions,
} from 'rolldown'
import type { Options as DtsOptions } from 'rolldown-plugin-dts'
import type { Options as UnusedOptions } from 'unplugin-unused'
import type { ConfigEnv, UserConfigExport as ViteUserConfigExport } from 'vite'

export type Sourcemap = boolean | 'inline' | 'hidden'

/**
 * Options for tsdown.
 */
export interface Options {
  /// build options
  entry?: InputOptions['input']
  external?: ExternalOption
  noExternal?:
    | Arrayable<string | RegExp>
    | ((
        id: string,
        importer: string | undefined,
      ) => boolean | null | undefined | void)
  alias?: Record<string, string>
  /** @default 'node' */
  platform?: 'node' | 'neutral' | 'browser'
  inputOptions?:
    | InputOptions
    | ((
        options: InputOptions,
        format: NormalizedFormat,
      ) => Awaitable<InputOptions | void | null>)

  /// output options
  format?: ModuleFormat | ModuleFormat[]
  globalName?: string
  outDir?: string
  sourcemap?: Sourcemap
  clean?: boolean | string[]
  /** @default false */
  minify?: boolean
  target?: string | string[]
  define?: Record<string, string>
  shims?: boolean
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
   * Use a fixed extension for output files.
   * The extension will always be `.cjs` or `.mjs`.
   * Otherwise, it will depend on the package type.
   * @default false
   */
  fixedExtension?: boolean
  /**
   * Reuse config from Vite or Vitest (experimental)
   * @default false
   */
  fromVite?: boolean | 'vitest'

  /// addons
  /**
   * Enable dts generation with `isolatedDeclarations` (experimental)
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
}

/**
 * Options without specifying config file path.
 */
export type UserConfig = Arrayable<Omit<Options, 'config'>>
export type ResolvedConfigs = Extract<UserConfig, any[]>

export type NormalizedFormat =
  | Exclude<InternalModuleFormat, 'app'>
  | 'experimental-app'

export type ResolvedOptions = Omit<
  Overwrite<
    MarkPartial<
      Options,
      | 'globalName'
      | 'inputOptions'
      | 'outputOptions'
      | 'minify'
      | 'target'
      | 'define'
      | 'alias'
      | 'external'
      | 'noExternal'
      | 'onSuccess'
      | 'dts'
      | 'fixedExtension'
    >,
    {
      format: NormalizedFormat[]
      clean: string[] | false
      dts: false | DtsOptions
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

  const configs = await Promise.all(
    userConfigs.map(async (subConfig) => {
      const subOptions = { ...subConfig, ...options }

      let {
        entry,
        format = ['es'],
        plugins = [],
        clean = false,
        silent = false,
        treeshake = true,
        platform = 'node',
        outDir = 'dist',
        sourcemap = false,
        dts = false,
        unused = false,
        watch = false,
        shims = false,
        skipNodeModulesBundle = false,
        publint = false,
        fromVite,
        alias,
      } = subOptions

      entry = await resolveEntry(entry)
      if (clean === true) clean = []
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

      const config = {
        ...subOptions,
        entry,
        plugins,
        format: normalizeFormat(format),
        outDir: path.resolve(outDir),
        clean,
        silent,
        treeshake,
        platform,
        sourcemap,
        dts: dts === true ? {} : dts,
        unused,
        watch,
        shims,
        skipNodeModulesBundle,
        publint,
        alias,
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

  const { config, sources } = await loadConfig
    .async<UserConfig>({
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

  if (sources.length > 0) {
    logger.info(`Using tsdown config: ${underline(sources.join(', '))}`)
  }

  const file = sources[0]
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
