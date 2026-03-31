<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// ---- 主题系统 ----
type Theme = 'dark' | 'light' | 'system'
const currentTheme = ref<Theme>('system')

const themeIcon = computed(() => {
  if (currentTheme.value === 'dark') return 'bi bi-moon-stars-fill'
  if (currentTheme.value === 'light') return 'bi bi-sun-fill'
  return 'bi bi-circle-half'
})

const setTheme = (theme: Theme) => {
  currentTheme.value = theme
  applyTheme(theme)
  localStorage.setItem('theme', theme)
}

const applyTheme = (theme: Theme) => {
  const resolved = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme
  document.documentElement.setAttribute('data-theme', resolved)
}

// 监听系统主题变化
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const handleSystemThemeChange = () => {
  if (currentTheme.value === 'system') applyTheme('system')
}
mediaQuery.addEventListener('change', handleSystemThemeChange)

// ---- 鼠标跟随光点 ----
const cursorDot = ref<HTMLElement | null>(null)

const handleMouseMove = (e: MouseEvent) => {
  if (cursorDot.value) {
    cursorDot.value.style.left = e.clientX + 'px'
    cursorDot.value.style.top = e.clientY + 'px'
  }
}

const handleLinkHover = () => cursorDot.value?.classList.add('hover')
const handleLinkLeave = () => cursorDot.value?.classList.remove('hover')

// ---- 按钮波纹效果 ----
const addRipple = (e: MouseEvent) => {
  const btn = (e.currentTarget as HTMLElement)
  const rect = btn.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  btn.style.setProperty('--ripple-x', `${x}%`)
  btn.style.setProperty('--ripple-y', `${y}%`)
}

// ---- 路由监听 ----
const updateAppClass = () => {
  document.getElementById('app')?.classList.remove('blog-content-app')
  if (route.path.startsWith('/blog/')) {
    document.getElementById('app')?.classList.add('blog-content-app')
  }
}

watch(() => route.path, updateAppClass, { immediate: true })

// ---- 生命周期 ----
onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)

  document.querySelectorAll('a, button, .btn, .nav-link').forEach(el => {
    el.addEventListener('mouseenter', handleLinkHover)
    el.addEventListener('mouseleave', handleLinkLeave)
    el.addEventListener('mousemove', addRipple)
  })

  // 恢复主题设置
  const saved = localStorage.getItem('theme') as Theme | null
  if (saved) {
    currentTheme.value = saved
  } else {
    // 首次访问，跟随系统
    currentTheme.value = 'system'
  }
  applyTheme(currentTheme.value)

  updateAppClass()
})

onUnmounted(() => {
  mediaQuery.removeEventListener('change', handleSystemThemeChange)
  document.querySelectorAll('a, button, .btn, .nav-link').forEach(el => {
    el.removeEventListener('mouseenter', handleLinkHover)
    el.removeEventListener('mouseleave', handleLinkLeave)
    el.removeEventListener('mousemove', addRipple)
  })
})
</script>

<template>
  <div id="app">
    <!-- 鼠标跟随光点 -->
    <div ref="cursorDot" class="cursor-dot"></div>

    <nav class="navbar navbar-expand-lg shadow-sm sticky-top">
      <div class="container-fluid px-4">
        <RouterLink to="/" class="navbar-brand d-flex align-items-center">
          <img src="/logo.png" alt="dongle Logo" width="38" height="38" class="me-2">
          <span>dongle</span>
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
          </ul>

          <div class="d-flex align-items-center gap-2">
            <!-- 主题切换下拉菜单 -->
            <div class="dropdown">
              <button class="theme-toggle-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i :class="themeIcon"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end theme-dropdown">
                <li>
                  <button class="dropdown-item d-flex align-items-center gap-2" :class="{ active: currentTheme === 'light' }" @click="setTheme('light')">
                    <i class="bi bi-sun-fill"></i> 浅色
                  </button>
                </li>
                <li>
                  <button class="dropdown-item d-flex align-items-center gap-2" :class="{ active: currentTheme === 'dark' }" @click="setTheme('dark')">
                    <i class="bi bi-moon-stars-fill"></i> 深色
                  </button>
                </li>
                <li>
                  <button class="dropdown-item d-flex align-items-center gap-2" :class="{ active: currentTheme === 'system' }" @click="setTheme('system')">
                    <i class="bi bi-circle-half"></i> 跟随系统
                  </button>
                </li>
              </ul>
            </div>

            <!-- 关注我 -->
            <div class="dropdown">
              <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                关注我
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
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

            <!-- 赞助 -->
            <a href="https://afdian.com/a/JetCPP" target="_blank" class="btn btn-warning ms-1">
              <i class="bi bi-heart me-1"></i> 赞助
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <RouterView />
    </main>

    <footer class="py-4 mt-5">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h5>dongle</h5>
            <p class="text-muted mb-0">代码重塑世界 · 创新驱动未来</p>
          </div>
          <div class="col-md-6 text-md-end mt-3 mt-md-0">
            <div class="mb-3">
              <a href="https://github.com/dongzheyu" class="me-3" target="_blank">
                <i class="bi bi-github"></i>
              </a>
              <a href="https://gitee.com/jetcpp" class="me-3" target="_blank">
                <i class="bi bi-git"></i>
              </a>
              <a href="https://space.bilibili.com/3546730880567808" target="_blank">
                <i class="bi bi-play-circle"></i>
              </a>
            </div>
            <p class="text-muted mb-0">&copy; 2025 dongle. All rights reserved.</p>
          </div>
        </div>

        <!-- Powered by 卡片 -->
        <div class="powered-by-row mt-4 pt-3 d-flex flex-wrap justify-content-center gap-3">
          <!-- DigitalPlat 域名 -->
          <a href="https://dash.domain.digitalplat.org/signup?ref=TZRrkCdFjm" target="_blank" rel="noopener noreferrer" class="powered-card">
            <span class="powered-badge powered-badge--blue">DigitalPlat</span>
            <span class="powered-info">
              <span class="powered-title">This Website is Powered by DigitalPlat FreeDomain</span>
              <span class="powered-desc">Get a free domain from DigitalPlat.</span>
            </span>
          </a>
          <!-- Cloudflare -->
          <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" class="powered-card">
            <span class="powered-badge powered-badge--orange">Cloudflare</span>
            <span class="powered-info">
              <span class="powered-title">This Website is Powered by Cloudflare</span>
              <span class="powered-desc">Fast, secure, and reliable CDN & DNS.</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
