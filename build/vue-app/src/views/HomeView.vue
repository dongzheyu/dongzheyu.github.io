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
    <div class="container-fluid position-relative z-2">
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
    <div class="container-fluid">
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
    <div class="container-fluid">
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


