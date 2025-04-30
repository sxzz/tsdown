import path from "node:path"
import { copyDirSync } from "../utils/fs"
import { slash } from "../utils/general"

export const copyPubDir = (
  publicDir: string | boolean | undefined,
  outDir: string
): void => {
  if (!publicDir) return
  copyDirSync(path.resolve(publicDir === true ? "public" : publicDir), outDir)
}

export const isInPublicDir = (
  publicDir: string | boolean | undefined,
  filePath: string
): boolean => {
  if (!publicDir) return false
  const publicPath = slash(
    path.resolve(publicDir === true ? 'public' : publicDir),
  )
  return slash(path.resolve(filePath)).startsWith(`${publicPath}/`);
}
