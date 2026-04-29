import { type App } from 'vue'

/**
 * 图片懒加载指令
 * 使用 IntersectionObserver API 实现高性能的图片懒加载
 */
export default {
  mounted(el: HTMLImageElement, binding: any) {
    // 保存原始 src 到 data-src
    const src = binding.value || el.getAttribute('data-src')
    if (!src) return

    el.setAttribute('data-src', src)
    
    // 设置占位图或低质量预览图
    el.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'
    el.style.opacity = '0'
    el.style.transition = 'opacity 0.3s ease-in-out'

    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const dataSrc = img.getAttribute('data-src')
          
          if (dataSrc) {
            // 加载真实图片
            const tempImg = new Image()
            tempImg.onload = () => {
              img.src = dataSrc
              img.style.opacity = '1'
              img.removeAttribute('data-src')
            }
            tempImg.onerror = () => {
              console.warn(`Failed to load image: ${dataSrc}`)
              img.style.opacity = '1'
            }
            tempImg.src = dataSrc
          }
          
          // 停止观察
          observer.unobserve(img)
        }
      })
    }, {
      rootMargin: '50px 0px', // 提前 50px 开始加载
      threshold: 0.01
    })

    observer.observe(el)
    
    // 将观察器保存到元素上，以便卸载时清理
    ;(el as any)._lazyObserver = observer
  },
  
  unmounted(el: HTMLImageElement) {
    // 清理观察器
    const observer = (el as any)._lazyObserver
    if (observer) {
      observer.disconnect()
      delete (el as any)._lazyObserver
    }
  }
}
