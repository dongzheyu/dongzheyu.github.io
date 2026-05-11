import { ref, computed } from 'vue'
import { supabase } from '@/supabase/client'
import type { User } from '@supabase/supabase-js'

const user = ref<User | null>(null)
const loading = ref(true)

// 立即检查用户登录状态（不需要 onMounted）
async function initAuth() {
  // 获取当前会话
  const { data: { session } } = await supabase.auth.getSession()
  user.value = session?.user ?? null
  
  // 监听认证状态变化
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })
  
  loading.value = false
}

// 立即执行初始化
initAuth()

// 登录
async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

// 注册
async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

// 登出
async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export function useAuth() {
  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: computed(() => !!user.value),
  }
}
