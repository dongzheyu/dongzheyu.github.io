<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import BackToTop from './components/BackToTop.vue'
import SearchModal from './components/SearchModal.vue'

const route = useRoute()

const isTestsRoute = computed(() => route.path.startsWith('/tests'))
const isEmergencyRoute = computed(() => route.path === '/emergency')

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

// ---- 关闭动画开关 ----
const reducedMotion = ref(false)
const reducedMotionIcon = computed(() =>
  reducedMotion.value ? 'bi bi-lightning-charge-fill' : 'bi bi-lightning-charge'
)

const toggleReducedMotion = () => {
  reducedMotion.value = !reducedMotion.value
  document.documentElement.setAttribute('data-motion', reducedMotion.value ? 'off' : '')
  localStorage.setItem('reduced-motion', String(reducedMotion.value))
}

// ---- 鼠标光晕效果 ----
const mouseX = ref(0)
const mouseY = ref(0)
const glowElement = ref<HTMLElement | null>(null)

const handleMouseMove = (e: MouseEvent) => {
  if (reducedMotion.value || !glowElement.value) return
  
  // 使用 requestAnimationFrame 优化性能
  requestAnimationFrame(() => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
    
    if (glowElement.value) {
      glowElement.value.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`
    }
  })
}

// ---- 搜索功能 ----
const searchModal = ref<any>(null)

const openSearch = () => {
  searchModal.value?.open()
}

// ---- 按钮波纹效果 ----
const addRipple = (e: MouseEvent) => {
  const btn = (e.target as HTMLElement).closest('.btn, .btn-animate') as HTMLElement
  if (!btn) return
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
  // 鼠标移动事件
  document.addEventListener('mousemove', handleMouseMove)
  
  // 按钮波纹事件委托
  document.addEventListener('mousemove', addRipple)

  // 键盘快捷键
  document.addEventListener('keydown', handleKeydown)

  // 恢复主题设置
  const saved = localStorage.getItem('theme') as Theme | null
  if (saved) {
    currentTheme.value = saved
  } else {
    currentTheme.value = 'system'
  }
  applyTheme(currentTheme.value)

  // 恢复关闭动画设置
  const savedMotion = localStorage.getItem('reduced-motion')
  if (savedMotion === 'true') {
    reducedMotion.value = true
    document.documentElement.setAttribute('data-motion', 'off')
  }

  updateAppClass()
})

onUnmounted(() => {
  mediaQuery.removeEventListener('change', handleSystemThemeChange)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mousemove', addRipple)
  document.removeEventListener('keydown', handleKeydown)
})

// ---- 键盘快捷键处理 ----
const handleKeydown = (e: KeyboardEvent) => {
  // Ctrl/Cmd + K 打开搜索
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    openSearch()
  }
  // / 键打开搜索（当不在输入框中时）
  if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
    e.preventDefault()
    openSearch()
  }
  // Esc 关闭搜索或模态框
  if (e.key === 'Escape') {
    searchModal.value?.close()
  }
  // Alt + Home 返回首页
  if (e.altKey && e.key === 'Home') {
    e.preventDefault()
    router.push('/')
  }
  // Alt + ← 返回上一页
  if (e.altKey && e.key === 'ArrowLeft') {
    e.preventDefault()
    router.back()
  }
}
</script>

<template>
  <div id="app">
    <!-- 鼠标光晕效果 -->
    <div 
      ref="glowElement"
      class="mouse-glow"
      :style="{ opacity: reducedMotion ? 0 : 1 }"
    ></div>
    
    <nav class="navbar navbar-expand-lg shadow-sm sticky-top">
      <div class="container-fluid px-4">
        <RouterLink to="/" class="navbar-brand d-flex align-items-center">
          <img v-lazy src="/logo.png" alt="dongle Logo" width="38" height="38" class="me-2">
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
            <li class="nav-item">
              <RouterLink to="/tests" class="nav-link" :class="{ 'active': isTestsRoute }">
                心理评估
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/emergency" class="nav-link" :class="{ 'active': isEmergencyRoute }">
                紧急求助
              </RouterLink>
            </li>
          </ul>

          <div class="d-flex align-items-center gap-2">
            <!-- 搜索按钮 -->
            <button
              class="search-trigger-btn"
              type="button"
              @click="openSearch"
              title="搜索 (Ctrl+K)"
              aria-label="搜索"
            >
              <i class="bi bi-search"></i>
            </button>

            <!-- 减少动画按钮 -->
            <button
              class="motion-toggle-btn"
              type="button"
              :class="{ 'motion-active': reducedMotion }"
              :title="reducedMotion ? '恢复动画' : '关闭动画'"
              @click="toggleReducedMotion"
            >
              <i :class="reducedMotionIcon"></i>
            </button>

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
      <router-view v-slot="{ Component }">
        <transition name="page-fade" appear>
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
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
            <p class="text-muted mb-0">&copy; 2026 dongle. All rights reserved.</p>
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

    <!-- 回到顶部按钮 -->
    <BackToTop />

    <!-- 搜索模态框 -->
    <SearchModal ref="searchModal" />
  </div>
</template>

<style scoped>
/* 页面过渡动画 */
.page-fade-enter-active {
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.page-fade-leave-active {
  transition: opacity 0.3s ease-in, transform 0.3s ease-in;
  position: absolute;
  width: 100%;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.page-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.page-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

[data-motion="off"] .page-fade-enter-active,
[data-motion="off"] .page-fade-leave-active {
  transition: none;
}

[data-motion="off"] .page-fade-enter-from,
[data-motion="off"] .page-fade-leave-to {
  opacity: 1;
  transform: none;
}

/* 搜索触发按钮 */
.search-trigger-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1.5px solid var(--color-border);
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all var(--transition-fast);
}

.search-trigger-btn:hover {
  background: rgba(255, 140, 66, 0.08);
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-1px);
}

/* 鼠标光晕效果 */
.mouse-glow {
  position: fixed;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(
    circle,
    rgba(255, 140, 66, 0.15) 0%,
    rgba(255, 140, 66, 0.08) 30%,
    rgba(255, 140, 66, 0.03) 60%,
    transparent 70%
  );
  filter: blur(40px);
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  will-change: transform;
}

/* 深色主题下调整光晕颜色 */
[data-theme="dark"] .mouse-glow {
  background: radial-gradient(
    circle,
    rgba(255, 140, 66, 0.2) 0%,
    rgba(255, 140, 66, 0.1) 30%,
    rgba(255, 140, 66, 0.05) 60%,
    transparent 70%
  );
}

/* 关闭动画模式时隐藏光晕 */
[data-motion="off"] .mouse-glow {
  display: none;
}

/* 确保main内容在光晕之上 */
main {
  position: relative;
  z-index: 1;
}
</style>
