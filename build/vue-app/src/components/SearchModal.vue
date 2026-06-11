<template>
  <div class="search-modal" :class="{ active: isOpen }" @click.self="close">
    <div class="search-container">
      <div class="search-header">
        <Icon icon="mdi:magnify" class="search-icon" />
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
          <Icon icon="mdi:close" />
        </button>
      </div>

      <!-- 分类筛选 -->
      <div class="search-categories">
        <button
          v-for="cat in categories"
          :key="cat.name"
          class="category-btn"
          :class="{ active: selectedCategory === cat.name }"
          :style="selectedCategory === cat.name ? `background-color: ${cat.color}20; color: ${cat.color}; border-color: ${cat.color}40` : ''"
          @click="toggleCategory(cat.name)"
        >
          <Icon :icon="cat.icon" />{{ cat.name }}
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
            <Icon :icon="result.icon" />
          </div>
          <div class="result-content">
            <h4 class="result-title">{{ result.title }}</h4>
            <p class="result-desc">{{ result.description }}</p>
            <span class="result-category">{{ result.category }}</span>
          </div>
          <Icon icon="mdi:arrow-right" class="result-arrow" />
        </div>
      </div>

      <div class="search-empty" v-else-if="query.length > 0">
        <Icon icon="mdi:inbox" size="48" />
        <p>未找到相关内容</p>
      </div>

      <!-- 搜索历史 -->
      <div class="search-history" v-else-if="searchHistory.length > 0">
        <div class="hint-header">
          <p class="hint-title"><Icon icon="mdi:history" /> 最近搜索</p>
          <button class="clear-history-btn" @click="clearSearchHistory">清除</button>
        </div>
        <div class="hint-tags">
          <span
            v-for="(item, index) in searchHistory"
            :key="index"
            class="hint-tag history-tag"
            @click="searchTag(item.query)"
          >
            <Icon icon="mdi:magnify" style="font-size: 0.8rem;" />{{ item.query }}
            <span class="history-category" v-if="item.category">· {{ item.category }}</span>
          </span>
        </div>
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
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/client'
import { useTags } from '@/composables/useStore'
import Icon from './Icon.vue'

const router = useRouter()
const { getCategories } = useTags()

const isOpen = ref(false)
const query = ref('')
const selectedIndex = ref(0)
const searchInput = ref<HTMLInputElement | null>(null)
const selectedCategory = ref<string | null>(null)
const blogPosts = ref<any[]>([])

// 分类列表
const categories = getCategories()

// 搜索历史
interface SearchHistoryItem {
  query: string
  category?: string
  timestamp: number
}

const searchHistory = ref<SearchHistoryItem[]>([])
const HISTORY_KEY = 'search_history'
const MAX_HISTORY = 10

// 从 localStorage 加载搜索历史
const loadSearchHistory = () => {
  try {
    const saved = localStorage.getItem(HISTORY_KEY)
    if (saved) {
      searchHistory.value = JSON.parse(saved)
    }
  } catch {
    searchHistory.value = []
  }
}

// 保存搜索历史
const saveToHistory = (searchQuery: string, category?: string) => {
  if (!searchQuery.trim()) return

  // 移除已存在的相同搜索
  const filtered = searchHistory.value.filter(
    item => !(item.query === searchQuery && item.category === category)
  )

  // 添加到最前面
  filtered.unshift({
    query: searchQuery,
    category,
    timestamp: Date.now()
  })

  // 保留最近 10 条
  searchHistory.value = filtered.slice(0, MAX_HISTORY)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory.value))
}

// 清除搜索历史
const clearSearchHistory = () => {
  searchHistory.value = []
  localStorage.removeItem(HISTORY_KEY)
}

