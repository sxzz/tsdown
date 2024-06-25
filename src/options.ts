import { stat } from 'node:fs/promises'
import process from 'node:process'
import path from 'node:path'
import { loadConfig } from 'unconfig'
import { logger } from './utils/logger'
import { resolveEntry } from './features/entry'
import { toArray } from './utils/general'
import type { Stats } from 'node:fs'
import type { InputOptions } from 'rolldown'

export type Format = 'es' | 'esm' | 'module' | 'cjs' | 'commonjs'

export interface Options {
  entry?: InputOptions['input']
  format?: Format | Format[]
  plugins?: InputOptions['plugins']
  external?: InputOptions['external']
  outDir?: string
  clean?: boolean | string[]
  config?: boolean | string
  alias?: Record<string, string>
  /** @default true */
  treeshake?: boolean
}

export type OptionsWithoutConfig = Omit<Options, 'config'>

type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U

export type ResolvedOptions = Omit<
  Overwrite<
    Required<Options>,
    {
      format: Format[]
      clean: string[] | false
    }
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
    external = [],
    clean = false,
    treeshake = true,
  } = options

  entry = await resolveEntry(entry)
  format = toArray(format, 'es')
  if (clean === true) clean = []

  return {
    entry,
    plugins,
    external,
    format,
    outDir: options.outDir || 'dist',
    clean,
    alias: {},
    treeshake,
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
