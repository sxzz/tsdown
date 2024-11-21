import { readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { glob } from 'tinyglobby'
import { fsExists } from '../utils/fs'
import { debug, logger } from '../utils/logger'

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
    debug('[clean]', 'Removing', file)
    await rm(file, { force: true, recursive: true })
  }
}
