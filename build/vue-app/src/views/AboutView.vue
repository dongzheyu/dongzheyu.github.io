<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero bg-primary text-white py-5 mb-5">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4 animate-slide-up" :class="{ 'visible': isVisible }">
              关于我 - dongle
            </h1>
            <p class="lead text-white-50 mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.2s">
              代码重塑世界 · 创新驱动未来
            </p>
            <p class="text-white-50 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.4s">
              一个热爱编程的小学生，专注于创造实用的软件工具，让技术更贴近生活。
            </p>
          </div>
          <div class="col-lg-4">
            <div class="hero-illustration animate-float" :class="{ 'visible': isVisible }" style="animation-delay: 0.6s">
              <i class="bi bi-person-fill display-1 text-white-25"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section py-5">
      <div class="container-fluid px-5">
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
                <p class="card-text">{{ value.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section py-5">
      <div class="container-fluid px-5">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold mb-3 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.8s">
            联系我
          </h2>
          <p class="lead animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 1s">
            欢迎通过以下方式与我取得联系
          </p>
        </div>
        
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="contact-links d-flex justify-content-center gap-3 flex-wrap animate-slide-up" 
                 :class="{ 'visible': isVisible }" 
                 style="animation-delay: 1.2s">
              <a href="https://github.com/dongzheyu" target="_blank" class="btn btn-outline btn-animate">
                <i class="bi bi-github me-2"></i> GitHub
              </a>
              <a href="https://gitee.com/jetcpp" target="_blank" class="btn btn-outline btn-animate">
                <i class="bi bi-git me-2"></i> Gitee
              </a>
              <a href="https://space.bilibili.com/3546730880567808" target="_blank" class="btn btn-outline-dark btn-animate">
                <i class="bi bi-play-circle me-2"></i> 哔哩哔哩
              </a>
              <a href="https://afdian.com/a/JetCPP" target="_blank" class="btn btn-primary btn-animate">
                <i class="bi bi-heart me-2"></i> 赞助支持
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
    title: '编程哲学',
    description: '简单就是美 - 我坚信好的工具应该让用户感到轻松，而不是增加负担。',
    color: '#FF6B6B'
  },
  {
    icon: 'bi bi-gear',
    title: '技术专长',
    description: '专注于C++开发，同时涉及前端技术、Python等多种技术栈，致力于创造实用工具。',
    color: '#4ECDC4'
  },
  {
    icon: 'bi bi-people',
    title: '持续学习',
    description: '编程路上不断学习，每次解决问题都是一次进步，从用户需求出发开发项目。',
    color: '#45B7D1'
  }
])
</script>


