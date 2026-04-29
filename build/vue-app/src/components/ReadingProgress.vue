<template>
  <div class="reading-progress-vertical" :style="`height: ${progress}%`">
    <div class="progress-label">{{ Math.round(progress) }}%</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = scrollTop / docHeight
  progress.value = Math.min(100, Math.max(0, scrollPercent * 100))
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<style scoped>
.reading-progress-vertical {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  max-height: 200px;
  background: var(--gradient-primary);
  border-radius: 2px;
  z-index: 999;
  transition: height 0.1s ease-out;
  box-shadow: 0 0 10px rgba(255, 140, 66, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-label {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 12px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.reading-progress-vertical:hover .progress-label {
  opacity: 1;
}

[data-motion="off"] .reading-progress-vertical {
  transition: none;
}

/* 移动端隐藏或调整位置 */
@media (max-width: 768px) {
  .reading-progress-vertical {
    right: 10px;
    width: 3px;
    max-height: 150px;
  }
  
  .progress-label {
    font-size: 10px;
  }
}
</style>
