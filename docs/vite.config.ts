import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import {
  groupIconVitePlugin,
  localIconLoader,
} from 'vitepress-plugin-group-icons'
import llmstxt from 'vitepress-plugin-llms'

export default defineConfig({
  plugins: [
    UnoCSS(),
    groupIconVitePlugin({
      customIcon: {
        rolldown: localIconLoader(import.meta.url, 'public/lightning-down.svg'),
        tsdown: localIconLoader(import.meta.url, 'public/tsdown.svg'),
      },
    }),
    llmstxt({
      ignoreFiles: ['index.md', 'README.md', 'zh-CN/**/*'],
      description: 'tsdown is an even faster bundler powered by Rolldown.',
      details: '',
    }),
  ],
})
