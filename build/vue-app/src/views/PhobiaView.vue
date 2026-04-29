<template>
  <div class="phobia-page">
    <!-- 阅读进度条 -->
    <ReadingProgress />
    
    <section class="test-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">恐惧症自评测试</h1>
            <p class="test-hero-sub mb-2">社交恐惧量表（SPIN）+ 特定恐惧症 · 22 道题 · 约 7 分钟</p>
            <p class="test-hero-desc">
              本测试结合社交恐惧量表（Social Phobia Inventory）和特定恐惧症筛查，用于评估社交恐惧、广场恐惧及多种特定恐惧症状。
              请根据过去一周的情况，评估每种恐惧对你的困扰程度。
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-4 test-body">
      <div v-if="!showResult">
        <p class="freq-instruction mb-5" style="padding-left: 5%;">以下描述了各种恐惧情境，请评估在过去一周内，这种恐惧对你的困扰程度：</p>
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
            <span class="score-total">/ 88</span>
          </div>
          <div class="score-info">
            <div class="score-level" :style="`color: ${result.color}`">{{ result.level }}</div>
            <p class="score-desc">{{ result.description }}</p>
          </div>
        </div>

        <div class="answer-review mb-5">
          <h3 class="review-title">各项得分详情</h3>
          <div class="review-grid">
            <div v-for="(q, index) in questions" :key="q.id" class="review-item">
              <div class="review-q-num">Q{{ index + 1 }}</div>
              <div class="review-q-text">{{ q.text }}</div>
              <div class="review-score" :class="getScoreClass(answers[q.id])">
                {{ freqOptions.find(o => o.value === answers[q.id])?.label }}
                <span class="review-score-num">+{{ answers[q.id] }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="dimension-section mb-5">
          <h3 class="review-title">维度分析</h3>
          <div class="dimension-grid">
            <div class="dim-card">
              <div class="dim-icon"><i class="bi bi-people-fill"></i></div>
              <div class="dim-content">
                <h4 class="dim-title">社交恐惧</h4>
                <p class="dim-score">{{ socialScore }} / 32</p>
                <p class="dim-desc">害怕被他人观察、评价或羞辱</p>
              </div>
            </div>
            <div class="dim-card">
              <div class="dim-icon"><i class="bi bi-geo-alt-fill"></i></div>
              <div class="dim-content">
                <h4 class="dim-title">广场恐惧</h4>
                <p class="dim-score">{{ agoraphobiaScore }} / 12</p>
                <p class="dim-desc">害怕无法逃离或获得帮助的环境</p>
              </div>
            </div>
            <div class="dim-card">
              <div class="dim-icon"><i class="bi bi-bug-fill"></i></div>
              <div class="dim-content">
                <h4 class="dim-title">特定恐惧</h4>
                <p class="dim-score">{{ specificScore }} / 28</p>
                <p class="dim-desc">对特定物体或情境的过度恐惧</p>
              </div>
            </div>
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
            <strong>重要说明</strong>
            <p>恐惧症测试是筛查工具，不能替代专业诊断。恐惧症通常可以通过暴露疗法、认知行为疗法等有效治疗。如果你的恐惧已经严重影响日常生活，建议寻求专业帮助。</p>
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
import ReadingProgress from '@/components/ReadingProgress.vue'

const freqOptions = [
  { value: 0, label: '一点也不' },
  { value: 1, label: '有一点' },
  { value: 2, label: '中等程度' },
  { value: 3, label: '非常严重' },
  { value: 4, label: '极其严重' },
]

const questions = ref([
  { id: 1, text: '在人群中感到恐惧', category: 'social' },
  { id: 2, text: '害怕在公共场合说话', category: 'social' },
  { id: 3, text: '担心自己的行为会让自己尴尬', category: 'social' },
  { id: 4, text: '害怕与权威人士交谈', category: 'social' },
  { id: 5, text: '害怕被人注视或观察', category: 'social' },
  { id: 6, text: '害怕在别人面前做事', category: 'social' },
  { id: 7, text: '害怕成为关注焦点', category: 'social' },
  { id: 8, text: '害怕在社交场合脸红', category: 'social' },
  { id: 9, text: '害怕独自离开家', category: 'agoraphobia' },
  { id: 10, text: '害怕在拥挤的地方', category: 'agoraphobia' },
  { id: 11, text: '害怕乘坐公共交通工具', category: 'agoraphobia' },
  { id: 12, text: '害怕被困在无法逃离的地方', category: 'agoraphobia' },
  { id: 13, text: '害怕高处（恐高症）', category: 'specific' },
  { id: 14, text: '害怕飞行（飞行恐惧症）', category: 'specific' },
  { id: 15, text: '害怕动物（如蜘蛛、狗、蛇）', category: 'specific' },
  { id: 16, text: '害怕看到血或伤口', category: 'specific' },
  { id: 17, text: '害怕注射或医疗程序', category: 'specific' },
  { id: 18, text: '害怕牙科治疗', category: 'specific' },
  { id: 19, text: '害怕窒息或呕吐', category: 'specific' },
  { id: 20, text: '害怕雷暴或自然灾害', category: 'specific' },
  { id: 21, text: '害怕在封闭空间（幽闭恐惧症）', category: 'specific' },
  { id: 22, text: '害怕黑暗或夜晚', category: 'specific' },
])

const answers = ref<Record<number, number>>({})
const showResult = ref(false)
const result = ref<any>(null)

const answeredCount = computed(() => questions.value.filter(q => answers.value[q.id] !== undefined).length)
const totalScore = computed(() => questions.value.reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0))

