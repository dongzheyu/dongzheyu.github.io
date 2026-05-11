<template>
  <div class="auth-test-page">
    <div class="container">
      <h1 class="page-title">JetCPP统一认证</h1>
      
      <!-- 未登录时显示登录表单 -->
      <AuthForm v-if="!isAuthenticated" />
      
      <!-- 已登录时显示用户信息 -->
      <div v-else class="user-info-card">
        <div class="user-header">
          <i class="bi bi-person-circle user-icon"></i>
          <h2>欢迎回来！</h2>
        </div>
        
        <div class="user-details">
          <div class="detail-item">
            <span class="detail-label">邮箱：</span>
            <span class="detail-value">{{ user?.email }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">用户ID：</span>
            <span class="detail-value user-id">{{ user?.id }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">注册时间：</span>
            <span class="detail-value">{{ formatDate(user?.created_at) }}</span>
          </div>
        </div>
        
        <button @click="handleSignOut" class="btn btn-secondary btn-animate">
          <i class="bi bi-box-arrow-right"></i>
          退出登录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AuthForm from '@/components/AuthForm.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user, isAuthenticated, signOut } = useAuth()

const handleSignOut = async () => {
  try {
    await signOut()
    // 登出后可以跳转到首页或其他页面
    // router.push('/')
  } catch (error) {
    console.error('登出失败:', error)
  }
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleString('zh-CN')
}
</script>

<style scoped>
.auth-test-page {
  min-height: calc(100vh - 200px);
  padding: 3rem 0;
}

.page-title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-text);
  font-size: 2rem;
}

.user-info-card {
  background: var(--color-bg-card);
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.user-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.user-icon {
  font-size: 3rem;
  color: var(--color-primary);
}

.user-header h2 {
  margin: 0;
  color: var(--color-text);
  font-size: 1.5rem;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
}

.detail-label {
  color: var(--color-text-secondary);
  font-weight: 500;
  min-width: 100px;
}

.detail-value {
  color: var(--color-text);
  word-break: break-all;
}

.user-id {
  font-family: monospace;
  font-size: 0.85rem;
  opacity: 0.8;
}
</style>
