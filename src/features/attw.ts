import { execSync } from 'node:child_process'
import fs from 'node:fs'
import process from 'node:process'
import { dim } from 'ansis'
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

  const t = performance.now()
  debug('Running attw check')

  try {
    const tarballName = execSync('npm pack --json', { encoding: 'utf-8' })
    const tarballPath = JSON.parse(tarballName)[0].filename as string
    const tarball = fs.readFileSync(tarballPath)
    const { checkPackage, createPackageFromTarballData } = await import(
      '@arethetypeswrong/core'
    )

    const pkg = createPackageFromTarballData(tarball)
    const checkResult = await checkPackage(
      pkg,
      options.attw === true ? {} : options.attw,
    )

    if ('problems' in checkResult && checkResult.problems.length > 0) {
      for (const problem of checkResult.problems) {
        logger.warn('Are the types wrong problem:', problem)
      }
    } else {
      logger.success(
        `No ATTW problems found`,
        dim`(${Math.round(performance.now() - t)}ms)`,
      )
    }

    fs.unlinkSync(tarballPath)
  } catch (error) {
    logger.error('ATTW check failed:', error)
    debug('Found errors, setting exit code to 1')
    process.exitCode = 1
  }
}
