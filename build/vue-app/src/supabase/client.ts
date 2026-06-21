import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('缺少 Supabase 环境变量，请检查 .env.local 文件')
}

const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    redirectTo: siteUrl + '/auth/callback',
  },
})
