import { computed } from 'vue'
import { useAuth } from './useAuth'

export function useAdmin() {
  const { user, isAuthenticated } = useAuth()

  const isAdmin = computed(() => {
    if (!isAuthenticated.value || !user.value) return false
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
    return !!adminEmail && user.value.email?.toLowerCase() === adminEmail.toLowerCase()
  })

  const canManage = (ownerId: string) => isAdmin.value || user.value?.id === ownerId

  return { isAdmin, canManage }
}
