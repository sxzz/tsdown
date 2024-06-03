import { existsSync } from 'node:fs'
import { unlink } from 'node:fs/promises'
import { globby } from 'globby'
import { type ConsolaInstance, consola } from 'consola'

export async function removeFiles(
  patterns: string[],
  dir: string,
): Promise<void> {
  const files = await globby(patterns, {
    cwd: dir,
    absolute: true,
  })
  await Promise.all(files.map((file) => existsSync(file) && unlink(file)))
}

export const logger: ConsolaInstance = consola.withTag('tsdown')
