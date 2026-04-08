<template>
  <div class="somatic-page">
    <section class="test-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">躯体症状障碍自评测试</h1>
            <p class="test-hero-sub mb-2">躯体症状量表（PHQ-15） · 15 道题 · 约 4 分钟</p>
            <p class="test-hero-desc">
              躯体症状量表（Patient Health Questionnaire-15）是评估常见躯体症状严重程度的自评工具，用于筛查躯体症状障碍和医学无法解释的症状。
              请根据过去四周的情况回答。
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-4 test-body">
      <div v-if="!showResult">
        <p class="freq-instruction mb-5" style="padding-left: 5%;">在过去四周内，以下身体症状对你造成了多大困扰？</p>
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
            <span class="score-total">/ 30</span>
          </div>
          <div class="score-info">
            <div class="score-level" :style="`color: ${result.color}`">{{ result.level }}</div>
            <p class="score-desc">{{ result.description }}</p>
          </div>
        </div>

        <div class="answer-review mb-5">
          <h3 class="review-title">各项症状详情</h3>
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
            <strong>重要医疗声明</strong>
            <p>PHQ-15 是筛查工具，不能替代医学检查。躯体症状可能由身体疾病、心理因素或两者共同引起。在考虑心理因素之前，必须排除潜在的医学疾病。如果你有持续的身体症状，请务必先咨询医生进行全面的医学评估。</p>
            <p>躯体症状障碍是一种真实的精神障碍，患者体验到的身体症状是真实的痛苦，不是"想象出来的"。通过认知行为疗法、正念和压力管理，通常能够显著改善症状。</p>
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
  { value: 0, label: '一点也不' },
  { value: 1, label: '有一点' },
  { value: 2, label: '很多' },
]

const questions = ref([
  { id: 1, text: '胃痛' },
  { id: 2, text: '背痛' },
  { id: 3, text: '手臂、腿或关节疼痛' },
  { id: 4, text: '月经期疼痛或其他月经问题' },
  { id: 5, text: '头痛' },
  { id: 6, text: '胸痛' },
  { id: 7, text: '头晕' },
  { id: 8, text: '昏厥' },
  { id: 9, text: '心跳加速' },
  { id: 10, text: '呼吸短促' },
  { id: 11, text: '便秘、腹泻或肠胃不适' },
  { id: 12, text: '恶心、胀气或消化不良' },
  { id: 13, text: '感觉疲倦或精力不足' },
  { id: 14, text: '睡眠问题' },
  { id: 15, text: '性方面的问题' },
])

const answers = ref<Record<number, number>>({})
const showResult = ref(false)
const result = ref<any>(null)

const answeredCount = computed(() => questions.value.filter(q => answers.value[q.id] !== undefined).length)
const totalScore = computed(() => questions.value.reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0))

const getScoreClass = (score: number) => {
  if (score === 0) return 'score-none'
  if (score === 1) return 'score-low'
  return 'score-high'
}

const calculateResult = () => {
  const score = totalScore.value
  // PHQ-15 分级：0-4 极轻微，5-9 轻度，10-14 中度，15+ 重度
  
  if (score <= 4) {
    result.value = {
      level: '极轻微躯体症状',
      color: '#52b788',
      description: '你的躯体症状水平很低，属于正常范围。',
      analysis: 'PHQ-15 得分 0-4 分表明躯体症状极轻微。大多数人都有一些轻微的身体不适，这是正常的。你的得分显示躯体症状不太可能影响你的生活。',
      suggestions: ['继续保持健康的生活方式', '定期进行体育锻炼', '如症状加重，可重新评估', '了解身心连接的基本原理'],
    }
  } else if (score <= 9) {
    result.value = {
      level: '轻度躯体症状',
      color: '#f48c06',
      description: '你存在一定程度的躯体症状，但可能未达到临床显著水平。',
      analysis: 'PHQ-15 得分 5-9 分属于轻度症状范围。你可能体验到一些身体不适，这些症状可能与压力、生活方式或轻微健康问题相关。',
      suggestions: ['学习压力管理技巧', '练习正念冥想减轻身体紧张', '记录症状与情绪、压力的关系', '考虑咨询医生排除医学原因'],
    }
  } else if (score <= 14) {
    result.value = {
      level: '中度躯体症状',
      color: '#ff8c42',
      description: '你的躯体症状已达到临床显著水平，建议寻求专业评估。',
      analysis: 'PHQ-15 得分 10-14 分达到临床显著阈值。在这个水平，躯体症状很可能已经开始影响你的生活质量。躯体症状障碍是可通过心理治疗有效改善的障碍。',
      suggestions: ['建议预约心身医学科或精神科医生', '同时咨询全科医生排除医学疾病', '了解认知行为疗法对躯体症状的效果', '学习放松训练和生物反馈技巧'],
    }
  } else {
    result.value = {
      level: '重度躯体症状',
      color: '#ef233c',
      description: '你的躯体症状非常严重，很可能显著损害你的功能，建议立即寻求专业帮助。',
      analysis: 'PHQ-15 得分 ≥15 分属于重度躯体症状范围。在这个水平，躯体症状很可能已经严重影响你的日常生活功能。重度躯体症状障碍需要系统的多学科治疗干预。',
      suggestions: ['请尽快就诊心身医学科或精神科', '如实告诉医生你的症状严重程度和医疗检查历史', '考虑综合治疗方案，包括心理治疗和必要时药物治疗', '参加心身医学治疗项目'],
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
/* 躯体症状障碍测试主色调：土黄色 */
.somatic-page {
  min-height: 100vh;
  --test-accent: #bc6c25;
  --test-accent-rgb: 188, 108, 37;
}
.test-hero-sub { color: #bc6c25; }
</style>