import path from 'node:path'
import { blue, underline } from 'ansis'
import { up as findUp } from 'empathic/find'
import { fsStat } from '../utils/fs'
import { logger } from '../utils/logger'
import type { Options } from '../options'

export function findTsconfig(
  cwd?: string,
  name: string = 'tsconfig.json',
): string | false {
  return findUp(name, { cwd }) || false
}

export async function resolveTsconfig(
  tsconfig: Options['tsconfig'],
  cwd: string,
): Promise<string | false> {
  const original = tsconfig

  if (tsconfig !== false) {
    if (tsconfig === true || tsconfig == null) {
      tsconfig = findTsconfig(cwd)
      if (original && !tsconfig) {
        logger.warn(`No tsconfig found in ${blue(cwd)}`)
      }
    } else {
      const tsconfigPath = path.resolve(cwd, tsconfig)
      const stat = await fsStat(tsconfigPath)
      if (stat?.isFile()) {
        tsconfig = tsconfigPath
      } else if (stat?.isDirectory()) {
        tsconfig = findTsconfig(tsconfigPath)
        if (!tsconfig) {
          logger.warn(`No tsconfig found in ${blue(tsconfigPath)}`)
        }
      } else {
        tsconfig = findTsconfig(cwd, tsconfig)
        if (!tsconfig) {
          logger.warn(`tsconfig ${blue(original)} doesn't exist`)
        }
      }
    }

    if (tsconfig) {
      logger.info(`Using tsconfig: ${underline(path.relative(cwd, tsconfig))}`)
    }
  }

  return tsconfig
}
