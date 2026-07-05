<template>
  <div class="blog-page">
    <!-- Hero Section — 统一暖色渐变风格 -->
    <section class="blog-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%">
            <h1 class="blog-title mb-4 animate-slide-up" :class="{ visible: isVisible }">
              我们的技术博客
            </h1>
            <p
              class="blog-subtitle mb-4 animate-slide-up"
              :class="{ visible: isVisible }"
              style="animation-delay: 0.2s"
            >
              记录编程历程，分享开发心得，探索技术世界
            </p>
          </div>
          <div class="col-lg-4">
            <div
              class="hero-illustration animate-float"
              :class="{ visible: isVisible }"
              style="animation-delay: 0.4s"
            >
              <Icon
                icon="mdi:newspaper-variant"
                size="64"
                style="color: var(--color-primary); opacity: 0.3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Posts -->
    <section class="blog-section py-5">
      <div class="container-fluid px-5">
        <!-- 写文章按钮（仅登录用户可见） -->
        <div v-if="isAuthenticated" class="write-post-btn-container mb-4">
          <RouterLink to="/blog/new" class="btn btn-primary btn-animate btn-lg">
            <Icon icon="mdi:pencil" />
            写文章
          </RouterLink>
        </div>

        <!-- 分类筛选栏 -->
        <div class="category-filter mb-4">
          <button
            v-for="cat in categories"
            :key="cat.value"
            class="category-btn"
            :class="{ active: activeCategory === cat.value }"
            @click="activeCategory = cat.value"
          >
            <Icon :icon="cat.icon" class="me-1" />
            {{ cat.label }}
            <span v-if="cat.value !== 'all'" class="category-count">{{
              getCategoryCount(cat.value)
            }}</span>
          </button>
        </div>

        <div class="row">
          <!-- 文章列表 -->
          <div :class="showSidebar ? 'col-lg-9' : 'col-12'">
            <!-- 加载中 -->
            <div v-if="loading" class="loading-posts">
              <div class="spinner"></div>
              <p>加载文章中...</p>
            </div>

            <!-- 文章列表 -->
            <div v-else>
              <div
                class="blog-post card mb-4 border-0 shadow-sm card-hover animate-slide-up"
                v-for="(post, index) in filteredPosts"
                :key="post.id"
                :class="{ visible: isVisible }"
                :style="`animation-delay: ${index * 0.15}s`"
              >
                <div class="card-body p-4">
                  <div class="blog-header mb-3">
                    <div
                      class="blog-category-badge mb-2"
                      :style="`background-color: ${post.color}20; color: ${post.color}`"
                    >
                      <Icon icon="mdi:tag" style="margin-right: 4px" />{{ post.category }}
                    </div>
                    <h5 class="card-title fw-bold">{{ post.title }}</h5>
                  </div>
                  <p class="card-text text-muted mb-4">{{ post.excerpt }}</p>
                  <div class="blog-footer d-flex justify-content-between align-items-center">
                    <div class="blog-meta">
                      <small class="text-muted">
                        <Icon icon="mdi:calendar" style="margin-right: 4px" />{{ post.date }} ·
                        <Icon icon="mdi:account" style="margin-left: 8px; margin-right: 4px" />{{
                          post.author
                        }}
                      </small>
                    </div>
                    <div class="blog-actions">
                      <RouterLink
                        v-if="post.isEditable"
                        :to="`/blog/edit/${post.originalId}`"
                        class="btn btn-sm btn-outline-secondary me-2"
                      >
                        <Icon icon="mdi:pencil" />
                        编辑
                      </RouterLink>
                      <button
                        v-if="post.isDeletable"
                        @click="handleDeletePost(post.originalId, post.title)"
                        class="btn btn-sm btn-outline-danger me-2"
                      >
                        <Icon icon="mdi:delete" />
                        删除
                      </button>
                      <RouterLink
                        :to="post.link"
                        class="btn btn-sm btn-animate"
                        style="border: 1.5px solid var(--color-border); color: var(--color-text)"
                      >
                        阅读全文 <Icon icon="mdi:arrow-right" style="margin-left: 4px" />
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 无文章提示 -->
              <div v-if="filteredPosts.length === 0" class="no-posts">
                <Icon icon="mdi:text-box-remove" />
                <p>暂无文章</p>
              </div>
            </div>
          </div>

          <!-- 侧边栏 -->
          <div v-if="showSidebar" class="col-lg-3">
            <div class="blog-sidebar">
              <TagCloud :tags="allTags" @tag-click="handleTagClick" />
              <RssSubscribe class="mt-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/supabase/client'
import { useAuth } from '@/composables/useAuth'
import { useAnimations } from '@/composables/useAnimations'
import { useTags } from '@/composables/useStore'
import Icon from '@/components/Icon.vue'
import TagCloud from '@/components/TagCloud.vue'
import RssSubscribe from '@/components/RssSubscribe.vue'

const { user, isAuthenticated } = useAuth()
const { isVisible } = useAnimations()
const { allTags, loadTags } = useTags()

const loading = ref(true)
const activeCategory = ref('all')
const showSidebar = ref(true)

// 分类定义
const categories = [
  { value: 'all', label: '全部', icon: 'mdi:view-grid' },
  { value: '编程教程', label: '编程教程', icon: 'mdi:code-braces' },
  { value: '心理测试', label: '心理测试', icon: 'mdi:brain' },
  { value: '技术分享', label: '技术分享', icon: 'mdi:share-variant' },
  { value: '个人文章', label: '个人文章', icon: 'mdi:note-text' },
]

