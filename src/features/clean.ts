import { readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { globby } from 'globby'
import { logger } from '../utils/logger'
import { fsExists } from '../utils/fs'

// clean cwd dir + patterns
export async function cleanOutDir(
  cwd: string,
  patterns: string[],
): Promise<void> {
  const files = []

  if (await fsExists(cwd))
    files.push(...(await readdir(cwd)).map((file) => path.resolve(cwd, file)))

  if (patterns.length) {
    files.push(...(await globby(patterns, { cwd, absolute: true })))
  }

  logger.info('Cleaning output folder')
  for (const file of files) {
    await rm(file, { force: true, recursive: true })
  }
}
