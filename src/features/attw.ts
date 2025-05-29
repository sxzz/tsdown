import process from 'node:process'
import Debug from 'debug'
import { logger } from '../utils/logger'
import type { ResolvedOptions } from '../options'

const debug = Debug('tsdown:attw')

export async function attw(options: ResolvedOptions): Promise<void> {
  if (!options.attw) return
  if (!options.pkg) {
    logger.warn('attw is enabled but package.json is not found')
    return
  }

  const { checkPackage } = await import('@arethetypeswrong/core')
}
