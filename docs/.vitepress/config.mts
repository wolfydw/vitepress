// 官方教程  https://vitepress.dev/zh/reference/site-config
// https://vitepress.dev/reference/default-theme-config

import { defineConfig } from 'vitepress'
import sidebarConfig from '../sidebar.json'

export default defineConfig({

  title: "杨达伟的知识库",
  description: "",
  base: '/',
  markdown: {
    math: true
  },

  themeConfig: {
    nav: [
//      { text: '主页', link: '/' },
      { text: '主页', link: '/' },
      { text: '初中化学', link: '/初中化学/' }
    ],

    lastUpdated: true, 

    editLink: {
      pattern: 'https://github.com/wolfydw/vitepress/edit/main/docs/:path',
      text: '在 GitHub 上编辑'
    },

    outline: 'deep',
    outlineTitle: '目录',

    search: {provider: 'local'}, // 全局搜索

    sidebar: sidebarConfig, // 使用自动生成的侧边栏配置

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 - 情歌'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
