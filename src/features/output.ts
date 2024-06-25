import { getPackageType } from '../utils/package'
import type { Format } from '../options'

export function resolveOutputExtension(
  pkg: any,
  format: Format,
): 'mjs' | 'cjs' | 'js' {
  const type = getPackageType(pkg)
  const isEsmFormat = (
    ['es', 'esm', 'module'] satisfies Format[] as Format[]
  ).includes(format)
  if (type === 'module') {
    if (isEsmFormat) return 'js'
    else return 'cjs'
  } else {
    if (isEsmFormat) return 'mjs'
    return 'js'
  }
}
