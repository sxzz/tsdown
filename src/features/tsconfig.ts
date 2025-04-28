import path from 'node:path'
import { underline } from 'ansis'
import { up as findUp } from 'empathic/find'
import { fsExists } from '../utils/fs'
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
  if (tsconfig !== false) {
    if (tsconfig === true || tsconfig == null) {
      const isSet = tsconfig
      tsconfig = findTsconfig(cwd)
      if (isSet && !tsconfig) {
        logger.warn(`No tsconfig found in \`${cwd}\``)
      }
    } else {
      const tsconfigPath = path.resolve(cwd, tsconfig)
      if (await fsExists(tsconfigPath)) {
        tsconfig = tsconfigPath
      } else if (tsconfig.includes('\\') || tsconfig.includes('/')) {
        logger.warn(`tsconfig \`${tsconfig}\` doesn't exist`)
        tsconfig = false
      } else {
        tsconfig = findTsconfig(cwd, tsconfig)
        if (!tsconfig) {
          logger.warn(`No \`${tsconfig}\` found in \`${cwd}\``)
        }
      }
    }

    if (tsconfig) {
      logger.info(`Using tsconfig: ${underline(path.relative(cwd, tsconfig))}`)
    }
  }

  return tsconfig
}
