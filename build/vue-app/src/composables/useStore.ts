import { ref } from 'vue'
import { supabase } from '@/supabase/client'

// ==================== 收藏夹管理 ====================

export interface FavoriteItem {
  id: string
  title: string
  description?: string
  icon?: string
  color?: string
  type: 'test' | 'blog'
}

const favorites = ref<FavoriteItem[]>([])
const favoritesLoading = ref(false)

export function useFavorites() {
  const isFavorite = (id: string) => favorites.value.some(f => f.id === id)

  const loadFavorites = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    favoritesLoading.value = true
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('item_id, item_title, item_description, item_icon, item_color, item_type')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      favorites.value = (data || []).map(row => ({
        id: row.item_id,
        title: row.item_title,
        description: row.item_description,
        icon: row.item_icon,
        color: row.item_color,
        type: row.item_type
      }))
    } catch (e) {
      console.error('加载收藏夹失败:', e)
    } finally {
      favoritesLoading.value = false
    }
  }

  const toggleFavorite = async (item: FavoriteItem) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const existing = favorites.value.find(f => f.id === item.id)

    if (existing) {
      // 移除收藏
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('item_id', item.id)

      if (error) {
        console.error('移除收藏失败:', error)
        return
      }
      favorites.value = favorites.value.filter(f => f.id !== item.id)
    } else {
      // 添加收藏
      const { error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          item_id: item.id,
          item_title: item.title,
          item_description: item.description || null,
          item_icon: item.icon || null,
          item_color: item.color || null,
          item_type: item.type
        })

      if (error) {
        console.error('添加收藏失败:', error)
        return
      }
      favorites.value.unshift(item)
    }
  }

  return {
    favorites,
    favoritesLoading,
    isFavorite,
    toggleFavorite,
    loadFavorites
  }
}

// ==================== 历史记录管理 ====================

export interface HistoryItem {
  testId: string
  testTitle: string
  score?: number
  maxScore?: number
  level?: string
  answers?: Record<number, number>
  completedAt: string
}

const history = ref<HistoryItem[]>([])
const historyLoading = ref(false)

export function useHistory() {
  const loadHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    historyLoading.value = true
    try {
      const { data, error } = await supabase
        .from('user_test_history')
        .select('test_id, test_title, score, max_score, level, completed_at')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(50)

      if (error) throw error

      history.value = (data || []).map(row => ({
        testId: row.test_id,
        testTitle: row.test_title,
        score: row.score,
        maxScore: row.max_score,
        level: row.level,
        completedAt: row.completed_at
      }))
    } catch (e) {
      console.error('加载历史记录失败:', e)
    } finally {
      historyLoading.value = false
    }
  }

  const addToHistory = async (item: HistoryItem) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // 检查是否已存在，存在则更新
    const { data: existing } = await supabase
      .from('user_test_history')
      .select('id')
      .eq('user_id', user.id)
      .eq('test_id', item.testId)
      .single()

    if (existing) {
      const { error } = await supabase
        .from('user_test_history')
        .update({
          test_title: item.testTitle,
          score: item.score,
          max_score: item.maxScore,
          level: item.level,
          completed_at: item.completedAt
        })
        .eq('id', existing.id)

      if (error) {
        console.error('更新历史记录失败:', error)
        return
      }
    } else {
      const { error } = await supabase
        .from('user_test_history')
        .insert({
          user_id: user.id,
          test_id: item.testId,
          test_title: item.testTitle,
          score: item.score,
          max_score: item.maxScore,
          level: item.level,
          completed_at: item.completedAt
        })

      if (error) {
        console.error('添加历史记录失败:', error)
        return
      }
    }

    // 本地同步：更新或插入，保持最近50条
    const idx = history.value.findIndex(h => h.testId === item.testId)
    if (idx >= 0) {
      history.value.splice(idx, 1, item)
    } else {
      history.value.unshift(item)
    }
    if (history.value.length > 50) {
      history.value = history.value.slice(0, 50)
    }
  }

  const getTestHistory = () => history.value

  const clearHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('user_test_history')
      .delete()
      .eq('user_id', user.id)

    if (error) {
      console.error('清空历史记录失败:', error)
      return
    }
    history.value = []
  }

  return {
    history,
    historyLoading,
    loadHistory,
    addToHistory,
    getTestHistory,
    clearHistory
  }
}

// ==================== 标签管理 ====================

interface TagRow {
  name: string
  count: number
}

const allTags = ref<Record<string, number>>({})
const tagsLoading = ref(false)

export interface Category {
  name: string
  icon: string
  color: string
}

const defaultCategories: Category[] = [
  { name: '编程教程', icon: 'mdi:code-braces', color: '#FF6B6B' },
  { name: '心理测试', icon: 'mdi:brain', color: '#6C63FF' },
  { name: '技术分享', icon: 'mdi:lightbulb-on', color: '#FFB347' },
  { name: '团队动态', icon: 'mdi:account-group', color: '#4ECDC4' }
]

export function useTags() {
  const loadTags = async () => {
    tagsLoading.value = true
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('name, count')
        .order('count', { ascending: false })

      if (error) throw error

      const tags: Record<string, number> = {}
      for (const row of (data || []) as TagRow[]) {
        tags[row.name] = row.count
      }
      allTags.value = tags
    } catch (e) {
      console.error('加载标签失败:', e)
    } finally {
      tagsLoading.value = false
    }
  }

  const getPopularTags = (limit = 10) => {
    return Object.entries(allTags.value)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
  }

  const incrementTag = async (name: string) => {
    // Upsert: 存在则 count+1，不存在则插入
    const { error } = await supabase
      .from('tags')
      .upsert({ name, count: (allTags.value[name] || 0) + 1 }, { onConflict: 'name' })

    if (error) {
      console.error('更新标签失败:', error)
      return
    }

    // 同步本地状态
    allTags.value[name] = (allTags.value[name] || 0) + 1
  }

  const getCategories = (): Category[] => {
    return defaultCategories
  }

  return {
    allTags,
    tagsLoading,
    loadTags,
    getPopularTags,
    incrementTag,
    getCategories
  }
}

// ==================== 测试进度保存（保持 localStorage） ====================

export interface TestProgress {
  testId: string
  answers: Record<number, number>
  lastQuestion: number
  savedAt: string
}

export function useTestProgress() {
  const getProgress = (testId: string): TestProgress | null => {
    const saved = localStorage.getItem(`test_progress_${testId}`)
    return saved ? JSON.parse(saved) : null
  }

  const saveProgress = (testId: string, answers: Record<number, number>, lastQuestion: number) => {
    const progress: TestProgress = {
      testId,
      answers,
      lastQuestion,
      savedAt: new Date().toISOString()
    }
    localStorage.setItem(`test_progress_${testId}`, JSON.stringify(progress))
  }

  const clearProgress = (testId: string) => {
    localStorage.removeItem(`test_progress_${testId}`)
  }

  const getAllProgress = (): TestProgress[] => {
    const progress: TestProgress[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('test_progress_')) {
        const data = localStorage.getItem(key)
        if (data) {
          progress.push(JSON.parse(data))
        }
      }
    }
    return progress.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
  }

  return {
    getProgress,
    saveProgress,
    clearProgress,
    getAllProgress
  }
}
