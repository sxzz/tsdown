import { RE_SHEBANG } from './shebang'
import type { Plugin } from 'rolldown'

export const RE_JS: RegExp = /\.([cm]?)jsx?$/
function filename_js_to_dts(id: string): string {
  return id.replace(RE_JS, '.d.$1ts')
}

export function StubPlugin(dts?: boolean): Plugin {
  return {
    name: 'tsdown:stub',

    transform(code) {
      // preserve shebang only
      const shebang = RE_SHEBANG.exec(code)?.[0]
      return shebang || ''
    },

    renderChunk(code, chunk) {
      if (code) code += '\n'
      code += `export * from "${chunk.facadeModuleId}";\nexport { default } from "${chunk.facadeModuleId}";`
      if (dts) {
        this.emitFile({
          type: 'asset',
          fileName: filename_js_to_dts(chunk.fileName),
          source: code,
        })
      }
      return code
    },
  }
}
