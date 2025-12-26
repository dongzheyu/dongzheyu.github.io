---
layout: false
---

<script setup>
import { onMounted } from 'vue'

// 在客户端挂载后重定向到 Vue 应用的博客列表页面
onMounted(() => {
  window.location.href = '/blog'
})
</script>

<meta http-equiv="refresh" content="0; url=/blog">