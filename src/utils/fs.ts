import { access, rm } from 'node:fs/promises'
import path, { dirname, normalize, sep } from 'node:path'
import fs from 'node:fs'
export function fsExists(path: string): Promise<boolean> {
  return access(path).then(
    () => true,
    () => false,
  )
}

export function fsRemove(path: string): Promise<void> {
  return rm(path, { force: true, recursive: true }).catch(() => { })
}

export function lowestCommonAncestor(...filepaths: string[]): string {
  if (filepaths.length === 0) return ''
  if (filepaths.length === 1) return dirname(filepaths[0])
  filepaths = filepaths.map(normalize)
  const [first, ...rest] = filepaths
  let ancestor = first.split(sep)
  for (const filepath of rest) {
    const directories = filepath.split(sep, ancestor.length)
    let index = 0
    for (const directory of directories) {
      if (directory === ancestor[index]) {
        index += 1
      } else {
        ancestor = ancestor.slice(0, index)
        break
      }
    }
    ancestor = ancestor.slice(0, index)
  }

  return ancestor.length <= 1 && ancestor[0] === ''
    ? sep + ancestor[0]
    : ancestor.join(sep)
}

export function copyDirSync(sourceDir: string, destDir: string): void {
  if (!fs.existsSync(sourceDir)) return

  fs.mkdirSync(destDir, { recursive: true })

  for (const file of fs.readdirSync(sourceDir)) {
    const sourceFile = path.resolve(sourceDir, file)
    if (sourceFile === destDir) {
      continue
    }
    const destFile = path.resolve(destDir, file)
    const stat = fs.statSync(sourceFile)
    if (stat.isDirectory()) {
      copyDirSync(sourceFile, destFile)
    } else {
      fs.copyFileSync(sourceFile, destFile)
    }
  }
}
