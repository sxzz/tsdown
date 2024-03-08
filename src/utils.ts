import { existsSync } from 'node:fs'
import { unlink } from 'node:fs/promises'
import { globby } from 'globby'

export async function removeFiles(patterns: string[], dir: string) {
  const files = await globby(patterns, {
    cwd: dir,
    absolute: true,
  })
  await Promise.all(files.map((file) => existsSync(file) && unlink(file)))
}
