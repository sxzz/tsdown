import { existsSync } from 'node:fs'
import { globby } from 'globby'
import { PrettyError } from './error'
import { logger } from './utils'
import type { InputOptions, OutputOptions } from '@rolldown/node'

export type Format = NonNullable<OutputOptions['format']>

export interface Options {
  entry?: InputOptions['input']
  format?: Format | Format[]
  plugins?: InputOptions['plugins']
  external?: InputOptions['external']
  outDir?: string
  clean?: boolean | string[]
}

type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U

export type ResolvedOptions = Overwrite<
  Required<Options>,
  {
    format: Format[]
    clean: string[] | false
  }
>

export async function normalizeOptions(
  options: Options,
): Promise<ResolvedOptions> {
  let {
    entry,
    format = ['esm'],
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
  if (format.length === 0) format = ['esm']

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
