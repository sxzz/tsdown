import type { Plugin } from 'rolldown'

/**
 * The node: protocol was added to require in Node v14.18.0
 * https://nodejs.org/api/esm.html#node-imports
 */
export const nodeProtocolPlugin = (): Plugin => {
  return {
    name: 'node-protocol-plugin',
    transform(code) {
      let transformedCode = code.replaceAll(
        /from\s+['"]node:([^'"]+)['"]/g,
        'from "$1"',
      )
      transformedCode = transformedCode.replaceAll(
        /require\(['"]node:([^'"]+)['"]\)/g,
        'require("$1")',
      )
      return transformedCode === code ? null : transformedCode
    },
  }
}
