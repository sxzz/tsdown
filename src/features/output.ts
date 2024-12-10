import { getPackageType } from '../utils/package'
import type { NormalizedFormat } from '../options'
import type { PackageJson } from 'pkg-types'

export type OutputExtension = 'mjs' | 'cjs' | 'js'
export function resolveOutputExtension(
  pkg: PackageJson | undefined,
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
