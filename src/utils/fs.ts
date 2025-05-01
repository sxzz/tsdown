import { access, cp, rm } from 'node:fs/promises'
import { dirname, normalize, sep } from 'node:path'

export function fsExists(path: string): Promise<boolean> {
  return access(path).then(
    () => true,
    () => false,
  )
}

export function fsRemove(path: string): Promise<void> {
  return rm(path, { force: true, recursive: true }).catch(() => {})
}

export function fsCopy(from: string, to: string): Promise<void> {
  return cp(from, to, { recursive: true, force: true })
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
