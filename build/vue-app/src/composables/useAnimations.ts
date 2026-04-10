import { ref, onMounted, onUnmounted } from 'vue'

interface AnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useAnimations(options: AnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options

  const isVisible = ref(false)

  onMounted(() => {
    setTimeout(() => {
      isVisible.value = true
    }, 80)
  })

  return {
    isVisible
  }
}

/**
 * 滚动动画 hook — 直接给元素添加 .visible 类
 * 与 .animate-on-scroll { opacity: 0 } 配合使用
 */
export function useScrollAnimation(options: AnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '-50px', once = true } = options

  let observer: IntersectionObserver | null = null
  const observedElements = new Set<HTMLElement>()

  const observe = (el: HTMLElement) => {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            const target = entry.target as HTMLElement
            if (entry.isIntersecting) {
              target.classList.add('visible')
              if (once && observer) {
                observer.unobserve(target)
                observedElements.delete(target)
              }
            } else if (!once) {
              target.classList.remove('visible')
            }
          })
        },
        { threshold, rootMargin }
      )
    }

    observedElements.add(el)
    observer.observe(el)
  }

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    observedElements.clear()
  })

  return {
    observe
  }
}

export function useReducedMotion() {
  const prefersReducedMotion = ref(false)

  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mediaQuery.matches

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.value = e.matches
    }

    mediaQuery.addEventListener('change', handler)

    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handler)
    })
  })

  return {
    prefersReducedMotion
  }
}