<template>
  <div class="admin-page">
    <div class="container">
      <div class="admin-header">
        <h1><Icon icon="mdi:shield-lock" /> 管理员面板</h1>
        <RouterLink to="/blog" class="btn btn-secondary">
          <Icon icon="mdi:arrow-left" />
          返回博客
        </RouterLink>
      </div>

      <!-- 权限检查 -->
      <div v-if="!isAdmin" class="access-denied">
        <Icon icon="mdi:alert" />
        <h2>访问被拒绝</h2>
        <p>您没有管理员权限</p>
        <RouterLink to="/" class="btn btn-primary">返回首页</RouterLink>
      </div>

      <!-- 管理员功能 -->
      <div v-else class="admin-content">
        <!-- 统计卡片 -->
        <div class="stats-grid">
          <div class="stat-card">
            <Icon icon="mdi:account-group" />
            <div class="stat-info">
              <h3>{{ stats.totalUsers }}</h3>
              <p>总用户数</p>
            </div>
          </div>
          <div class="stat-card">
            <Icon icon="mdi:text-box-outline" />
            <div class="stat-info">
              <h3>{{ stats.totalPosts }}</h3>
              <p>文章总数</p>
            </div>
          </div>
          <div class="stat-card">
            <Icon icon="mdi:comment" />
            <div class="stat-info">
              <h3>{{ stats.totalComments }}</h3>
              <p>评论总数</p>
            </div>
          </div>
        </div>

        <!-- 标签页 -->
        <div class="admin-tabs">
          <button
            :class="['tab-btn', { active: activeTab === 'users' }]"
            @click="activeTab = 'users'"
          >
            <Icon icon="mdi:account-group" /> 用户管理
          </button>
          <button
            :class="['tab-btn', { active: activeTab === 'posts' }]"
            @click="activeTab = 'posts'"
          >
            <Icon icon="mdi:text-box-outline" /> 文章管理
          </button>
          <button
            :class="['tab-btn', { active: activeTab === 'comments' }]"
            @click="activeTab = 'comments'"
          >
            <Icon icon="mdi:comment" /> 评论管理
          </button>
        </div>

        <!-- 用户管理 -->
        <div v-if="activeTab === 'users'" class="tab-content">
          <div class="tab-header">
            <h2>用户管理</h2>
            <input
              v-model="userSearch"
              type="text"
              placeholder="搜索用户..."
              class="search-input"
            />
          </div>

          <div v-if="loading" class="loading">
            <div class="spinner"></div>
            <p>加载中...</p>
          </div>

          <div v-else class="data-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>昵称</th>
                  <th>注册时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="profile in filteredUsers" :key="profile.id">
                  <td>
                    <small>{{ profile.id.substring(0, 8) }}...</small>
                  </td>
                  <td>
                    {{ profile.nickname || '未设置' }}
                    <span
                      v-if="profile.banned"
                      class="status-badge banned"
                      style="margin-left: 0.5rem"
                    >
                      已封禁
                    </span>
                  </td>
                  <td>{{ formatDate(profile.created_at) }}</td>
                  <td>
                    <div class="d-flex gap-1">
                      <button
                        v-if="profile.id !== user?.id"
                        @click="handleViewProfile(profile.id)"
                        class="btn-action btn-view"
                        title="查看资料"
                      >
                        <Icon icon="mdi:eye" />
                      </button>
                      <button
                        v-if="profile.id !== user?.id && !profile.banned"
                        @click="handleBanUser(profile.id, profile.nickname)"
                        class="btn-action btn-ban"
                        title="封禁用户"
                      >
                        <Icon icon="mdi:cancel" />
                      </button>
                      <button
                        v-if="profile.id !== user?.id && profile.banned"
                        @click="handleUnbanUser(profile.id, profile.nickname)"
                        class="btn-action btn-unban"
                        title="解封用户"
                      >
                        <Icon icon="mdi:check-circle" />
                      </button>
                      <button
                        v-if="profile.id !== user?.id"
                        @click="handleDeleteUser(profile.id, profile.nickname)"
                        class="btn-action btn-delete"
                        title="删除用户"
                      >
                        <Icon icon="mdi:delete" />
                      </button>
                      <span v-else class="text-muted" style="font-size: 0.85rem">
                        <Icon icon="mdi:account-check" /> 当前用户
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 文章管理 -->
        <div v-if="activeTab === 'posts'" class="tab-content">
          <div class="tab-header">
            <h2>文章管理</h2>
            <div class="filter-group">
              <select v-model="postFilter" class="filter-select">
                <option value="all">全部文章</option>
                <option value="published">已发布</option>
                <option value="draft">草稿</option>
              </select>
              <input
                v-model="postSearch"
                type="text"
                placeholder="搜索文章..."
                class="search-input"
              />
            </div>
          </div>

          <div v-if="loading" class="loading">
            <div class="spinner"></div>
            <p>加载中...</p>
          </div>

          <div v-else class="data-table">
            <table>
              <thead>
                <tr>
                  <th>标题</th>
                  <th>作者ID</th>
                  <th>状态</th>
                  <th>发布时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="post in filteredPosts" :key="post.id">
                  <td>{{ post.title }}</td>
                  <td>
                    <small>{{ post.author_id?.substring(0, 8) }}...</small>
                  </td>
                  <td>
                    <span :class="['status-badge', post.published ? 'published' : 'draft']">
                      {{ post.published ? '已发布' : '草稿' }}
                    </span>
                  </td>
                  <td>{{ formatDate(post.created_at) }}</td>
                  <td>
                    <button
                      v-if="post.author_id !== user?.id"
                      @click="handleEditPost(post.id)"
                      class="btn-action btn-edit"
                      title="编辑"
                    >
                      <Icon icon="mdi:pencil" />
                    </button>
                    <button
                      v-if="post.author_id !== user?.id"
                      @click="handleDeletePost(post.id, post.title)"
                      class="btn-action btn-delete"
                      title="删除"
                    >
                      <Icon icon="mdi:delete" />
                    </button>
                    <span
                      v-if="post.author_id === user?.id"
                      class="text-muted"
                      style="font-size: 0.85rem"
                    >
                      <Icon icon="mdi:lock" /> 自己的文章
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 评论管理 -->
        <div v-if="activeTab === 'comments'" class="tab-content">
          <div class="tab-header">
            <h2>评论管理</h2>
            <input
              v-model="commentSearch"
              type="text"
              placeholder="搜索评论..."
              class="search-input"
            />
          </div>

          <div v-if="loading" class="loading">
            <div class="spinner"></div>
            <p>加载中...</p>
          </div>

          <div v-else class="data-table">
            <table>
              <thead>
                <tr>
                  <th>内容</th>
                  <th>用户ID</th>
                  <th>文章</th>
                  <th>时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="comment in filteredComments" :key="comment.id">
                  <td class="content-cell">{{ truncateText(comment.content, 50) }}</td>
                  <td>
                    <small>{{ comment.user_id?.substring(0, 8) }}...</small>
                  </td>
                  <td>{{ comment.post_slug }}</td>
                  <td>{{ formatDate(comment.created_at) }}</td>
                  <td>
                    <button
                      v-if="comment.user_id !== user?.id"
                      @click="handleDeleteComment(comment.id)"
                      class="btn-action btn-delete"
                      title="删除"
                    >
                      <Icon icon="mdi:delete" />
                    </button>
                    <span v-else class="text-muted" style="font-size: 0.85rem">
                      <Icon icon="mdi:lock" /> 自己的评论
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import Icon from '@/components/Icon.vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/client'
import { useAdmin } from '@/composables/useAdmin'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isAdmin } = useAdmin()
const { user, loading: authLoading } = useAuth()

