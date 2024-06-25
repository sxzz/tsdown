import { defineConfig } from './src'

export default defineConfig({
  entry: ['./src/{index,run,plugins}.ts'],
  format: 'esm',
  clean: true,
  platform: 'node',

  // TODO
  // target: 'node18',
  // splitting: true,
  // dts: true,
})
