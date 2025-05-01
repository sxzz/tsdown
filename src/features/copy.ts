import path from 'node:path'
import { fsCopy } from '../utils/fs'
import { toArray } from '../utils/general'
import type { ResolvedOptions } from '../options'
import type { Arrayable, Awaitable } from '../utils/types'

export interface CopyEntry {
  from: string
  to: string
}
export type CopyOptions = Arrayable<string | CopyEntry>
export type CopyOptionsFn = (options: ResolvedOptions) => Awaitable<CopyOptions>

export async function copyPublicDir(options: ResolvedOptions): Promise<void> {
  if (!options.copy) return

  let copy: CopyOptions
  if (typeof options.copy === 'function') {
    copy = await options.copy(options)
  } else {
    copy = options.copy
  }

  await Promise.all(
    toArray(copy).map((dir) => {
      const from = typeof dir === 'string' ? dir : dir.from
      const to =
        typeof dir === 'string'
          ? path.resolve(options.outDir, path.basename(from))
          : dir.to
      return cp(options.cwd, from, to)
    }),
  )
}

function cp(cwd: string, from: string, to: string): Promise<void> {
  return fsCopy(path.resolve(cwd, from), path.resolve(cwd, to))
}
