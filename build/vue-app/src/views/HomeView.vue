<script setup lang="ts">
import { ref, onMounted } from 'vue'

const features = ref([
  {
    icon: '🚀',
    title: '高性能C++开发',
    description: '专注于C++核心技术，提供高效、稳定的编程解决方案，涵盖系统编程、游戏开发等多个领域。',
    color: '#FF6B6B'
  },
  {
    icon: '🧠',
    title: '算法与数据结构',
    description: '深入研究算法优化与数据结构设计，分享经典算法实现和解题思路，提升编程能力。',
    color: '#4ECDC4'
  },
  {
    icon: '🛠️',
    title: '实用工具项目',
    description: '开发各类实用工具和开源项目，包括Minecraft工具、JetBrains产品相关工具等。',
    color: '#45B7D1'
  },
  {
    icon: '📚',
    title: '技术博客分享',
    description: '定期更新技术文章，分享C++编程经验、项目开发心得和行业前沿技术动态。',
    color: '#96CEB4'
  },
  {
    icon: '🤝',
    title: '开源协作社区',
    description: '拥抱开源精神，欢迎开发者共同参与项目开发，一起构建有趣的开源项目。',
    color: '#FFEAA7'
  },
  {
    icon: '🌐',
    title: '跨平台支持',
    description: '所有项目均支持Windows、Linux、macOS等主流平台，提供良好的跨平台兼容性。',
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
              <img src="/logo.png" alt="JetCPP Logo" class="hero-logo">
            </div>
            <h1 class="display-2 fw-bold mb-4 text-white animate-slide-up" :class="{ 'visible': isVisible }">
              JetCPP Studio
            </h1>
            <p class="lead text-white-50 mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.2s">
              代码重塑世界 · 创新驱动未来
            </p>
            <p class="text-white-50 mb-5 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.4s">
              专注于C++编程、算法与创新技术，为开发者提供高质量的解决方案
            </p>
            <div class="hero-buttons animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.6s">
              <router-link to="/about" class="btn btn-light btn-lg me-3 px-4 py-3">
                <i class="bi bi-people me-2"></i>了解我们
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
    <div class="scroll-indicator">
      <div class="scroll-mouse"></div>
      <span class="scroll-text">向下滚动</span>
    </div>
  </section>

  

  <!-- Features Section -->
  <section class="features-section py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="display-5 fw-bold mb-3 animate-fade-in" :class="{ 'visible': isVisible }">我们的特色</h2>
        <p class="lead text-muted animate-fade-in" :class="{ 'visible': isVisible }" style="animation-delay: 0.2s">
          专注于技术创新，为开发者提供最优质的编程体验
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
          <h2 class="display-5 fw-bold mb-3">准备好开始你的编程之旅了吗？</h2>
          <p class="lead text-white-50">加入我们的开源社区，一起探索编程的无限可能</p>
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #764ba2 100%);
  min-height: 100vh;
  position: relative;
}

.hero-bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: bgAnimation 20s ease-in-out infinite alternate;
}

.hero-logo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-logo:hover {
  transform: scale(1.05) rotate(5deg);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.hero-buttons .btn {
  transition: all 0.3s ease;
  border-radius: 50px;
}

.hero-buttons .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
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
  animation: float var(--duration, 3s) ease-in-out infinite alternate;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.floating-element:hover {
  opacity: 1;
}

.floating-element:nth-child(1) { top: 10%; left: 20%; }
.floating-element:nth-child(2) { top: 30%; right: 30%; }
.floating-element:nth-child(3) { bottom: 30%; left: 10%; }
.floating-element:nth-child(4) { bottom: 10%; right: 20%; }

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
}

.scroll-mouse {
  width: 25px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  position: relative;
  margin: 0 auto 10px;
}

.scroll-mouse::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  width: 3px;
  height: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

.scroll-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  letter-spacing: 1px;
}



/* Features Section */
.feature-card {
  background: white;
  border-radius: 15px;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--bs-primary) 0%, var(--bs-info) 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-arrow {
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.feature-card:hover .feature-arrow {
  opacity: 1;
  transform: translateX(5px);
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--bs-primary) 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 30s linear infinite;
}

.cta-section .btn {
  border-radius: 50px;
  transition: all 0.3s ease;
}

.cta-section .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Animations */
@keyframes bgAnimation {
  0% { opacity: 0.7; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.1); }
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-20px) rotate(10deg); }
}

@keyframes scroll {
  0% { top: 8px; opacity: 1; }
  100% { top: 20px; opacity: 0; }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 1s ease forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 1s ease forwards;
}

.animate-float {
  opacity: 0;
  animation: fadeIn 1s ease forwards, float 3s ease-in-out infinite alternate;
  animation-delay: 0s, 1s;
}

.visible {
  opacity: 1 !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section .display-2 {
    font-size: 2.5rem;
  }
  
  .hero-illustration {
    height: 300px;
    margin-top: 3rem;
  }
  
  .stat-item {
    padding: 1.5rem 0.5rem;
  }
  
  .cta-section .text-lg-end {
    text-align: center !important;
    margin-top: 2rem;
  }
  
  .hero-buttons .btn {
    margin-bottom: 1rem;
  }
}



[data-bs-theme="dark"] .feature-card {
  background: #2d3748;
  color: #e2e8f0;
}

[data-bs-theme="dark"] .feature-card .card-text {
  color: #a0aec0;
}
</style>
