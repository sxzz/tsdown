import type { Plugin } from 'rolldown'

/**
 * The `node:` protocol was added in Node.js v14.18.0.
 * @see https://nodejs.org/api/esm.html#node-imports
 */
export const NodeProtocolPlugin = (): Plugin => {
  return {
    name: 'tsdown:node-protocol',
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
