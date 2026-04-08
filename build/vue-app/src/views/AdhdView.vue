<template>
  <div class="adhd-page">
    <section class="test-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">注意力缺陷多动障碍（ADHD）自评测试</h1>
            <p class="test-hero-sub mb-2">成人 ADHD 自评量表（ASRS-v1.1） · 18 道题 · 约 5 分钟</p>
            <p class="test-hero-desc">
              成人 ADHD 自评量表（Adult ADHD Self-Report Scale v1.1）是根据 DSM-5 标准开发的自评工具，用于筛查成人 ADHD 症状。
              请根据过去六个月的情况回答。
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-4 test-body">
      <div v-if="!showResult">
        <p class="freq-instruction mb-5">请评估以下情况在过去六个月中发生的频率：</p>
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
            <span class="score-total">/ 72</span>
          </div>
          <div class="score-info">
            <div class="score-level" :style="`color: ${result.color}`">{{ result.level }}</div>
            <p class="score-desc">{{ result.description }}</p>
          </div>
        </div>

        <div class="dimension-section mb-5">
          <h3 class="review-title">症状维度分析</h3>
          <div class="dimension-grid">
            <div class="dim-card">
              <div class="dim-icon"><i class="bi bi-lightbulb-fill"></i></div>
              <div class="dim-content">
                <h4 class="dim-title">注意缺陷</h4>
                <p class="dim-score">{{ inattentionScore }} / 36</p>
                <p class="dim-desc">注意力不集中、容易分心、健忘</p>
              </div>
            </div>
            <div class="dim-card">
              <div class="dim-icon"><i class="bi bi-lightning-fill"></i></div>
              <div class="dim-content">
                <h4 class="dim-title">多动冲动</h4>
                <p class="dim-score">{{ hyperactivityScore }} / 36</p>
                <p class="dim-desc">坐立不安、难以等待、打断他人</p>
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
            <p>ASRS 是筛查工具，不能替代专业诊断。ADHD 是一种神经发育障碍，通过药物治疗、行为治疗和技能训练通常能够显著改善功能。如果你怀疑自己可能有 ADHD，建议寻求专业的神经精神科评估。</p>
          </div>
        </div>

        <div class="text-center text-left">
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
  { value: 1, label: '很少' },
  { value: 2, label: '有时' },
  { value: 3, label: '经常' },
  { value: 4, label: '总是' },
]

const questions = ref([
  { id: 1, text: '你难以完成细节任务或工作中不注意细节而犯错吗？', dimension: 'inattention' },
  { id: 2, text: '你难以在任务或活动中保持注意力吗？', dimension: 'inattention' },
  { id: 3, text: '别人对你说话时，你似乎没有在听吗？', dimension: 'inattention' },
  { id: 4, text: '你不按照指示做事，无法完成工作吗？', dimension: 'inattention' },
  { id: 5, text: '你难以组织任务和活动吗？', dimension: 'inattention' },
  { id: 6, text: '你回避、不喜欢或不愿意从事需要持久脑力劳动的任务吗？', dimension: 'inattention' },
  { id: 7, text: '你丢失任务或活动所需的东西吗？', dimension: 'inattention' },
  { id: 8, text: '你容易因外来刺激而分心吗？', dimension: 'inattention' },
  { id: 9, text: '你在日常活动中健忘吗？', dimension: 'inattention' },
  { id: 10, text: '你坐立不安或手脚动个不停吗？', dimension: 'hyperactivity' },
  { id: 11, text: '你在应该坐着时离开座位吗？', dimension: 'hyperactivity' },
  { id: 12, text: '你在不适当的场合过度奔跑或攀爬吗？', dimension: 'hyperactivity' },
  { id: 13, text: '你难以安静地从事休闲活动吗？', dimension: 'hyperactivity' },
  { id: 14, text: '你好像被马达驱动一样不停活动吗？', dimension: 'hyperactivity' },
  { id: 15, text: '你说话过多吗？', dimension: 'hyperactivity' },
  { id: 16, text: '你在问题还没问完时就抢答吗？', dimension: 'hyperactivity' },
  { id: 17, text: '你难以等待轮到自己吗？', dimension: 'hyperactivity' },
  { id: 18, text: '你打断或侵扰他人吗？', dimension: 'hyperactivity' },
])

