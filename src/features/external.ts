import path from 'node:path'
import { debug } from '../utils/logger'
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

      let shouldExternal =
        skipNodeModulesBundle && !path.isAbsolute(id) && id[0] !== '.'

      shouldExternal ||= deps.some(
        (dep) => id === dep || id.startsWith(`${dep}/`),
      )

      if (shouldExternal) {
        debug('[external]', 'External dependency:', id)
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
