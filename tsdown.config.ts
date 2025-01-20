import { isCallOf } from 'unplugin-ast/ast-kit'
import AST from 'unplugin-ast/rolldown'
import { RemoveNode } from 'unplugin-ast/transformers'
import { defineConfig } from './src/config.ts'

export default defineConfig({
  entry: ['./src/{index,run,plugins,config}.ts'],
  format: 'esm',
  target: 'node18',
  clean: true,
  platform: 'node',
  skipNodeModulesBundle: true,
  shims: true,
  dts: { transformer: 'oxc' },
  bundleDts: true,
  unused: { level: 'error' },
  onSuccess() {
    console.info('🙏 Build succeeded!')
  },
  plugins: [
    AST({
      transformer: [RemoveNode((node) => isCallOf(node, 'typeAsserts'))],
    }),
  ],
})
