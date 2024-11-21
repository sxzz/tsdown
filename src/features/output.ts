import { getPackageType } from '../utils/package'
import type { ModuleFormat } from 'rolldown'

export function resolveOutputExtension(
  pkg: any,
  format: ModuleFormat,
): 'mjs' | 'cjs' | 'js' {
  const moduleType = getPackageType(pkg)
  switch (format) {
    case 'iife':
    case 'umd':
      return 'js'
    case 'es':
    case 'esm':
    case 'module': {
      return moduleType === 'module' ? 'js' : 'mjs'
    }
    case 'cjs':
    case 'commonjs': {
      return moduleType === 'module' ? 'cjs' : 'js'
    }
  }
}
