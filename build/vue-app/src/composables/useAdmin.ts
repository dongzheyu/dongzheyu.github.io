import { computed } from 'vue'
import { useAuth } from './useAuth'

/**
 * 管理员权限管理 Composable
 */
export function useAdmin() {
  const { user, isAuthenticated } = useAuth()
  
  // 管理员邮箱列表（从环境变量读取）
  const adminEmails = computed(() => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
    return adminEmail ? [adminEmail.toLowerCase()] : []
  })
  
  // 检查当前用户是否是管理员
  const isAdmin = computed(() => {
    if (!isAuthenticated.value || !user.value) return false
    return adminEmails.value.includes(user.value.email?.toLowerCase() || '')
  })
  
  // 检查是否有权限管理指定用户
  const canManageUser = (userId: string) => {
    // 管理员可以管理所有用户
    if (isAdmin.value) return true
    // 用户只能管理自己
    return user.value?.id === userId
  }
  
  // 检查是否有权限管理指定文章
  const canManagePost = (postAuthorId: string) => {
    // 管理员可以管理所有文章
    if (isAdmin.value) return true
    // 作者可以管理自己的文章
    return user.value?.id === postAuthorId
  }
  
  // 检查是否有权限管理指定评论
  const canManageComment = (commentAuthorId: string) => {
    // 管理员可以管理所有评论
    if (isAdmin.value) return true
    // 评论者可以管理自己的评论
    return user.value?.id === commentAuthorId
  }
  
  return {
    isAdmin,
    canManageUser,
    canManagePost,
    canManageComment,
  }
}