const socialScore = computed(() => {
  return questions.value.filter(q => q.category === 'social')
    .reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
})

const agoraphobiaScore = computed(() => {
  return questions.value.filter(q => q.category === 'agoraphobia')
    .reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
})

const specificScore = computed(() => {
  return questions.value.filter(q => q.category === 'specific')
    .reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
})

const getScoreClass = (score: number) => {
  if (score === 0) return 'score-none'
  if (score <= 2) return 'score-low'
  if (score === 3) return 'score-mid'
  return 'score-high'
}

const calculateResult = () => {
  const score = totalScore.value
  const social = socialScore.value
  const agora = agoraphobiaScore.value
  const specific = specificScore.value
  
  // SPIN 社交恐惧阈值：≥19 为临床显著
  const isSocialSignificant = social >= 19
  const isAgoraSignificant = agora >= 8
  const isSpecificSignificant = specific >= 14
  
  if (score <= 20) {
    result.value = {
      level: '低度恐惧',
      color: '#52b788',
      description: '你的恐惧水平在正常范围内，当前恐惧症状对你的困扰较小。',
      analysis: '总得分 ≤20 分表明你的恐惧症状轻微。适度的恐惧是正常的适应性反应，有助于我们避开真正的危险。你目前的恐惧水平不太可能影响日常生活功能。',
      suggestions: ['继续保持现有的应对方式', '了解恐惧反应的正常范围', '如未来出现新的恐惧，可再次评估', '保持规律的社交活动维持自信'],
    }
  } else if (score <= 45) {
    result.value = {
      level: '中度恐惧',
      color: '#f48c06',
      description: '你存在一定程度的恐惧症状，这些恐惧可能在某些情境下给你带来困扰。',
      analysis: '总得分 21–45 分属于中等程度恐惧。你可能在某些特定情境下体验到显著的焦虑和回避行为。认知行为疗法中的暴露疗法对恐惧症有良好效果，建议考虑学习相关技巧。',
      suggestions: ['学习呼吸放松技巧用于恐惧情境', '尝试逐步暴露于轻度恐惧情境', '记录恐惧触发情境和应对方式', '考虑阅读自助书籍或使用 CBT 应用程序'],
    }
  } else if (score <= 70) {
    result.value = {
      level: '高度恐惧',
      color: '#ff8c42',
      description: '你的恐惧症状较为明显，很可能已经对你的生活产生实质性影响。',
      analysis: '总得分 46–70 分属于高度恐惧范围。在这个水平，恐惧症状可能导致明显的回避行为，影响社交、工作或日常活动。专业的恐惧症治疗（如暴露与反应预防疗法）通常能显著改善症状。',
      suggestions: ['建议预约心理咨询师或精神科医生', '了解暴露疗法的基本原理和步骤', '与家人或朋友讨论你的恐惧，获得支持', '避免使用酒精或药物临时缓解恐惧'],
    }
  } else {
    result.value = {
      level: '极度恐惧',
      color: '#ef233c',
      description: '你的恐惧症状非常严重，很可能显著损害你的生活质量，建议立即寻求专业帮助。',
      analysis: '总得分 ≥71 分属于极度恐惧范围。在这个水平，恐惧症状可能导致严重的功能障碍和生活质量下降。恐惧症是治疗成功率较高的精神障碍之一，通过系统的心理治疗大多数患者能够显著改善。',
      suggestions: ['请尽快就诊精神科或心理科', '询问医生关于暴露疗法或认知行为疗法', '在治疗开始前，避免完全回避恐惧情境', '危机时请拨打心理援助热线 400-161-9995'],
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
/* 恐惧症测试主色调：深青色 */
.phobia-page {
  min-height: 100vh;
  --test-accent: #168aad;
  --test-accent-rgb: 22, 138, 173;
}
.test-hero-sub { color: var(--test-accent); }

/* 深色主题下的特殊处理 */
[data-theme="dark"] .test-hero-sub,
:root .test-hero-sub {
  color: #5acce6; /* 更浅的蓝绿色确保在深色背景上可读 */
}
</style>