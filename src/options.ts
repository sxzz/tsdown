import { stat } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { loadConfig } from 'unconfig'
import { resolveEntry } from './features/entry'
import { toArray } from './utils/general'
import { logger } from './utils/logger'
import type { External } from './features/external'
import type { MarkPartial, MaybePromise, Overwrite } from './utils/types'
import type { Stats } from 'node:fs'
import type { InputOptions, OutputOptions } from 'rolldown'
import type { Options as IsolatedDeclOptions } from 'unplugin-isolated-decl'

export type Format = 'es' | 'esm' | 'module' | 'cjs' | 'commonjs'
export type Sourcemap = boolean | 'inline' | 'hidden'

export interface Options {
  entry?: InputOptions['input']
  format?: Format | Format[]
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
  /** @default 'node' */
  platform?: 'node' | 'neutral'
  /**
   * Enable dts generation with `isolatedDeclarations` (experimental)
   */
  dts?: boolean | IsolatedDeclOptions
  watch?: boolean | string | string[]
  inputOptions?: InputOptions
  outputOptions?:
    | OutputOptions
    | ((
        options: OutputOptions,
        format: Format,
      ) => MaybePromise<OutputOptions | void | null>)
}

export type OptionsWithoutConfig = Omit<Options, 'config'>

export type ResolvedOptions = Omit<
  Overwrite<
    MarkPartial<
      Options,
      'inputOptions' | 'outputOptions' | 'minify' | 'alias' | 'external'
    >,
    { format: Format[]; clean: string[] | false }
  >,
  'config'
>

export async function normalizeOptions(
  options: Options,
): Promise<ResolvedOptions> {
  options = {
    ...(await loadConfigFile(options)),
    ...options,
  }

  let {
    entry,
    format = ['es'],
    plugins = [],
    external,
    clean = false,
    silent = false,
    treeshake = true,
    platform = 'node',
    outDir = 'dist',
    sourcemap = false,
    dts = false,
    minify,
    alias,
    watch = false,
    inputOptions,
    outputOptions,
  } = options

  entry = await resolveEntry(entry)
  format = toArray(format, 'es')
  if (clean === true) clean = []

  return {
    entry,
    plugins,
    external,
    format,
    outDir,
    clean,
    silent,
    alias,
    treeshake,
    platform,
    sourcemap,
    dts,
    minify,
    watch,
    inputOptions,
    outputOptions,
  }
}

async function loadConfigFile(options: Options): Promise<Options> {
  let { config: filePath } = options
  if (filePath === false) return {}

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

  const { config, sources } = await loadConfig<Options>({
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
    logger.info(`Using tsdown config: ${sources.join(', ')}`)
  }

  return config
}
