import child_process from 'node:child_process'
import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { promisify } from 'node:util'
import { blue, dim } from 'ansis'
import Debug from 'debug'
import { fsRemove } from '../utils/fs'
import { logger } from '../utils/logger'
import type { ResolvedOptions } from '../options'

const debug = Debug('tsdown:attw')
const exec = promisify(child_process.exec)

export async function attw(options: ResolvedOptions): Promise<void> {
  if (!options.attw) return
  if (!options.pkg) {
    logger.warn('attw is enabled but package.json is not found')
    return
  }

  const t = performance.now()
  debug('Running attw check')

  const tempDir = await mkdtemp(path.join(tmpdir(), 'tsdown-attw-'))

  let attwCore: typeof import('@arethetypeswrong/core')
  try {
    attwCore = await import('@arethetypeswrong/core')
  } catch {
    logger.error(
      `ATTW check requires ${blue`@arethetypeswrong/core`} to be installed.`,
    )
    return
  }

  try {
    const { stdout: tarballInfo } = await exec(
      `npm pack --json ----pack-destination ${tempDir}`,
      { encoding: 'utf-8' },
    )
    const parsed = JSON.parse(tarballInfo)
    if (!Array.isArray(parsed) || !parsed[0]?.filename) {
      throw new Error('Invalid npm pack output format')
    }
    const tarballPath = path.join(tempDir, parsed[0].filename as string)
    const tarball = await readFile(tarballPath)

    const pkg = attwCore.createPackageFromTarballData(tarball)
    const checkResult = await attwCore.checkPackage(
      pkg,
      options.attw === true ? {} : options.attw,
    )

    if (checkResult.types !== false && checkResult.problems) {
      for (const problem of checkResult.problems) {
        logger.warn('Are the types wrong problem:', problem)
      }
    } else {
      logger.success(
        `No Are the types wrong problems found`,
        dim`(${Math.round(performance.now() - t)}ms)`,
      )
    }
  } catch (error) {
    logger.error('ATTW check failed:', error)
    debug('Found errors, setting exit code to 1')
    process.exitCode = 1
  } finally {
    await fsRemove(tempDir)
  }
}
