# dongle 个人网站

一个现代化的个人技术网站，展示编程项目、技术博客和个人成果。基于 Vue 3 + TypeScript + Vite 构建，采用反主流的"炽炭主题"设计系统，强调性能优化和用户体验。

## 网站概览

**dongle** 是一位热爱编程的小学生开发者，专注于创造实用的软件工具。本网站展示其核心工作方向：

- Minecraft 工具开发
- 实用系统工具创建
- 技术博客文章分享
- 教育编程工具
- 开源项目发布

网站通过项目展示、博客系统和个人介绍三大版块，完整呈现技术成果和开发理念。

## 核心特性

**现代技术栈**
- Vue 3 Composition API（函数式编程）
- TypeScript（完整类型系统）
- Vite（极速开发构建）
- Bootstrap 5 + Bootstrap Icons（响应式组件库）
- Vue Router 4（客户端路由）

**炽炭主题设计系统**
- 深炭灰 (深色) 与浅米色 (浅色) 双主题
- 琥珀橙 (#ff8c42) 主色调贯穿全站
- 反主流的错位布局与左偏标题设计
- 噪点纹理与径向渐变背景
- 弹性/过冲曲线动画 (cubic-bezier 过冲)

**性能优化**
- requestAnimationFrame 节流鼠标交互
- 事件委托替代逐元素绑定
- 简化阴影系统与 GPU 合成层优化
- translate3d/scale3d 强制 GPU 加速
- CSS Animations 及时清理

**无障碍支持**
- 系统级 prefers-reduced-motion 检测
- 手动减少动画切换开关
- 主题自动跟随系统设置或手动切换
- localStorage 持久化用户偏好设置

**响应式设计**
- 完全响应式布局 (移动端 / 平板 / 桌面)
- 移动端汉堡菜单与自动折叠
- 固定顶部导航栏
- 灵活网格系统

## 页面结构

### 首页 (/)
Hero 区域展示个人品牌与核心价值，包含六大特性卡片：
- Minecraft 工具开发
- 实用系统工具
- 技术博客分享
- 网站与文档
- 教育编程
- 持续学习

采用左重右轻布局，左侧文字内容占 7 列，右侧留白。背景动画采用 opacity 呼吸效果而非 transform，减少合成开销。

### 项目页面 (/projects)
展示个人代表作项目，按卡片网格布局：
- English Listen (Qt6 + C++ 英语听写工具)
- English Listen WinUI (WinUI 3 + C# + C++ 混合开发版本)

每个项目卡片包含标题、描述、分类标签与"查看详情"链接，链接指向 VitePress 渲染的项目文档页面。

### 博客页面 (/blog)
集成 VitePress 博客系统，呈现技术文章列表与分类。支持：
- 文章分类与标签
- 文章详情阅读
- Markdown 文档渲染
- 代码高亮

通过 VitePress 独立构建，生成静态 HTML，通过 `<a target="_blank">` 链接进行跨域导航。

### 关于页面 (/about)
介绍开发者个人，包含：
- Hero 区域：个人简介与座右铭
- 价值观卡片：创新、高效、学习、分享四大核心价值
- 联系方式：社交媒体链接 (GitHub, Gitee, 哔哩哔哩)

### 导航栏
顶部固定导航栏包含：
- Logo 与品牌名称
- 导航链接：首页 / 项目 / 博客 / 关于我
- 减少动画开关 (闪电图标，切换 data-motion 属性)
- 主题切换下拉菜单 (浅色 / 深色 / 跟随系统)
- 关注我下拉菜单 (GitHub / Gitee / 哔哩哔哩)
- 赞助按钮 (跳转爱发电)

### 页脚
包含品牌简介、社交媒体链接、版权声明及服务商信息卡片 (DigitalPlat 域名、Cloudflare CDN)。

## 技术架构

### 文件结构

```
src/
├── assets/                  # 全局样式
│   ├── animations.css       # 动画系统 (21+ 关键帧)
│   ├── base.css             # 设计令牌、CSS 变量、组件基础样式
│   └── main.css             # 页面布局、导航栏、页脚样式
├── components/              # 可复用组件
│   └── (空/待扩展)
├── composables/             # 组合式函数
│   └── useAnimations.ts     # 动画状态管理与滚动触发
├── router/                  # 路由配置
│   └── index.ts
└── views/                   # 页面视图
    ├── HomeView.vue         # 首页
    ├── ProjectsView.vue     # 项目列表
    ├── BlogView.vue         # 博客列表
    └── AboutView.vue        # 关于页面

docs/                        # VitePress 博客文档
├── .vitepress/
│   └── config.ts            # VitePress 配置
└── *.md                     # 博客文章

project/                     # VitePress 项目文档
├── .vitepress/
│   └── config.ts            # 项目文档配置
├── index.md                 # 项目首页
├── english-listen.md        # English Listen 项目
└── english-listen-winui.md  # English Listen WinUI 项目
```

### 路由表

| 路由 | 页面 | 说明 |
|------|------|------|
| / | HomeView | 首页，展示特性与品牌 |
| /projects | ProjectsView | 项目列表 |
| /blog | BlogView | 博客列表，VitePress 集成 |
| /about | AboutView | 关于页面 |
| /project/* | VitePress | 项目详情页，独立构建 |
| /blog/* | VitePress | 博客文章页，独立构建 |

### 动画系统

animations.css 包含 20+ 关键帧，全部使用 translate3d/scale3d 强制 GPU 合成层：
- 入场动画：fadeIn, slideUp, slideLeft, slideRight, scaleIn, flipIn
- 持续动画：float, drift, pulse, ember, bounce
- 响应式动画：对 prefers-reduced-motion 与 data-motion="reduced" 的支持

### 主题系统

双主题设计，通过 data-theme 属性切换：
- 深色主题 (默认)：深炭灰背景 (#0f0e0c) + 琥珀橙主色
- 浅色主题：浅米色背景 (#faf7f2) + 深橙主色

动态计算，覆盖 CSS 变量：背景色、文字色、边框色、阴影、渐变等。

### 性能优化方案

1. 鼠标交互节流：requestAnimationFrame 合并 mousemove 事件更新
2. 事件委托：document 级别委托替代逐元素 addEventListener
3. GPU 加速：transform: translate3d(x, y, 0) 强制合成层
4. 阴影简化：单层阴影而非多重阴影叠加，减少重排
5. 动画降级：opacity 呼吸效果替代 transform 变换
6. CSS will-change：仅在动画活跃时启用，完成后清除
7. 脚本清理：onUnmounted 正确移除事件监听与 rAF

### 设计令牌

**颜色系统**
- 主色：琥珀橙 #ff8c42 (深色) / 深橙 #e85d04 (浅色)
- 次要色：#f48c06
- 辅助色：#ffba08 (黄), #52b788 (绿), #ef233c (红)
- 背景：#0f0e0c (深) / #faf7f2 (浅)
- 文字：#ede8df (深主) / #2c2418 (浅主)

**间距系统**
- 基础单位：4px
- 常用间距：8px, 12px, 16px, 24px, 32px, 48px

**圆角半径**
- 超小 (sm)：4px
- 标准 (md)：8px
- 大 (lg)：12px
- 圆形：50%

**过渡与动画**
- 标准过渡时间：200ms (主题切换) / 300-500ms (滚动触发)
- 缓动函数：cubic-bezier(0.34, 1.56, 0.64, 1) (过冲) / cubic-bezier(0.16, 1, 0.3, 1) (弹性)
- 禁用时：全部 0.01ms (prefers-reduced-motion)

## 依赖项

**生产依赖**
- vue@3.2.0+：核心框架
- vue-router@4.0.0+：路由管理
- bootstrap@5.3.8+：UI 组件库
- bootstrap-icons@1.13.1+：图标库

**开发依赖**
- typescript：类型检查
- vite@7.3.0+：构建工具
- vitepress@1.3.0+：博客/项目文档
- @vitejs/plugin-vue：Vue 3 支持

**开发环境**
- Node.js 20.19.0+ 或 22.12.0+
- npm 或 yarn

## 开发指南

### 本地开发环境配置

#### 1. 克隆仓库

```bash
git clone https://github.com/dongzheyu/dongzheyu.github.io.git
cd dongzheyu.github.io/build/vue-app
```

#### 2. 安装依赖

```bash
npm install
```

#### 3. 启动开发服务器

启动主网站开发服务器（Vue Vite）：

```bash
npm run dev
```

开发服务器将在 http://localhost:5173 启动（Vite 默认端口）。

启动博客开发服务器（VitePress）：

```bash
npm run blog:dev
```

博客服务器将在 http://localhost:5173 启动。

启动项目文档开发服务器（VitePress）：

```bash
npm run project:dev
```

项目文档服务器将在 http://localhost:5173 启动。

### 构建生产版本

#### 构建主网站

```bash
npm run build
```

生成的静态文件位于 `dist/` 目录，包含完整的 Vue 应用。

#### 构建博客系统

```bash
npm run blog:build
```

生成的静态文件位于 `docs/.vitepress/dist/`，需复制到 `public/blog/` 目录。

#### 构建项目文档

```bash
npm run project:build
```

生成的静态文件位于 `project/.vitepress/dist/`，需复制到 `public/project/` 目录。

### 添加新项目

在 project/ 目录下创建 .md 文件，然后：
1. 更新 project/.vitepress/config.ts 的 sidebar 配置
2. 更新 project/index.md 首页的 hero actions 和 features
3. 在 src/views/ProjectsView.vue 的 projects 数组中添加新项目卡片
4. 执行 npm run project:build 进行构建

### 添加新博客文章

在 docs/ 目录下创建 .md 文件，然后：
1. 按需更新 docs/.vitepress/config.ts 的 sidebar 配置
2. 执行 npm run blog:build 进行构建

## 部署

该网站部署到 GitHub Pages，通过 GitHub Actions 实现自动构建与发布。

### GitHub Pages 部署步骤

1. 确保仓库名为 `{username}.github.io`
2. main 分支包含完整源代码与构建产物
3. 在 GitHub 仓库设置中启用 GitHub Pages，选择部署源为 main 分支的 root 目录或 docs 目录
4. 推送到 main 分支后，GitHub Pages 自动部署

### 本地预览部署

运行预览命令查看生产构建效果：

```bash
npm run preview
```

### CDN 与域名

- 域名：通过 DigitalPlat FreeDomain 获取免费域名
- CDN：使用 Cloudflare 加速与安全防护
- 域名管理：Cloudflare DNS 配置

## 注意事项

1. VitePress 博客与项目文档独立构建，生成的 HTML 文件需手动复制到 public/blog/ 和 public/project/ 目录
2. 修改 src/ 内容后需重新执行 npm run build
3. 修改博客/项目文档后需分别执行 npm run blog:build 和 npm run project:build
4. 主题切换与减少动画偏好自动存储到 localStorage，支持跨会话恢复
5. 在禁用 JavaScript 的浏览器中，网站将显示静态内容

## 许可证

MIT License - 个人项目，自由使用与修改

## 作者

dongle - 热爱编程的小学生开发者

## 联系方式

- GitHub: https://github.com/dongzheyu
- Gitee: https://gitee.com/jetcpp
- 哔哩哔哩: https://space.bilibili.com/3546730880567808
- 赞助: https://afdian.com/a/JetCPP
