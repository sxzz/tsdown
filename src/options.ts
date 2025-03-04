import { stat } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { underline } from 'ansis'
import { loadConfig } from 'unconfig'
import { resolveEntry } from './features/entry'
import { toArray } from './utils/general'
import { logger } from './utils/logger'
import type {
  Arrayable,
  MarkPartial,
  MaybePromise,
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
import type { Options as IsolatedDeclOptions } from 'unplugin-isolated-decl'
import type { Options as UnusedOptions } from 'unplugin-unused'

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
        format: ModuleFormat,
      ) => MaybePromise<InputOptions | void | null>)

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
        format: ModuleFormat,
      ) => MaybePromise<OutputOptions | void | null>)

  /** @default true */
  treeshake?: boolean
  plugins?: InputOptions['plugins']

  silent?: boolean
  config?: boolean | string
  watch?: boolean | string | string[]
  onSuccess?: () => void | Promise<void>

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

  /// addons
  /**
   * Enable dts generation with `isolatedDeclarations` (experimental)
   */
  dts?: boolean | IsolatedDeclOptions
  /** @default true */
  bundleDts?: boolean

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
export type Config = Arrayable<Omit<Options, 'config'>>
export type ResolvedConfig = Extract<Config, any[]>

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
      dts: false | IsolatedDeclOptions
    }
  >,
  'config'
>

export async function resolveOptions(
  options: Options,
): Promise<[configs: ResolvedOptions[], configFile?: string]> {
  const [config, configFile] = await loadConfigFile(options)
  if (config.length === 0) {
    config.push({})
  }

  return [
    await Promise.all(
      config.map(async (subConfig) => {
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
          bundleDts = true,
          unused = false,
          watch = false,
          shims = false,
          skipNodeModulesBundle = false,
          publint = false,
        } = subOptions

        entry = await resolveEntry(entry)
        if (clean === true) clean = []
        if (publint === true) publint = {}

        return {
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
          bundleDts,
          unused,
          watch,
          shims,
          skipNodeModulesBundle,
          publint,
        }
      }),
    ),
    configFile,
  ]
}

export function normalizeFormat(
  format: ModuleFormat | ModuleFormat[],
): NormalizedFormat[] {
  return toArray<ModuleFormat>(format, 'es').map((format): NormalizedFormat => {
    switch (format) {
      case 'es':
      case 'esm':
      case 'module':
        return 'es'
      case 'cjs':
      case 'commonjs':
        return 'cjs'
      default:
        return format
    }
  })
}

async function loadConfigFile(
  options: Options,
): Promise<[config: ResolvedConfig, file?: string]> {
  let { config: filePath } = options
  if (filePath === false) return [[]]

  let cwd = process.cwd()
  let overrideConfig = false

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

  const { config, sources } = await loadConfig<Config>({
    sources: overrideConfig
      ? [{ files: filePath as string, extensions: [] }]
      : [
          {
            files: 'tsdown.config',
            extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
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

  if (sources.length > 0) {
    logger.info(`Using tsdown config: ${underline(sources.join(', '))}`)
  }

  const file = sources[0]
  return [toArray(config), file]
}

export async function mergeUserOptions<T extends object, A extends unknown[]>(
  defaults: T,
  user:
    | T
    | undefined
    | null
    | ((options: T, ...args: A) => MaybePromise<T | void | null>),
  args: A,
): Promise<T> {
  const userOutputOptions =
    typeof user === 'function' ? await user(defaults, ...args) : user
  return { ...defaults, ...userOutputOptions }
}
