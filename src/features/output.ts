import type { NormalizedFormat } from '../options'
import type { PackageType } from '../utils/package'

export type OutputExtension = 'mjs' | 'cjs' | 'js'
export function resolveOutputExtension(
  packageType: PackageType,
  format: NormalizedFormat,
  fixedExtension?: boolean,
): OutputExtension {
  switch (format) {
    case 'es':
      return !fixedExtension && packageType === 'module' ? 'js' : 'mjs'
    case 'cjs':
      return fixedExtension || packageType === 'module' ? 'cjs' : 'js'
    default:
      return 'js'
  }
}
