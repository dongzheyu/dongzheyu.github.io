<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <!-- 404 动画数字 -->
      <div class="error-code">
        <span class="digit digit-4 left">4</span>
        <span class="digit digit-0">0</span>
        <span class="digit digit-4 right">4</span>
      </div>

      <h1 class="error-title">页面未找到</h1>
      <p class="error-message">
        抱歉，您访问的页面似乎迷路了...<br>
        也许它去探索其他维度了？
      </p>

      <!-- 趣味元素 -->
      <div class="fun-elements">
        <div class="floating-icon" style="--delay: 0s;">
          <i class="bi bi-compass"></i>
        </div>
        <div class="floating-icon" style="--delay: 0.5s;">
          <i class="bi bi-map"></i>
        </div>
        <div class="floating-icon" style="--delay: 1s;">
          <i class="bi bi-signpost-2"></i>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <router-link to="/" class="btn btn-primary btn-animate btn-lg">
          <i class="bi bi-house me-2"></i>返回首页
        </router-link>
        <button class="btn btn-outline btn-animate btn-lg" @click="goBack">
          <i class="bi bi-arrow-left me-2"></i>返回上一页
        </button>
      </div>

      <!-- 推荐链接 -->
      <div class="suggestions">
        <p class="suggestions-title">不妨看看这些：</p>
        <div class="suggestion-links">
          <router-link to="/projects" class="suggestion-link">
            <i class="bi bi-folder"></i>
            <span>项目展示</span>
          </router-link>
          <router-link to="/blog" class="suggestion-link">
            <i class="bi bi-journal-text"></i>
            <span>技术博客</span>
          </router-link>
          <router-link to="/tests" class="suggestion-link">
            <i class="bi bi-clipboard-check"></i>
            <span>心理评估</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  position: relative;
  overflow: hidden;
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  position: relative;
  z-index: 1;
}

/* 404 数字 */
.error-code {
  font-size: clamp(8rem, 20vw, 12rem);
  font-weight: 900;
  line-height: 1;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  gap: 10px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.digit {
  display: inline-block;
  animation: float 3s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

.digit-0 {
  animation-delay: 0.25s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* 错误标题 */
.error-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.error-message {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 40px;
}

/* 浮动图标 */
.fun-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-icon {
  position: absolute;
  font-size: 3rem;
  color: var(--color-primary);
  opacity: 0.1;
  animation: drift 8s ease-in-out infinite;
  animation-delay: var(--delay);
}

.floating-icon:nth-child(1) {
  top: 10%;
  left: 10%;
}

.floating-icon:nth-child(2) {
  top: 60%;
  right: 15%;
}

.floating-icon:nth-child(3) {
  bottom: 10%;
  left: 20%;
}

@keyframes drift {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.action-buttons .btn {
  min-width: 160px;
}

/* 推荐链接 */
.suggestions {
  margin-top: 40px;
}

.suggestions-title {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.suggestion-links {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.suggestion-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all var(--transition-fast);
}

.suggestion-link:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: rgba(255, 140, 66, 0.08);
  transform: translateY(-2px);
}

.suggestion-link i {
  font-size: 1.1rem;
}

/* 关闭动画模式 */
[data-motion="off"] .digit,
[data-motion="off"] .floating-icon {
  animation: none;
}

/* 响应式 */
@media (max-width: 768px) {
  .not-found-page {
    padding: 40px 20px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-buttons .btn {
    width: 100%;
  }

  .suggestion-links {
    flex-direction: column;
  }

  .suggestion-link {
    width: 100%;
    justify-content: center;
  }
}
</style>
