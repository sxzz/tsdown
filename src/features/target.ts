import minVersion from 'semver/ranges/min-version'
import { resolveComma, toArray } from '../utils/general'
import type { PackageJson } from 'pkg-types'

export function resolveTarget(
  target: string | string[] | undefined,
  pkg?: PackageJson,
): string[] | undefined {
  if (!target) {
    const pkgTarget = resolvePackageTarget(pkg)
    if (pkgTarget) {
      target = pkgTarget
    } else {
      return
    }
  }
  return resolveComma(toArray(target))
}

export function resolvePackageTarget(pkg?: PackageJson): string | undefined {
  const nodeVersion = pkg?.engines?.node
  if (!nodeVersion) return
  const nodeMinVersion = minVersion(nodeVersion)
  if (!nodeMinVersion) return
  if (nodeMinVersion.version === '0.0.0') return
  return `node${nodeMinVersion.version}`
}
