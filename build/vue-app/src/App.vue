<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted, watch } from 'vue'

const currentFont = ref('default') // default, jetbrains, pingfang

// 鼠标跟随光点
const cursorDot = ref<HTMLElement | null>(null)

const handleLinkHover = () => {
  cursorDot.value?.classList.add('hover')
}

const handleLinkLeave = () => {
  cursorDot.value?.classList.remove('hover')
}

// 字体切换逻辑
const changeFont = (fontType: string) => {
  currentFont.value = fontType
  
  // 移除之前的字体类
  document.body.classList.remove('font-jetbrains', 'font-pingfang')
  
  // 根据选择的字体添加相应的类
  if (fontType === 'jetbrains') {
    document.body.classList.add('font-jetbrains')
    // 设置 JetBrains Mono 字体为 /public/fonts.ttf
    document.body.style.setProperty('--font-mono', '/public/fonts.ttf, "JetBrains Mono", "Cascadia Code", "Source Code Pro", ui-monospace, Menlo, Consolas, monospace')
  } else if (fontType === 'pingfang') {
    document.body.classList.add('font-pingfang')
    // 重置为默认字体
    document.body.style.removeProperty('--font-mono')
  } else {
    // 重置为默认字体
    document.body.style.removeProperty('--font-mono')
  }
  
  // 保存用户选择的字体设置
  localStorage.setItem('fontType', fontType)
}

// 监听路由变化，为博客页面添加特殊类
import { useRoute } from 'vue-router'

const route = useRoute()

const updateAppClass = () => {
  // 移除之前的类
  document.getElementById('app')?.classList.remove('blog-content-app')
  
  // 检查当前路由是否为博客页面
  if (route.path.startsWith('/blog/')) {
    document.getElementById('app')?.classList.add('blog-content-app')
  }
}

// 监听路由变化
watch(() => route.path, () => {
  updateAppClass()
}, { immediate: true })

onMounted(() => {
  // 直接跟随鼠标，无延迟
  document.addEventListener('mousemove', (e) => {
    if (cursorDot.value) {
      cursorDot.value.style.left = e.clientX + 'px'
      cursorDot.value.style.top = e.clientY + 'px'
    }
  })

  // 添加鼠标移动事件
  document.addEventListener('mousemove', handleMouseMove)
  
  // 链接悬停效果
  document.querySelectorAll('a, button, .btn, .nav-link').forEach(el => {
    el.addEventListener('mouseenter', handleLinkHover)
    el.addEventListener('mouseleave', handleLinkLeave)
  })

  // 恢复用户之前选择的字体设置
  const savedFont = localStorage.getItem('fontType')
  if (savedFont) {
    changeFont(savedFont)
  }
  
  // 初始化应用类
  updateAppClass()
})

onUnmounted(() => {
  document.querySelectorAll('a, button, .btn, .nav-link').forEach(el => {
    el.removeEventListener('mouseenter', handleLinkHover)
    el.removeEventListener('mouseleave', handleLinkLeave)
  })
})
</script>

<template>
  <div id="app">
    <!-- 鼠标跟随光点 -->
    <div ref="cursorDot" class="cursor-dot"></div>
    
    <nav class="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top">
      <div class="container">
        <RouterLink to="/" class="navbar-brand d-flex align-items-center">
          <img src="/logo.png" alt="dongle Logo" width="40" height="40" class="me-2 rounded-circle">
          <span class="fw-bold">dongle</span>
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
              <RouterLink to="/about" class="nav-link">关于我</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/redirect" class="nav-link">文海拾贝</RouterLink>
            </li>
          </ul>
          
          <div class="dropdown me-2">
            <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
              <i class="bi bi-fonts me-1"></i> 字体
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" @click.prevent="changeFont('default')">
                <i :class="currentFont === 'default' ? 'bi bi-check me-2' : 'me-4'"></i> 默认字体
              </a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="changeFont('jetbrains')">
                <i :class="currentFont === 'jetbrains' ? 'bi bi-check me-2' : 'me-4'"></i> JetBrains Mono
              </a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="changeFont('pingfang')">
                <i :class="currentFont === 'pingfang' ? 'bi bi-check me-2' : 'me-4'"></i> 苹方SC
              </a></li>
            </ul>
          </div>
          
          <div class="dropdown">
            <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
              关注我
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
        </div>
      </div>
    </nav>

    <main>
      <RouterView />
    </main>
    
    <footer class="py-4 mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5>dongle</h5>
            <p class="text-muted">代码重塑世界 · 创新驱动未来</p>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="mb-3">
              <a href="https://github.com/dongzheyu" class="me-3" target="_blank">
                <i class="bi bi-github fs-4"></i>
              </a>
              <a href="https://gitee.com/jetcpp" class="me-3" target="_blank">
                <i class="bi bi-git fs-4"></i>
              </a>
              <a href="https://space.bilibili.com/3546730880567808" target="_blank">
                <i class="bi bi-play-circle fs-4"></i>
              </a>
            </div>
            <p class="text-muted mb-0">© 2025 dongle. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
