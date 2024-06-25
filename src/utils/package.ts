import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fsExists } from './fs'

// https://github.com/privatenumber/pkgroll/blob/master/src/utils/read-package-json.ts
export async function readPackageJson(dir: string): Promise<any> {
  const packageJsonPath = path.join(dir, 'package.json')

  const exists = await fsExists(packageJsonPath)
  if (!exists) {
    throw new Error(`package.json not found at: ${packageJsonPath}`)
  }
  const packageJsonString = await readFile(packageJsonPath, 'utf8')
  try {
    return JSON.parse(packageJsonString)
  } catch (error) {
    throw new Error(`Cannot parse package.json: ${(error as Error).message}`)
  }
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
