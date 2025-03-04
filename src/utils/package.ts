import path from 'node:path'
import { readPackageJSON, type PackageJson } from 'pkg-types'
import { debug } from '../utils/logger'
import type { NormalizedFormat } from '../options'
import { fsExists } from './fs'
import { toArray } from './general'
import type { ModuleFormat } from 'rolldown'

export async function readPackageJson(
  dir: string,
): Promise<PackageJson | undefined> {
  const packageJsonPath = path.join(dir, 'package.json')
  const exists = await fsExists(packageJsonPath)
  if (!exists) return
  debug('Reading package.json:', packageJsonPath)
  return readPackageJSON(packageJsonPath)
}

export function getPackageType(
  pkg: PackageJson | undefined,
): 'module' | 'commonjs' {
  if (pkg?.type) {
    if (!['module', 'commonjs'].includes(pkg.type)) {
      throw new Error(`Invalid package.json type: ${pkg.type}`)
    }
    return pkg.type
  }
  return 'commonjs'
}

export function normalizeFormat(
  format: ModuleFormat | ModuleFormat[],
): NormalizedFormat[] {
  return toArray<ModuleFormat>(format, 'es').map((format): NormalizedFormat => {
    switch (format) {
      case 'es':
      case 'esm':
      case 'module':
        return 'es'
      case 'cjs':
      case 'commonjs':
        return 'cjs'
      default:
        return format
    }
  })
}
