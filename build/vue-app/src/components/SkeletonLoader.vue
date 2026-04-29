<template>
  <div class="skeleton-loader" :class="type" :style="{ width, height }">
    <div class="skeleton-shimmer"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'text' | 'circle' | 'rect' | 'card'
  width?: string
  height?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  width: '100%',
  height: '16px'
})
</script>

<style scoped>
.skeleton-loader {
  background: linear-gradient(
    90deg,
    var(--color-bg-soft) 25%,
    var(--color-bg-elevated) 50%,
    var(--color-bg-soft) 75%
  );
  background-size: 200% 100%;
  border-radius: var(--radius-sm);
  animation: shimmer 1.5s infinite;
}

.skeleton-shimmer {
  width: 100%;
  height: 100%;
}

.skeleton-loader.circle {
  border-radius: 50%;
}

.skeleton-loader.card {
  border-radius: var(--radius-lg);
  min-height: 200px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

[data-motion="off"] .skeleton-loader {
  animation: none;
  background: var(--color-bg-soft);
}
</style>
