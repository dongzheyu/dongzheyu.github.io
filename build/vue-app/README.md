# JetCPP Studio

[![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=white)](https://bun.sh/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white)](https://www.cloudflare-cn.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](https://github.com/dongzheyu/jetcpp-website/pulls)

JetCPP 工作室官方网站。代码重塑世界。

个人作品集、技术博客与心理健康测评工具整合于一体，采用极客终端风格 UI 设计。

---

## 目录

- [特色](#特色)
- [截图预览](#截图预览)
- [快速开始](#快速开始)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [路由系统](#路由系统)
- [设计系统](#设计系统)
- [心理测评](#心理测评)
- [组件库](#组件库)
- [数据库](#数据库)
- [部署](#部署)
- [脚本工具](#脚本工具)
- [许可](#许可)

---

## 特色

### 个人作品集

以终端卡片网格展示项目，支持分类筛选（Web 开发、游戏开发、嵌入式等）。每个项目独立详情页，包含技术栈标签、项目描述、外部链接。

### 技术博客

支持 Markdown 渲染的文章系统，覆盖 C++、Rust、Web 全栈等技术领域。内置阅读进度指示器、标签分类、RSS 订阅。

### 心理测评工具

20 余种标准化心理自评量表，纯前端匿名测评，数据不上传服务器：

- **情绪障碍**：PHQ-9（抑郁）、GAD-7（焦虑）、MDQ（双相）、PHQ-15（躯体化）
- **神经发育**：ASRS（ADHD）、RAADS-14（自闭特质）
- **强迫与创伤**：OCI-R（强迫症）、PCL-5（PTSD）
- **饮食与成瘾**：EAT-26（进食障碍）、AUDIT（酒精使用）、DAST-10（药物滥用）
- **人格类型**：MBTI 职业性格测试
- **其他**：SPIN（社交恐惧）、SDS（季节性情感障碍）、GBQ（赌博行为）、GDT（游戏障碍）

每份测评提供即时分数、维度分析、结果解读与专业求助建议。

### 用户系统

基于 Supabase Auth，支持邮箱密码登录及 Google、GitHub、Microsoft 第三方 OAuth。登录后可保存测评历史、收藏内容。

### 极客 UI

全站终端风格设计：

- 黑色背景 + 等宽字体主调
- 终端窗口框架组件（红/黄/绿三色圆点标题栏）
- `$` 命令行提示符前缀
- 等宽进度条、ASCII 风格装饰元素
- 纯 CSS 设计系统，无 UI 框架依赖

## 截图预览

<!-- TODO: 添加截图 -->

```
┌─────────────────────────────┐
│ ● ● ●   assessment: phq9  │
├─────────────────────────────┤
│ $ cat assessments/phq9.yaml│
│                             │
│ 抑郁症自评测试               │
│ PHQ-9 · 9 题 · 约 5 分钟    │
│                             │
│ [████░░░░] 5/9              │
│                             │
│ ┌ 1  题目文本       ──────┐ │
│ │ [0]完全没有 [1]有几天 ..  │ │
│ └──────────────────────────┘ │
└─────────────────────────────┘
```

## 快速开始

### 环境要求

| 工具 | 版本要求 | 用途 |
|------|----------|------|
| [Bun](https://bun.sh/) | ≥ 1.2 | 包管理 / 运行时 / 构建 |
| [Supabase](https://supabase.com/) | 免费 tier | 数据库 / 鉴权 / 存储 |

### 克隆并安装

```bash
git clone https://github.com/dongzheyu/jetcpp-website.git
cd jetcpp-website
bun install
```

### 环境变量

创建 `.env.local`：

```env
# Supabase 项目配置（必填）
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# 管理员邮箱（用于后台权限判断）
VITE_ADMIN_EMAIL=admin@example.com
```

参考 `.env.example` 获取完整变量列表。

### 启动开发服务器

```bash
bun run dev
```

默认监听 `http://localhost:5173`。支持 HMR 热更新。

### 构建生产版本

```bash
bun run build
```

产物输出到 `dist/` 目录。可使用 `bun run preview` 本地预览。

## 技术栈

### 前端

| 技术 | 用途 |
|------|------|
| Vue 3 (Composition API) | 渐进式 UI 框架，`<script setup>` 语法 |
| TypeScript | 类型安全，接口定义与类型推导 |
| Vue Router 4 | 声明式路由，嵌套布局，导航守卫 |
| Vite 8 | ESM 开发服务器，极速 HMR，Rolldown 构建 |
| Iconify | 按需图标加载（MDI + Simple Icons 两套集合） |
| markdown-it | 博客文章 Markdown 渲染 |
| CSS Custom Properties | 全局设计系统变量，运行时主题定制 |

### 后端

| 技术 | 用途 |
|------|------|
| Supabase Auth | 邮箱 + OAuth 登录，Session 管理 |
| Supabase PostgreSQL | 用户表、测评记录、收藏、评论 |
| RLS (Row Level Security) | 行级安全策略，数据权限控制 |

### DevOps

| 工具 | 用途 |
|------|------|
| Bun | 包管理器、JS 运行时、脚本执行 |
| Cloudflare Pages | 静态部署，全球 CDN |
| GitHub Actions | CI/CD 自动构建与部署 |
| Wrangler | Cloudflare Pages 部署 CLI |

## 项目结构

```
├── public/                  # 静态资源（图标、favicon）
├── scripts/                 # 自动化脚本
│   ├── add-content.js       # 交互式添加项目/博客
│   ├── clean-public.js      # 构建前清理
│   ├── deploy.js            # Cloudflare 部署
│   └── generate-rss.js      # RSS 生成
├── src/
│   ├── assets/
│   │   └── base.css         # 设计系统变量与全局样式（650+ 行）
│   ├── components/
│   │   ├── AuthForm.vue           # 登录/注册表单
│   │   ├── CommentsSection.vue    # 评论组件
│   │   ├── FavoritesList.vue      # 收藏列表
│   │   ├── HistoryList.vue        # 历史记录
│   │   ├── MarkdownRenderer.vue   # Markdown 渲染
│   │   ├── ReadingProgress.vue    # 阅读进度条
│   │   ├── RssSubscribe.vue       # RSS 订阅
│   │   ├── SearchModal.vue        # 搜索弹窗
│   │   ├── TagCloud.vue           # 标签云
│   │   ├── TestHistoryChart.vue   # 测评历史图表
│   │   └── TestTemplate.vue       # 测评通用模板
│   ├── composables/
│   │   ├── useAuth.ts        # 鉴权逻辑
│   │   ├── useNoiseOverlay.ts# 噪点覆盖层
│   │   └── useStore.ts       # 收藏/历史/进度状态
│   ├── router/
│   │   └── index.ts          # 路由配置（30+ 路由）
│   ├── supabase/
│   │   └── client.ts         # Supabase 客户端单例
│   ├── utils/
│   │   └── helpers.ts        # 通用工具函数
│   ├── views/
│   │   ├── HomeView.vue      # 首页
│   │   ├── AboutView.vue     # 关于页
│   │   ├── ProjectsView.vue  # 项目列表
│   │   ├── BlogView.vue      # 博客列表
│   │   ├── TestsView.vue     # 测评中心
│   │   ├── AdminView.vue     # 管理后台
│   │   ├── ProfileView.vue   # 个人主页
│   │   ├── PrivacyView.vue   # 隐私政策
│   │   ├── TermsView.vue     # 服务条款
│   │   ├── EmergencyView.vue # 危机求助
│   │   ├── blog/             # 博客文章页
│   │   ├── project/          # 项目详情页
│   │   └── *View.vue         # 各测评页面
│   ├── App.vue               # 根组件（导航 + 页脚）
│   └── main.ts               # 入口文件
├── database-setup.sql        # 数据库初始化
├── database-oauth-setup.sql  # OAuth 用户支持
├── database-fulltext-search.sql # 全文搜索
├── vite.config.ts            # Vite 配置
├── tsconfig.json             # TypeScript 配置
├── wrangler.toml             # Cloudflare 配置
└── package.json              # 依赖与脚本
```

## 路由系统

所有路由定义在 `src/router/index.ts`：

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | HomeView | 首页 |
| `/projects` | ProjectsView | 项目列表 |
| `/project/:id` | ProjectDetailView | 项目详情 |
| `/blog` | BlogView | 博客列表 |
| `/blog/:id` | BlogPostView | 博客文章 |
| `/tests` | TestsView | 测评中心 |
| `/tests/:id` | 各测评视图 | 具体测评 |
| `/about` | AboutView | 关于 |
| `/auth` | AuthTestView | 登录/注册 |
| `/profile` | ProfileView | 个人主页 |
| `/admin` | AdminView | 管理后台 |
| `/emergency` | EmergencyView | 危机求助 |
| `/privacy` | PrivacyView | 隐私 |
| `/terms` | TermsView | 条款 |
| `/:catchAll(.*)` | NotFoundView | 404 |

## 设计系统

定义在 `src/assets/base.css`，所有可复用变量：

### 颜色

```css
--color-bg: #0a0a0a;           /* 主背景 */
--color-bg-soft: #111;         /* 次级背景 */
--color-text: #e0e0e0;         /* 主文字 */
--color-text-secondary: #888;  /* 次要文字 */
--color-border: rgba(255,255,255,0.1);  /* 边框 */
```

### 间距与圆角

```css
--radius-sm: 2px;   /* 小圆角（按钮、输入框） */
--radius-md: 4px;   /* 中圆角（卡片） */
--space-xs: 4px;    /* 极小间距 */
--space-sm: 8px;    /* 小间距 */
--space-md: 16px;   /* 中间距 */
--space-lg: 24px;   /* 大间距 */
--space-xl: 32px;   /* 极大间距 */
```

### 字体

```css
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
--font-sans: 'Inter', system-ui, sans-serif;
--font-size-xs: 0.85rem;  /* 小号 */
--font-size-sm: 0.95rem;  /* 中号 */
--font-size-base: 1rem;   /* 标准 */
```

### 动画

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

## 心理测评

### 架构

所有测评页面分为两类：

**Group A — 通用模板（12 页）**

共用 `TestTemplate` 组件，仅传入题目数据、选项列表、计算结果函数和配置参数。模板自动处理：

- 进度保存与恢复（localStorage）
- 阅读进度条
- 收藏功能
- 答案回顾
- 维度分析（多子量表）
- 结果解读与建议
- 历史记录入库

**Group B — 独立页面（4 页）**

因数据结构或交互特殊，各自独立实现（EatingView、OcdView、SubstanceView、MbtiView）。布局风格已统一为终端窗口样式。

### 测评列表

| 测评 | ID | 题数 | 选项 |
|------|----|------|------|
| 抑郁症 (PHQ-9) | `phq9` | 9 | 0–3 四级 |
| 焦虑症 (GAD-7) | `gad7` | 7 | 0–3 四级 |
| 强迫症 (OCI-R) | `oci-r` | 18 | 0–4 五级 |
| 进食障碍 (EAT-26) | `eat-26` | 26 | 0–3 四级 |
| ADHD (ASRS) | `asrs` | 18 | 0–4 五级 |
| 双相情感障碍 (MDQ) | `mdq` | 13 | 0–3 四级 |
| 边缘型人格 (BPDSI) | `bpdsi` | 15 | 0–4 五级 |
| PTSD (PCL-5) | `pcl5` | 20 | 0–4 五级 |
| 恐惧症 (SPIN) | `spin` | 22 | 0–4 五级 |
| 自闭特质 (RAADS-14) | `raads14` | 14 | 0–3 四级 |
| 赌博障碍 (GBQ) | `gbq` | 10 | 0–3 四级 |
| 游戏障碍 (GDT) | `gdt` | 10 | 0–3 四级 |
| 躯体化 (PHQ-15) | `phq15` | 15 | 0–2 三级 |
| 季节性情感障碍 (SDS) | `sds` | 8 | 0–3 四级 |
| 物质使用障碍 (AUDIT+DAST) | `audit-dast` | 6 | 变长 |
| MBTI 人格测试 | `mbti` | 60 | 二选一 |

## 组件库

### 通用组件

| 组件 | 用途 |
|------|------|
| `TestTemplate` | 测评通用外壳（进度、问答、结果、分析） |
| `AuthForm` | 登录/注册/密码重置表单 |
| `CommentsSection` | 文章评论列表与发布 |
| `ReadingProgress` | 阅读进度指示条 |
| `MarkdownRenderer` | Markdown → HTML 渲染 |
| `SearchModal` | 全局搜索弹窗 |
| `TagCloud` | 分类标签云 |
| `RssSubscribe` | RSS 订阅按钮 |
| `HistoryList` | 用户历史记录 |
| `FavoritesList` | 用户收藏列表 |
| `TestHistoryChart` | 测评历史柱状图 |

### CSS 类名约定

```
.card-geek    — 终端风格卡片
.btn-geek     — 终端风格按钮
.term-window  — 终端窗口框架
.term-bar     — 窗口标题栏
.term-body    — 窗口内容区
.term-cmd     — 命令提示行
.q-block      — 问题块
.opt          — 选项按钮
.r-card       — 结果卡片
.prog-bar     — 进度条
```

## 数据库

### 表结构

```sql
-- 用户资料
profiles (id, username, avatar_url, bio, created_at)

-- 测评历史
test_history (id, user_id, test_id, test_title, score, max_score, level, answers, created_at)

-- 收藏
favorites (id, user_id, item_id, item_type, created_at)

-- 博客评论
comments (id, post_id, user_id, content, created_at)

-- 博客文章
posts (id, title, slug, content, category, tags, author, created_at)

-- 项目
projects (id, title, description, category, tech_stack, url, created_at)
```

所有表均启用 Supabase RLS 策略，用户仅能读写自己的数据。

### SQL 文件

| 文件 | 说明 |
|------|------|
| `database-setup.sql` | 完整建表 + RLS 策略 |
| `database-oauth-setup.sql` | OAuth 回调自动创建 profile |
| `database-fulltext-search.sql` | PostgreSQL 全文搜索索引 |

## 部署

### Cloudflare Pages

项目配置了 GitHub Actions 自动部署。推送 `main` 分支触发：

```yaml
# .github/workflows/deploy.yml
- bun install
- bun run build
- bun run deploy  # wrangler pages publish
```

### Secrets 配置

在 GitHub 仓库 Settings → Secrets and variables → Actions 中添加：

| Secret | 说明 |
|--------|------|
| `VITE_SUPABASE_URL` | Supabase 项目 URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase 匿名密钥 |
| `VITE_ADMIN_EMAIL` | 管理员邮箱 |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API 令牌 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID |

### 手动部署

```bash
# 构建
bun run build

# 部署到 Cloudflare Pages
npx wrangler pages deploy dist --project-name jetcpp-website
```

## 脚本工具

项目提供 `scripts/` 目录下的自动化脚本：

### 添加内容

```bash
# 交互式创建新项目页面
bun run add-project

# 交互式创建新博客文章
bun run add-blog
```

自动完成：Vue 组件生成 → 路由注册 → 列表页条目插入。

### RSS 生成

```bash
bun run generate-rss
```

扫描博客文章，生成 `public/rss.xml`。

### 构建前清理

```bash
bun scripts/clean-public.js
```

构建前清理 `public/` 中的旧资源。

## 许可

MIT &copy; 2026 JetCPP Studio

本软件按"原样"提供，不提供任何明示或暗示的保证。作者不对因使用本软件而产生的任何损害承担责任。

**作者**: [dongzheyu](https://github.com/dongzheyu)

---

<p align="center">
  <sub>由 <a href="https://dash.domain.digitalplat.org/signup?ref=TZRrkCdFjm">DigitalPlat Domains</a>、<a href="https://www.cloudflare-cn.com/">Cloudflare</a>、<a href="https://vuejs.org/">Vue</a>、<a href="https://bun.sh/">Bun</a>、<a href="https://github.com/">GitHub</a> 强力驱动</sub>
</p>
