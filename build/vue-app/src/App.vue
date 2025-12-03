<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.setAttribute('data-bs-theme', isDarkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true
    document.body.setAttribute('data-bs-theme', 'dark')
  }
})
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div class="container">
        <RouterLink to="/" class="navbar-brand d-flex align-items-center">
          <img src="/logo.png" alt="JetCPP Logo" width="40" height="40" class="me-2 rounded-circle">
          <span class="fw-bold">JetCPP Studio</span>
        </RouterLink>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">首页</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/projects" class="nav-link">项目</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/blog" class="nav-link">博客</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link">关于我们</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/redirect" class="nav-link">文海拾贝</RouterLink>
            </li>
          </ul>
          
          <div class="dropdown">
            <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
              关注我们
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="https://github.com/dongzheyu" target="_blank">
                <i class="bi bi-github me-2"></i> Github
              </a></li>
              <li><a class="dropdown-item" href="https://gitee.com/jetcpp" target="_blank">
                <i class="bi bi-git me-2"></i> Gitee
              </a></li>
              <li><a class="dropdown-item" href="https://space.bilibili.com/3546730880567808" target="_blank">
                <i class="bi bi-play-circle me-2"></i> 哔哩哔哩
              </a></li>
            </ul>
          </div>
          
          <a href="https://afdian.com/a/JetCPP" target="_blank" class="btn btn-outline-warning ms-2">
            <i class="bi bi-heart me-1"></i> 赞助一下
          </a>
          
          <button @click="toggleDarkMode" class="btn btn-outline-secondary ms-2">
            <i :class="isDarkMode ? 'bi bi-sun' : 'bi bi-moon'"></i>
          </button>
        </div>
      </div>
    </nav>

    <main>
      <RouterView />
    </main>
    
    <footer class="bg-dark text-light py-4 mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5>JetCPP Studio</h5>
            <p class="text-muted">代码重塑世界 · 创新驱动未来</p>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="mb-3">
              <a href="https://github.com/dongzheyu" class="text-light me-3" target="_blank">
                <i class="bi bi-github fs-4"></i>
              </a>
              <a href="https://gitee.com/jetcpp" class="text-light me-3" target="_blank">
                <i class="bi bi-git fs-4"></i>
              </a>
              <a href="https://space.bilibili.com/3546730880567808" class="text-light" target="_blank">
                <i class="bi bi-play-circle fs-4"></i>
              </a>
            </div>
            <p class="text-muted mb-0">© 2025 JetCPP Studio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
@font-face {
  font-family: "CustomFont";
  src: url("/fonts.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "CustomFont", Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.navbar-brand {
  font-family: "CustomFont", sans-serif;
}

.nav-link.router-link-active {
  color: rgba(255, 255, 255, 0.75) !important;
  font-weight: 500;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 1) !important;
}

[data-bs-theme="dark"] .navbar {
  background-color: #212529 !important;
}

[data-bs-theme="dark"] .card {
  background-color: #2d3748;
  border-color: #4a5568;
}

[data-bs-theme="dark"] .card-body {
  color: #e2e8f0;
}

[data-bs-theme="dark"] .text-muted {
  color: #a0aec0 !important;
}

@media (max-width: 991.98px) {
  .navbar-nav {
    padding: 1rem 0;
  }
  
  .navbar-nav .nav-item {
    margin-bottom: 0.5rem;
  }
  
  .dropdown, .btn {
    margin-top: 0.5rem;
  }
}
</style>
