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
- **动画**: 全部用弹性/过冲曲线 (cubic-bezier)，GPU 加速 (translate3d)，统一在 base.css
- **风格**: 反主流、有触感、错位布局、左偏标题
- **字体**: html 16px 基准 / body 15px，2K屏 17px / 4K屏 18px 自动放大
- **主题切换**: 深/浅/系统三档循环，localStorage 持久化
- **减少动画**: 导航栏闪电按钮手动开关，data-motion="off" 属性，localStorage 持久化（key: reduced-motion）；启用后彻底关闭所有 animation/transition（仅保留颜色/字重基础反馈），同时移除 backdrop-filter 和噪点纹理合成开销
- **鼠标光点**: 已删除（原跟随鼠标的暖色余烬光晕）

## 页面结构
- HomeView: Hero(CSS Grid 1.2fr/0.8fr非对称) + Features(错位卡片 Grid) + CTA(左文右按钮Flex)
- AboutView: Hero + Values卡片 + Contact链接
- ProjectsView: Hero + 项目卡片网格（项目通过 `<a target="_blank">` 链接到 VitePress）
- BlogView: Hero + 博客文章列表
- EnglishListenView: Qt6版本项目详情页（遗留，未被路由引用）
- CPPGuideView: C++教程博客详情页
- TestsView: 心理评估汇总入口页（/tests），包含16项标准化心理评估
- MbtiView: MBTI 93题评估，16型完整分析（/tests/mbti）
- DepressionView: PHQ-9抑郁症自评，5级结果+求助热线（/tests/depression）
- SunshineDepressionView: 阳光抑郁症15题，4维度分析（/tests/sunshine）
- AnxietyView: GAD-7焦虑症评估，7题（/tests/anxiety）
- BipolarView: MDQ双相情感障碍评估，13题（/tests/bipolar）
- PhobiaView: SPIN+特定恐惧症评估，22题（/tests/phobia）
- PtsdView: PCL-5创伤后应激障碍评估，20题（/tests/ptsd）
- OcdView: OCI-R强迫症评估，18题（/tests/ocd）
- EatingView: EAT-26进食障碍评估，26题（/tests/eating）
- SubstanceView: AUDIT+DAST-10物质使用障碍评估，20题（/tests/substance）
- GamblingView: PGSI赌博障碍评估，9题（/tests/gambling）
- GamingView: IGD-20游戏障碍评估，20题（/tests/gaming）
- AdhdView: ASRS-v1.1 ADHD评估，18题（/tests/adhd）
- AsdView: AQ-10自闭症谱系初筛，10题（/tests/asd）
- BpdView: MSI-BPD边缘型人格障碍评估，10题（/tests/bpd）
- SomaticView: PHQ-15躯体症状障碍评估，15题（/tests/somatic）
- EmergencyView: 紧急求助页面，包含报警电话、急救电话、心理援助热线和自救指南（/emergency）

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
- `src/assets/base.css` — 设计令牌、CSS变量、按钮/卡片/输入框系统、统一 GPU 加速动画关键帧
- `src/assets/main.css` — 布局、导航栏、各页面区域样式
- `src/App.vue` — 导航栏、页脚、主题切换、鼠标光点
- `src/composables/useAnimations.ts` — 动画 composable（useAnimations/useScrollAnimation/useReducedMotion）

## 动画系统（已重构 + Xe核显优化）
- 所有动画关键帧统一在 base.css 中定义，使用 translate3d 强制 GPU 加速
- 统一使用弹性/过冲曲线 cubic-bezier(0.16, 1, 0.3, 1) 和 cubic-bezier(0.34, 1.56, 0.64, 1)
- 支持 prefers-reduced-motion 系统偏好和 data-motion="reduced" 手动开关
- **Xe 核显优化**：移除所有 will-change 滥用、持续背景动画(heroGlow/bgPulse)、3D 效果(perspective/translateZ)、filter:brightness、mix-blend-mode:overlay、双重 box-shadow；backdrop-filter 简化为纯 blur
- 已删除 src/assets/animations.css（内容已合并到 base.css）

## 用户偏好
- 不喜欢蓝紫色系
- 强调"反主流"设计美学
- 要求所有页面配色风格一致
- 导航栏中显示"心理评估"而非"测试"
- 导航栏点击直接跳转到汇总页面，不使用下拉菜单
- 所有测试页面的返回链接文本为"返回评估列表"
- 测试卡片按钮显示"开始评估"而非"开始测试"
- 避免在Vue文件中使用内联样式，应将样式统一放在CSS文件中
- 已有的CSS类：`.text-left`（左对齐），`.freq-instruction`（测试说明），`.hero-content`（首页内容）
- 动画延迟使用类：`.animate-delay-100` 到 `.animate-delay-800`（100ms到800ms）
- 测试页面使用`.freq-instruction`类，已包含padding-left: 5%样式
