<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">{{ isLogin ? '登录' : '注册' }}</h2>
      
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label for="email">邮箱</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="请输入邮箱"
            required
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <div class="password-input-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码（至少6位）"
              required
              minlength="6"
              class="form-input"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
              :title="showPassword ? '隐藏密码' : '显示密码'"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-animate btn-block" :disabled="loading">
          {{ loading ? '处理中...' : (isLogin ? '登录' : '注册') }}
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

      <div class="auth-switch">
        <span>{{ isLogin ? '还没有账号？' : '已有账号？' }}</span>
        <button @click="toggleMode" class="switch-btn">
          {{ isLogin ? '立即注册' : '去登录' }}
        </button>
      </div>

      <div v-if="isLogin" class="forgot-password-link">
        <RouterLink to="/reset-password" class="link-btn">
          忘记密码？
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/supabase/client'

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const successMessage = ref('')

const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  successMessage.value = ''
  email.value = ''
  password.value = ''
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  successMessage.value = ''

  try {
    if (isLogin.value) {
      // 登录
      console.log('尝试登录:', { email: email.value })
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })

      if (signInError) {
        console.error('登录错误:', signInError)
        throw signInError
      }
      
      console.log('登录成功:', data)
      
      // 检查用户是否被封禁
      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('banned')
          .eq('id', data.user.id)
          .single()
        
        if (profileError) {
          console.error('获取用户资料失败:', profileError)
        } else if (profile?.banned) {
          // 用户已被封禁，立即退出登录
          await supabase.auth.signOut()
          error.value = '您的账户已被封禁，无法登录。请联系管理员。'
          loading.value = false
          return
        }
      }
      
      successMessage.value = '登录成功！'
      
      // 这里可以添加登录成功后的跳转逻辑
      // 例如：router.push('/')
    } else {
      // 注册
      console.log('尝试注册:', { email: email.value })
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })

      if (signUpError) {
        console.error('注册错误:', signUpError)
        throw signUpError
      }

      if (data.user) {
        console.log('注册成功:', data)
        successMessage.value = '注册成功！请检查邮箱验证（如果开启了邮箱验证）'
      }
    }
  } catch (err: any) {
    console.error('操作失败:', err)
    
    // 提供更友好的错误提示
    if (err.message?.includes('Invalid login credentials')) {
      error.value = '邮箱或密码错误，请检查后重试'
    } else if (err.message?.includes('Email not confirmed')) {
      error.value = '邮箱未验证，请先检查邮箱完成验证'
    } else {
      error.value = err.message || '操作失败，请稍后重试'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 2rem;
}

.auth-card {
  background: var(--color-bg-card);
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.auth-title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-text);
  font-size: 1.75rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
  margin-top: 0.5rem;
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

.auth-switch {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.switch-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 0.5rem;
  transition: color 0.3s ease;
}

.switch-btn:hover {
  color: var(--color-primary-light);
  text-decoration: underline;
}

.forgot-password-link {
  margin-top: 1rem;
  text-align: center;
}

.link-btn {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.link-btn:hover {
  color: var(--color-primary-light);
  text-decoration: underline;
}
</style>
