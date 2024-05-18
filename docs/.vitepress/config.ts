import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "P-Seamless-Scroll",
  description: "P-Seamless-Scroll 是一个创建无缝滚动效果的 js 插件。它有着轻量且高效的特性，支持丰富的自定义配置选项，提供了一系列 API 方法以及事件监听功能。",
  lastUpdated: true,
  base: '/p-seamless-scroll/',
  head: [['link', { rel: 'icon', href: '/p-seamless-scroll/favicon.ico' }]],
  outDir: './.vitepress/p-seamless-scroll',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/docs/introduce' },
      { text: '在线体验', link: '/demo/index' }
    ],
    logo: '/logo.png',
    sidebar: {
      '/docs/': [
        {
          // text: '官方文档',
          items: [
            { text: '介绍', link: '/docs/introduce' },
            { text: '快速开始', link: '/docs/start' },
            { text: '参数配置', link: '/docs/config' },
            { text: '属性', link: '/docs/stats' },
            { text: '方法', link: '/docs/method' },
            { text: '事件监听', link: '/docs/event' },
            { text: '错误码', link: '/docs/error' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pbstar/p-seamless-scroll' }
    ],
    editLink: {
      pattern: 'https://github.com/pbstar/p-seamless-scroll/edit/dev/docs/:path'
    }
  },
})
