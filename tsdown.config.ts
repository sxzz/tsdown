import { isCallOf } from 'unplugin-ast/ast-kit'
import AST from 'unplugin-ast/rolldown'
import { RemoveNode } from 'unplugin-ast/transformers'
import { defineConfig } from './src/config.ts'

export default defineConfig({
  entry: ['./src/{index,run,plugins,config}.ts'],
  target: 'node18',
  clean: true,
  platform: 'node',
  skipNodeModulesBundle: true,
  shims: true,
  dts: { isolatedDeclaration: true },
  unused: { level: 'error' },
  publint: true,
  onSuccess() {
    console.info('🙏 Build succeeded!')
  },
  plugins: [
    AST({
      exclude: ['**/*.d.ts'],
      transformer: [RemoveNode((node) => isCallOf(node, 'typeAsserts'))],
    }),
  ],
})
