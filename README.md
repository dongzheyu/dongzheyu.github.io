# JetCPP 网站

![Vue](https://img.shields.io/badge/Vue-3.2+-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3+-646CFF?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-7952B3?logo=bootstrap)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Active-success)

一个现代化的技术网站，展示编程项目、技术博客和团队成果。基于 Vue 3 + TypeScript + Vite 构建，采用反主流的"炽炭主题"设计系统，强调性能优化和用户体验。

## 网站概览

**JetCPP** 是一个热爱编程的开发者团队，专注于创造实用的软件工具。本网站展示我们的核心工作方向：

- Minecraft 工具开发
- 实用系统工具创建
- 技术博客文章分享
- 教育编程工具
- 开源项目发布

网站通过项目展示、博客系统和个人介绍三大版块，完整呈现我们的技术成果和开发理念。

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

### 页面结构

#### 首页 (/)
Hero 区域展示个人品牌与核心价值，包含六大特性卡片：
- Minecraft 工具开发
- 实用系统工具
- 技术博客分享
- 网站与文档
- 教育编程
- 持续学习

采用左重右轻布局，左侧文字内容占 7 列，右侧留白。背景动画采用 opacity 呼吸效果而非 transform，减少合成开销。

#### 项目页面 (/projects)
展示个人代表作项目，按卡片网格布局：
- English Listen (Qt6 + C++ 英语听写工具)
- English Listen WinUI (WinUI 3 + C# + C++ 混合开发版本)

每个项目卡片包含标题、描述、分类标签与“查看详情”链接，链接指向 VitePress 渲染的项目文档页面。

#### 博客页面 (/blog)
集成用户发布的博客系统，呈现技术文章列表。支持：
- 静态文章（Markdown 文件）
- 用户文章（Supabase 数据库）
- 文章分类与标签
- 文章详情阅读
- Markdown 文档渲染
- 代码高亮
- 评论系统
- 写文章功能（登录用户）

#### 关于页面 (/about)
介绍我们的开发团队，包含：
- Hero 区域：团队简介与座右铭
- 价值观卡片：创新、高效、学习、分享四大核心价值
- 联系方式：社交媒体链接 (GitHub, Gitee, 哔哩哔哩)

#### 管理员面板 (/admin)
**仅限管理员访问**，提供完整的内容管理功能：
- 系统统计：用户数、文章数、评论数
- 用户管理：查看所有用户资料
- 文章管理：编辑/删除所有文章
- 评论管理：删除不当评论
- 搜索过滤：快速查找内容

#### 导航栏
顶部固定导航栏包含：
- Logo 与品牌名称
- 导航链接：首页 / 项目 / 博客 / 关于
- 减少动画开关 (闪电图标，切换 data-motion 属性)
- 主题切换下拉菜单 (浅色 / 深色 / 跟随系统)
- 关注我下拉菜单 (GitHub / Gitee / 哔哩哔哩)
- 赞助按钮 (跳转爱发电)
- **管理员入口** (仅管理员可见)

#### 页脚
包含品牌简介、社交媒体链接、版权声明及服务商信息卡片 (DigitalPlat 域名、Cloudflare CDN)。

## 技术架构

### 认证与授权系统

#### Supabase Authentication
- 邮箱/密码登录
- 邮箱验证
- 密码重置
- 会话管理

#### 权限控制
- **普通用户**：可以发表评论、发布文章
- **作者**：可以编辑/删除自己的文章和评论
- **管理员**：可以管理所有内容（通过 `useAdmin` composable）

#### 管理员识别
```typescript
// src/composables/useAdmin.ts
const isAdmin = computed(() => {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
  return user.value?.email === adminEmail
})
```

### 文件结构

```
src/
├── assets/                  # 全局样式
│   ├── animations.css       # 动画系统 (21+ 关键帧)
│   ├── base.css             # 设计令牌、CSS 变量、组件基础样式
│   └── main.css             # 页面布局、导航栏、页脚样式
├── components/              # 可复用组件
│   ├── CommentsSection.vue  # 评论组件
│   └── MarkdownRenderer.vue # Markdown 渲染器
├── composables/             # 组合式函数
│   ├── useAnimations.ts     # 动画状态管理与滚动触发
│   ├── useAuth.ts           # 认证管理
│   └── useAdmin.ts          # 管理员权限管理
├── router/                  # 路由配置
│   └── index.ts
├── supabase/                # Supabase 客户端
│   └── client.ts
└── views/                   # 页面视图
    ├── HomeView.vue         # 首页
    ├── ProjectsView.vue     # 项目列表
    ├── BlogView.vue         # 博客列表
    ├── BlogPostView.vue     # 文章详情
    ├── PostEditorView.vue   # 文章编辑器
    ├── AdminView.vue        # 管理员面板
    ├── AboutView.vue        # 关于页面
    ├── AuthTestView.vue     # 登录/注册
    ├── ProfileView.vue      # 用户资料
    └── ...                  # 其他页面

docs/                        # VitePress 博客文档（静态）
├── .vitepress/
│   └── config.ts            # VitePress 配置
└── *.md                     # 博客文章

project/                     # VitePress 项目文档（静态）
├── .vitepress/
│   └── config.ts            # 项目文档配置
├── index.md                 # 项目首页
├── english-listen.md        # English Listen 项目
└── english-listen-winui.md  # English Listen WinUI 项目

public/
├── blog/                    # 静态博客文件
│   ├── *.md                 # Markdown 源文件
│   └── *.html               # VitePress 生成的 HTML
└── project/                 # 静态项目文档
    ├── *.md                 # Markdown 源文件
    └── *.html               # VitePress 生成的 HTML
```

### 路由表

| 路由 | 页面 | 说明 |
|------|------|------|
| / | HomeView | 首页，展示特性与品牌 |
| /projects | ProjectsView | 项目列表 |
| /blog | BlogView | 博客列表（静态 + 用户文章） |
| /blog/:slug | BlogPostView | 文章详情（支持评论） |
| /blog/new | PostEditorView | 发布新文章（需登录） |
| /blog/edit/:id | PostEditorView | 编辑文章（作者/管理员） |
| /admin | AdminView | 管理员面板（仅管理员） |
| /about | AboutView | 关于页面 |
| /auth | AuthTestView | 登录/注册 |
| /user/:userId | ProfileView | 用户资料 |
| /project/* | VitePress | 项目详情页，独立构建 |
| /blog/* | VitePress | 博客文章页，独立构建（旧版） |

### 动画系统

animations.css 包含 20+ 关键帧，全部使用 translate3d/scale3d 强制 GPU 合成层：
- 入场动画：fadeIn, slideUp, slideLeft, slideRight, scaleIn, flipIn
- 持续动画：float, drift, pulse, ember, bounce
- 响应式动画：对 prefers-reduced-motion 与 data-motion="reduced" 的支持

### 数据库架构

#### Supabase 数据表

**1. profiles（用户资料）**
```sql
- id: uuid (主键，关联 auth.users)
- nickname: text (昵称)
- gender: text (性别)
- avatar_url: text (头像 URL)
- created_at: timestamp
- updated_at: timestamp
```

**2. user_posts（用户文章）**
```sql
- id: uuid (主键)
- slug: text (唯一标识，用于 URL)
- title: text (标题)
- content: text (Markdown 内容)
- excerpt: text (简介)
- author_id: uuid (作者 ID)
- category: text (分类)
- color: text (主题色)
- published: boolean (是否发布)
- created_at: timestamp
- updated_at: timestamp
```

**3. comments（评论）**
```sql
- id: uuid (主键)
- post_slug: text (文章标识)
- user_id: uuid (评论者 ID)
- content: text (评论内容)
- created_at: timestamp
- updated_at: timestamp
```

#### Supabase Storage

**blog-images（博客图片存储桶）**
- 公开读取
- 登录用户上传
- MIME 类型限制：image/*
- 文件大小限制：5MB

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

### 环境变量配置

项目使用 `.env.local` 文件管理敏感配置。首次运行前需要创建该文件：

#### 1. 复制示例文件

```bash
cd build/vue-app
cp .env.example .env.local
```

#### 2. 填写配置信息

编辑 `.env.local` 文件：

```bash
# Supabase 配置（必需）
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Supabase Service Role Key（可选，用于管理员删除用户等功能）
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# 管理员配置（可选）
VITE_ADMIN_EMAIL=your-admin-email@example.com
```

**获取 Supabase 配置：**
1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 进入 Settings → API
4. 复制 Project URL 和 anon public key

**获取 Service Role Key（可选）：**
- 在同一个 API 设置页面
- 找到 "service_role key (secret)"
- 点击 "Reveal" 显示密钥并复制
- **注意**：此密钥具有完全权限，请妥善保管，不要泄露

**重要提示：**
- `.env.local` 已被 `.gitignore` 忽略，不会提交到 Git
- 永远不要将 `.env.local` 文件上传到公开仓库
- 生产环境需要在部署平台设置相同的环境变量
- Service Role Key 仅用于管理员操作，可以绕过 RLS 策略

### 数据库初始化

项目使用 Supabase 作为后端服务，需要先初始化数据库结构。

**执行 SQL 文件：**
1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择项目 → SQL Editor
3. 新建查询，复制 `build/vue-app/database-setup.sql` 的全部内容
4. 将脚本中的 `your-admin-email@example.com` 替换为实际的管理员邮箱
5. 执行 SQL 脚本
6. 等待执行完成，检查是否有错误提示

**脚本包含：**
- Profiles 表：用户资料管理
- User Posts 表：用户文章管理
- Comments 表：评论管理
- Storage 策略：博客图片存储桶
- 完整的 RLS（行级安全）策略配置

**重要提示：**
- 执行前请确保已创建 Supabase 项目
- 替换管理员邮箱后再执行
- 脚本会创建所有必要的表、索引和策略
- 如需了解更多详情，请参考以下文档：
  - [管理员系统设置指南](./build/vue-app/ADMIN_SETUP.md)
  - [HTTPS 配置指南](./build/vue-app/HTTPS_SETUP.md)
  - [项目内容规范](./build/vue-app/PROJECT_CONTENT_RULES.md)

## 相关文档

我们提供了详细的文档帮助您快速上手和深入了解项目：

### 核心文档

- [管理员系统设置指南](./build/vue-app/ADMIN_SETUP.md) - 管理员账户创建与权限配置详细说明
- [HTTPS 配置指南](./build/vue-app/HTTPS_SETUP.md) - 本地开发与生产环境 HTTPS 配置方法
- [项目内容规范](./build/vue-app/PROJECT_CONTENT_RULES.md) - 项目详情页面内容结构与编写标准

### 数据库初始化

项目使用 `database-setup.sql` 文件进行数据库初始化，该文件位于 `build/vue-app/database-setup.sql`。

**执行步骤：**
1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择您的项目 → SQL Editor
3. 新建查询，复制 `database-setup.sql` 的全部内容
4. **重要**：将脚本中的 `your-admin-email@example.com` 替换为实际的管理员邮箱
5. 执行 SQL 脚本
6. 等待执行完成，检查是否有错误提示

**脚本包含的内容：**
- Profiles 表：用户资料管理（含封禁功能）
- User Posts 表：用户文章管理（支持草稿和发布）
- Comments 表：评论管理
- Storage 策略：博客图片存储桶配置
- 完整的 RLS（行级安全）策略配置
- 管理员权限策略（允许管理员管理所有内容）

**注意事项：**
- 执行前请确保已创建 Supabase 项目
- 必须替换管理员邮箱后再执行
- 脚本会创建所有必要的表、索引和策略
- 如需修改管理员邮箱，请同时更新 `.env.local` 中的 `VITE_ADMIN_EMAIL`

### 管理员账户设置

#### 创建管理员账户

1. **注册账户**
   - 访问网站登录页面
   - 使用管理员邮箱注册：`your-admin-email@example.com`
   - 设置密码：（建议首次登录后修改）

2. **验证邮箱**
   - 检查邮箱完成验证
   - 或者在 Supabase Dashboard 中手动确认邮箱

3. **配置环境变量**
   - 在 `.env.local` 中设置 `VITE_ADMIN_EMAIL=your-admin-email@example.com`
   - 重启开发服务器

4. **访问管理员面板**
   - 登录后访问：http://localhost:5175/#/admin
   - 或直接点击导航栏的管理员入口（如果已添加）

#### 管理员权限

管理员拥有以下权限：
- 查看所有用户资料
- 管理所有文章（编辑/删除）
- 管理所有评论（删除）
- 查看系统统计数据
- **封禁/解封用户**（通过 profiles 表的 banned 字段）
- **完全删除用户**（需要部署 Edge Function）

**配置 Edge Function 以启用用户删除功能：**

Edge Function 是一种安全的服务器端函数，可以在不暴露 Service Role Key 的情况下删除用户。

**部署步骤：**

1. **安装 Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **登录 Supabase**
   ```bash
   supabase login
   ```

3. **链接项目**
   ```bash
   cd build/vue-app
   supabase link
   # 按提示选择你的项目
   ```

4. **设置环境变量**
   - 访问 Supabase Dashboard → Functions → Settings
   - 添加以下变量：
     - `SUPABASE_URL`: 你的项目 URL
     - `SUPABASE_SERVICE_ROLE_KEY`: 从 Settings → API 获取

5. **部署函数**
   ```bash
   supabase functions deploy delete-user
   ```

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

#### 方式一：静态文章（Markdown 文件）

在 docs/ 目录下创建 .md 文件，然后：
1. 按需更新 docs/.vitepress/config.ts 的 sidebar 配置
2. 执行 npm run blog:build 进行构建
3. 将生成的文件复制到 public/blog/

#### 方式二：用户发布文章（推荐）

1. 登录账户
2. 访问 /blog 页面
3. 点击“写文章”按钮
4. 使用 Markdown 编辑器编写文章
5. 上传图片（自动存储到 Supabase Storage）
6. 选择发布或保存草稿
7. 提交后立即可见

### 管理员操作指南

#### 访问管理员面板

1. 确保已使用管理员邮箱登录
2. 访问 http://localhost:5174/#/admin
3. 查看系统统计数据

#### 管理用户

- 查看所有注册用户
- 搜索特定用户
- 查看用户资料详情

#### 管理文章

- 查看所有文章（已发布 + 草稿）
- 按状态过滤（全部/已发布/草稿）
- 搜索文章
- 编辑任何文章
- 删除不当文章

#### 管理评论

- 查看所有评论
- 搜索评论内容
- 删除垃圾/不当评论

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

MIT License - 团队项目，自由使用与修改

## 开发团队

JetCPP - 热爱编程的开发者团队

## 联系方式

- GitHub: https://github.com/dongzheyu
- Gitee: https://gitee.com/jetcpp
- 哔哩哔哩: https://space.bilibili.com/3546730880567808
- 赞助: https://afdian.com/a/JetCPP
