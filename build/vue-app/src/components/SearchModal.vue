<template>
  <div class="search-modal" :class="{ active: isOpen }" @click.self="close">
    <div class="search-container">
      <div class="search-header">
        <i class="bi bi-search search-icon"></i>
        <input
          ref="searchInput"
          v-model="query"
          type="text"
          placeholder="搜索项目、博客..."
          class="search-input"
          @keyup.esc="close"
          @input="handleSearch"
        />
        <button class="search-close" @click="close" aria-label="关闭搜索">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div class="search-results" v-if="results.length > 0">
        <div
          v-for="(result, index) in results"
          :key="result.id"
          class="search-result-item"
          :class="{ selected: selectedIndex === index }"
          @click="navigateTo(result)"
          @mouseenter="selectedIndex = index"
        >
          <div class="result-icon" :style="`background-color: ${result.color}18; color: ${result.color}`">
            <i :class="result.icon"></i>
          </div>
          <div class="result-content">
            <h4 class="result-title">{{ result.title }}</h4>
            <p class="result-desc">{{ result.description }}</p>
            <span class="result-category">{{ result.category }}</span>
          </div>
          <i class="bi bi-arrow-right result-arrow"></i>
        </div>
      </div>

      <div class="search-empty" v-else-if="query.length > 0">
        <i class="bi bi-inbox fs-1"></i>
        <p>未找到相关内容</p>
      </div>

      <div class="search-hints" v-else>
        <p class="hint-title">热门搜索</p>
        <div class="hint-tags">
          <span
            v-for="tag in hotTags"
            :key="tag"
            class="hint-tag"
            @click="searchTag(tag)"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)
const query = ref('')
const selectedIndex = ref(0)
const searchInput = ref<HTMLInputElement | null>(null)

// 搜索数据源
const searchData = [
  { id: 1, title: 'SniShaper', description: '智能网络代理工具，集成ECH注入、TLS-RF分片等技术', category: '网络工具', icon: 'bi bi-shield-check', color: '#00ADD8', path: '/project/snishaper.html' },
  { id: 2, title: 'English Listen WinUI', description: '现代化英语听写训练工具，WinUI 3 + C# + C++混合开发', category: '教育软件', icon: 'bi bi-headphones', color: '#f48c06', path: '/project/english-listen-winui.html' },
  { id: 3, title: 'English-Listen', description: '专业英语听写训练工具，基于C++和Qt6开发', category: '教育软件', icon: 'bi bi-book', color: '#52b788', path: '/project/english-listen.html' },
  { id: 4, title: 'MBTI 人格测试', description: '迈尔斯-布里格斯类型指标，93道题识别16种人格类型', category: '心理评估', icon: 'bi bi-person-badge', color: '#ff6b35', path: '/tests/mbti' },
  { id: 5, title: '抑郁自评量表', description: '专业的抑郁症自我评估工具', category: '心理评估', icon: 'bi bi-heart-pulse', color: '#e63946', path: '/tests/depression' },
  { id: 6, title: '焦虑自评量表', description: '评估焦虑程度的专业工具', category: '心理评估', icon: 'bi bi-activity', color: '#ff9f1c', path: '/tests/anxiety' },
  { id: 7, title: '关于我', description: '了解dongle的故事和技术背景', category: '个人', icon: 'bi bi-person', color: '#4cc9f0', path: '/about' },
  { id: 8, title: '技术博客', description: 'C++编程经验、项目开发心得分享', category: '博客', icon: 'bi bi-journal-text', color: '#f48c06', path: '/blog' },
]

const hotTags = ['SniShaper', '英语听写', 'MBTI', 'C++', '心理测试']

const results = computed(() => {
  if (!query.value.trim()) return []
  
  const q = query.value.toLowerCase()
  return searchData.filter(item => 
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  )
})

const open = () => {
  isOpen.value = true
  query.value = ''
  selectedIndex.value = 0
  nextTick(() => {
    searchInput.value?.focus()
  })
  document.body.style.overflow = 'hidden'
}

const close = () => {
  isOpen.value = false
  query.value = ''
  document.body.style.overflow = ''
}

const handleSearch = () => {
  selectedIndex.value = 0
}

const navigateTo = (result: any) => {
  if (result.path.startsWith('http')) {
    window.open(result.path, '_blank')
  } else {
    router.push(result.path)
  }
  close()
}

const searchTag = (tag: string) => {
  query.value = tag
  searchInput.value?.focus()
}

// 键盘快捷键
watch(isOpen, (val) => {
  if (val) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})

const handleKeydown = (e: KeyboardEvent) => {
  if (!isOpen.value) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
  } else if (e.key === 'Enter' && results.value[selectedIndex.value]) {
    e.preventDefault()
    navigateTo(results.value[selectedIndex.value])
  }
}

// 暴露方法给父组件
defineExpose({ open, close })
</script>

<style scoped>
.search-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.search-modal.active {
  opacity: 1;
  visibility: visible;
}

.search-container {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 640px;
  max-height: 70vh;
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  transform: translateY(-20px) scale(0.95);
  transition: transform 0.3s var(--ease-out-expo);
}

.search-modal.active .search-container {
  transform: translateY(0) scale(1);
}

.search-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
  gap: 12px;
}

.search-icon {
  font-size: 1.2rem;
  color: var(--color-text-muted);
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: var(--color-text);
  outline: none;
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.search-close {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.search-close:hover {
  background: var(--color-bg-soft);
  color: var(--color-text);
}

.search-results {
  max-height: calc(70vh - 80px);
  overflow-y: auto;
  padding: 8px;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.search-result-item:hover,
.search-result-item.selected {
  background: var(--color-bg-soft);
}

.result-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.result-content {
  flex: 1;
  min-width: 0;
}

.result-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 0 0 4px 0;
}

.result-desc {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-category {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  background: var(--color-bg-mute);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.result-arrow {
  color: var(--color-text-muted);
  opacity: 0;
  transition: all var(--transition-fast);
}

.search-result-item:hover .result-arrow,
.search-result-item.selected .result-arrow {
  opacity: 1;
  color: var(--color-primary);
}

.search-empty {
  padding: 48px 20px;
  text-align: center;
  color: var(--color-text-muted);
}

.search-empty i {
  margin-bottom: 12px;
  opacity: 0.5;
}

.search-hints {
  padding: 24px 20px;
}

.hint-title {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.hint-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hint-tag {
  padding: 6px 12px;
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.hint-tag:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .search-modal {
    padding-top: 0;
    align-items: stretch;
  }

  .search-container {
    width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }

  .search-results {
    max-height: calc(100vh - 80px);
  }
}
</style>