const activeTab = ref('users')
const loading = ref(true)

// 统计数据
const stats = ref({
  totalUsers: 0,
  totalPosts: 0,
  totalComments: 0,
})

// 用户管理
const users = ref<any[]>([])
const userSearch = ref('')

// 文章管理
const posts = ref<any[]>([])
const postSearch = ref('')
const postFilter = ref('all')

// 评论管理
const comments = ref<any[]>([])
const commentSearch = ref('')

// 过滤后的数据
const filteredUsers = computed(() => {
  if (!userSearch.value) return users.value
  const search = userSearch.value.toLowerCase()
  return users.value.filter(
    (u) => u.id?.toLowerCase().includes(search) || u.nickname?.toLowerCase().includes(search),
  )
})

const filteredPosts = computed(() => {
  let result = posts.value

  // 状态过滤
  if (postFilter.value === 'published') {
    result = result.filter((p) => p.published)
  } else if (postFilter.value === 'draft') {
    result = result.filter((p) => !p.published)
  }

  // 搜索过滤
  if (postSearch.value) {
    const search = postSearch.value.toLowerCase()
    result = result.filter((p) => p.title?.toLowerCase().includes(search))
  }

  return result
})

const filteredComments = computed(() => {
  if (!commentSearch.value) return comments.value
  const search = commentSearch.value.toLowerCase()
  return comments.value.filter(
    (c) => c.content?.toLowerCase().includes(search) || c.post_slug?.toLowerCase().includes(search),
  )
})

