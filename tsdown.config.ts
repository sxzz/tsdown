import Unused from 'unplugin-unused/rolldown'
import { defineConfig } from './src'

export default defineConfig({
  entry: ['./src/{index,run,plugins}.ts'],
  format: 'esm',
  clean: true,
  platform: 'node',
  dts: true,
  plugins: [Unused()],

  // TODO
  // target: 'node18',
})
