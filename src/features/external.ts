import Debug from 'debug'
import { toArray } from '../utils/general'
import type { ResolvedOptions } from '../options'
import type { PackageJson } from 'pkg-types'
import type { Plugin } from 'rolldown'

const debug = Debug('tsdown:external')
const RE_DTS = /\.d\.[cm]?ts$/

export function ExternalPlugin(options: ResolvedOptions): Plugin {
  const deps = options.pkg && Array.from(getProductionDeps(options.pkg))
  return {
    name: 'tsdown:external',
    async resolveId(id, importer, { isEntry }) {
      if (isEntry) return

      // skip dts external
      if (importer && RE_DTS.test(importer)) return

      const { noExternal } = options
      if (typeof noExternal === 'function' && noExternal(id, importer)) {
        return
      }
      if (noExternal) {
        const noExternalPatterns = toArray(noExternal)
        if (
          noExternalPatterns.some((pattern) => {
            return pattern instanceof RegExp ? pattern.test(id) : id === pattern
          })
        )
          return
      }

      let shouldExternal: boolean | 'absolute' = false
      if (options.skipNodeModulesBundle) {
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
        return { id, external: shouldExternal }
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
