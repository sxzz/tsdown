import type { ResolvedOptions } from '..'
import type { Plugin } from 'rolldown'

/**
 * The `node:` protocol was added in Node.js v14.18.0.
 * @see https://nodejs.org/api/esm.html#node-imports
 */
export function NodeProtocolPlugin(
  options: Pick<ResolvedOptions, 'nodeProtocol' | 'removeNodeProtocol'>,
): Plugin {
  const nodeProtocolOption =
    options.nodeProtocol ??
    // `removeNodeProtocol: true` means stripping the `node:` protocol which equales to `nodeProtocol: 'strip'`
    // `removeNodeProtocol: false` means keeping the `node:` protocol which equales to `nodeProtocol: false` (ignore it)
    (options.removeNodeProtocol ? 'strip' : false)

  if (!nodeProtocolOption) return {} as unknown as Plugin

  return {
    name: 'tsdown:node-protocol',
    resolveId: {
      order: 'pre',
      filter: { id: /^node:/ },
      handler(id) {
        return {
          id: id.slice(5),
          external: true,
          moduleSideEffects: false,
        }
      },
    },
  }
}
