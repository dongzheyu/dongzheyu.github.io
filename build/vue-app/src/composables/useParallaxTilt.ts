import { ref, computed, type Ref } from 'vue'

export function useParallaxTilt(el: Ref<HTMLElement | null>, intensity = 8) {
  const tiltX = ref(0)
  const tiltY = ref(0)
  const glowing = ref(false)

  const transform = computed(() => {
    if (!glowing.value) return 'none'
    return `perspective(800px) rotateX(${(-tiltY.value * intensity).toFixed(2)}deg) rotateY(${(tiltX.value * intensity).toFixed(2)}deg)`
  })

  const glowOpacity = computed(() => glowing.value ? Math.min(0.7, (Math.abs(tiltX.value) + Math.abs(tiltY.value)) * 1.5) : 0)

  const onMove = (e: MouseEvent) => {
    if (!el.value) return
    const rect = el.value.getBoundingClientRect()
    tiltX.value = (e.clientX - rect.left) / rect.width - 0.5
    tiltY.value = (e.clientY - rect.top) / rect.height - 0.5
    glowing.value = true
  }

  const onLeave = () => {
    tiltX.value = 0
    tiltY.value = 0
    glowing.value = false
  }

  return { tiltX, tiltY, glowing, transform, glowOpacity, onMove, onLeave }
}