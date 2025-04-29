import { chmod } from 'node:fs/promises'
import path from 'node:path'
import { underline } from 'ansis'
import { fsExists } from '../utils/fs'
import { logger } from '../utils/logger'
import { prettyFormat } from '../utils/package'
import type { Plugin } from 'rolldown'

export const RE_SHEBANG: RegExp = /^#!.*/

export function ShebangPlugin(cwd: string): Plugin {
  return {
    name: 'tsdown:shebang',
    async writeBundle(options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk' || !chunk.isEntry) continue
        if (!RE_SHEBANG.test(chunk.code)) continue

        const filepath = path.resolve(
          cwd,
          options.file || path.join(options.dir!, chunk.fileName),
        )
        if (await fsExists(filepath)) {
          logger.info(
            prettyFormat(options.format),
            `Granting execute permission to ${underline(path.relative(cwd, filepath))}`,
          )
          await chmod(filepath, 0o755)
        }
      }
    },
  }
}
