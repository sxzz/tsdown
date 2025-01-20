import { readdir } from 'node:fs/promises'
import path from 'node:path'
import Debug from 'debug'
import { glob } from 'tinyglobby'
import { fsExists, fsRemove } from '../utils/fs'
import { logger } from '../utils/logger'

const debug = Debug('tsdown:clean')

// clean cwd dir + patterns
export async function cleanOutDir(
  cwd: string,
  patterns: string[],
): Promise<void> {
  const files = []

  if (await fsExists(cwd))
    files.push(...(await readdir(cwd)).map((file) => path.resolve(cwd, file)))

  if (patterns.length) {
    files.push(...(await glob(patterns, { cwd, absolute: true })))
  }

  logger.info('Cleaning output folder')
  for (const file of files) {
    debug('Removing', file)
    await fsRemove(file)
  }
}
