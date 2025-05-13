import { defineConfig } from './src/config.ts'

export default defineConfig({
  entry: ['./src/{index,run,plugins,config}.ts'],
  platform: 'node',
  skipNodeModulesBundle: true,
  shims: true,
  unused: {
    level: 'error',
    ignore: [
      'typescript', // Yarn PnP
    ],
  },
  publint: true,
  onSuccess() {
    console.info('🙏 Build succeeded!')
  },
})
