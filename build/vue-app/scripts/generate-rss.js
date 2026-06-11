import fs from 'fs'
import path from 'path'

// 博客文章数据
const blogPosts = [
  {
    title: 'C++完全入门指南：从Hello World到结构体',
    slug: 'cpp-guide',
    excerpt: '这是一篇详细的C++入门指南，从最基础的Hello World程序开始，逐步讲解变量、数据类型、控制流、函数、指针到结构体等核心概念。',
    date: '2026-12-24',
    category: '编程教程'
  },
  {
    title: 'C# 从入门到精通（零基础到进阶）',
    slug: 'csharp-guide',
    excerpt: '一份全面的C#学习指南，涵盖从基础语法到高级特性的完整知识体系。',
    date: '2026-03-04',
    category: '编程教程'
  },
  {
    title: 'XAML 从入门到精通（零基础到进阶）',
    slug: 'xaml-guide',
    excerpt: 'WPF界面开发完全指南，从XAML基础语法到MVVM架构模式。',
    date: '2026-03-04',
    category: '编程教程'
  }
]

function generateRSS() {
  const buildDate = new Date().toUTCString()
  
  const items = blogPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://dongzheyu.github.io/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      <guid isPermaLink="false">https://dongzheyu.github.io/blog/${post.slug}</guid>
    </item>`).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>JetCPP Team 博客</title>
    <link>https://dongzheyu.github.io</link>
    <description>代码重塑世界 · 创新驱动未来 - JetCPP Team 技术博客</description>
    <language>zh-CN</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="https://dongzheyu.github.io/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://dongzheyu.github.io/logo.png</url>
      <title>JetCPP Team</title>
      <link>https://dongzheyu.github.io</link>
    </image>
    ${items}
  </channel>
</rss>`

  fs.writeFileSync(path.join(process.cwd(), 'public', 'feed.xml'), rss)
  console.log('RSS feed generated successfully!')
}

generateRSS()
