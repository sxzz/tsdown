import { access } from 'node:fs/promises'

export function fsExists(path: string): Promise<boolean> {
  return access(path).then(
    () => true,
    () => false,
  )
}
