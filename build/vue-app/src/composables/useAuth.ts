import { ref, computed } from 'vue'
import { supabase } from '@/supabase/client'
import type { User } from '@supabase/supabase-js'

const user = ref<User | null>(null)
const loading = ref(true)

// 立即检查用户登录状态（不需要 onMounted）
async function initAuth() {
  // 获取当前会话
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session?.user) {
    // 检查用户是否被封禁
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('banned')
      .eq('id', session.user.id)
      .single()
    
    if (profileError) {
      console.error('获取用户资料失败:', profileError)
    } else if (profile?.banned) {
      // 用户已被封禁，立即退出登录
      console.warn('用户已被封禁，强制退出登录')
      await supabase.auth.signOut()
      user.value = null
    } else {
      user.value = session.user

      // 同步 OAuth 用户的昵称和头像到 profiles
      const meta = session.user.user_metadata
      const fullName = meta?.full_name || meta?.name || ''
      const avatarUrl = meta?.avatar_url || meta?.picture || ''
      if (fullName || avatarUrl) {
        await supabase
          .from('profiles')
          .upsert({
            id: session.user.id,
            nickname: fullName,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' })
      }
    }
  } else {
    user.value = null
  }
  
  // 监听认证状态变化
  supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      // 再次检查封禁状态
      const { data: profile } = await supabase
        .from('profiles')
        .select('banned')
        .eq('id', session.user.id)
        .single()
      
      if (profile?.banned) {
        console.warn('用户已被封禁，强制退出登录')
        await supabase.auth.signOut()
        user.value = null
      } else {
        user.value = session.user

        // 同步 OAuth 用户的昵称和头像到 profiles
        const meta = session.user.user_metadata
        const fullName = meta?.full_name || meta?.name || ''
        const avatarUrl = meta?.avatar_url || meta?.picture || ''
        if (fullName || avatarUrl) {
          await supabase
            .from('profiles')
            .upsert({
              id: session.user.id,
              nickname: fullName,
              avatar_url: avatarUrl,
              updated_at: new Date().toISOString()
            }, { onConflict: 'id' })
        }
      }
    } else {
      user.value = null
    }
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
  // 立即清除本地状态（即使在网络请求挂起时也能让 UI 响应）
  user.value = null
  
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.warn('Supabase signOut 警告:', error.message)
    }
  } catch (err) {
    console.warn('Supabase signOut 异常:', err)
  }
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
