import { defineConfig } from './src/config.ts'

export default defineConfig({
  entry: ['./src/{index,run,plugins,config}.ts'],
  target: 'node18',
  clean: true,
  platform: 'node',
  skipNodeModulesBundle: true,
  shims: true,
  dts: { isolatedDeclarations: true },
  unused: { level: 'error' },
  publint: true,
  onSuccess() {
    console.info('🙏 Build succeeded!')
  },
})
