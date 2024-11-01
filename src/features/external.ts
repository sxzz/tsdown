import type { PackageJson } from 'pkg-types'
import type { InputOptions, Plugin } from 'rolldown'

export type External = InputOptions['external']

export function ExternalPlugin(pkg: PackageJson): Plugin {
  const deps = Array.from(getProductionDeps(pkg))
  return {
    name: 'tsdown:external',
    resolveId(id) {
      if (deps.some((dep) => id === dep || id.startsWith(`${dep}/`))) {
        return { id, external: true }
      }
    },
  }
}

/*
 * Production deps should be excluded from the bundle
 */
export function getProductionDeps(pkg: PackageJson): Set<string> {
  return new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ])
}
