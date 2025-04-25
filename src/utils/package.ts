import { readFile } from 'node:fs/promises'
import { blue, yellow } from 'ansis'
import Debug from 'debug'
import { findUp } from 'find-up-simple'
import type { Format, NormalizedFormat } from '../options'
import { noop, resolveComma, toArray } from './general'
import type { PackageJson } from 'pkg-types'
import type { InternalModuleFormat } from 'rolldown'

const debug = Debug('tsdown:package')

export async function readPackageJson(
  dir: string,
): Promise<PackageJson | undefined> {
  const packageJsonPath = await findUp('package.json', { cwd: dir })
  if (!packageJsonPath) return
  debug('Reading package.json:', packageJsonPath)
  const contents = await readFile(packageJsonPath, 'utf8')
  return JSON.parse(contents) as PackageJson
}

export type PackageType = 'module' | 'commonjs' | undefined
export function getPackageType(pkg: PackageJson | undefined): PackageType {
  if (pkg?.type) {
    if (!['module', 'commonjs'].includes(pkg.type)) {
      throw new Error(`Invalid package.json type: ${pkg.type}`)
    }
    return pkg.type
  }
}

export function normalizeFormat(format: Format | Format[]): NormalizedFormat[] {
  return resolveComma(toArray<Format>(format, 'es')).map(
    (format): NormalizedFormat => {
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
    },
  )
}

export function prettyFormat(format: InternalModuleFormat): string {
  const formatColor = format === 'es' ? blue : format === 'cjs' ? yellow : noop

  let formatText: string
  switch (format) {
    case 'es':
      formatText = 'ESM'
      break
    default:
      formatText = format.toUpperCase()
      break
  }

  return formatColor(`[${formatText}]`)
}
