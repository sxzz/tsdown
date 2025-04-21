import Debug from 'debug'
import { glob } from 'tinyglobby'
import { fsRemove } from '../utils/fs'
import { logger } from '../utils/logger'

const debug = Debug('tsdown:clean')

// clean cwd dir + patterns
export async function cleanOutDir(
  cwd: string,
  patterns: string[],
): Promise<void> {
  if (!patterns.length) return

  const files = await glob(patterns, {
    cwd,
    absolute: true,
  })

  logger.info('Cleaning files')
  for (const file of files) {
    debug('Removing', file)
    await fsRemove(file)
  }
}
