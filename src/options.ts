import { type Stats, existsSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import process from 'node:process'
import path from 'node:path'
import { globby } from 'globby'
import { loadConfig } from 'unconfig'
import { PrettyError } from './error'
import { logger } from './utils'
// @ts-expect-error missing type
import type { InputOptions, OutputOptions } from 'rolldown'

export type Format = 'es' | 'esm'

export interface Options {
  entry?: InputOptions['input']
  format?: Format | Format[]
  plugins?: InputOptions['plugins']
  external?: InputOptions['external']
  outDir?: string
  clean?: boolean | string[]
  config?: boolean | string
}

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
  } = options

  if (!entry || Object.keys(entry).length === 0) {
    throw new PrettyError(`No input files, try "tsdown <your-file>" instead`)
  }

  if (typeof entry === 'string') {
    entry = [entry]
  }
  if (Array.isArray(entry)) {
    const resolvedEntry = await globby(entry)

    // Ensure entry exists
    if (resolvedEntry.length > 0) {
      entry = resolvedEntry
      logger.info(`Building entry: ${entry}`)
    } else {
      throw new PrettyError(`Cannot find ${entry}`)
    }
  } else {
    Object.keys(entry).forEach((alias) => {
      const filename = (
        entry as {
          [entryAlias: string]: string
        }
      )[alias]!
      if (!existsSync(filename)) {
        throw new PrettyError(`Cannot find ${alias}: ${filename}`)
      }
    })
    logger.info(`Building entry: ${JSON.stringify(entry)}`)
  }

  if (!Array.isArray(format)) format = [format]
  if (format.length === 0) format = ['es']

  if (clean && !Array.isArray(clean)) clean = []

  return {
    entry,
    plugins,
    external,
    format,
    outDir: options.outDir || 'dist',
    clean: clean ?? false,
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

export function resolveFormat(
  format: Format,
): NonNullable<OutputOptions['format']> {
  return format === 'esm' ? 'es' : format
}
