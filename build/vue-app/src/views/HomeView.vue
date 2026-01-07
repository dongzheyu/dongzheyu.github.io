<script setup lang="ts">
import { ref, onMounted } from 'vue'

const features = ref([
  {
    icon: '🎮',
    title: 'Minecraft 工具开发',
    description: '专注于我的世界相关工具开发，包括启动器管理、整合包优化、基岩版操作等，让游戏体验更流畅。',
    color: '#FF6B6B'
  },
  {
    icon: '🛠️',
    title: '实用系统工具',
    description: '开发各类实用的系统工具，如编译器安装器、环境配置工具等，帮助开发者和玩家简化操作。',
    color: '#4ECDC4'
  },
  {
    icon: '📝',
    title: '技术博客分享',
    description: '定期更新技术文章，分享C++编程经验、项目开发心得和实用工具使用技巧。',
    color: '#45B7D1'
  },
  {
    icon: '🌐',
    title: '网站与文档',
    description: '创建个人网站和项目文档，分享技术成果，帮助更多人学习和使用开源项目。',
    color: '#96CEB4'
  },
  {
    icon: '📚',
    title: '教育编程',
    description: '开发教育类编程工具和练习程序，帮助初学者更好地学习编程和英语等技能。',
    color: '#FFEAA7'
  },
  {
    icon: '🚀',
    title: '持续学习',
    description: '不断学习新技术，从用户需求出发，开发更实用、更高效的工具和应用。',
    color: '#DDA0DD'
  }
])

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <!-- Hero Section -->
  <section class="hero-section position-relative overflow-hidden">
    <div class="hero-bg-animation"></div>
    <div class="container position-relative z-2">
      <div class="row align-items-center min-vh-100">
        <div class="col-lg-6">
          <div class="hero-content">
            <div class="logo-container mb-4" :class="{ 'animate-fade-in': isVisible }">
              <img src="/logo.png" alt="dongle Logo" class="hero-logo">
            </div>
            <h1 class="display-2 fw-bold mb-4 text-white animate-slide-up" :class="{ 'visible': isVisible }">
              你好，我是 dongle
            </h1>
            <p class="lead text-white-50 mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.2s">
              代码重塑世界 · 创新驱动未来
            </p>
            <p class="text-white-50 mb-5 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.4s">
              一个热爱编程的小学生，专注于创造实用的软件工具，让技术更贴近生活
            </p>
            <div class="hero-buttons animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.6s">
              <router-link to="/about" class="btn btn-light btn-lg me-3 px-4 py-3">
                <i class="bi bi-person me-2"></i>关于我
              </router-link>
              <router-link to="/projects" class="btn btn-outline-light btn-lg me-3 px-4 py-3">
                <i class="bi bi-folder me-2"></i>查看项目
              </router-link>
              <router-link to="/blog" class="btn btn-outline-light btn-lg px-4 py-3">
                <i class="bi bi-journal-text me-2"></i>博客
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="hero-illustration animate-float" :class="{ 'visible': isVisible }" style="animation-delay: 0.8s">
            <div class="floating-elements">
              <div class="floating-element" style="--delay: 0s; --duration: 3s;">
                <i class="bi bi-code-slash fs-1 text-white-25"></i>
              </div>
              <div class="floating-element" style="--delay: 0.5s; --duration: 4s;">
                <i class="bi bi-gear fs-1 text-white-25"></i>
              </div>
              <div class="floating-element" style="--delay: 1s; --duration: 3.5s;">
                <i class="bi bi-lightning fs-1 text-white-25"></i>
              </div>
              <div class="floating-element" style="--delay: 1.5s; --duration: 4.5s;">
                <i class="bi bi-cpu fs-1 text-white-25"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  

  <!-- Features Section -->
  <section class="features-section py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="display-5 fw-bold mb-3 animate-fade-in" :class="{ 'visible': isVisible }">我的专长</h2>
        <p class="lead text-muted animate-fade-in" :class="{ 'visible': isVisible }" style="animation-delay: 0.2s">
          专注于技术创新，创造实用工具，让技术更贴近生活
        </p>
      </div>
      
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" v-for="(feature, index) in features" :key="index">
          <div class="feature-card h-100 border-0 shadow-sm animate-slide-up" 
               :class="{ 'visible': isVisible }" 
               :style="`animation-delay: ${index * 0.1}s`">
            <div class="card-body text-center p-4">
              <div class="feature-icon mb-3" :style="`background-color: ${feature.color}20; color: ${feature.color}`">
                <span class="fs-1">{{ feature.icon }}</span>
              </div>
              <h5 class="card-title fw-bold mb-3">{{ feature.title }}</h5>
              <p class="card-text text-muted">{{ feature.description }}</p>
              <div class="feature-arrow">
                <i class="bi bi-arrow-right-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section py-5 bg-primary text-white">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <h2 class="display-5 fw-bold mb-3">准备好探索编程的无限可能了吗？</h2>
          <p class="lead text-white-50">欢迎访问我的项目，一起感受代码创造的乐趣</p>
        </div>
        <div class="col-lg-4 text-lg-end">
          <a href="https://github.com/dongzheyu" target="_blank" class="btn btn-light btn-lg px-4 py-3">
            <i class="bi bi-github me-2"></i>访问 GitHub
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hero Section */
.hero-section {
  background: var(--gradient-primary);
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
}

