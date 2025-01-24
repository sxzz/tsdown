import Debug from 'debug'
import type { PackageJson } from 'pkg-types'
import type { InputOptions, Plugin } from 'rolldown'

const debug = Debug('tsdown:external')

export type External = InputOptions['external']

export function ExternalPlugin(
  pkg?: PackageJson,
  skipNodeModulesBundle?: boolean,
): Plugin {
  const deps = pkg && Array.from(getProductionDeps(pkg))
  return {
    name: 'tsdown:external',
    async resolveId(id, importer, { isEntry }) {
      if (isEntry) return

      let shouldExternal = false
      if (skipNodeModulesBundle) {
        const resolved = await this.resolve(id)
        if (!resolved) return
        shouldExternal =
          resolved.external || /[\\/]node_modules[\\/]/.test(resolved.id)
      }
      if (deps) {
        shouldExternal ||= deps.some(
          (dep) => id === dep || id.startsWith(`${dep}/`),
        )
      }

      if (shouldExternal) {
        debug('External dependency:', id)
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
