import { stat } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import pc from 'picocolors'
import { loadConfig } from 'unconfig'
import { resolveEntry } from './features/entry'
import { toArray } from './utils/general'
import { logger } from './utils/logger'
import type { External } from './features/external'
import type {
  Arrayable,
  MarkPartial,
  MaybePromise,
  Overwrite,
} from './utils/types'
import type { Stats } from 'node:fs'
import type {
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
  entry?: InputOptions['input']
  format?: ModuleFormat | ModuleFormat[]
  globalName?: string
  plugins?: InputOptions['plugins']
  external?: External
  outDir?: string
  clean?: boolean | string[]
  silent?: boolean
  config?: boolean | string
  sourcemap?: Sourcemap
  alias?: Record<string, string>
  /** @default true */
  treeshake?: boolean
  /** @default false */
  minify?: boolean
  target?: string | string[]
  define?: Record<string, string>
  /** @default 'node' */
  platform?: 'node' | 'neutral' | 'browser'
  shims?: boolean
  /**
   * Enable dts generation with `isolatedDeclarations` (experimental)
   */
  dts?: boolean | IsolatedDeclOptions
  /** @default true */
  bundleDts?: boolean
  /**
   * Enable unused dependencies check with `unplugin-unused` (experimental)
   */
  unused?: boolean | UnusedOptions
  watch?: boolean | string | string[]
  inputOptions?: InputOptions
  outputOptions?:
    | OutputOptions
    | ((
        options: OutputOptions,
        format: ModuleFormat,
      ) => MaybePromise<OutputOptions | void | null>)
  onSuccess?: () => void | Promise<void>

  /**
   * Skip bundling node_modules.
   */
  skipNodeModulesBundle?: boolean
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
      | 'onSuccess'
      | 'dts'
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
        } = subOptions

        entry = await resolveEntry(entry)
        if (clean === true) clean = []

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
  let stats: Stats | null

  if (
    typeof filePath === 'string' &&
    (stats = await stat(filePath).catch(() => null))
  ) {
    const resolved = path.resolve(filePath)
    if (stats.isFile()) {
      overrideConfig = true
      filePath = resolved
      cwd = path.dirname(filePath)
    } else {
      cwd = resolved
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
    importx: { loader: 'bundle-require' },
  })

  if (sources.length > 0) {
    logger.info(`Using tsdown config: ${pc.underline(sources.join(', '))}`)
  }

  const file = sources[0]
  return [toArray(config), file]
}
