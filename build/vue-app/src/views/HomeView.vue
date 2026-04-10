<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useAnimations'

const features = ref([
  {
    icon: 'bi bi-controller',
    title: 'Minecraft 工具开发',
    description: '专注于我的世界相关工具开发，包括启动器管理、整合包优化、基岩版操作等，让游戏体验更流畅。',
    color: '#ff8c42'
  },
  {
    icon: 'bi bi-wrench-adjustable-circle',
    title: '实用系统工具',
    description: '开发各类实用的系统工具，如编译器安装器、环境配置工具等，帮助开发者和玩家简化操作。',
    color: '#52b788'
  },
  {
    icon: 'bi bi-journal-richtext',
    title: '技术博客分享',
    description: '定期更新技术文章，分享C++编程经验、项目开发心得和实用工具使用技巧。',
    color: '#f48c06'
  },
  {
    icon: 'bi bi-globe2',
    title: '网站与文档',
    description: '创建个人网站和项目文档，分享技术成果，帮助更多人学习和使用开源项目。',
    color: '#e85d04'
  },
  {
    icon: 'bi bi-mortarboard-fill',
    title: '教育编程',
    description: '开发教育类编程工具和练习程序，帮助初学者更好地学习编程和英语等技能。',
    color: '#ffba08'
  },
  {
    icon: 'bi bi-rocket-takeoff-fill',
    title: '持续学习',
    description: '不断学习新技术，从用户需求出发，开发更实用、更高效的工具和应用。',
    color: '#ef233c'
  }
])

const isVisible = ref(false)
const { observe } = useScrollAnimation()

onMounted(() => {
  // Hero 区域立即显示
  setTimeout(() => { isVisible.value = true }, 80)

  // 滚动触发动画
  requestAnimationFrame(() => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observe(el as HTMLElement)
    })
  })
})
</script>

