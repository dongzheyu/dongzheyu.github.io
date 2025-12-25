<template>
  <div class="redirect-page">
    <!-- 重定向提示 -->
    <div class="redirect-message" v-if="showMessage">
      <div class="message-content">
        <div class="message-icon">
          <i class="bi bi-arrow-repeat"></i>
        </div>
        <h3>正在跳转到博客...</h3>
        <p>您将被重定向到VitePress构建的博客页面</p>
        <div class="countdown">跳转倒计时: {{ countdown }}秒</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showMessage = ref(true)
const countdown = ref(3)

onMounted(() => {
  // 设置倒计时自动跳转
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      redirectToBlog()
    }
  }, 1000)
})

const redirectToBlog = () => {
  // 重定向到 VitePress 构建的博客首页
  window.location.href = '/blog/'
}
</script>

<style scoped>
.redirect-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.redirect-message {
  text-align: center;
  color: white;
}

.message-content {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.message-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.countdown {
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1.1rem;
}
</style>