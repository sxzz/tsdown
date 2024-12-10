import { getPackageType } from '../utils/package'
import type { NormalizedFormat } from '../options'

export type OutputExtension = 'mjs' | 'cjs' | 'js'
export function resolveOutputExtension(
  pkg: any,
  format: NormalizedFormat,
): OutputExtension {
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
