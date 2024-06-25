import { isBuiltin } from 'node:module'
import type { ResolvedOptions } from '../options'
import type { InputOptions, Plugin } from 'rolldown'

export type External = InputOptions['external']

export function ExternalPlugin(
  pkg: any,
  platform: ResolvedOptions['platform'],
): Plugin {
  const deps = getProductionDeps(pkg)

  return {
    name: 'tsdown:external',
    resolveId(id) {
      let shouldExternal = deps.has(id)
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
export function getProductionDeps(pkg: any): Set<string> {
  return new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ])
}
