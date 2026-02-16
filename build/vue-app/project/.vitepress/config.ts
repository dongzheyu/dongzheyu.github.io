import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: '项目展示',
  description: '展示我的开源项目和技术作品',
  base: '/project/', // 设置基础路径为 /project/
  outDir: '../public/project', // 输出到 public/project 目录
  lang: 'zh-CN', // 设置语言为中文
  ignoreDeadLinks: true, // 忽略死链接检查
  themeConfig: {
    nav: [
      { text: '项目首页', link: '/' },
      { text: '网站首页', link: 'https://jetcpp.dpdns.org/' },
    ],
    sidebar: [
      {
        items: [
          { text: 'English Listen - 英语听写训练工具', link: '/english-listen' }
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