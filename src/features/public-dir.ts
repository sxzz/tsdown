import type { NormalizedFormat, ResolvedOptions } from '../options'
import type { Arrayable, Awaitable } from '../utils/types'

export type PublicDir = Arrayable<string> | Record<string, string>
export interface PublicDirContext {
  outDir: string
  format: NormalizedFormat
  options: ResolvedOptions
}
export type PublicDirFn = () => Awaitable<PublicDir>

export function copyPublicDir(config: ResolvedOptions): void {
  if (!config.publicDir) return
  //
}