// 静态博客文章数据
const staticPosts = ref([
  {
    id: 'static-1',
    originalId: null,
    title: 'C++完全入门指南：从Hello World到结构体',
    excerpt:
      '这是一篇详细的C++入门指南，从最基础的Hello World程序开始，逐步讲解变量、数据类型、控制流、函数、指针到结构体等核心概念，适合初学者系统学习C++编程。',
    date: '2026-12-24',
    author: 'JetCPP Team',
    link: '/blog/cpp-guide',
    color: '#FF6B6B',
    category: '编程教程',
    isEditable: false,
  },
  {
    id: 'static-2',
    originalId: null,
    title: 'C# 从入门到精通（零基础到进阶）',
    excerpt:
      '一份全面的C#学习指南，涵盖从基础语法到高级特性的完整知识体系。包括变量、数据类型、控制流、方法、数组、面向对象编程、泛型、委托事件、LINQ查询和异步编程等核心内容，附带完整的学生管理系统实战项目。',
    date: '2026-03-04',
    author: 'JetCPP Team',
    link: '/blog/csharp-guide',
    color: '#dc2f02',
    category: '编程教程',
    isEditable: false,
  },
  {
    id: 'static-3',
    originalId: null,
    title: 'XAML 从入门到精通（零基础到进阶）',
    excerpt:
      'WPF界面开发完全指南，从XAML基础语法到MVVM架构模式。涵盖布局系统、常用控件、资源管理、数据绑定、样式模板、动画系统和自定义控件等内容，最后通过一个完整的待办事项应用项目展示实战技巧。',
    date: '2026-03-04',
    author: 'JetCPP Team',
    link: '/blog/xaml-guide',
    color: '#52b788',
    category: '编程教程',
    isEditable: false,
  },
])

// 用户文章数据
const userPosts = ref<any[]>([])

// 合并所有文章
const allPosts = computed(() => {
  // 转换用户文章格式
  const formattedUserPosts = userPosts.value.map((post) => ({
    id: `user-${post.id}`,
    originalId: post.id,
    title: post.title,
    excerpt: post.excerpt || post.content.substring(0, 200) + '...',
    date: new Date(post.created_at).toLocaleDateString('zh-CN'),
    author: post.author_nickname || '匿名用户',
    link: `/blog/${post.slug}`,
    color: post.color || '#FF6B6B',
    category: post.category || '个人文章',
    isEditable: user.value?.id === post.author_id,
    isDeletable: user.value?.id === post.author_id,
  }))

  // 用户文章在前，静态文章在后
  return [...formattedUserPosts, ...staticPosts.value]
})

// 按分类筛选文章
const filteredPosts = computed(() => {
  if (activeCategory.value === 'all') return allPosts.value
  return allPosts.value.filter((post) => post.category === activeCategory.value)
})

// 获取分类文章数量
const getCategoryCount = (category: string) => {
  return allPosts.value.filter((post) => post.category === category).length
}

// 处理标签点击
const handleTagClick = (tag: string) => {
  activeCategory.value = 'all'
  // 搜索包含该标签的文章
}

onMounted(async () => {
  await Promise.all([loadUserPosts(), loadTags()])
})

// 加载用户文章
async function loadUserPosts() {
  loading.value = true

  try {
    // 第一步：查询文章数据
    const { data: postsData, error: postsError } = await supabase
      .from('user_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (postsError) throw postsError

    const posts = postsData || []

    // 第二步：获取所有作者 ID
    const authorIds = [...new Set(posts.map((p) => p.author_id).filter(Boolean))]

    // 第三步：批量查询作者资料
    let authorMap = new Map()
    if (authorIds.length > 0) {
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, nickname')
        .in('id', authorIds)

      if (profilesData) {
        profilesData.forEach((profile) => {
          authorMap.set(profile.id, profile.nickname)
        })
      }
    }

    // 第四步：合并数据
    userPosts.value = posts.map((post) => ({
      ...post,
      author_nickname: authorMap.get(post.author_id) || null,
    }))
  } catch (err: any) {
    console.error('加载用户文章失败:', err)

    // 如果关联查询失败，尝试简单查询
    try {
      const { data, error } = await supabase
        .from('user_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      userPosts.value = (data || []).map((post) => ({
        ...post,
        author_nickname: null,
      }))
    } catch (fallbackErr: any) {
      console.error('备用查询也失败:', fallbackErr)
      userPosts.value = []
    }
  } finally {
    loading.value = false
  }
}

// 删除文章
async function handleDeletePost(postId: string, title: string) {
  if (!confirm(`确定要删除文章 "${title}" 吗？此操作不可恢复！`)) {
    return
  }

  try {
    const { error } = await supabase.from('user_posts').delete().eq('id', postId)

    if (error) throw error

    // 从列表中移除
    userPosts.value = userPosts.value.filter((p) => p.id !== postId)

    alert('文章已删除')
  } catch (err: any) {
    console.error('删除文章失败:', err)
    alert('删除失败: ' + err.message)
  }
}
</script>

<style scoped>
.blog-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.02em;
}

.blog-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  max-width: 520px;
  line-height: 1.7;
}

.write-post-btn-container {
  display: flex;
  justify-content: flex-end;
}

.loading-posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 4rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(59, 130, 246, 0.2);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.blog-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.no-posts {
  text-align: center;
  padding: 4rem 0;
  color: var(--color-text-secondary);
}

.no-posts i {
  font-size: 4rem;
  opacity: 0.3;
  margin-bottom: 1rem;
}

/* 分类筛选栏 */
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 2rem;
}

.category-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.25s ease;
}

.category-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.category-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.category-count {
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-left: 0.25rem;
}

.category-btn.active .category-count {
  background: rgba(255, 255, 255, 0.25);
}

/* 侧边栏 */
.blog-sidebar {
  position: sticky;
  top: 100px;
}

@media (max-width: 991.98px) {
  .blog-sidebar {
    margin-top: 2rem;
  }
}
</style>
