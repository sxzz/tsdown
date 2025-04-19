import { defineConfig } from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader,
} from 'vitepress-plugin-group-icons'
import llmstxt from 'vitepress-plugin-llms'
import { getLocaleConfig } from './theme'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  locales: {
    root: getLocaleConfig('en'),
    'zh-CN': getLocaleConfig('zh-CN'),
  },

  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          'zh-CN': {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },
  },

  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          rolldown: localIconLoader(
            import.meta.url,
            '../../public/lightning-down.svg',
          ),
        },
      }) as any,
      llmstxt({
        ignoreFiles: ['index.md', 'README.md'],
        description: 'tsdown is an even faster bundler powered by Rolldown.',
        details: '',
      }),
    ],
  },

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
})
