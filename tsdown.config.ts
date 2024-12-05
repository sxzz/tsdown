import { defineConfig } from './src'

export default defineConfig({
  entry: ['./src/{index,run,plugins}.ts'],
  format: 'esm',
  target: 'node18',
  clean: true,
  platform: 'node',
  skipNodeModulesBundle: true,
  dts: {
    transformer: 'oxc',
    autoAddExts: true,
  },
  unused: { level: 'error' },
  onSuccess() {
    console.info('🙏 Build succeeded!')
  },
})
