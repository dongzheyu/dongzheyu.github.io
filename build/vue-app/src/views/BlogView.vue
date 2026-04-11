<template>
  <div class="blog-page">
    <!-- Hero Section — 统一暖色渐变风格 -->
    <section class="blog-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <h1 class="blog-title mb-4 animate-slide-up" :class="{ 'visible': isVisible }">
              我的技术博客
            </h1>
            <p class="blog-subtitle mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.2s">
              记录编程历程，分享开发心得，探索技术世界
            </p>
          </div>
          <div class="col-lg-4">
            <div class="hero-illustration animate-float" :class="{ 'visible': isVisible }" style="animation-delay: 0.4s">
              <i class="bi bi-journal-text display-1" style="color: var(--color-primary); opacity: 0.3;"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Posts -->
    <section class="blog-section py-5">
      <div class="container-fluid px-5">
        <div class="row">
          <div class="col-12">
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
                  <a :href="post.link" class="btn btn-sm btn-animate" target="_blank"
                     style="border: 1.5px solid var(--color-border); color: var(--color-text);">
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
    date: '2026-12-24',
    author: 'JetCPP Team',
    link: '/blog/cpp-guide.html',
    color: '#FF6B6B',
    category: '编程教程'
  },
  {
    id: 2,
    title: 'C# 从入门到精通（零基础到进阶）',
    excerpt: '一份全面的C#学习指南，涵盖从基础语法到高级特性的完整知识体系。包括变量、数据类型、控制流、方法、数组、面向对象编程、泛型、委托事件、LINQ查询和异步编程等核心内容，附带完整的学生管理系统实战项目。',
    date: '2026-03-04',
    author: 'JetCPP Team',
    link: '/blog/csharp-guide.html',
    color: '#dc2f02',
    category: '编程教程'
  },
  {
    id: 3,
    title: 'XAML 从入门到精通（零基础到进阶）',
    excerpt: 'WPF界面开发完全指南，从XAML基础语法到MVVM架构模式。涵盖布局系统、常用控件、资源管理、数据绑定、样式模板、动画系统和自定义控件等内容，最后通过一个完整的待办事项应用项目展示实战技巧。',
    date: '2026-03-04',
    author: 'JetCPP Team',
    link: '/blog/xaml-guide.html',
    color: '#52b788',
    category: '编程教程'
  }
])

// 动画效果
const { isVisible } = useAnimations()
</script>

<style scoped>
.blog-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.02em;
}

.blog-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  max-width: 520px;
  line-height: 1.7;
}
</style>
