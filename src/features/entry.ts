import path from 'node:path'
import { blue } from 'ansis'
import { glob } from 'tinyglobby'
import { lowestCommonAncestor } from '../utils/fs'
import { logger } from '../utils/logger'
import type { Options } from '../options'

export async function resolveEntry(
  entry: Options['entry'],
): Promise<Record<string, string>> {
  if (!entry || Object.keys(entry).length === 0) {
    // TODO auto find entry
    throw new Error(`No input files, try "tsdown <your-file>" instead`)
  }

  const objectEntry = await toObjectEntry(entry)
  const entries = Object.values(objectEntry)
  if (entries.length === 0) {
    throw new Error(`Cannot find entry: ${JSON.stringify(entry)}`)
  }
  logger.info(`entry: ${blue(entries.join(', '))}`)
  return objectEntry
}

export async function toObjectEntry(
  entry: string | string[] | Record<string, string>,
): Promise<Record<string, string>> {
  if (typeof entry === 'string') {
    entry = [entry]
  }
  if (!Array.isArray(entry)) {
    return entry
  }

  const resolvedEntry = await glob(entry)
  const base = lowestCommonAncestor(...resolvedEntry)
  return Object.fromEntries(
    resolvedEntry.map((file) => {
      const relative = path.relative(base, file)
      return [
        relative.slice(0, relative.length - path.extname(relative).length),
        file,
      ]
    }),
  )
}
