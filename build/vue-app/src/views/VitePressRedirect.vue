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

<style scoped>
.redirect-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>