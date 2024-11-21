import path from 'node:path'
import type { PackageJson } from 'pkg-types'
import type { InputOptions, Plugin } from 'rolldown'

export type External = InputOptions['external']

export function ExternalPlugin(
  pkg: PackageJson,
  skipNodeModulesBundle?: boolean,
): Plugin {
  const deps = Array.from(getProductionDeps(pkg))
  return {
    name: 'tsdown:external',
    resolveId(id, importer, { isEntry }) {
      if (isEntry) return

      const EXTERNAL = { id, external: true }

      if (skipNodeModulesBundle && !path.isAbsolute(id) && id[0] !== '.') {
        return EXTERNAL
      }
      if (deps.some((dep) => id === dep || id.startsWith(`${dep}/`))) {
        return EXTERNAL
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
