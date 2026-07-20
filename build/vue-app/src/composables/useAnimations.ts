import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(options: { threshold?: number; rootMargin?: string; once?: boolean } = {}) {
  const { threshold = 0.1, rootMargin = '-50px', once = true } = options

  let observer: IntersectionObserver | null = null
  const observedElements = new Set<HTMLElement>()

  const observe = (el: HTMLElement) => {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
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
        { threshold, rootMargin },
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
    observe,
  }
}


