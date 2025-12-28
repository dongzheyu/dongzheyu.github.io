import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: '博客',
  description: '记录编程历程，分享开发心得，探索技术世界',
  base: '/blog/', // 设置基础路径为 /blog/
  outDir: '../public/blog', // 输出到 public/blog 目录
  lang: 'zh-CN', // 设置语言为中文
  themeConfig: {
    nav: [
      { text: '博客首页', link: '../' }, 
      { text: '网站首页', link: 'https://jetcpp.dpdns.org/' },
    ],
    sidebar: [
      {
        items: [
          { text: 'C++完全入门指南', link: '/cpp-guide' }
        ]
      }
    ]
  },
  // 确保 VitePress 不会添加额外的默认样式覆盖我们的自定义样式
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ''
        }
      }
    }
  }
})
