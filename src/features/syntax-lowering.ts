import { transform } from 'oxc-transform'
import type { Plugin } from 'rolldown'

export function SyntaxLoweringPlugin(target: string | string[]): Plugin {
  return {
    name: 'tsdown:syntax-lowering',
    renderChunk(code, chunk, { sourcemap }) {
      return transform(chunk.fileName, code, {
        sourcemap: !!sourcemap,
        target,
      })
    },
  }
}
