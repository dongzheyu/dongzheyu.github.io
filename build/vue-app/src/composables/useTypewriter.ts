import { ref, onMounted, onUnmounted } from 'vue'

export function useTypewriter(text: string, speed = 60) {
  const display = ref('')
  const cursor = ref(true)
  const done = ref(false)
  let index = 0
  let timer: ReturnType<typeof setInterval> | null = null
  let blinkTimer: ReturnType<typeof setInterval> | null = null

  const start = () => {
    display.value = ''
    done.value = false
    index = 0
    blinkTimer = setInterval(() => (cursor.value = !cursor.value), 530)
    timer = setInterval(() => {
      if (index < text.length) {
        display.value = text.slice(0, ++index)
      } else {
        if (timer) clearInterval(timer)
        done.value = true
      }
    }, speed)
  }

  onMounted(start)
  onUnmounted(() => {
    if (timer) clearInterval(timer)
    if (blinkTimer) clearInterval(blinkTimer)
  })

  return { display, cursor, done }
}