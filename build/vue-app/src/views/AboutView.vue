<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero bg-primary text-white py-5 mb-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4 animate-slide-up" :class="{ 'visible': isVisible }">
              关于 JetCPP Studio
            </h1>
            <p class="lead text-white-50 mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.2s">
              代码重塑世界 · 创新驱动未来
            </p>
            <p class="text-white-50 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.4s">
              我们是一支专注于C++编程、算法与创新技术的开发团队，致力于提供高质量的技术解决方案和开源项目。
            </p>
          </div>
          <div class="col-lg-4">
            <div class="hero-illustration animate-float" :class="{ 'visible': isVisible }" style="animation-delay: 0.6s">
              <i class="bi bi-people-fill display-1 text-white-25"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4" v-for="(value, index) in values" :key="index">
            <div class="value-card card h-100 border-0 shadow-sm card-hover animate-slide-up" 
                 :class="{ 'visible': isVisible }" 
                 :style="`animation-delay: ${index * 0.15}s`">
              <div class="card-body text-center p-4">
                <div class="value-icon mb-3" :style="`background-color: ${value.color}20; color: ${value.color}`">
                  <i :class="value.icon + ' fs-1'"></i>
                </div>
                <h5 class="card-title fw-bold mb-3">{{ value.title }}</h5>
                <p class="card-text text-muted">{{ value.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold mb-3 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.8s">
            联系我们
          </h2>
          <p class="lead text-muted animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 1s">
            欢迎通过以下方式与我们取得联系
          </p>
        </div>
        
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="contact-links d-flex justify-content-center gap-3 flex-wrap animate-slide-up" 
                 :class="{ 'visible': isVisible }" 
                 style="animation-delay: 1.2s">
              <a href="https://github.com/dongzheyu" target="_blank" class="btn btn-outline-dark btn-animate">
                <i class="bi bi-github me-2"></i> GitHub
              </a>
              <a href="https://gitee.com/jetcpp" target="_blank" class="btn btn-outline-dark btn-animate">
                <i class="bi bi-git me-2"></i> Gitee
              </a>
              <a href="https://space.bilibili.com/3546730880567808" target="_blank" class="btn btn-outline-dark btn-animate">
                <i class="bi bi-play-circle me-2"></i> 哔哩哔哩
              </a>
              <a href="https://afdian.com/a/JetCPP" target="_blank" class="btn btn-primary btn-animate">
                <i class="bi bi-heart me-2"></i> 赞助我们
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimations } from '@/composables/useAnimations'

const { isVisible } = useAnimations()

const values = ref([
  {
    icon: 'bi bi-lightning-charge',
    title: '使命',
    description: '通过技术创新和开源协作，推动编程技术的发展，为开发者社区贡献价值。',
    color: '#FF6B6B'
  },
  {
    icon: 'bi bi-gear',
    title: '技术栈',
    description: '专注于C++核心开发，同时涉及Python、JavaScript等多种技术栈，提供全方位的技术支持。',
    color: '#4ECDC4'
  },
  {
    icon: 'bi bi-people',
    title: '团队',
    description: '由经验丰富的开发者组成，拥有多年项目开发经验，致力于技术创新和知识分享。',
    color: '#45B7D1'
  }
])
</script>

<style scoped>
.about-page {
  min-height: 100vh;
}

.about-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.about-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
  animation: bgAnimation 20s ease-in-out infinite alternate;
}

.hero-illustration {
  text-align: center;
  padding: 2rem;
}

.value-card {
  border-radius: 15px;
  transition: all 0.3s ease;
}

.value-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.value-card:hover .value-icon {
  transform: scale(1.1) rotate(5deg);
}

.contact-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.contact-links .btn {
  border-radius: 50px;
  min-width: 140px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-hero .display-4 {
    font-size: 2.5rem;
  }
  
  .hero-illustration {
    margin-top: 2rem;
  }
  
  .contact-links {
    flex-direction: column;
    align-items: center;
  }
  
  .contact-links .btn {
    width: 100%;
    max-width: 280px;
  }
}

/* 深色主题 */
[data-bs-theme="dark"] .contact-section {
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
}

[data-bs-theme="dark"] .value-card {
  background: #2d3748;
  color: #e2e8f0;
}

[data-bs-theme="dark"] .value-card .card-text {
  color: #a0aec0;
}
</style>
