<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="blog-hero bg-primary text-white py-5 mb-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4 animate-slide-up" :class="{ 'visible': isVisible }">
              技术博客
            </h1>
            <p class="lead text-white-50 mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.2s">
              分享技术见解，记录开发历程，探索编程世界
            </p>
          </div>
          <div class="col-lg-4">
            <div class="hero-illustration animate-float" :class="{ 'visible': isVisible }" style="animation-delay: 0.4s">
              <i class="bi bi-journal-text display-1 text-white-25"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Posts -->
    <section class="blog-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="blog-post card mb-4 border-0 shadow-sm card-hover animate-slide-up" 
                 v-for="(post, index) in blogPosts" 
                 :key="post.id"
                 :class="{ 'visible': isVisible }" 
                 :style="`animation-delay: ${index * 0.15}s`">
              <div class="card-body p-4">
                <div class="blog-header mb-3">
                  <div class="blog-category-badge mb-2" :style="`background-color: ${post.color}20; color: ${post.color}`">
                    <i class="bi bi-tag-fill me-1"></i>技术分享
                  </div>
                  <h5 class="card-title fw-bold">{{ post.title }}</h5>
                </div>
                <p class="card-text text-muted mb-4">{{ post.excerpt }}</p>
                <div class="blog-footer d-flex justify-content-between align-items-center">
                  <div class="blog-meta">
                    <small class="text-muted">
                      <i class="bi bi-calendar3 me-1"></i>{{ post.date }} · 
                      <i class="bi bi-person me-1 ms-2"></i>{{ post.author }}
                    </small>
                  </div>
                  <router-link :to="post.link" class="btn btn-outline-primary btn-sm btn-animate">
                    阅读全文 <i class="bi bi-arrow-right ms-1"></i>
                  </router-link>
                </div>
              </div>
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

const blogPosts = ref([
  {
    id: 1,
    title: 'C++高性能编程技巧',
    excerpt: '分享一些实用的C++性能优化技巧，包括内存管理、算法优化等方面的经验总结。',
    date: '2024-01-15',
    author: 'JetCPP Team',
    link: '/blog/cpp',
    color: '#FF6B6B'
  },
  {
    id: 2,
    title: 'JetBrains IDE使用技巧',
    excerpt: '详细介绍JetBrains系列IDE的高级功能和实用技巧，提升开发效率。',
    date: '2024-01-10',
    author: 'JetCPP Team',
    link: '/blog/jetbrains',
    color: '#4ECDC4'
  }
])
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
}

.blog-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.blog-hero::before {
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

.blog-post {
  border-radius: 15px;
  transition: all 0.3s ease;
}

.blog-category-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.blog-meta i {
  opacity: 0.7;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .blog-hero .display-4 {
    font-size: 2.5rem;
  }
  
  .hero-illustration {
    margin-top: 2rem;
  }
  
  .blog-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start !important;
  }
}
</style>