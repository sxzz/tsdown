import { defineConfig } from './src'

export default defineConfig({
  entry: ['./src/{index,run,plugins}.ts'],
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
})
