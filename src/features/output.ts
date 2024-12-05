import { getPackageType } from '../utils/package'
import type { NormalizedFormat } from '../options'

export function resolveOutputExtension(
  pkg: any,
  format: NormalizedFormat,
): 'mjs' | 'cjs' | 'js' {
  const moduleType = getPackageType(pkg)
  switch (format) {
    case 'es':
      return moduleType === 'module' ? 'js' : 'mjs'
    case 'cjs':
      return moduleType === 'module' ? 'cjs' : 'js'
    default:
      return 'js'
  }
}
