# MEMORY.md — 项目长期记忆

## 项目概况
- **类型**: Vue 3 + TypeScript + Vite + Bootstrap 5 个人网站
- **所有者**: dongle (小学生开发者)
- **部署**: GitHub Pages (dongzheyu.github.io)
- **路径**: d:\WEB\dongzheyu.github.io\build\vue-app

## 设计系统 — 炽炭主题 (Ember Charcoal)
- **配色**: 深炭灰 + 琥珀橙 + 暖米色
- **深色**: `#0f0e0c` 底 + `#ff8c42` 主色
- **浅色**: `#faf7f2` 底 + `#e85d04` 主色
- **禁止**: 蓝紫渐变、紫色/靛蓝色、居中对齐、emoji图标、ease-in-out
- **背景**: 必须有噪点纹理 + 暖色径向渐变
- **动画**: 全部用弹性/过冲曲线 (cubic-bezier过冲)
- **风格**: 反主流、有触感、错位布局、左偏标题
- **主题切换**: 深/浅/系统三档循环，localStorage 持久化
- **减少动画**: 导航栏闪电按钮手动开关，data-motion="reduced" 属性，localStorage 持久化（key: reduced-motion）
- **鼠标光点**: 已删除（原跟随鼠标的暖色余烬光晕）

## 页面结构
- HomeView: Hero(左重右轻) + Features(错位卡片) + CTA(左文右按钮)
- AboutView: Hero + Values卡片 + Contact链接
- ProjectsView: Hero + 项目卡片网格（项目通过 `<a target="_blank">` 链接到 VitePress）
- BlogView: Hero + 博客文章列表
- EnglishListenView: Qt6版本项目详情页（遗留，未被路由引用）
- CPPGuideView: C++教程博客详情页
- TestsView: 心理测试汇总入口页（/tests）
- MbtiView: MBTI 93题测试，16型完整分析（/tests/mbti）
- DepressionView: PHQ-9抑郁症自评，5级结果+求助热线（/tests/depression）
- SunshineDepressionView: 阳光抑郁症15题，4维度分析（/tests/sunshine）

## VitePress 集成架构
- **项目文档**: `project/` 目录，base=`/project/`，构建到 `public/project/`
- **博客文档**: `docs/` 目录，base=`/blog/`，构建到 `public/blog/`
- VitePress 与 Vue 独立构建，通过 `<a target="_blank">` 链接
- 项目列表页 ProjectsView 中 link 字段指向 `/project/xxx.html`
- 添加新项目：创建 .md → 更新 config.ts sidebar → 更新 index.md → 更新 ProjectsView → `npm run project:build`

## 已有项目
- English-Listen (Qt6): `project/english-listen.md`，color=#52b788
- English Listen WinUI: `project/english-listen-winui.md`，color=#f48c06，C#+C++混合，WinUI3

## 文件结构
- `src/assets/base.css` — 设计令牌、CSS变量、按钮/卡片/输入框系统
- `src/assets/main.css` — 布局、导航栏、各页面区域样式
- `src/assets/animations.css` — 动画关键帧和动画工具类
- `src/App.vue` — 导航栏、页脚、主题切换、鼠标光点
- `src/composables/useAnimations.ts` — 动画 composable

## 用户偏好
- 不喜欢蓝紫色系
- 强调"反主流"设计美学
- 要求所有页面配色风格一致
