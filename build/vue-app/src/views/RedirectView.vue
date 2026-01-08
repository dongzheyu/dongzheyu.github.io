<template>
  <div class="redirect-page d-flex align-items-center justify-content-center min-vh-100">
    <div class="text-center">
      <div class="redirect-animation">
        <div class="orbit-spinner">
          <div class="orbit"></div>
          <div class="orbit"></div>
          <div class="orbit"></div>
        </div>
      </div>
      <h2 class="mt-4">正在跳转到外部页面</h2>
      <p class="lead">即将打开 <code>https://dongle.dpdns.org</code></p>
      <div class="progress mt-3" style="height: 5px; max-width: 300px; margin: 0 auto;">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // 添加一个短暂的延迟，然后跳转到外部链接
  setTimeout(() => {
    window.open('https://dongle.dpdns.org', '_blank')
    // 如果需要关闭当前标签页，可以取消下面的注释
    window.close()
  }, 3000)
})
</script>
