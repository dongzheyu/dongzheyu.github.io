import { ref, computed } from 'vue'
import { supabase } from '@/supabase/client'
import type { User } from '@supabase/supabase-js'

const user = ref<User | null>(null)
const loading = ref(true)

async function syncOAuthProfile(u: User) {
  const meta = u.user_metadata
  const fullName = meta?.full_name || meta?.name || ''
  const avatarUrl = meta?.avatar_url || meta?.picture || ''
  if (fullName || avatarUrl) {
    await supabase.from('profiles').upsert(
      { id: u.id, nickname: fullName, avatar_url: avatarUrl, updated_at: new Date().toISOString() },
      { onConflict: 'id' },
    )
  }
}

async function handleSession(sessionUser: User | undefined) {
  if (!sessionUser) { user.value = null; return }
  const { data: profile } = await supabase.from('profiles').select('banned').eq('id', sessionUser.id).single()
  if (profile?.banned) {
    console.warn('用户已被封禁，强制退出登录')
    await supabase.auth.signOut()
    user.value = null
  } else {
    user.value = sessionUser
    await syncOAuthProfile(sessionUser)
  }
}

async function initAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  await handleSession(session?.user)
  supabase.auth.onAuthStateChange(async (_event, session) => { await handleSession(session?.user) })
  loading.value = false
}

initAuth()

async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  return data
}

async function signOut() {
  user.value = null
  try {
    const { error } = await supabase.auth.signOut()
    if (error) console.warn('Supabase signOut 警告:', error.message)
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
