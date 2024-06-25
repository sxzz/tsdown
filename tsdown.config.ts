import { defineConfig } from './src'
import { dependencies } from './package.json'

export default defineConfig({
  entry: ['./src/{index,run}.ts'],
  format: 'esm',
  clean: true,
  // TODO external deps
  external(id) {
    if (id.startsWith('node:')) return true
    if (
      Object.keys(dependencies).some(
        (dep) => id === dep || id.startsWith(`${dep}/`),
      )
    )
      return true
  },
  treeshake: false,

  // TODO
  // target: 'node18',
  // splitting: true,
  // dts: true,
  // platform: 'node',
})