.hero-bg-animation {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.25) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.25) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
  animation: bgPulse 15s ease-in-out infinite alternate;
}

.hero-logo {
  width: 140px;
  height: 140px;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-xl);
  transition: all var(--transition-base);
}

.hero-logo:hover {
  transform: scale(1.05) rotate(5deg);
  box-shadow: var(--shadow-glow);
}

.hero-buttons .btn {
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  font-weight: 500;
  padding: 12px 28px;
}

.hero-buttons .btn-light {
  background: white;
  color: var(--color-primary-dark);
}

.hero-buttons .btn-light:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  color: var(--color-primary-dark);
}

.hero-buttons .btn-outline-light {
  border-width: 1.5px;
}

.hero-buttons .btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

/* Floating Elements */
.hero-illustration {
  position: relative;
  height: 400px;
}

.floating-elements {
  position: relative;
  width: 100%;
  height: 100%;
}

.floating-element {
  position: absolute;
  animation: float var(--duration, 4s) ease-in-out infinite alternate;
  opacity: 0.5;
  transition: all var(--transition-base);
}

.floating-element:hover {
  opacity: 1;
  transform: scale(1.1);
}

.floating-element:nth-child(1) { top: 10%; left: 15%; }
.floating-element:nth-child(2) { top: 25%; right: 25%; }
.floating-element:nth-child(3) { bottom: 25%; left: 5%; }
.floating-element:nth-child(4) { bottom: 10%; right: 15%; }

/* Features Section */
.features-section {
  padding: 100px 0;
}

.feature-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: all var(--transition-base);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform var(--transition-base);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary-light);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  transition: all var(--transition-base);
}

.feature-card:hover .feature-icon {
  transform: scale(1.08) rotate(3deg);
}

.feature-arrow {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-mute);
  opacity: 0;
  transform: translateX(-10px);
  transition: all var(--transition-base);
}

.feature-card:hover .feature-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--color-primary);
}

/* CTA Section */
.cta-section {
  background: var(--gradient-primary);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -30%;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 60%);
  animation: rotate 40s linear infinite;
}

.cta-section .btn-light {
  border-radius: var(--radius-full);
  font-weight: 600;
  padding: 14px 32px;
  transition: all var(--transition-base);
}

.cta-section .btn-light:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-xl);
}

/* Animations */
@keyframes bgPulse {
  0% { opacity: 0.8; }
  100% { opacity: 1; }
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-15px) rotate(8deg); }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 991.98px) {
  .hero-section {
    min-height: auto;
    padding: 80px 0 100px;
  }

  .hero-illustration {
    height: 300px;
    margin-top: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-section .display-2 {
    font-size: 2.25rem;
  }

  .hero-logo {
    width: 120px;
    height: 120px;
  }

  .hero-buttons .btn {
    width: 100%;
    margin-bottom: 0.75rem;
  }

  .features-section {
    padding: 60px 0;
  }

  .cta-section {
    padding: 60px 0;
    text-align: center;
  }

  .cta-section .text-lg-end {
    text-align: center !important;
    margin-top: 2rem;
  }
}
</style>
