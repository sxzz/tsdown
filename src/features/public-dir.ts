import path from 'node:path'
import { fsCopy } from '../utils/fs'
import { toArray } from '../utils/general'
import type { ResolvedOptions } from '../options'
import type { Arrayable, Awaitable } from '../utils/types'

export interface PublicDirEntry {
  from: string
  to: string
}
export type PublicDir = Arrayable<string | PublicDirEntry>
export type PublicDirFn = (options: ResolvedOptions) => Awaitable<PublicDir>

export async function copyPublicDir(options: ResolvedOptions): Promise<void> {
  if (!options.publicDir) return

  let publicDir: PublicDir
  if (typeof options.publicDir === 'function') {
    publicDir = await options.publicDir(options)
  } else {
    publicDir = options.publicDir
  }

  await Promise.all(
    toArray(publicDir).map((dir) => {
      const from = typeof dir === 'string' ? dir : dir.from
      const to =
        typeof dir === 'string'
          ? path.resolve(options.outDir, path.basename(from))
          : dir.to
      return copy(options.cwd, from, to)
    }),
  )
}

function copy(cwd: string, from: string, to: string): Promise<void> {
  return fsCopy(path.resolve(cwd, from), path.resolve(cwd, to))
}
