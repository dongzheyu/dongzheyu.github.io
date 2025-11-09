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
    // window.close()
  }, 3000)
})
</script>

<style scoped>
.redirect-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: opacity 0.5s ease-in-out;
  color: white;
}

.redirect-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.orbit-spinner {
  position: relative;
  width: 100px;
  height: 100px;
}

.orbit-spinner .orbit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #ffffff;
  animation: orbit-spinner-animation 1s infinite linear;
}

.orbit-spinner .orbit:nth-child(2) {
  animation-duration: 1.5s;
  border-top-color: #ffffffaa;
}

.orbit-spinner .orbit:nth-child(3) {
  animation-duration: 2s;
  border-top-color: #ffffff66;
}

@keyframes orbit-spinner-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

h2 {
  font-weight: 300;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

p {
  opacity: 0.9;
}

[data-bs-theme="dark"] .redirect-page {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: #fff;
}
</style>