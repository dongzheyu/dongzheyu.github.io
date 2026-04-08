<template>
  <div class="asd-page">
    <section class="test-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">自闭症谱系障碍初筛测试</h1>
            <p class="test-hero-sub mb-2">自闭症谱系商数（AQ-10） · 10 道题 · 约 3 分钟</p>
            <p class="test-hero-desc">
              自闭症谱系商数（Autism Spectrum Quotient-10）是简短的自闭症谱系特征筛查工具，用于评估可能提示自闭症谱系障碍的行为模式。
              <strong>请注意：此测试仅适用于成人初筛，不能替代专业诊断。</strong>
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-4 test-body">
      <div v-if="!showResult">
        <p class="freq-instruction mb-5" style="padding-left: 5%;">请评估以下陈述与你的实际情况的符合程度：</p>
        <div
          v-for="(q, index) in questions"
          :key="q.id"
          class="question-card mb-4"
          :class="{ answered: answers[q.id] !== undefined }"
        >
          <div class="question-number">{{ index + 1 }} / {{ questions.length }}</div>
          <p class="question-text">{{ q.text }}</p>
          <div class="freq-options">
            <button
              v-for="opt in freqOptions"
              :key="opt.value"
              class="freq-btn"
              :class="{ selected: answers[q.id] === opt.value }"
              @click="answers[q.id] = opt.value; answers = { ...answers }"
            >
              <span class="freq-score">{{ opt.value }}</span>
              <span class="freq-label">{{ opt.label }}</span>
            </button>
          </div>
        </div>
        <div class="submit-section mt-4">
          <p v-if="answeredCount < questions.length" class="submit-hint">还有 {{ questions.length - answeredCount }} 道题未作答</p>
          <button class="btn btn-primary btn-animate btn-lg" :disabled="answeredCount < questions.length" @click="calculateResult">查看结果</button>
        </div>
      </div>

      <div v-if="showResult" class="result-section">
        <div class="score-card mb-5">
          <div class="score-circle" :style="`--score-color: ${result.color}`">
            <span class="score-num">{{ totalScore }}</span>
            <span class="score-total">/ 10</span>
          </div>
          <div class="score-info">
            <div class="score-level" :style="`color: ${result.color}`">{{ result.level }}</div>
            <p class="score-desc">{{ result.description }}</p>
          </div>
        </div>

        <div class="impairment-section mb-5">
          <h3 class="review-title">详细分析</h3>
          <div class="detail-grid">
            <div class="detail-block">
              <h4 class="detail-block-title">测试说明</h4>
              <p class="detail-block-text">{{ result.analysis }}</p>
            </div>
            <div class="detail-block">
              <h4 class="detail-block-title">建议行动</h4>
              <ul class="detail-list">
                <li v-for="s in result.suggestions" :key="s">{{ s }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="important-notice mb-5">
          <i class="bi bi-exclamation-triangle notice-icon"></i>
          <div>
            <strong>重要免责声明</strong>
            <p>AQ-10 是极简化的初筛工具，不能替代专业的自闭症谱系障碍诊断。自闭症谱系障碍的诊断需要由专业医生通过详细的发育史访谈、行为观察和标准化评估才能确定。此测试结果仅供参考，不能作为诊断依据。</p>
            <p>自闭症谱系障碍是一种神经多样性，不是疾病。许多自闭症谱系人士拥有独特的能力和优势。如果你怀疑自己可能有自闭症特征，建议寻求专业的神经发育评估。</p>
          </div>
        </div>

        <div class="text-center" style="text-align: left !important;">
          <button class="btn btn-animate me-3" @click="resetTest">重新测试</button>
          <RouterLink to="/tests" class="btn btn-primary btn-animate">查看其他测试</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const freqOptions = [
  { value: 0, label: '完全不符合' },
  { value: 1, label: '有点符合' },
]

const questions = ref([
  { id: 1, text: '我更喜欢一个人做事，而不是和别人一起' },
  { id: 2, text: '我更喜欢重复性的模式，不喜欢变化' },
  { id: 3, text: '如果我感兴趣某事，我会非常专注，忽略其他事情' },
  { id: 4, text: '我常常注意到别人没注意到的细节' },
  { id: 5, text: '社交场合中，我不知道该如何开始或维持对话' },
  { id: 6, text: '我很难理解别人的言外之意或潜台词' },
  { id: 7, text: '我对某些声音、质地、味道或光线特别敏感' },
  { id: 8, text: '我很难理解别人的感受或想法' },
  { id: 9, text: '我喜欢收集特定类型的信息或物品' },
  { id: 10, text: '我很难从别人的面部表情看出他们的感受' },
])

const answers = ref<Record<number, number>>({})
const showResult = ref(false)
const result = ref<any>(null)

const answeredCount = computed(() => questions.value.filter(q => answers.value[q.id] !== undefined).length)
const totalScore = computed(() => questions.value.reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0))

const getScoreClass = (score: number) => {
  if (score === 0) return 'score-none'
  return 'score-yes'
}

const calculateResult = () => {
  const score = totalScore.value
  // AQ-10 阈值：≥6 建议进一步评估
  
  if (score <= 3) {
    result.value = {
      level: '低特征表现',
      color: '#52b788',
      description: '你的自闭症谱系特征表现很低，属于典型神经发育模式。',
      analysis: 'AQ-10 得分 ≤3 分表明你的社会交往和行为模式与典型神经发育人群相似。你不太可能有显著的自闭症谱系特征。',
      suggestions: ['继续保持现有的社交和生活方式', '如未来出现社交或感知困扰，可重新评估', '了解神经多样性的概念'],
    }
  } else if (score <= 5) {
    result.value = {
      level: '中等特征表现',
      color: '#f48c06',
      description: '你有一些自闭症谱系特征，但可能未达到临床显著水平。',
      analysis: 'AQ-10 得分 4-5 分表明存在一些自闭症谱系特征。这些特征可能反映了你独特的认知和感知风格，但不一定构成障碍。许多人都有一些类似特征，这被称为「广泛自闭症表型」。',
      suggestions: ['了解自己的优势和挑战', '学习社交沟通技巧', '记录社交情境中的困难', '考虑阅读神经多样性相关书籍'],
    }
  } else {
    result.value = {
      level: '高特征表现',
      color: '#ff8c42',
      description: '你的自闭症谱系特征表现较高，建议考虑专业的神经发育评估。',
      analysis: 'AQ-10 得分 ≥6 分达到建议进一步评估的阈值。在这个水平，你可能有较多的自闭症谱系特征。请注意：高AQ得分不一定意味着你有自闭症谱系障碍，许多其他因素（如社交焦虑、强迫特征等）也可能导致高分。只有专业的临床评估才能确定诊断。',
      suggestions: ['考虑预约神经发育专科医生或精神科医生', '准备详细的发育史和生活史信息', '了解成人自闭症评估的流程', '寻找自闭症谱系成人支持团体'],
    }
  }
  showResult.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetTest = () => {
  answers.value = {}
  showResult.value = false
  result.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* 自闭症谱系测试主色调：淡蓝色 */
.asd-page {
  min-height: 100vh;
  --test-accent: #4cc9f0;
  --test-accent-rgb: 76, 201, 240;
}
.test-hero-sub { color: #4cc9f0; }
</style>