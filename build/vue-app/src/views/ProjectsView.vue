<template>
  <div class="projects-page w-100">
    <!-- Hero Section -->
    <section class="projects-hero bg-primary text-white py-5 mb-5 w-100">
      <div class="container-fluid w-100">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4 animate-slide-up" :class="{ 'visible': isVisible }">
              项目展示
            </h1>
            <p class="lead text-white-50 mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.2s">
              探索我的开源项目，涵盖工具开发、游戏辅助、教育软件等多个领域
            </p>
          </div>
          <div class="col-lg-4">
            <div class="hero-illustration animate-float" :class="{ 'visible': isVisible }" style="animation-delay: 0.4s">
              <i class="bi bi-folder-fill display-1 text-white-25"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="projects-section py-5 w-100">
      <div class="container-fluid w-100">
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="(project, index) in projects" :key="project.id">
            <div class="project-card card h-100 border-0 shadow-sm card-hover animate-slide-up" 
                 :class="{ 'visible': isVisible }" 
                 :style="`animation-delay: ${index * 0.1}s`">
              <div class="card-body p-4">
                <div class="project-icon mb-3" :style="`background-color: ${project.color}20; color: ${project.color}`">
                  <i class="bi bi-code-slash fs-2"></i>
                </div>
                <h5 class="card-title fw-bold mb-3">{{ project.title }}</h5>
                <p class="card-text text-muted mb-4">{{ project.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="badge px-3 py-2" :style="`background-color: ${project.color}20; color: ${project.color}`">
                    {{ project.category }}
                  </span>
                  <a :href="project.link" class="btn btn-outline-primary btn-sm btn-animate" target="_blank">
                    查看详情 <i class="bi bi-arrow-right ms-1"></i>
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

const { isVisible } = useAnimations()

const projects = ref([
  {
    "id": 4,
    "title": "English-Listen",
    "description": "专业英语听写训练工具，基于C++和Qt6开发的现代化听写软件",
    "category": "教育",
    "link": "/project/english-listen.html",
    "color": "#96CEB4"
  }
])
</script>
