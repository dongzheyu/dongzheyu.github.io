import { ref, onMounted } from 'vue'

export function useStaggeredFade(count: number, delay = 80) {
  const visible = ref(Array(count).fill(false))

  onMounted(() => {
    visible.value.forEach((_, i) => {
      setTimeout(() => (visible.value[i] = true), i * delay)
    })
  })

  return { visible }
}