# 我的个人网站

本仓库包含个人网站的源代码与静态站点产物（基于 build/vue-app）。

## 1. 介绍

这是作者的个人网站（仓库描述：我的个人网站），基于 Vue 3 + TypeScript + Vite 构建，使用 Supabase 作为后端（认证、存储与用户文章/评论），并通过 VitePress 提供博客与项目文档的静态页面。网站包括：首页、项目页、博客、关于页与管理面板等模块，支持深/浅主题、无障碍设置与性能优化。

## 2. 快速开始

以下步骤适用于本地开发和调试主站、博客与项目文档：

1. 克隆仓库并进入前端目录

```bash
git clone https://github.com/dongzheyu/dongzheyu.github.io.git
cd dongzheyu.github.io/build/vue-app
```

2. 安装依赖（使用 Bun）

```bash
bun install
```

3. 复制并配置环境变量

```bash
cp .env.example .env.local
# 编辑 .env.local，至少填入：
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY
# 可选：VITE_ADMIN_EMAIL 和 VITE_SUPABASE_SERVICE_ROLE_KEY
```

4. 启动开发服务器

```bash
# 启动主站（Vite）
bun run dev

# 启动博客（VitePress）
bun run blog:dev

# 启动项目文档（VitePress）
bun run project:dev
```

5. 访问

- 主站（默认）: http://localhost:5173
- VitePress（博客/项目文档）: http://localhost:5173（脚本会分别启动）

## 3. 开发

环境与约定

- 环境变量：使用 build/vue-app/.env.example 作为示例，生产环境在部署平台上设置相同的变量。
- 推荐使用 Bun 作为开发环境（项目脚本基于 bun）。也可使用 Node/npm/yarn，根据 package.json 中的 scripts 调整命令。

数据库与 Supabase

- 项目依赖 Supabase：认证（auth）、Storage（图片上传）与自定义表（profiles、user_posts、comments）。
- 首次部署请在 Supabase → SQL Editor 中执行：
  - `build/vue-app/database-setup.sql`（必须）
  - 可选：`build/vue-app/database-fulltext-search.sql`（启用全文检索）
- 在执行 SQL 前将脚本中的 `your-admin-email@example.com` 替换为实际管理员邮箱，并在 .env.local 中配置相同的 VITE_ADMIN_EMAIL。

管理员与 Edge Function

- 管理员账号通过环境变量 VITE_ADMIN_EMAIL 识别（见 composable 中的 useAdmin 实现）。
- 若需要安全地删除用户，建议部署 Supabase Edge Function（脚本和说明位于 build/vue-app 中的相关文档）。

主要脚本（build/vue-app/package.json 中定义）

- bun run dev       — 启动开发服务器（主站）
- bun run build     — 构建主站，产物输出到 dist/
- bun run blog:dev  — 本地启动 VitePress 博客
- bun run blog:build— 构建博客静态文件（输出到 docs/.vitepress/dist/，需要复制到 public/blog/）
- bun run project:build — 构建项目文档（复制到 public/project/）
- bun run preview   — 本地预览生产构建

构建与部署

- 运行 bun run build 生成 dist/ 并执行 postbuild 脚本将产物复制到仓库根目录（index.html、assets/ 等）。
- 仓库名为 `{username}.github.io` 时，可使用 GitHub Pages 部署；也可使用 Vercel、Netlify、Cloudflare Pages 或自建 Nginx 进行部署。

添加内容

- 新项目：在 project/ 目录新增 .md，更新 project/.vitepress/config.ts 和 src/views/ProjectsView.vue 的项目数组，然后运行 bun run project:build。
- 新博客：静态文章放入 docs/ 并运行 bun run blog:build；或通过网站登录并使用“写文章”功能将文章保存到 Supabase（推荐）。

开发建议

- 保持 .env.local 不提交（已在 .gitignore 中忽略）。
- 在本地运行 TypeScript 类型检查：bun run ts-check（或相应的 npm script）。
- 定期执行依赖审计与安全检查（npm audit / bun check）。

其它资源

- 数据库脚本：build/vue-app/database-setup.sql、build/vue-app/database-fulltext-search.sql
- 项目文档与管理员设置说明：build/vue-app/ADMIN_SETUP.md、HTTPS_SETUP.md、PROJECT_CONTENT_RULES.md（如存在）

## 4. 许可证和作者

- 许可证：MIT License（详见仓库 LICENSE）。
- 作者：dongzheyu
- 联系方式：
  - GitHub: https://github.com/dongzheyu

如果你希望我把 README 调整为更短的版本、加入徽章或列出完整依赖/脚本表格，我可以继续修改。