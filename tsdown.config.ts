import { defineConfig } from './src'

export default defineConfig({
  entry: ['./src/{index,run,plugins}.ts'],
  format: 'esm',
  clean: true,
  platform: 'node',
  dts: true,
  unused: { level: 'error' },
  onSuccess() {
    console.info('🙏 Build succeeded!')
  },

  // TODO
  // target: 'node18',
})
