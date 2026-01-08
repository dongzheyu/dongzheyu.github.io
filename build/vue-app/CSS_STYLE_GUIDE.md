# CSS 样式指南

## 概述

本项目使用现代化的深色主题CSS系统，包含丰富的渐变效果、动画和响应式设计。所有样式已从Vue组件中分离，集中管理在 `src/assets/` 目录下的CSS文件中。

## 文件结构

- `src/assets/base.css` - 基础变量、动画和工具类
- `src/assets/main.css` - 页面和组件样式（整合了所有Vue组件的样式）

## 目录

1. [CSS 变量系统](#css-变量系统)
2. [动画系统](#动画系统)
3. [工具类](#工具类)
4. [布局组件](#布局组件)
5. [页面样式](#页面样式)
6. [内容样式](#内容样式)
7. [响应式设计](#响应式设计)
8. [使用示例](#使用示例)
9. [最佳实践](#最佳实践)

## CSS 变量系统

所有主题变量定义在 `:root` 中，通过CSS自定义属性实现。

### 渐变系统

```css
/* 基础渐变色 */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-success: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
--gradient-warning: linear-gradient(135deg, #f2994a 0%, #f2c94c 100%);
--gradient-dark: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
--gradient-light: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);

/* 现代化渐变配色 */
--gradient-cosmic: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
--gradient-ocean: linear-gradient(135deg, #0ba360 0%, #3cba92 50%, #30cfd0 100%);
--gradient-sunset: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
--gradient-aurora: linear-gradient(135deg, #00c6ff 0%, #0072ff 50%, #00c6ff 100%);
--gradient-midnight: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%);
--gradient-rainbow: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff);
```

### 颜色系统

```css
/* 背景颜色 */
--color-bg: #0a0a14;
--color-bg-soft: #1e293b;
--color-bg-mute: #334155;
--color-bg-card: #1e293b;

/* 文字颜色 */
--color-text: #ffffff;
--color-text-secondary: #e2e8f0;
--color-text-muted: #cbd5e1;

/* 边框颜色 */
--color-border: #334155;
--color-border-hover: #475569;

/* 主题颜色 */
--color-primary: #818cf8;
--color-primary-light: #a5b4fc;
--color-primary-dark: #6366f1;

/* 功能颜色 */
--color-accent: #f5576c;
--color-success: #10b981;
--color-warning: #f59e0b;
```

### 阴影系统

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
--shadow-glow: 0 0 30px rgba(129, 140, 248, 0.4);
```

### 动画时长

```css
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 350ms ease;
```

### 圆角系统

```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

### 字体系统

```css
--font-sans: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB',
  'WenQuanYi Micro Hei', Inter, -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
  'Droid Sans', 'Helvetica Neue', sans-serif;

--font-mono: 'CustomFont', 'JetBrains Mono', 'Cascadia Code',
  'Source Code Pro', ui-monospace, Menlo, Consolas, monospace;
```

### 间距

```css
--section-gap: 120px;
--container-padding: 24px;
```

## 动画系统

### 关键帧动画

```css
@keyframes fadeIn      /* 淡入 */
@keyframes slideUp     /* 向上滑动 */
@keyframes scaleIn     /* 缩放进入 */
@keyframes float       /* 浮动效果 */
@keyframes pulse       /* 脉冲效果 */
@keyframes bgPulse     /* 背景脉冲 */
@keyframes heroGlow    /* 英雄区域发光 */
@keyframes rotate      /* 旋转 */
@keyframes bgAnimation /* 背景动画 */
@keyframes orbit-spinner-animation /* 轨道旋转 */
```

### 动画工具类

```css
.animate-fade-in      /* 淡入动画 */
.animate-slide-up     /* 向上滑动动画 */
.animate-scale-in     /* 缩放进入动画 */
.animate-float        /* 浮动动画 */
.animate-pulse        /* 脉冲动画 */

/* 延迟类 */
.animate-delay-100    /* 100ms延迟 */
.animate-delay-200    /* 200ms延迟 */
.animate-delay-300    /* 300ms延迟 */
.animate-delay-400    /* 400ms延迟 */
.animate-delay-500    /* 500ms延迟 */
```

## 工具类

### 字体切换

```css
.font-jetbrains   /* JetBrains Mono 字体 */
.font-pingfang    /* PingFang SC 字体 */
```

### 文本渐变

```css
.text-gradient    /* 渐变文字效果 */
```

### 阴影效果

```css
.shadow-glow      /* 发光阴影效果 */
```

### 鼠标跟随光点

```css
.cursor-dot       /* 鼠标跟随光点 */
.cursor-dot.hover /* 悬停状态 */
```

## 布局组件

### 应用布局

```css
#app              /* 主应用容器 */
.blog-content-app /* 博客内容容器 */
main              /* 主内容区域 */
```

### 导航栏

```css
.navbar                    /* 导航栏容器 */
.navbar-brand              /* 品牌标志 */
.navbar-brand img          /* 品牌图片 */
.nav-link                  /* 导航链接 */
.nav-link::after          /* 导航链接下划线 */
.nav-link:hover           /* 悬停状态 */
.nav-link.router-link-active /* 活动链接 */
```

### 下拉菜单

```css
.dropdown-menu            /* 下拉菜单容器 */
.dropdown-item            /* 下拉菜单项 */
.dropdown-item:hover      /* 悬停状态 */
.dropdown-item i.bi-check /* 勾选图标 */
```

### 按钮样式

```css
.navbar .btn              /* 导航栏按钮 */
.navbar .btn-outline-light /* 浅色轮廓按钮 */
.navbar .btn-warning      /* 警告按钮 */
.hero-buttons .btn        /* 英雄区域按钮 */
.hero-buttons .btn-light  /* 浅色按钮 */
.hero-buttons .btn-outline-light /* 英雄区域轮廓按钮 */
.cta-section .btn-light   /* CTA区域按钮 */
.btn-animate              /* 带动画按钮 */
```

### 页脚

```css
footer                    /* 页脚容器 */
footer h5                 /* 页脚标题 */
footer p                  /* 页脚段落 */
footer a                  /* 页脚链接 */
footer a:hover            /* 链接悬停 */
footer .bi                /* 页脚图标 */
footer a:hover .bi        /* 图标悬停效果 */
```

## 页面样式

### AboutView 页面

```css
.about-page               /* 关于页面容器 */
.about-hero               /* 英雄区域 */
.about-hero::before       /* 英雄区域背景 */
.value-card               /* 价值观卡片 */
.value-icon               /* 价值观图标 */
.value-card:hover         /* 卡片悬停效果 */
.values-section           /* 价值观区域 */
.contact-section          /* 联系区域 */
.contact-section::before  /* 联系区域背景 */
.contact-links .btn       /* 联系链接按钮 */
```

### HomeView 页面

```css
.hero-section             /* 英雄区域 */
.hero-section::before     /* 英雄区域背景 */
.hero-bg-animation        /* 背景动画 */
.hero-logo                /* 英雄区域Logo */
.hero-illustration        /* 英雄区域插画 */
.floating-elements        /* 浮动元素容器 */
.floating-element         /* 浮动元素 */
.features-section         /* 功能区域 */
.feature-card             /* 功能卡片 */
.feature-card::before     /* 卡片上边线 */
.feature-icon             /* 功能图标 */
.feature-arrow            /* 功能箭头 */
.cta-section              /* CTA区域 */
.cta-section::before      /* CTA背景 */
```

### ProjectsView 页面

```css
.projects-page            /* 项目页面容器 */
.projects-hero            /* 英雄区域 */
.projects-hero::before    /* 英雄区域背景 */
.projects-section         /* 项目展示区域 */
.project-card             /* 项目卡片 */
.project-card::before     /* 卡片上边线 */
.project-icon             /* 项目图标 */
.badge                    /* 徽章样式 */
```

### BlogView 页面

```css
.blog-page                /* 博客页面容器 */
.blog-hero                /* 英雄区域 */
.blog-hero::before        /* 英雄区域背景 */
.blog-post                /* 博客文章卡片 */
.blog-category-badge      /* 分类徽章 */
.blog-meta i              /* 元信息图标 */
.blog-footer              /* 博客页脚 */
```

### 重定向页面

```css
.redirect-page            /* 重定向页面 */
.redirect-animation       /* 重定向动画容器 */
.orbit-spinner            /* 轨道旋转器 */
.orbit-spinner .orbit     /* 轨道 */
```

## 内容样式

### 项目详情 & 博客内容

```css
.project-detail           /* 项目详情容器 */
.blog-post                /* 博客文章内容 */
.project-content          /* 项目内容区域 */
.blog-content             /* 博客内容区域 */

/* 标题样式 */
.project-content h2, .blog-content h2
.project-content h3, .blog-content h3
.project-content h4, .blog-content h4

/* 代码块样式 */
.project-content pre, .blog-content pre
.project-content code, .blog-content code

/* 列表样式 */
.project-content ul, .project-content ol
.blog-content ul, .blog-content ol
.project-content li, .blog-content li
```

### 组件样式

```css
/* WelcomeItem 组件 */
.item
.details
.item i
.item h3

/* HelloWorld 组件 */
.greetings h1
.greetings h3
```

## 响应式设计

### 断点系统

```css
/* 大屏幕 (≥992px) */
@media (min-width: 1024px)

/* 平板 (≤991.98px) */
@media (max-width: 991.98px)

/* 手机 (≤768px) */
@media (max-width: 768px)
```

### 响应式类

```css
/* 导航栏响应式 */
.navbar-collapse
.navbar-nav
.nav-item

/* 内容响应式 */
.blog-content-app (padding调整)
main (padding调整)

/* 组件响应式 */
.hero-illustration (高度调整)
.contact-links (方向调整)
.hero-buttons .btn (宽度调整)
```

## 使用示例

### 在Vue组件中使用CSS类

```vue
<template>
  <!-- 使用卡片样式 -->
  <div class="value-card animate-fade-in">
    <div class="value-icon">
      <i class="bi bi-code-slash"></i>
    </div>
    <h4 class="text-gradient">优雅代码</h4>
    <p>追求简洁、可读、高效的代码实现</p>
  </div>

  <!-- 使用按钮样式 -->
  <button class="btn btn-primary btn-animate">
    <i class="bi bi-download"></i>
    立即下载
  </button>

  <!-- 使用动画类 -->
  <div class="animate-slide-up animate-delay-200">
    延迟200ms的向上滑动动画
  </div>
</template>
```

### 使用CSS变量

```vue
<template>
  <div class="custom-element" :style="customStyle">
    自定义样式元素
  </div>
</template>

<script setup>
const customStyle = {
  background: 'var(--gradient-ocean)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-xl)'
}
</script>
```

### 创建新组件样式

当需要为新的Vue组件添加样式时，建议：

1. **检查现有样式**：先查看是否有可复用的样式类
2. **使用变量**：尽量使用CSS变量保持一致性
3. **添加注释**：在main.css中添加清晰的注释

示例：
```css
/* ========== NewComponent 样式 ========== */
.new-component {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--container-padding);
  transition: all var(--transition-base);
}

.new-component:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

## 最佳实践

### 1. 样式复用

- 优先使用现有CSS类和变量
- 避免创建功能重复的样式
- 通过组合现有类实现新效果

### 2. 命名规范

- 使用BEM-like命名：`.block__element--modifier`
- 页面样式使用前缀：`.about-`、`.projects-`
- 组件样式使用描述性名称

### 3. 响应式设计

- 使用现有的断点系统
- 移动优先：先写基础样式，再添加媒体查询
- 测试不同屏幕尺寸

### 4. 性能优化

- 减少不必要的动画
- 使用transform和opacity进行动画（性能更好）
- 避免过深的CSS选择器嵌套

### 5. 维护性

- 保持样式与组件分离
- 定期检查并合并重复样式
- 使用注释标记样式用途和依赖关系

### 6. 深色主题适配

- 所有颜色使用CSS变量
- 确保文字与背景有足够对比度
- 测试不同亮度环境下的显示效果

## 开发工具

### 浏览器开发者工具

1. **检查元素**：查看应用了哪些CSS类
2. **计算样式**：查看最终应用的样式值
3. **颜色选择器**：检查颜色对比度
4. **响应式模式**：测试不同屏幕尺寸

### VS Code 插件推荐

- CSS Peek：快速查看CSS定义
- Auto Rename Tag：自动重命名配对标签
- Color Highlight：颜色值高亮显示
- CSS Navigation：快速跳转到CSS定义

---

*最后更新：2026年1月8日*
*文档版本：1.0.0*