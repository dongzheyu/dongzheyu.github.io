<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="blog-hero bg-primary text-white py-5 mb-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4 animate-slide-up" :class="{ 'visible': isVisible }">
              我的技术博客
            </h1>
            <p class="lead text-white-50 mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.2s">
              记录编程历程，分享开发心得，探索技术世界
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
                    <i class="bi bi-tag-fill me-1"></i>{{ post.category }}
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
                                    <a :href="post.link" class="btn btn-outline-primary btn-sm btn-animate" target="_blank">
                    阅读全文 <i class="bi bi-arrow-right ms-1"></i>
                  </a>
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

// 博客文章数据
const blogPosts = ref([
  {
    id: 1,
    title: 'C++完全入门指南：从Hello World到结构体',
    excerpt: '这是一篇详细的C++入门指南，从最基础的Hello World程序开始，逐步讲解变量、数据类型、控制流、函数、指针到结构体等核心概念，适合初学者系统学习C++编程。',
    date: '2025-12-24',
    author: 'JetCPP Team',
    link: '/blog/cpp-guide.html', // 指向VitePress构建的博客页面
    color: '#FF6B6B',
    category: '编程教程'
  }
])

// 动画效果
const { isVisible } = useAnimations()
</script>