const answers = ref<Record<number, number>>({})
const showResult = ref(false)
const result = ref<any>(null)

const answeredCount = computed(() => questions.value.filter(q => answers.value[q.id] !== undefined).length)
const totalScore = computed(() => questions.value.reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0))

const inattentionScore = computed(() => {
  return questions.value.filter(q => q.dimension === 'inattention')
    .reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
})

const hyperactivityScore = computed(() => {
  return questions.value.filter(q => q.dimension === 'hyperactivity')
    .reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
})

const getScoreClass = (score: number) => {
  if (score === 0) return 'score-none'
  if (score <= 1) return 'score-low'
  if (score <= 2) return 'score-mid'
  return 'score-high'
}

const calculateResult = () => {
  const score = totalScore.value
  const inattention = inattentionScore.value
  const hyperactivity = hyperactivityScore.value
  
  // ASRS 筛查算法：前6题（注意缺陷）≥4 阳性
  const part1Score = questions.value.slice(0, 6).reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
  const isPositive = part1Score >= 4
  
  if (score <= 20) {
    result.value = {
      level: '极轻微症状',
      color: '#52b788',
      description: '你的ADHD症状水平很低，属于正常范围。',
      analysis: '总得分 ≤20 分表明ADHD症状极轻微。大多数人都有一些注意力不集中或冲动的时刻，这是正常的。你的得分显示ADHD不太可能影响你的生活。',
      suggestions: ['继续保持现有的生活习惯', '如症状加重，可重新评估', '了解ADHD的正常表现范围'],
    }
  } else if (score <= 40) {
    result.value = {
      level: '轻度症状',
      color: '#f48c06',
      description: '你存在一定程度的ADHD症状，但可能未达到临床水平。',
      analysis: '总得分 21-40 分属于轻度症状范围。你可能有一些注意力或多动冲动困难，但尚未严重影响功能。执行功能训练可能对你有帮助。',
      suggestions: ['学习时间管理和组织技巧', '尝试使用待办事项清单和提醒工具', '记录分心时间和触发因素', '考虑阅读ADHD自助书籍'],
    }
  } else if (score <= 60) {
    result.value = {
      level: '中度症状',
      color: '#ff8c42',
      description: '你的ADHD症状已达到临床显著水平，建议寻求专业评估。',
      analysis: '总得分 41-60 分达到临床显著阈值。在这个水平，ADHD症状很可能已经开始影响你的工作、学习或人际关系。ADHD是可以通过药物和行为治疗有效管理的神经发育障碍。',
      suggestions: ['建议预约神经精神科医生或心理医生', '了解ADHD的诊断标准和治疗选项', '寻找ADHD专科治疗师', '考虑参加ADHD支持团体'],
    }
  } else {
    result.value = {
      level: '重度症状',
      color: '#ef233c',
      description: '你的ADHD症状非常严重，很可能显著损害你的功能，建议立即寻求专业帮助。',
      analysis: '总得分 ≥61 分属于重度ADHD症状范围。在这个水平，症状很可能已经严重影响你的日常生活功能。重度ADHD需要系统的专业评估和治疗干预。',
      suggestions: ['请尽快就诊神经精神科或精神科', '如实告诉医生你的症状严重程度和持续时间', '了解药物治疗和心理治疗的联合方案', '考虑参加ADHD强化治疗项目'],
    }
  }
  
  // 补充ASRS筛查算法信息
  if (isPositive) {
    result.value.analysis += ' 根据ASRS筛查算法（前6题≥4），你的结果提示可能需要专业ADHD评估。'
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
/* ADHD测试主色调：亮黄色 */
.adhd-page {
  min-height: 100vh;
  --test-accent: #ffd166;
  --test-accent-rgb: 255, 209, 102;
}
.test-hero-sub { color: #ffd166; }
</style>