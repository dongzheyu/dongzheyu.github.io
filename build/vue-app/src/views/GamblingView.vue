<template>
  <div class="gambling-page">
    <section class="test-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">赌博障碍自评测试</h1>
            <p class="test-hero-sub mb-2">赌博问题严重性指数（PGSI） · 9 道题 · 约 3 分钟</p>
            <p class="test-hero-desc">
              赌博问题严重性指数（Problem Gambling Severity Index）是评估赌博问题严重程度的标准化工具。
              请根据过去一年的情况回答。
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-4 test-body">
      <div v-if="!showResult">
        <p class="freq-instruction mb-5" style="padding-left: 5%;">在过去一年中，以下情况发生的频率如何？</p>
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
            <span class="score-total">/ 27</span>
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
            <strong>重要说明</strong>
            <p>PGSI 是筛查工具，不能替代专业诊断。赌博障碍是一种可治疗的精神障碍，通过认知行为疗法和支持团体通常能够显著改善。如果你或你认识的人正在与赌博问题作斗争，寻求帮助是康复的第一步。</p>
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
  { value: 0, label: '从不' },
  { value: 1, label: '有时' },
  { value: 2, label: '大多数时候' },
  { value: 3, label: '几乎总是' },
]

const questions = ref([
  { id: 1, text: '你赌博的钱是否超过你原本计划的金额？' },
  { id: 2, text: '你是否需要赌博更多钱才能获得同样的刺激感？' },
  { id: 3, text: '当你试图减少或停止赌博时，是否感到烦躁或不安？' },
  { id: 4, text: '赌博是否导致你出现健康问题，包括压力或焦虑？' },
  { id: 5, text: '是否有人批评你的赌博行为，或者告诉你你有赌博问题？' },
  { id: 6, text: '赌博是否导致你的财务状况出现问题？' },
  { id: 7, text: '你是否因赌博而感到内疚？' },
  { id: 8, text: '赌博是否导致你失去学习或工作机会？' },
  { id: 9, text: '你是否依赖他人帮你解决赌博造成的财务问题？' },
])

const answers = ref<Record<number, number>>({})
const showResult = ref(false)
const result = ref<any>(null)

const answeredCount = computed(() => questions.value.filter(q => answers.value[q.id] !== undefined).length)
const totalScore = computed(() => questions.value.reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0))

const getScoreClass = (score: number) => {
  if (score === 0) return 'score-none'
  if (score === 1) return 'score-low'
  if (score === 2) return 'score-mid'
  return 'score-high'
}

const calculateResult = () => {
  const score = totalScore.value
  // PGSI 分级：0 无风险，1-2 低风险，3-7 中等风险，8+ 高风险
  
  if (score === 0) {
    result.value = {
      level: '无赌博问题',
      color: '#52b788',
      description: '你的赌博行为在正常范围内，没有出现赌博问题。',
      analysis: 'PGSI 得分 0 分表明你没有出现赌博问题。保持健康的娱乐方式，避免赌博即可。',
      suggestions: ['继续保持不赌博的健康习惯', '了解赌博的风险和危害', '如未来出现赌博冲动，可重新评估'],
    }
  } else if (score <= 2) {
    result.value = {
      level: '低风险赌博',
      color: '#f48c06',
      description: '你存在一些赌博行为，但尚未构成问题赌博，值得关注。',
      analysis: 'PGSI 得分 1-2 分属于低风险范围。你可能偶尔赌博，但尚未出现明显的问题。建议设定明确的赌博限制，避免进一步发展。',
      suggestions: ['设定具体的赌博时间和金额限制', '避免使用信用卡或借款赌博', '寻找替代的娱乐活动', '了解问题赌博的预警信号'],
    }
  } else if (score <= 7) {
    result.value = {
      level: '中等风险赌博',
      color: '#ff8c42',
      description: '你的赌博行为已达到中等风险水平，很可能存在赌博问题，建议寻求帮助。',
      analysis: 'PGSI 得分 3-7 分达到中等风险标准。在这个水平，赌博可能已经开始影响你的生活和心理健康。赌博障碍是可以通过治疗有效管理的。',
      suggestions: ['建议预约心理咨询师或成瘾专科医生', '参加赌博问题支持团体', '使用自我排除工具禁止进入赌场或赌博网站', '寻求财务咨询帮助'],
    }
  } else {
    result.value = {
      level: '问题赌博（高风险）',
      color: '#ef233c',
      description: '你的赌博行为显示高风险，很可能符合赌博障碍诊断，建议立即寻求专业帮助。',
      analysis: 'PGSI 得分 ≥8 分属于问题赌博（高风险）范围。在这个水平，赌博很可能已经严重影响你的生活、健康和人际关系。赌博障碍需要系统的专业治疗干预。',
      suggestions: ['请尽快就诊成瘾医学专科或精神科', '如实告诉医生你的赌博情况和财务问题', '考虑住院治疗或强化门诊治疗选项', '危机时刻请拨打赌博问题援助热线 400-161-9995'],
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
/* 赌博障碍测试主色调：深棕色 */
.gambling-page {
  min-height: 100vh;
  --test-accent: #6d4c41;
  --test-accent-rgb: 109, 76, 65;
}
.test-hero-sub { color: #6d4c41; }
</style>