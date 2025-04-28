import path from 'node:path'
import type { Options } from '../options'
import type {
  NormalizedOutputOptions,
  OutputBundle,
  Plugin,
  PluginContext,
} from 'rolldown'

export function StubPlugin(entry: Options['entry']): Plugin {
  return {
    name: 'tsdown:stub',
    generateBundle(
      this: PluginContext,
      _: NormalizedOutputOptions,
      bundle: OutputBundle,
    ): void {
      /**
       * Generate a stub to each entry point.
       */
      let code = ''
      // Entry is always a Record<string, string>
      if (typeof entry === 'object') {
        // eslint-disable-next-line unused-imports/no-unused-vars
        for (const [_, file] of Object.entries(entry)) {
          const fileName = path.basename(file)
          code += `export * from "${path.resolve(fileName)}";\n`
        }
      }

      /**
       * Iterate over the bundle and replace the code for each chunk
       */
      for (const fileName of Object.keys(bundle)) {
        if (bundle[fileName].type === 'chunk') {
          bundle[fileName].code = code
        }
      }
    },
  }
}
