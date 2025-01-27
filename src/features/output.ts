import { getPackageType } from '../utils/package'
import type { NormalizedFormat } from '../options'
import type { PackageJson } from 'pkg-types'

export type OutputExtension = 'mjs' | 'cjs' | 'js'
export function resolveOutputExtension(
  pkg: PackageJson | undefined,
  format: NormalizedFormat,
  fixedExtension?: boolean,
): OutputExtension {
  const moduleType = getPackageType(pkg)
  switch (format) {
    case 'es':
      return !fixedExtension && moduleType === 'module' ? 'js' : 'mjs'
    case 'cjs':
      return fixedExtension || moduleType === 'module' ? 'cjs' : 'js'
    default:
      return 'js'
  }
}