<template>
  <!-- Hero Section — 真正的左重非对称 -->
  <section class="hero-section position-relative overflow-hidden">
    <div class="hero-bg-animation"></div>
    <div class="container-fluid position-relative z-2">
      <!-- 使用 CSS Grid 实现真正的非对称 -->
      <div class="hero-grid">
        <!-- 左侧：主要内容，占据 60% -->
        <div class="hero-main">
          <div class="logo-container mb-5" :class="{ 'animate-fade-in': isVisible }">
            <img src="/logo.png" alt="dongle Logo" class="hero-logo">
          </div>

          <h1 class="hero-title mb-4 animate-slide-up" :class="{ 'visible': isVisible }">
            你好，我是<br>
            <span class="text-gradient">dongle</span>
          </h1>

          <p class="hero-subtitle mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.15s">
            代码重塑世界 · 创新驱动未来
          </p>

          <p class="hero-desc mb-5 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.3s">
            一个热爱编程的小学生，专注于创造实用的软件工具，让技术更贴近生活。
          </p>

          <div class="hero-buttons animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.45s">
            <router-link to="/about" class="btn btn-light btn-lg me-3">
              <i class="bi bi-person me-2"></i>关于我
            </router-link>
            <router-link to="/projects" class="btn btn-outline-light btn-lg me-3">
              <i class="bi bi-folder2-open me-2"></i>项目
            </router-link>
            <router-link to="/blog" class="btn btn-outline-light btn-lg">
              <i class="bi bi-journal-text me-2"></i>博客
            </router-link>
          </div>
        </div>

        <!-- 右侧：装饰元素，向右偏移而非居中 -->
        <div class="hero-decoration" :class="{ 'visible': isVisible }" style="opacity:0; animation: fadeIn 0.8s 0.6s cubic-bezier(0.16,1,0.3,1) forwards;">
          <div class="floating-elements">
            <div class="floating-element" style="--duration: 5s;">
              <i class="bi bi-code-slash fs-1"></i>
            </div>
            <div class="floating-element" style="--duration: 6s;">
              <i class="bi bi-gear-wide-connected fs-1"></i>
            </div>
            <div class="floating-element" style="--duration: 5.5s;">
              <i class="bi bi-lightning-charge fs-1"></i>
            </div>
            <div class="floating-element" style="--duration: 7s;">
              <i class="bi bi-cpu fs-1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部暖色渐变过渡 -->
    <div class="hero-fade"></div>
  </section>

  <!-- Features Section — 错位卡片网格 -->
  <section class="features-section">
    <div class="container-fluid">
      <!-- 标题左偏，符合"反主流" -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">我的专长</h2>
        <p class="section-desc">
          专注于技术创新，创造实用工具，让技术更贴近生活
        </p>
      </div>

      <!-- 使用 Bootstrap row 结构，保持与 main.css 样式兼容 -->
      <div class="row">
        <div class="col-md-6 col-lg-4" v-for="(feature, index) in features" :key="index">
          <div class="feature-card border-0 shadow-sm animate-on-scroll"
               :style="`animation-delay: ${index * 0.08}s`">
            <div class="card-body p-4">
              <div class="feature-icon mb-3" :style="`background-color: ${feature.color}18; color: ${feature.color}`">
                <i :class="feature.icon + ' fs-3'"></i>
              </div>
              <h5 class="card-title fw-bold mb-3">{{ feature.title }}</h5>
              <p class="card-text text-muted">{{ feature.description }}</p>
              <div class="feature-arrow">
                <i class="bi bi-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section — 左文右按钮，非居中 -->
  <section class="cta-section py-5 text-white">
    <div class="container-fluid">
      <div class="cta-content">
        <div class="cta-text">
          <h2 class="fw-bold mb-3 cta-title animate-on-scroll">
            准备好探索编程的<br>无限可能了吗？
          </h2>
          <p class="lead text-white-50 animate-on-scroll" style="animation-delay: 0.1s">
            欢迎访问我的项目，一起感受代码创造的乐趣
          </p>
        </div>
        <div class="cta-action">
          <a href="https://github.com/dongzheyu" target="_blank"
             class="btn btn-light btn-lg animate-on-scroll" style="animation-delay: 0.2s">
            <i class="bi bi-github me-2"></i>访问 GitHub
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hero 区域 — 真正的非对称 Grid */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 80px 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: center;
  width: 100%;
}

.hero-main {
  padding-left: 4%;
}

.hero-decoration {
  position: relative;
  height: 400px;
}

/* Hero 标题 — 大而有力 */
.hero-title {
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--color-primary);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.hero-desc {
  font-size: 1rem;
  color: var(--color-text-secondary);
  max-width: 480px;
  line-height: 1.7;
}

/* Hero 底部渐变过渡 */
.hero-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent, var(--color-bg));
  pointer-events: none;
}

/* Features 区域 */
.features-section {
  padding: var(--section-gap) 0;
}

.section-header {
  margin-bottom: 48px;
  padding-left: 5%;
}

.section-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 48px;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

.section-desc {
  color: var(--color-text-secondary);
  font-size: 1rem;
  margin-top: 16px;
  max-width: 500px;
}

/* 奇数行向下错位，偶数行向上错位 */
/* 注意：这些样式已在 main.css 中定义，此处仅作备份 */
/* .features-section .row > :nth-child(2),
.features-section .row > :nth-child(5) {
  transform: translateY(32px);
} */

/* CTA 区域 */
.cta-section {
  background: var(--gradient-ember);
}

.cta-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  gap: 48px;
}

.cta-title {
  font-size: clamp(1.6rem, 3.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.cta-action {
  flex-shrink: 0;
}

/* 滚动触发动画初始状态（轻量版 — 移除 will-change） */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 450ms var(--ease-out-expo),
    transform 450ms var(--ease-out-expo);
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 响应式 */
@media (max-width: 991.98px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .hero-decoration {
    display: none;
  }

  .hero-main {
    padding-left: 0;
  }

  .cta-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }
}
</style>