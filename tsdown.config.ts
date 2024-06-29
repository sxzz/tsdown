import { defineConfig } from './src'

export default defineConfig({
  entry: ['./src/{index,run,plugins}.ts'],
  format: 'esm',
  clean: true,
  platform: 'node',
  dts: true,

  // TODO
  // target: 'node18',
  // splitting: true,
})
