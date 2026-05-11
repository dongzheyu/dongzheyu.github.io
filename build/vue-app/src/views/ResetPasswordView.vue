<template>
  <div class="reset-password-page">
    <div class="container">
      <div class="reset-card">
        <!-- 第一步：请求重置 -->
        <div v-if="step === 1" class="reset-step">
          <div class="step-header">
            <i class="bi bi-key icon-large"></i>
            <h2>重置密码</h2>
            <p class="step-desc">输入你的邮箱，我们会发送重置密码链接</p>
          </div>

          <form @submit.prevent="handleResetRequest" class="reset-form">
            <div class="form-group">
              <label for="email">邮箱地址</label>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="请输入注册时的邮箱"
                required
                class="form-input"
              />
            </div>

            <button type="submit" class="btn btn-primary btn-animate btn-block" :disabled="loading">
              {{ loading ? '发送中...' : '发送重置链接' }}
            </button>
          </form>

          <div v-if="error" class="error-message">
            <i class="bi bi-exclamation-circle"></i>
            {{ error }}
          </div>

          <div v-if="successMessage" class="success-message">
            <i class="bi bi-check-circle"></i>
            {{ successMessage }}
          </div>

          <div class="back-link">
            <RouterLink to="/auth" class="link-btn">
              <i class="bi bi-arrow-left"></i>
              返回登录
            </RouterLink>
          </div>
        </div>

        <!-- 第二步：设置新密码 -->
        <div v-else-if="step === 2" class="reset-step">
          <div class="step-header">
            <i class="bi bi-lock icon-large"></i>
            <h2>设置新密码</h2>
            <p class="step-desc">请输入你的新密码（至少6位）</p>
          </div>

          <form @submit.prevent="handleUpdatePassword" class="reset-form">
            <div class="form-group">
              <label for="newPassword">新密码</label>
              <div class="password-input-wrapper">
                <input
                  id="newPassword"
                  v-model="newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  placeholder="请输入新密码"
                  required
                  minlength="6"
                  class="form-input"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showNewPassword = !showNewPassword"
                  :title="showNewPassword ? '隐藏密码' : '显示密码'"
                >
                  <i :class="showNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">确认密码</label>
              <div class="password-input-wrapper">
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="请再次输入新密码"
                  required
                  minlength="6"
                  class="form-input"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showConfirmPassword = !showConfirmPassword"
                  :title="showConfirmPassword ? '隐藏密码' : '显示密码'"
                >
                  <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-animate btn-block" :disabled="loading">
              {{ loading ? '更新中...' : '更新密码' }}
            </button>
          </form>

          <div v-if="error" class="error-message">
            <i class="bi bi-exclamation-circle"></i>
            {{ error }}
          </div>

          <div v-if="successMessage" class="success-message">
            <i class="bi bi-check-circle"></i>
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/client'

const router = useRouter()
const step = ref(1) // 1: 请求重置, 2: 设置新密码
const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const error = ref('')
const successMessage = ref('')

onMounted(() => {
  // 检查 URL 中是否有 access_token（从重置邮件链接过来）
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const accessToken = hashParams.get('access_token')
  
  if (accessToken) {
    // 有 token，直接进入设置新密码步骤
    step.value = 2
    
    // 设置会话
    supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: hashParams.get('refresh_token') || '',
    }).then(({ error: sessionError }) => {
      if (sessionError) {
        console.error('设置会话失败:', sessionError)
        error.value = '链接已过期或无效，请重新请求重置'
        step.value = 1
      }
    })
  }
})

// 第一步：请求重置密码
const handleResetRequest = async () => {
  loading.value = true
  error.value = ''
  successMessage.value = ''

  try {
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/#/reset-password`,
    })

    if (resetError) throw resetError

    successMessage.value = '重置链接已发送到你的邮箱，请查收'
  } catch (err: any) {
    console.error('重置请求失败:', err)
    error.value = err.message || '发送失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 第二步：更新密码
const handleUpdatePassword = async () => {
  loading.value = true
  error.value = ''
  successMessage.value = ''

  // 验证密码
  if (newPassword.value !== confirmPassword.value) {
    error.value = '两次输入的密码不一致'
    loading.value = false
    return
  }

  if (newPassword.value.length < 6) {
    error.value = '密码长度至少为6位'
    loading.value = false
    return
  }

  try {
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword.value,
    })

    if (updateError) throw updateError

    successMessage.value = '密码更新成功！正在跳转...'
    
    // 2秒后跳转到登录页面
    setTimeout(() => {
      router.push('/auth')
    }, 2000)

  } catch (err: any) {
    console.error('更新密码失败:', err)
    error.value = err.message || '更新失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.reset-password-page {
  min-height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.reset-card {
  background: var(--color-bg-card);
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.reset-step {
  display: flex;
  flex-direction: column;
}

.step-header {
  text-align: center;
  margin-bottom: 2rem;
}

.icon-large {
  font-size: 3.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  display: block;
}

.step-header h2 {
  margin: 0 0 0.5rem 0;
  color: var(--color-text);
  font-size: 1.75rem;
}

.step-desc {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.form-input {
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

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input-wrapper .form-input {
  flex: 1;
  padding-right: 2.5rem;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: var(--color-primary);
}

.btn-block {
  width: 100%;
}

.error-message,
.success-message {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.error-message {
  background: rgba(255, 71, 87, 0.1);
  color: #ff4757;
  border: 1px solid rgba(255, 71, 87, 0.3);
}

.success-message {
  background: rgba(46, 213, 115, 0.1);
  color: #2ed573;
  border: 1px solid rgba(46, 213, 115, 0.3);
}

.back-link {
  margin-top: 1.5rem;
  text-align: center;
}

.link-btn {
  color: var(--color-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.link-btn:hover {
  color: var(--color-primary-light);
  text-decoration: underline;
}
</style>
