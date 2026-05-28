<template>
  <div class="profile-page">
    <div class="container">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>

      <!-- 用户信息卡片 -->
      <div v-else-if="profile" class="profile-card">
        <div class="profile-header">
          <div class="user-avatar-large" :class="{ 'is-own-profile': isOwnProfile }" @click="isOwnProfile && triggerFileInput()">
            <img v-if="profile.avatar_url" :src="profile.avatar_url" alt="头像" class="avatar-image" />
            <Icon v-else icon="mdi:account-circle" />
            <div v-if="isOwnProfile" class="avatar-overlay">
              <Icon icon="mdi:camera" />
              <span>更换头像</span>
            </div>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
            @change="handleAvatarUpload"
            style="display: none"
          />
          <div class="user-info">
            <h1 class="user-nickname">{{ profile.nickname || '未设置昵称' }}</h1>
            <p class="user-id">UID: {{ userId }}</p>
            <p class="join-date">注册时间: {{ formatDate(profile.created_at) }}</p>
          </div>
        </div>

        <div class="profile-details">
          <div class="detail-item">
            <span class="detail-label">性别</span>
            <span class="detail-value">{{ getGenderText(profile.gender) }}</span>
          </div>
        </div>

        <!-- 编辑按钮（仅本人可见） -->
        <div v-if="isOwnProfile" class="profile-actions">
          <button @click="showEditModal = true" class="btn btn-primary btn-animate">
            <Icon icon="mdi:pencil" />
            编辑资料
          </button>
          <button @click="showDeleteModal = true" class="btn btn-danger btn-animate">
            <Icon icon="mdi:delete" />
            注销账户
          </button>
        </div>
      </div>

      <!-- 用户不存在 -->
      <div v-else class="not-found">
        <Icon icon="mdi:account-remove" class="icon-large" />
        <h2>用户不存在</h2>
        <p>该用户可能已被删除或禁用</p>
        <RouterLink to="/" class="btn btn-primary btn-animate">返回首页</RouterLink>
      </div>
    </div>

    <!-- 编辑资料模态框 -->
    <div v-if="showEditModal" class="modal-overlay" @click.self="showEditModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>编辑个人资料</h3>
          <button @click="showEditModal = false" class="close-btn">
            <Icon icon="mdi:close" />
          </button>
        </div>

        <form @submit.prevent="handleUpdateProfile" class="modal-body">
          <div v-if="error && !uploading" class="error-message">
            <Icon icon="mdi:alert-circle" />
            {{ error }}
          </div>

          <div class="form-group">
            <label for="nickname">昵称</label>
            <input
              id="nickname"
              v-model="editForm.nickname"
              type="text"
              placeholder="请输入昵称"
              maxlength="20"
              class="form-input"
            />
            <small class="form-hint">最多20个字符</small>
          </div>

          <div class="form-group">
            <label for="gender">性别</label>
            <select id="gender" v-model="editForm.gender" class="form-input">
              <option value="">未设置</option>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">其他</option>
            </select>
          </div>

          <div v-if="error" class="error-message">
            <Icon icon="mdi:alert-circle" />
            {{ error }}
          </div>

          <div class="modal-footer">
            <button type="button" @click="showEditModal = false" class="btn btn-secondary">
              取消
            </button>
            <button type="submit" class="btn btn-primary btn-animate" :disabled="saving">
              {{ saving ? '保存中...' : '保存' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 注销账户模态框 -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
      <div class="modal-content modal-danger">
        <div class="modal-header">
          <h3><Icon icon="mdi:alert" /> 注销账户</h3>
          <button @click="showDeleteModal = false" class="close-btn">
            <Icon icon="mdi:close" />
          </button>
        </div>

        <div class="modal-body">
          <div class="warning-box">
            <Icon icon="mdi:alert" />
            <div>
              <strong>警告：</strong>此操作不可恢复！
            </div>
          </div>

          <p>注销账户将：</p>
          <ul class="delete-info">
            <li><Icon icon="mdi:close-circle" /> 删除您的个人资料</li>
            <li><Icon icon="mdi:close-circle" /> 删除您发布的所有文章</li>
            <li><Icon icon="mdi:close-circle" /> 删除您的所有评论</li>
            <li><Icon icon="mdi:close-circle" /> 永久删除您的账户</li>
          </ul>

          <div class="confirm-section">
            <p>请输入 <strong>DELETE</strong> 以确认：</p>
            <input
              v-model="deleteConfirmText"
              type="text"
              placeholder="输入 DELETE"
              class="form-input"
            />
          </div>

          <div v-if="deleteError" class="error-message">
            <Icon icon="mdi:alert-circle" />
            {{ deleteError }}
          </div>
        </div>

        <div class="modal-footer">
          <button @click="showDeleteModal = false" class="btn btn-secondary">
            取消
          </button>
          <button 
            @click="handleDeleteAccount" 
            class="btn btn-danger btn-animate"
            :disabled="deleteConfirmText !== 'DELETE' || deleting"
          >
            {{ deleting ? '注销中...' : '确认注销' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Icon from '@/components/Icon.vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/supabase/client'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const { user: currentUser } = useAuth()

const userId = computed(() => route.params.userId as string)
const isOwnProfile = computed(() => currentUser.value?.id === userId.value)

const profile = ref<any>(null)
const loading = ref(true)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const saving = ref(false)
const deleting = ref(false)
const error = ref('')
const deleteError = ref('')
const deleteConfirmText = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const uploading = ref(false)

const editForm = ref({
  nickname: '',
  gender: '',
})

onMounted(async () => {
  await fetchProfile()
})

// 获取用户资料
async function fetchProfile() {
  loading.value = true
  
  try {
    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId.value)
      .single()

    if (fetchError) throw fetchError
    
    profile.value = data
    
    // 填充编辑表单
    editForm.value.nickname = data.nickname || ''
    editForm.value.gender = data.gender || ''

  } catch (err: any) {
    console.error('获取资料失败:', err)
    profile.value = null
  } finally {
    loading.value = false
  }
}

// 更新资料
async function handleUpdateProfile() {
  saving.value = true
  error.value = ''

  try {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        nickname: editForm.value.nickname || null,
        gender: editForm.value.gender || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId.value)

    if (updateError) throw updateError

    // 更新成功，关闭模态框并刷新数据
    showEditModal.value = false
    await fetchProfile()

  } catch (err: any) {
    console.error('更新失败:', err)
    error.value = err.message || '更新失败，请稍后重试'
  } finally {
    saving.value = false
  }
}

// 格式化日期
function formatDate(dateString?: string) {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 获取性别文本
function getGenderText(gender?: string) {
  const map: Record<string, string> = {
    male: '男',
    female: '女',
    other: '其他',
  }
  return gender ? (map[gender] || '未设置') : '未设置'
}

// 触发文件选择
function triggerFileInput() {
  fileInput.value?.click()
}

// 处理头像上传
async function handleAvatarUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  // 验证文件类型
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    error.value = '只支持 PNG、JPG、WEBP、GIF 格式的图片'
    return
  }
  
  // 验证文件大小（2MB）
  if (file.size > 2 * 1024 * 1024) {
    error.value = '图片大小不能超过 2MB'
    return
  }
  
  uploading.value = true
  error.value = ''
  
  try {
    // 生成文件名：用户ID/时间戳.扩展名
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId.value}/${Date.now()}.${fileExt}`
    
    // 上传到 Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      })
    
    if (uploadError) throw uploadError
    
    // 获取公开 URL
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)
    
    const avatarUrl = data.publicUrl
    
    // 更新数据库中的 avatar_url
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId.value)
    
    if (updateError) throw updateError
    
    // 刷新资料
    await fetchProfile()
    
  } catch (err: any) {
    console.error('上传失败:', err)
    error.value = err.message || '上传失败，请稍后重试'
  } finally {
    uploading.value = false
    // 清空文件输入
    if (target) target.value = ''
  }
}

// 注销账户
async function handleDeleteAccount() {
  if (deleteConfirmText.value !== 'DELETE') {
    deleteError.value = '请输入 DELETE 以确认'
    return
  }
  
  deleting.value = true
  deleteError.value = ''
  
  try {
    // 1. 删除用户的所有评论
    await supabase
      .from('comments')
      .delete()
      .eq('user_id', userId.value)
    
    // 2. 删除用户的所有文章
    await supabase
      .from('user_posts')
      .delete()
      .eq('author_id', userId.value)
    
    // 3. 删除用户资料
    await supabase
      .from('profiles')
      .delete()
      .eq('id', userId.value)
    
    // 4. 退出登录
    await supabase.auth.signOut()
    
    alert('账户已注销')
    
    // 5. 跳转到首页
    window.location.href = '/'
    
  } catch (err: any) {
    console.error('注销失败:', err)
    deleteError.value = err.message || '注销失败，请稍后重试'
  } finally {
    deleting.value = false
  }
}
</script>

<style scoped>
.profile-page {
  min-height: calc(100vh - 200px);
  padding: 3rem 0;
}

.loading-container {
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
  border: 4px solid rgba(25, 118, 210, 0.2);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.profile-card {
  background: var(--color-bg-card);
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 700px;
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.user-avatar-large {
  font-size: 5rem;
  color: var(--color-primary);
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(25, 118, 210, 0.1);
  overflow: hidden;
}

.user-avatar-large.is-own-profile {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.user-avatar-large.is-own-profile:hover {
  transform: scale(1.05);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  gap: 0.5rem;
}

.user-avatar-large:hover .avatar-overlay {
  opacity: 1;
}

.avatar-overlay i {
  font-size: 1.5rem;
}

.avatar-overlay span {
  font-size: 0.8rem;
}

.user-info h1 {
  margin: 0 0 0.5rem 0;
  color: var(--color-text);
  font-size: 2rem;
}

.user-id,
.join-date {
  margin: 0.25rem 0;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.profile-details {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
}

.detail-label {
  color: var(--color-text-secondary);
  font-weight: 500;
}

.detail-value {
  color: var(--color-text);
}

.profile-actions {
  display: flex;
  justify-content: center;
}

.not-found {
  text-align: center;
  padding: 4rem 0;
}

.not-found .icon-large {
  font-size: 5rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.not-found h2 {
  margin: 0 0 1rem 0;
  color: var(--color-text);
}

.not-found p {
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-content {
  background: var(--color-bg-card);
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  margin: 0;
  color: var(--color-text);
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: var(--color-text);
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: rgba(255, 255, 255, 0.08);
}

.form-hint {
  display: block;
  margin-top: 0.25rem;
  color: var(--color-text-secondary);
  font-size: 0.8rem;
}

.error-message {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: rgba(255, 71, 87, 0.1);
  color: #ff4757;
  border: 1px solid rgba(255, 71, 87, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* 注销模态框特殊样式 */
.modal-danger .modal-header h3 {
  color: #ff4757;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.warning-box {
  padding: 1rem;
  background: rgba(255, 71, 87, 0.1);
  border: 2px solid #ff4757;
  border-radius: 8px;
  color: #ff4757;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.warning-box i {
  font-size: 2rem;
}

.delete-info {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.delete-info li {
  padding: 0.5rem 0;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.delete-info li i {
  color: #ff4757;
}

.confirm-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-danger {
  background: linear-gradient(135deg, #ff4757, #ff6b81);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn-danger:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 71, 87, 0.4);
}

.btn-danger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
