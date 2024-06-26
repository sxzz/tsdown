import IsolatedDecl from 'unplugin-isolated-decl'
import { defineConfig } from './src'

export default defineConfig({
  entry: ['./src/{index,run,plugins}.ts'],
  format: 'esm',
  clean: true,
  platform: 'node',
  plugins: [IsolatedDecl.rolldown()],

  // TODO
  // target: 'node18',
  // splitting: true,
  // dts: true,
})
