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
        root: {
            label: 'English',
            lang: 'en'
        },
        'zh-CN': getLocaleConfig('zh-CN'),
    },

    title: 'tsdown',
    description: 'An even faster bundler powered by Rolldown.',
    lastUpdated: true,
    cleanUrls: true,
    head: [
        [
            'link',
            {
                rel: 'icon',
                type: 'image/svg+xml',
                href: '/lightning-down.svg',
            },
        ],
        ['meta', { name: 'theme-color', content: '#ff7e17' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'en' }],
        [
            'meta',
            {
                property: 'og:title',
                content: 'tsdown | Bundler powered by Rolldown',
            },
        ],
        [
            'meta',
            {
                property: 'og:image',
                // TODO : Create custom og-image
                content: 'https://rolldown.rs/og-image.png',
            },
        ],
        ['meta', { property: 'og:site_name', content: 'Rolldown' }],
        ['meta', { property: 'og:url', content: 'https://rolldown.rs/' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:site', content: '@rolldown_rs' }],
    ],

    themeConfig: {
        // If Algolia environment variables are available, enable Algolia search
        /*
        search: {
          provider: 'algolia',
          options: {
            appId: process.env.ALGOLIA_APP_ID || '',
            apiKey: process.env.ALGOLIA_API_KEY || '',
            indexName: 'rolldown',
          },
        */
        // Else, use the default VitePress search
        search: {
            provider: 'local',
        },

        logo: { src: '/lightning-down.svg', width: 24, height: 24 },

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'User Guide', link: '/guide/' },
            { text: 'Reference', link: '/reference/config-options.md' },
        ],

        sidebar: {
            '/guide/': [
                {
                    text: 'User Guide',
                    items: [
                        { text: 'Introduction', link: '/guide/index.md' },
                        { text: 'Getting Started', link: '/guide/getting-started.md' },
                    ],
                },
                {
                    text: 'Recipes',
                    items: [
                        { text: 'Multiple builds', link: '/guide/multiple-builds.md' },
                    ],
                },
            ],
            '/reference/': [
                {
                    text: 'Reference',
                    items: [
                        { text: 'Config Options', link: '/reference/config-options.md' },
                        { text: 'Command Line Interface', link: '/reference/cli.md' },
                    ],
                },
            ],
        },

        outline: 'deep',
        socialLinks: [
            { icon: 'github', link: 'https://github.com/rolldown/tsdown' },
            { icon: 'npm', link: 'https://npmjs.com/package/tsdown' },
            { icon: 'jsr', link: 'https://jsr.io/@sxzz/tsdown' },
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023-present VoidZero Inc.',
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
