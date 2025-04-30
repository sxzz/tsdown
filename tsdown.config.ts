import { defineConfig } from './src/config.ts'

export default defineConfig({
  entry: ['./src/{index,run,plugins,config}.ts'],
  target: 'node20.18',
  platform: 'node',
  skipNodeModulesBundle: true,
  shims: true,
  unused: { level: 'error' },
  publint: true,
  onSuccess() {
    console.info('🙏 Build succeeded!')
  },
})
