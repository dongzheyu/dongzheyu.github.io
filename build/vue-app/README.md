# JetCPP 网站

## 环境变量配置

在项目根目录创建 `.env.local` 文件：

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_EMAIL=your-email@example.com
```

## GitHub Secrets 配置

GitHub Actions 自动构建需要在仓库 Settings → Secrets and variables → Actions 中添加以下 Secrets：

| Secret 名称 | 说明 | 示例值 |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase 项目 URL | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase 匿名密钥 | `sb_publishable_xxx` |
| `VITE_ADMIN_EMAIL` | 管理员邮箱 | `youmao2023@outlook.com` |

添加后重新触发 workflow 即可生效。

## 数据库初始化

首次部署前，需要在 Supabase SQL Editor 中执行 `database-setup.sql` 创建所有必要的表和策略。

如需全文搜索功能，还需执行 `database-fulltext-search.sql`。

## 第三方 OAuth 登录配置

支持 Google、GitHub、Microsoft 账号快速登录。

### 启用步骤

1. 在 Supabase Dashboard → Authentication → Providers 中启用所需的 Provider
2. 在各平台创建 OAuth 应用并获取 Client ID 和 Secret
3. 将回调 URL 设置为: `https://<your-project-ref>.supabase.co/auth/v1/callback`
4. 在 Supabase 中填入对应的 Client ID 和 Secret
5. 执行 `database-oauth-setup.sql`（如需自动创建用户 profile）

### 平台配置链接

- **Google**: https://console.cloud.google.com/apis/credentials
- **GitHub**: https://github.com/settings/developers
- **Microsoft**: https://portal.azure.com → App registrations

---

## 一键添加项目/博客脚本

## 一键添加项目/博客脚本

此脚本可以帮助您快速创建新的项目或博客文章，并自动更新路由和列表页面。

### 使用方法

#### 添加新项目
```bash
npm run add-project
```

运行后按照提示输入项目信息：
- 项目标题
- 项目简介
- 分类

#### 添加新博客
```bash
npm run add-blog
```

运行后按照提示输入博客信息：
- 博客标题
- 博客简介
- 分类
- 作者
- 发布日期

### 脚本功能

1. 交互式收集用户输入信息
2. 自动生成符合网站样式的 Vue 组件文件
3. 自动更新路由配置 (`src/router/index.ts`)
4. 自动在项目/博客列表中添加新条目
5. 为新项目/博客分配随机颜色主题

### 可编辑字段

创建后，您可以编辑以下字段：

- **标题** - 项目/博客的标题
- **描述/摘要** - 简短描述项目/博客内容
- **分类** - 项目类型或博客分类
- **颜色** - 显示颜色（十六进制格式，自动生成）
- **内容** - 项目详情或博客正文
- **作者** - 博客作者（仅博客）
- **日期** - 发布日期（仅博客）

### 文件位置

- **项目文件** - `src/views/project/`
- **博客文件** - `src/views/blog/`
- **路由配置** - `src/router/index.ts`
- **列表页面** - `src/views/ProjectsView.vue` 和 `src/views/BlogView.vue`

### 注意事项

1. 创建后请检查并修改自动生成的内容
2. 确保标题唯一以避免冲突
3. 可以根据需要调整生成的组件样式
4. 脚本需要在项目根目录运行