import { ref, onMounted } from 'vue'

export function useAnimations() {
  const isVisible = ref(false)

  onMounted(() => {
    setTimeout(() => {
      isVisible.value = true
    }, 100)
  })

  return {
    isVisible
  }
}