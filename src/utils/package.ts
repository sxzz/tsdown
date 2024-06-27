import path from 'node:path'
import { type PackageJson, readPackageJSON } from 'pkg-types'
import { fsExists } from './fs'

export async function readPackageJson(
  dir: string,
): Promise<PackageJson | undefined> {
  const packageJsonPath = path.join(dir, 'package.json')
  const exists = await fsExists(packageJsonPath)
  if (!exists) return
  return readPackageJSON(packageJsonPath)
}

export function getPackageType(pkg: any): 'module' | 'commonjs' {
  if (pkg.type) {
    if (!['module', 'commonjs'].includes(pkg.type)) {
      throw new Error(`Invalid package.json type: ${pkg.type}`)
    }
    return pkg.type
  }
  return 'commonjs'
}
