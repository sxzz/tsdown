import { isBuiltin } from 'node:module'
import type { ResolvedOptions } from '../options'
import type { PackageJson } from 'pkg-types'
import type { InputOptions, Plugin } from 'rolldown'

export type External = InputOptions['external']

export function ExternalPlugin(
  pkg: PackageJson | undefined,
  platform: ResolvedOptions['platform'],
): Plugin {
  const deps = pkg && getProductionDeps(pkg)

  return {
    name: 'tsdown:external',
    resolveId(id) {
      let shouldExternal = deps?.has(id)
      shouldExternal ||= platform === 'node' && isBuiltin(id)

      if (shouldExternal) {
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
