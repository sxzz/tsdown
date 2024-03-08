import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/{index,cli-run}.ts'],
  format: 'esm',
  target: 'node18',
  splitting: true,
  clean: true,
  dts: true,
  platform: 'node',
})
