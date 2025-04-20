import { chmod } from 'node:fs/promises'
import path from 'node:path'
import { underline } from 'ansis'
import { fsExists } from '../utils/fs'
import { logger } from '../utils/logger'
import type { Plugin } from 'rolldown'

const RE_SHEBANG = /^#!.*/

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
            `Granting execute permission to ${underline(path.relative(cwd, filepath))}`,
          )
          await chmod(filepath, 0o755)
        }
      }
    },
  }
}
