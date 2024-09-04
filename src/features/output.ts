import { getPackageType } from '../utils/package'
import type { Format } from '../options'

export function resolveOutputExtension(
  pkg: any,
  format: Format,
): 'mjs' | 'cjs' | 'js' {
  const moduleType = getPackageType(pkg)
  switch (format) {
    case 'iife':
      return 'js'
    case 'es':
    case 'esm':
    case 'module': {
      return moduleType === 'module' ? 'js' : 'mjs'
    }
    case 'cjs':
    case 'commonjs': {
      return moduleType === 'module' ? 'mjs' : 'js'
    }
  }
}
