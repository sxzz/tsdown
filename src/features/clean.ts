import { readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { globby } from 'globby'
import { logger } from '../utils/logger'

// clean cwd dir + patterns
export async function cleanOutDir(
  cwd: string,
  patterns: string[],
): Promise<void> {
  const files = (await readdir(cwd)).map((file) => path.resolve(cwd, file))

  if (patterns.length) {
    files.push(...(await globby(patterns, { cwd, absolute: true })))
  }

  logger.info('Cleaning output folder')
  for (const file of files) {
    await rm(file, { force: true, recursive: true })
  }
}
