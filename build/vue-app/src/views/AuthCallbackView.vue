<template>
  <div class="auth-callback-page">
    <div class="callback-container">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>正在验证邮箱...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <Icon icon="mdi:alert" class="error-icon" />
        <h2>验证失败</h2>
        <p>{{ error }}</p>
        <RouterLink to="/auth" class="btn btn-primary btn-animate"> 返回登录页面 </RouterLink>
      </div>

      <div v-else-if="success" class="success-state">
        <Icon icon="mdi:check-circle" class="success-icon" />
        <h2>{{ isOAuth ? '登录成功！' : '邮箱验证成功！' }}</h2>
        <p>{{ isOAuth ? '正在跳转到首页...' : '你的邮箱已成功验证，现在可以登录了。' }}</p>
        <RouterLink v-if="!isOAuth" to="/auth" class="btn btn-primary btn-animate">
          前往登录
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Icon from '@/components/Icon.vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/client'

const router = useRouter()
const loading = ref(true)
const error = ref('')
const success = ref(false)
const isOAuth = ref(false)

onMounted(async () => {
  try {
    // Supabase 会自动从 URL 中提取 session
    // 等待 Supabase 处理完成
    await new Promise((resolve) => setTimeout(resolve, 500))

    const { data, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) throw sessionError

    if (data.session) {
      // OAuth 登录成功
      isOAuth.value = true
      success.value = true
      setTimeout(() => {
        router.push('/')
      }, 2000)
      return
    }

    // 检查是否有错误参数
    const urlParams = new URLSearchParams(window.location.search)
    const errorParam = urlParams.get('error')

    if (errorParam) {
      throw new Error(urlParams.get('error_description') || 'OAuth 授权失败')
    }

    // 如果没有 session 也没有错误，跳转到首页
    router.push('/')
  } catch (err: any) {
    console.error('验证失败:', err)
    error.value = err.message || '验证过程中发生错误，请重试'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.auth-callback-page {
  min-height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.callback-container {
  background: var(--color-bg-card);
  border-radius: 16px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(27, 217, 106, 0.2);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
}

.error-state,
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.error-icon,
.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.error-icon {
  color: #ff4757;
}

.success-icon {
  color: #2ed573;
}

.error-state h2,
.success-state h2 {
  margin: 0;
  color: var(--color-text);
  font-size: 1.75rem;
}

.error-state p,
.success-state p {
  color: var(--color-text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.btn {
  margin-top: 1rem;
}
</style>
