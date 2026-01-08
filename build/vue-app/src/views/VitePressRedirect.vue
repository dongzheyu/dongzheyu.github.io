<template>
  <div class="redirect-page">
    <!-- 立即重定向，不显示任何内容 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // 立即重定向到 VitePress 构建的博客首页
  window.location.href = '/blog/'
})
</script>