<template>
  <div class="projects-page">
    <!-- Hero Section -->
    <section class="projects-hero bg-primary text-white py-5 mb-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4 animate-slide-up" :class="{ 'visible': isVisible }">
              项目展示
            </h1>
            <p class="lead text-white-50 mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.2s">
              探索我们的开源项目，涵盖工具开发、游戏辅助、教育软件等多个领域
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
    <section class="projects-section py-5">
      <div class="container">
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
                  <router-link :to="project.link" class="btn btn-outline-primary btn-sm btn-animate">
                    查看详情 <i class="bi bi-arrow-right ms-1"></i>
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

const projects = ref([
  {
    id: 1,
    title: 'Github-Clone',
    description: 'GitHub仓库批量克隆工具，一键克隆GitHub用户的所有公开仓库',
    category: '工具',
    link: '/project/github-clone',
    color: '#FF6B6B'
  },
  {
    id: 2,
    title: 'Minecraft-Tools',
    description: '我的世界工具箱，功能齐全的Minecraft工具集，支持启动器管理和基岩版操作',
    category: '游戏工具',
    link: '/project/minecraft-tools',
    color: '#4ECDC4'
  },
  {
    id: 3,
    title: 'Jetbrains-Crack',
    description: 'JetBrains全家桶激活工具，一键破解JetBrains全家桶软件',
    category: '开发工具',
    link: '/project/jetbrains-crack',
    color: '#45B7D1'
  },
  {
    id: 4,
    title: 'English-Listen',
    description: '英语听写练习程序，基于C++和Qt6开发的英语听写练习工具',
    category: '教育',
    link: '/project/english-listen',
    color: '#96CEB4'
  },
  {
    id: 5,
    title: 'GoodMinecraft',
    description: 'Minecraft游戏整合包',
    category: '游戏',
    link: '/project/goodMinecraft',
    color: '#FF6B6B'
  }
  
])
</script>

<style scoped>
.projects-page {
  min-height: 100vh;
}

.projects-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.projects-hero::before {
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

.project-card {
  border-radius: 15px;
  transition: all 0.3s ease;
}

.project-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.project-card:hover .project-icon {
  transform: scale(1.1) rotate(5deg);
}

.badge {
  border-radius: 20px;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .projects-hero .display-4 {
    font-size: 2.5rem;
  }
  
  .hero-illustration {
    margin-top: 2rem;
  }
}
</style>