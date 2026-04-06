<template>
  <div class="tests-page">
    <section class="tests-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <h1 class="tests-title mb-4 animate-slide-up" :class="{ 'visible': isVisible }">
              心理测试 <span class="text-gradient">— 了解自己</span>
            </h1>
            <p class="tests-subtitle mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.15s">
              基于标准量表，探索你的人格类型与心理状态
            </p>
            <p class="tests-desc animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.3s">
              以下测试仅供参考，不构成任何医学或心理学诊断依据。如有需要，请寻求专业心理咨询师的帮助。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="tests-cards-section">
      <div class="container-fluid px-4">
        <div class="row g-4">
          <div
            v-for="(test, index) in tests"
            :key="test.id"
            class="col-md-4 animate-slide-up"
            :class="{ 'visible': isVisible }"
            :style="`animation-delay: ${0.1 + index * 0.15}s`"
          >
            <RouterLink :to="test.path" class="test-card-link">
              <div class="test-card card h-100 border-0">
                <div class="test-card-header" :style="`background: ${test.gradient}`">
                  <i :class="test.icon + ' test-card-icon'"></i>
                  <span class="test-badge">{{ test.badge }}</span>
                </div>
                <div class="card-body p-4">
                  <h5 class="test-card-title mb-2">{{ test.title }}</h5>
                  <p class="test-card-desc mb-3">{{ test.description }}</p>
                  <div class="test-meta d-flex gap-3">
                    <span class="meta-item">
                      <i class="bi bi-list-check me-1"></i>{{ test.questions }} 题
                    </span>
                    <span class="meta-item">
                      <i class="bi bi-clock me-1"></i>约 {{ test.minutes }} 分钟
                    </span>
                  </div>
                </div>
                <div class="card-footer border-0 p-4 pt-0">
                  <span class="btn btn-animate w-100 text-center" :style="`--btn-color: ${test.color}`">
                    开始测试
                  </span>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="tests-disclaimer">
      <div class="container-fluid px-4">
        <div class="disclaimer-box animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.6s">
          <i class="bi bi-info-circle disclaimer-icon"></i>
          <div>
            <strong>免责声明</strong>
            <p>本页面所有测试均基于公开标准量表，仅供个人参考与自我认知。测试结果不能替代专业的心理健康评估。若你感到持续的心理困扰，请及时联系心理卫生专业人士。</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAnimations } from '@/composables/useAnimations'

const { isVisible } = useAnimations()

const tests = ref([
  {
    id: 'mbti',
    path: '/tests/mbti',
    title: 'MBTI 人格测试',
    description: '基于迈尔斯-布里格斯类型指标，通过 93 道题目测出你在四个维度上的偏好，识别 16 种人格类型之一。',
    icon: 'bi bi-diagram-3',
    badge: 'MBTI',
    gradient: 'linear-gradient(135deg, rgba(255,140,66,0.15) 0%, rgba(244,140,6,0.08) 100%)',
    color: '#ff8c42',
    questions: 93,
    minutes: 15
  },
  {
    id: 'depression',
    path: '/tests/depression',
    title: '抑郁症自评测试',
    description: '基于 PHQ-9 患者健康问卷，是国际广泛使用的抑郁症筛查工具，包含 9 个核心症状问题。',
    icon: 'bi bi-heart-pulse',
    badge: 'PHQ-9',
    gradient: 'linear-gradient(135deg, rgba(239,35,60,0.12) 0%, rgba(217,4,41,0.06) 100%)',
    color: '#ef233c',
    questions: 9,
    minutes: 5
  },
  {
    id: 'sunshine',
    path: '/tests/sunshine',
    title: '阳光抑郁症测试',
    description: '识别"微笑型抑郁"特征——表面乐观开朗，内心却承受痛苦。通过 15 道题目评估这一隐性状态。',
    icon: 'bi bi-sun',
    badge: '微笑抑郁',
    gradient: 'linear-gradient(135deg, rgba(255,186,8,0.15) 0%, rgba(244,140,6,0.08) 100%)',
    color: '#f48c06',
    questions: 15,
    minutes: 8
  }
])
</script>

<style scoped>
.tests-hero {
  padding: 80px 0 48px;
  background: var(--gradient-hero);
  position: relative;
  overflow: hidden;
}

.tests-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--noise-texture);
  opacity: var(--noise-opacity);
  pointer-events: none;
}

.tests-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.02em;
}

.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tests-subtitle {
  font-size: 1.1rem;
  color: var(--color-primary);
  font-weight: 600;
}

.tests-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  max-width: 560px;
  line-height: 1.7;
}

.tests-cards-section {
  padding: 64px 0;
}

.test-card-link {
  text-decoration: none;
  display: block;
  height: 100%;
}

.test-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border) !important;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
              border-color 0.2s ease;
}

.test-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-border-hover) !important;
}

.test-card-header {
  padding: 28px 24px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
}

.test-card-icon {
  font-size: 2.2rem;
  color: var(--color-primary);
}

.test-badge {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
  background: var(--color-bg-mute);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.test-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-heading);
}

.test-card-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
}

.test-meta {
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.meta-item {
  display: flex;
  align-items: center;
}

.tests-disclaimer {
  padding: 0 0 64px;
}

.disclaimer-box {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 20px 24px;
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  max-width: 900px;
  margin: 0 auto;
}

.disclaimer-icon {
  font-size: 1.3rem;
  color: var(--color-text-muted);
  flex-shrink: 0;
  margin-top: 2px;
}

.disclaimer-box strong {
  display: block;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.disclaimer-box p {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin: 0;
}
</style>
