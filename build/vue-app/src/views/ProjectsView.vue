<template>
  <div class="projects-page w-100">
    <!-- Hero Section -->
    <section class="projects-hero">
      <div class="container-fluid w-100">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <h1 class="projects-title mb-4 animate-slide-up" :class="{ 'visible': isVisible }">
              项目展示
            </h1>
            <p class="projects-desc mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.15s">
              探索我的开源项目，涵盖工具开发、游戏辅助、教育软件等多个领域
            </p>
          </div>
          <div class="col-lg-4">
            <div class="hero-illustration animate-float" :class="{ 'visible': isVisible }" style="animation-delay: 0.3s">
              <i class="bi bi-folder-fill display-1" style="color: var(--color-primary); opacity: 0.3;"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="projects-section">
      <div class="container-fluid w-100">
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="(project, index) in projects" :key="project.id">
            <div class="project-card card h-100 border-0 shadow-sm card-hover animate-slide-up"
                 :class="{ 'visible': isVisible }"
                 :style="`animation-delay: ${index * 0.1}s`">
              <div class="card-body p-4">
                <div class="project-icon mb-3" :style="`background-color: ${project.color}18; color: ${project.color}`">
                  <i class="bi bi-code-slash fs-2"></i>
                </div>
                <h5 class="card-title fw-bold mb-3">{{ project.title }}</h5>
                <p class="card-text text-muted mb-4">{{ project.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="badge px-3 py-2" :style="`background-color: ${project.color}18; color: ${project.color}`">
                    {{ project.category }}
                  </span>
                  <a :href="project.link" class="btn btn-animate btn-sm" target="_blank"
                     :style="`border: 1.5px solid ${project.color}40; color: ${project.color}`">
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
import { ref } from 'vue'
import { useAnimations } from '@/composables/useAnimations'

const { isVisible } = useAnimations()

const projects = ref([
  {
    "id": 5,
    "title": "English Listen WinUI",
    "description": "现代化英语听写训练工具，基于WinUI 3 + C# + C++混合开发，MVVM架构，Mica材质，百度翻译集成",
    "category": "教育",
    "link": "/project/english-listen-winui.html",
    "color": "#f48c06"
  },
  {
    "id": 4,
    "title": "English-Listen",
    "description": "专业英语听写训练工具，基于C++和Qt6开发的现代化听写软件",
    "category": "教育",
    "link": "/project/english-listen.html",
    "color": "#52b788"
  }
])
</script>

<style scoped>
.projects-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.02em;
}

.projects-desc {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  max-width: 540px;
  line-height: 1.7;
}
</style>