onMounted(async () => {
  console.log('=== AdminView onMounted ===')

  // 等待认证状态加载完成
  if (authLoading.value) {
    console.log('等待认证状态加载...')
    // 使用 watch 等待 loading 变为 false
    await new Promise<void>((resolve) => {
      const stopWatching = watch(
        authLoading,
        (newVal) => {
          if (!newVal) {
            stopWatching()
            resolve()
          }
        },
        { immediate: false },
      )
      // 设置超时，最多等待 5 秒
      setTimeout(() => {
        stopWatching()
        resolve()
      }, 5000)
    })
    console.log('认证状态加载完成')
  }

  console.log('isAdmin:', isAdmin.value)
  console.log('user:', user.value)

  if (!isAdmin.value) {
    console.log('不是管理员或未登录，停止加载')
    loading.value = false
    return
  }

  await loadData()
})

// 加载所有数据
async function loadData() {
  loading.value = true

  try {
    await Promise.all([loadStats(), loadUsers(), loadPosts(), loadComments()])
  } catch (err: any) {
    console.error('加载数据失败:', err)
  } finally {
    loading.value = false
  }
}

// 加载统计数据
async function loadStats() {
  const [{ count: usersCount }, { count: postsCount }, { count: commentsCount }] =
    await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('user_posts').select('*', { count: 'exact', head: true }),
      supabase.from('comments').select('*', { count: 'exact', head: true }),
    ])

  stats.value = {
    totalUsers: usersCount || 0,
    totalPosts: postsCount || 0,
    totalComments: commentsCount || 0,
  }
}

// 加载用户列表
async function loadUsers() {
  console.log('=== 开始加载用户列表 ===')

  const { data, error } = await supabase
    .from('profiles')
    .select('id, nickname, created_at, banned')
    .order('created_at', { ascending: false })

  console.log('用户列表查询结果:', { data, error })

  if (error) {
    console.error('加载用户列表失败:', error)
    throw error
  }

  users.value = data || []
  console.log('用户列表加载完成，共', users.value.length, '个用户')
}

// 加载文章列表
async function loadPosts() {
  console.log('=== 开始加载文章列表 ===')

  const { data, error } = await supabase
    .from('user_posts')
    .select('*')
    .order('created_at', { ascending: false })

  console.log('文章列表查询结果:', { data, error })

  if (error) {
    console.error('加载文章列表失败:', error)
    throw error
  }

  posts.value = data || []
  console.log('文章列表加载完成，共', posts.value.length, '篇文章')
}

// 加载评论列表
async function loadComments() {
  console.log('=== 开始加载评论列表 ===')

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  console.log('评论列表查询结果:', { data, error })

  if (error) {
    console.error('加载评论列表失败:', error)
    throw error
  }

  comments.value = data || []
  console.log('评论列表加载完成，共', comments.value.length, '条评论')
}

// 操作处理
function handleViewProfile(userId: string) {
  window.open(`/user/${userId}`, '_blank')
}

async function handleDeleteUser(userId: string, nickname: string) {
  if (
    !confirm(
      `确定要删除用户 "${nickname || userId}" 吗？\n此操作将永久删除该用户及其所有数据，且不可恢复！`,
    )
  ) {
    return
  }

  try {
    console.log('=== 开始删除用户 ===')
    console.log('用户ID:', userId)
    console.log('昵称:', nickname)

    // 调用 Edge Function 删除用户
    console.log('调用 Edge Function...')
    const { data, error } = await supabase.functions.invoke('delete-user', {
      body: { userId },
    })

    if (error) {
      console.error('Edge Function 调用失败:', error)
      throw new Error(error.message || '删除失败')
    }

    if (!data.success) {
      throw new Error(data.error || '删除失败')
    }

    console.log('用户删除成功')

    // 从列表中移除
    users.value = users.value.filter((u) => u.id !== userId)
    stats.value.totalUsers--

    alert('用户已完全删除（包括认证账户和所有相关数据）')
    console.log('=== 删除完成 ===')
  } catch (err: any) {
    console.error('删除用户失败:', err)
    alert('删除失败: ' + (err.message || '未知错误'))
  }
}

async function handleBanUser(userId: string, nickname: string) {
  console.log('=== 开始封禁用户 ===')
  console.log('用户ID:', userId)
  console.log('昵称:', nickname)

  if (!confirm(`确定要封禁用户 "${nickname || userId}" 吗？\n封禁后该用户将无法登录。`)) {
    console.log('用户取消封禁操作')
    return
  }

  try {
    console.log('正在更新数据库...')
    // 在 profiles 表中添加封禁标记（不使用 select，避免 RLS 限制）
    const { error } = await supabase.from('profiles').update({ banned: true }).eq('id', userId)

    console.log('Supabase 响应:', { error })

    if (error) {
      console.error('数据库更新失败:', error)
      throw error
    }

    console.log('数据库更新成功')

    // 更新本地数据
    const user = users.value.find((u) => u.id === userId)
    if (user) {
      user.banned = true
      console.log('本地状态已更新')
    }

    alert('用户已封禁')
    console.log('=== 封禁完成 ===')
  } catch (err: any) {
    console.error('封禁用户失败:', err)
    alert('封禁失败: ' + err.message)
  }
}

