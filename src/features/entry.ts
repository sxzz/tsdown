import pc from 'picocolors'
import { glob } from 'tinyglobby'
import { fsExists } from '../utils/fs'
import { logger } from '../utils/logger'
import type { Options } from '../options'

export async function resolveEntry(
  entry: Options['entry'],
): Promise<string[] | Record<string, string>> {
  if (!entry || Object.keys(entry).length === 0) {
    // TODO auto find entry
    throw new Error(`No input files, try "tsdown <your-file>" instead`)
  }

  if (typeof entry === 'string') {
    entry = [entry]
  }
  if (Array.isArray(entry)) {
    const resolvedEntry = await glob(entry)

    // Ensure entry exists
    if (resolvedEntry.length > 0) {
      entry = resolvedEntry
      logger.info(`entry: ${pc.blue(entry.join(', '))}`)
    } else {
      throw new Error(`Cannot find entry: ${entry}`)
    }
  } else {
    const files = Object.values(entry)
    files.forEach((filename) => {
      if (!fsExists(filename)) {
        throw new Error(`Cannot find entry: ${filename}`)
      }
    })
    logger.info(`entry: ${pc.blue(files.join(', '))}`)
  }

  return entry
}
