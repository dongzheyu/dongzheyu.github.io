<template>
  <div class="bipolar-page">
    <!-- 阅读进度条 -->
    <ReadingProgress />
    
    <section class="test-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">双相情感障碍自评测试</h1>
            <p class="test-hero-sub mb-2">心境障碍问卷（MDQ） · 13 道题 · 约 5 分钟</p>
            <p class="test-hero-desc">
              心境障碍问卷（Mood Disorder Questionnaire）是由 Hirschfeld 等人于 2000 年开发的筛查工具，用于识别可能与双相情感障碍相关的症状。
              请回想一生中曾经出现过的情况，不限于近期。
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-4 test-body">
      <div v-if="!showResult">
        <p class="freq-instruction mb-5" style="padding-left: 5%;">以下清单描述了人们在情绪特别高昂、亢奋或激动时可能出现的情况。请回想你一生中是否有过类似体验（持续至少几天）：</p>
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
            <span class="score-total">/ 13</span>
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
            <p>MDQ 是筛查工具，不是诊断工具。双相情感障碍的诊断需要精神科医生通过详细的临床访谈和观察才能确定。如果你对这些症状感到担忧，请务必寻求专业评估。</p>
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
  { value: 0, label: '没有' },
  { value: 1, label: '有过' },
]

const questions = ref([
  { id: 1, text: '感觉精力充沛，精神饱满，甚至不需要太多睡眠' },
  { id: 2, text: '话比平常多得多，而且话速很快' },
  { id: 3, text: '思维快得像赛跑，有很多念头涌现' },
  { id: 4, text: '很容易分心，注意力很快从一个事物转移到另一个事物' },
  { id: 5, text: '社交活动增多，甚至和陌生人交谈或外出' },
  { id: 6, text: '性欲比平常增强' },
  { id: 7, text: '鲁莽挥霍，例如花钱超出承受能力' },
  { id: 8, text: '做事比平常冲动，例如无计划购物、飙车、危险投资' },
  { id: 9, text: '易怒，容易与别人争吵或发生冲突' },
  { id: 10, text: '同时做很多事情，感觉精力用不完' },
  { id: 11, text: '感到异常自信，觉得自己能完成很多事' },
  { id: 12, text: '这些行为或感觉被他人注意到' },
  { id: 13, text: '这些行为或感觉导致生活、工作、人际关系出现问题' },
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
  const q12 = answers.value[12] || 0
  const q13 = answers.value[13] || 0
  
  // MDQ 标准：≥7 项阳性 + 第 12 题有 + 第 13 题有
  const hasQ12Q13 = q12 === 1 && q13 === 1
  const isPositive = score >= 7 && hasQ12Q13
  
  if (!hasQ12Q13) {
    result.value = {
      level: '阴性',
      color: '#52b788',
      description: '你的回答显示你可能未经历过典型的躁狂/轻躁狂发作，或者这些表现未被他人注意到或未导致明显问题。',
      analysis: 'MDQ 筛查阴性意味着你的症状模式不符合双相障碍的典型表现。但请注意：双相障碍谱系较宽，部分患者（如双相 II 型）的轻躁狂可能不被自己或他人识别。如果你仍有明显情绪波动，建议记录情绪日记。',
      suggestions: ['如果仍有情绪困扰，建议记录每日情绪波动', '维持规律的作息，避免熬夜和过度压力', '如未来出现异常精力充沛或冲动行为，可重新评估', '与信任的人分享感受'],
    }
  } else if (score >= 7) {
    result.value = {
      level: '阳性（高风险）',
      color: '#ef233c',
      description: '你的回答符合双相障碍筛查阳性标准，建议尽快寻求专业精神科评估。',
      analysis: 'MDQ 筛查阳性（≥7 项 + 被他人注意 + 导致问题）提示你可能经历过躁狂或轻躁狂发作，双相障碍的可能性较高。双相障碍是一种可治疗的精神障碍，早期识别和干预有助于改善预后。请不要忽视这些信号。',
      suggestions: ['尽快预约精神科医生进行全面评估', '准备详细描述你的情绪起伏周期', '避免自行使用兴奋剂或酒精', '告知家人或朋友你的状态，获得支持', '危机时可拨打心理援助热线 400-161-9995'],
    }
  } else if (score >= 4) {
    result.value = {
      level: '部分阳性（中等风险）',
      color: '#ff8c42',
      description: '你报告了一些可能的躁狂症状，但未达到筛查阳性标准，仍需关注。',
      analysis: 'MDQ 部分阳性（4–6 项 + 被他人注意 + 导致问题）提示你可能有轻躁狂体验。这可能是双相谱系障碍、其他心境障碍或人格特质的反映。建议进行更详细的专业评估。',
      suggestions: ['考虑预约心理咨询师或精神科医生', '记录情绪周期、睡眠和精力变化', '学习情绪调节技巧，如正念和认知行为疗法', '保持规律的生活节奏，避免极端作息'],
    }
  } else {
    result.value = {
      level: '低风险',
      color: '#f48c06',
      description: '你报告的躁狂症状较少，但仍存在被他人注意到且导致问题的情绪波动。',
      analysis: '虽然符合的躁狂症状项数较少，但存在被他人注意且导致问题的情绪波动。这可能与压力反应、焦虑或其他情绪调节困难相关。建议关注情绪稳定性。',
      suggestions: ['学习压力管理和情绪调节技巧', '建立规律的睡眠-觉醒周期', '如果情绪波动持续，考虑心理咨询', '与信任的人讨论你的感受'],
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
/* 双相情感障碍测试主色调：紫色系 */
.bipolar-page {
  min-height: 100vh;
  --test-accent: #7209b7;
  --test-accent-rgb: 114, 9, 183;
}
.test-hero-sub { color: #7209b7; }
</style>