// 从 Supabase 加载博客文章
const loadBlogPosts = async () => {
  try {
    // 加载用户文章
    const { data: userPosts } = await supabase
      .from('user_posts')
      .select('id, title, excerpt, content, category, slug, color, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })

    // 构建搜索数据：静态 + 动态
    const staticData = [
      { id: 'static-1', title: 'SniShaper', description: '智能网络代理工具，集成ECH注入、TLS-RF分片等技术', category: '编程教程', icon: 'mdi:shield-check', color: '#00ADD8', path: '/snishaper/index.html' },
      { id: 'static-2', title: 'English Listen WinUI', description: '现代化英语听写训练工具，WinUI 3 + C# + C++混合开发', category: '技术分享', icon: 'mdi:headphones', color: '#f48c06', path: '/project/english-listen-winui' },
      { id: 'static-3', title: 'English-Listen', description: '专业英语听写训练工具，基于C++和Qt6开发', category: '技术分享', icon: 'mdi:book-open-page-variant', color: '#52b788', path: '/project/english-listen' },
      { id: 'static-4', title: 'MBTI 人格测试', description: '迈尔斯-布里格斯类型指标，93道题识别16种人格类型', category: '心理测试', icon: 'mdi:account-badge', color: '#ff6b35', path: '/tests/mbti' },
      { id: 'static-5', title: '抑郁自评量表', description: '专业的抑郁症自我评估工具', category: '心理测试', icon: 'mdi:heart-pulse', color: '#e63946', path: '/tests/depression' },
      { id: 'static-6', title: '焦虑自评量表', description: '评估焦虑程度的专业工具', category: '心理测试', icon: 'mdi:activity', color: '#ff9f1c', path: '/tests/anxiety' },
      { id: 'static-7', title: '关于我们', description: '了解JetCPP的故事和技术背景', category: '团队动态', icon: 'mdi:account-group', color: '#4cc9f0', path: '/about' },
      { id: 'static-8', title: '技术博客', description: 'C++编程经验、项目开发心得分享', category: '技术分享', icon: 'mdi:newspaper-variant', color: '#f48c06', path: '/blog' },
    ]

    // 动态文章转换为搜索数据
    const dynamicData = (userPosts || []).map(post => ({
      id: `user-${post.id}`,
      title: post.title,
      description: post.excerpt || (post.content ? post.content.substring(0, 120) + '...' : ''),
      category: post.category || '技术分享',
      icon: 'mdi:newspaper-variant',
      color: post.color || '#FF6B6B',
      path: `/blog/${post.slug}`
    }))

    blogPosts.value = [...staticData, ...dynamicData]
  } catch (e) {
    console.error('加载博客文章失败:', e)
    // 降级使用静态数据
    blogPosts.value = [
      { id: 'static-1', title: 'SniShaper', description: '智能网络代理工具，集成ECH注入、TLS-RF分片等技术', category: '编程教程', icon: 'mdi:shield-check', color: '#00ADD8', path: '/snishaper/index.html' },
      { id: 'static-4', title: 'MBTI 人格测试', description: '迈尔斯-布里格斯类型指标，93道题识别16种人格类型', category: '心理测试', icon: 'mdi:account-badge', color: '#ff6b35', path: '/tests/mbti' },
      { id: 'static-8', title: '技术博客', description: 'C++编程经验、项目开发心得分享', category: '技术分享', icon: 'mdi:newspaper-variant', color: '#f48c06', path: '/blog' },
    ]
  }
}

const hotTags = ['SniShaper', '英语听写', 'MBTI', 'C++', '心理测试']

const toggleCategory = (catName: string) => {
  selectedCategory.value = selectedCategory.value === catName ? null : catName
  selectedIndex.value = 0
}

const results = computed(() => {
  if (!query.value.trim() && !selectedCategory.value) return []

  const q = query.value.toLowerCase()
  return blogPosts.value.filter(item => {
    // 分类筛选
    const categoryMatch = !selectedCategory.value || item.category === selectedCategory.value
    // 搜索匹配（有搜索词时匹配，无搜索词时仅按分类筛选）
    const queryMatch = !q || item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    return categoryMatch && queryMatch
  })
})

const open = () => {
  isOpen.value = true
  query.value = ''
  selectedIndex.value = 0
  selectedCategory.value = null
  loadSearchHistory()
  nextTick(() => {
    searchInput.value?.focus()
  })
  document.body.style.overflow = 'hidden'
}

const close = () => {
  isOpen.value = false
  query.value = ''
  selectedCategory.value = null
  document.body.style.overflow = ''
}

const handleSearch = () => {
  selectedIndex.value = 0
}

const navigateTo = (result: any) => {
  // 保存搜索历史
  if (query.value.trim()) {
    saveToHistory(query.value.trim(), result.category)
  }

  // 外部链接或 HTML 文件直接使用 window.open
  if (result.path.startsWith('http') || result.path.endsWith('.html')) {
    window.open(result.path, '_blank', 'noopener,noreferrer')
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

onMounted(() => {
  loadBlogPosts()
})

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

.search-categories {
  display: flex;
  gap: 8px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
}

.category-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: var(--color-bg);
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-family: inherit;
}

.category-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.category-btn.active {
  font-weight: 600;
}

.search-results {
  max-height: calc(70vh - 140px);
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

.search-history,
.search-hints {
  padding: 24px 20px;
}

.hint-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.hint-title {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.clear-history-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.clear-history-btn:hover {
  background: var(--color-bg-soft);
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
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.hint-tag:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.history-tag {
  font-size: 0.82rem;
}

.history-category {
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.hint-tag:hover .history-category {
  color: rgba(255, 255, 255, 0.7);
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
    max-height: calc(100vh - 140px);
  }

  .search-categories {
    padding: 10px 16px;
    gap: 6px;
  }

  .category-btn {
    font-size: 0.8rem;
    padding: 5px 12px;
  }
}
</style>
