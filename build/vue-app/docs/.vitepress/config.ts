import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'C++完全入门指南',
  description: 'C++ Complete Guide from Hello World to Structures',
  base: '/blog/', // 设置基础路径为 /blog/
  outDir: '../public/blog', // 输出到 public/blog 目录
  lang: 'zh-CN', // 设置语言为中文
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'C++ Guide', link: '/cpp-guide' }
    ],
    sidebar: [
      {
        text: 'C++ Guide',
        items: [
          { text: 'C++完全入门指南', link: '/cpp-guide' }
        ]
      }
    ]
  }
})