async function handleUnbanUser(userId: string, nickname: string) {
  console.log('=== 开始解封用户 ===')
  console.log('用户ID:', userId)
  console.log('昵称:', nickname)

  if (!confirm(`确定要解封用户 "${nickname || userId}" 吗？\n解封后该用户可以正常登录。`)) {
    console.log('用户取消解封操作')
    return
  }

  try {
    console.log('正在更新数据库...')
    // 在 profiles 表中移除封禁标记（不使用 select，避免 RLS 限制）
    const { error } = await supabase.from('profiles').update({ banned: false }).eq('id', userId)

    console.log('Supabase 响应:', { error })

    if (error) {
      console.error('数据库更新失败:', error)
      throw error
    }

    console.log('数据库更新成功')

    // 更新本地数据
    const user = users.value.find((u) => u.id === userId)
    if (user) {
      user.banned = false
      console.log('本地状态已更新')
    }

    alert('用户已解封')
    console.log('=== 解封完成 ===')
  } catch (err: any) {
    console.error('解封用户失败:', err)
    alert('解封失败: ' + err.message)
  }
}

function handleEditPost(postId: string) {
  router.push(`/blog/edit/${postId}`)
}

async function handleDeletePost(postId: string, title: string) {
  if (!confirm(`确定要删除文章 "${title}" 吗？`)) return

  try {
    const { error } = await supabase.from('user_posts').delete().eq('id', postId)

    if (error) throw error

    // 从列表中移除
    posts.value = posts.value.filter((p) => p.id !== postId)
    stats.value.totalPosts--

    alert('文章已删除')
  } catch (err: any) {
    console.error('删除文章失败:', err)
    alert('删除失败: ' + err.message)
  }
}

async function handleDeleteComment(commentId: string) {
  if (!confirm('确定要删除这条评论吗？')) return

  try {
    const { error } = await supabase.from('comments').delete().eq('id', commentId)

    if (error) throw error

    // 从列表中移除
    comments.value = comments.value.filter((c) => c.id !== commentId)
    stats.value.totalComments--

    alert('评论已删除')
  } catch (err: any) {
    console.error('删除评论失败:', err)
    alert('删除失败: ' + err.message)
  }
}

// 工具函数
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

function truncateText(text: string, maxLength: number) {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}
</script>

<style scoped>
.admin-page {
  min-height: calc(100vh - 200px);
  padding: 3rem 0;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.admin-header h1 {
  margin: 0;
  color: var(--color-text);
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.access-denied {
  text-align: center;
  padding: 4rem 0;
}

.access-denied i {
  font-size: 4rem;
  color: #ff4757;
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--color-bg-card);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.stat-card i {
  font-size: 2.5rem;
  color: var(--color-primary);
}

.stat-info h3 {
  margin: 0;
  font-size: 2rem;
  color: var(--color-text);
}

.stat-info p {
  margin: 0.25rem 0 0 0;
  color: var(--color-text-secondary);
}

.admin-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.tab-btn:hover {
  color: var(--color-text);
}

.tab-btn.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.tab-header h2 {
  margin: 0;
  color: var(--color-text);
}

.filter-group {
  display: flex;
  gap: 1rem;
}

.search-input,
.filter-select {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text);
  font-size: 0.9rem;
}

.search-input {
  min-width: 250px;
}

.search-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--color-primary);
}

.loading {
  text-align: center;
  padding: 3rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(27, 217, 106, 0.2);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.data-table {
  background: var(--color-bg-card);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: rgba(255, 255, 255, 0.03);
}

th {
  padding: 1rem;
  text-align: left;
  color: var(--color-text-secondary);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
}

td {
  padding: 1rem;
  color: var(--color-text);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.content-cell {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-badge.published {
  background: rgba(46, 213, 115, 0.1);
  color: #2ed573;
}

.status-badge.draft {
  background: rgba(255, 165, 0, 0.1);
  color: #ffa500;
}

.status-badge.banned {
  background: rgba(255, 71, 87, 0.1);
  color: #ff4757;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
}

.btn-action {
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 0.5rem;
}

.btn-view {
  color: var(--color-brand);
}

.btn-edit {
  color: #ffa500;
}

.btn-ban {
  color: #ff9500;
}

.btn-unban {
  color: #2ed573;
}

.btn-delete {
  color: #ff4757;
}

.btn-action:hover {
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .tab-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .filter-group {
    flex-direction: column;
  }

  .search-input {
    min-width: auto;
  }

  table {
    font-size: 0.85rem;
  }

  th,
  td {
    padding: 0.75rem 0.5rem;
  }
}
</style>
