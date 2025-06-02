import { defineConfig } from './src/config.ts'

export default defineConfig({
  entry: ['./src/{index,run,plugins,config}.ts'],
  platform: 'node',
  dts: true,
  unused: {
    level: 'error',
    ignore: [
      'typescript', // Yarn PnP
    ],
  },
  publint: true,
  exports: true,
  fixedExtension: true,
  onSuccess() {
    console.info('🙏 Build succeeded!')
  },
})
