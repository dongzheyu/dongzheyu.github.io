import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'dongle - 个人技术博客',
  description: '代码重塑世界 · 创新驱动未来',
  base: '/',
  appearance: true,
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['script', { src: '/language-switcher.js' }],
    ['style', {}, '@font-face{font-family: "CustomFont";src: url("/fonts.ttf") format("truetype");font-weight: normal;font-style: normal;}']
  ],
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '项目', link: '/projects' }, 
      { text: '博客', link: '/blog' }, 
      { text: '关于我', link: '/about' },
      {
        text: '关注我',
        items: [
          { icon: 'github', text: 'Github', link: 'https://github.com/dongzheyu' },
          { text: 'Gitee', link: 'https://gitee.com/jetcpp' },
          { text: '哔哩哔哩', link: 'https://space.bilibili.com/3546730880567808?spm_id_from=333.1007.0.0' }
        ]
      }, 
      {text:'赞助支持', link:'https://afdian.com/a/JetCPP'}
    ],
    
    font: {
      family: {
        base: 'CustomFont, Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      }
    },
    
  sidebar: [
      {
        text: 'dongle 的技术世界',
        items: [
          { text: '首页', link: '/' },
          { text: '项目', link: '/projects' }, 
          { text: '博客', link: '/blog' }, 
          { text: '关于我', link: '/about' }, 
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dongzheyu' }
    ]
  }
})