<template>
  <div class="anxiety-page">
    <!-- 阅读进度条 -->
    <ReadingProgress />
    
    <section class="test-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">焦虑症自评测试</h1>
            <p class="test-hero-sub mb-2">GAD-7 广泛性焦虑量表 · 7 道题 · 约 3 分钟</p>
            <p class="test-hero-desc">
              GAD-7（Generalized Anxiety Disorder-7）是目前最广泛使用的焦虑筛查工具，
              由 Spitzer 等人于 2006 年开发，已在全球数十项临床研究中验证其信效度。
              请根据过去两周内你的真实感受作答。
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-4 test-body">
      <div v-if="!showResult">
        <p class="freq-instruction mb-5">在过去两周内，以下问题出现的频率如何？</p>
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
            <span class="score-total">/ 21</span>
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
            <p>GAD-7 是筛查工具，不是诊断工具。测试结果不能替代精神科医生或心理咨询师的专业评估。如果你对自己的心理健康状况感到担忧，请务必寻求专业帮助。</p>
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
  { value: 0, label: '完全没有' },
  { value: 1, label: '有几天' },
  { value: 2, label: '超过一半时间' },
  { value: 3, label: '几乎每天' },
]

const questions = ref([
  { id: 1, text: '感到紧张、焦虑或烦躁不安' },
  { id: 2, text: '无法停止或无法控制担忧' },
  { id: 3, text: '对各种各样的事情担忧过多' },
  { id: 4, text: '难以放松' },
  { id: 5, text: '坐立不安，难以保持安静' },
  { id: 6, text: '容易感到心烦或容易被激怒' },
  { id: 7, text: '感到好像有什么可怕的事情可能会发生' },
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
  if (score <= 4) {
    result.value = {
      level: '无或极轻微焦虑',
      color: '#52b788',
      description: '你目前的焦虑水平在正常范围内，过去两周内你很少或几乎没有体验到明显的焦虑症状。',
      analysis: '得分 0–4 分表示当前焦虑症状极轻微或不存在。适度的焦虑是正常的情绪反应，帮助我们应对日常挑战。你目前的焦虑水平不会对生活产生负面影响。保持现有的生活习惯和自我关怀即可。',
      suggestions: ['保持规律的睡眠作息', '定期进行有氧运动，每周至少 150 分钟', '练习正念或冥想帮助维持心理平衡', '如未来状态有变化，可以再次评估'],
    }
  } else if (score <= 9) {
    result.value = {
      level: '轻度焦虑',
      color: '#f48c06',
      description: '你的得分表明存在轻度焦虑症状，这些症状可能对日常生活产生一定影响，值得留意。',
      analysis: '得分 5–9 分属于轻度焦虑范围。你可能经历一定程度的担忧、紧张或身体上的焦虑反应。这个阶段通过生活方式调整和压力管理技巧，许多人能够有效缓解症状。如果这些感受已经持续超过 6 个月，建议考虑寻求心理咨询。',
      suggestions: ['学习并练习腹式呼吸或渐进式肌肉放松技术', '减少咖啡因和酒精摄入', '建立规律的运动习惯', '考虑使用正念冥想应用程序（如 Headspace）', '与信任的朋友分享你的感受'],
    }
  } else if (score <= 14) {
    result.value = {
      level: '中度焦虑',
      color: '#ff8c42',
      description: '你的得分表明存在中度焦虑症状，这些症状可能正在明显影响你的日常功能和生活质量。',
      analysis: '得分 10–14 分属于中度焦虑范围。在这个阶段，焦虑症状可能已经开始干扰你的工作、学习和人际关系。认知行为疗法（CBT）对焦虑障碍有很好的循证支持效果，强烈建议寻求专业的心理健康支持。',
      suggestions: ['尽快预约心理咨询师，了解认知行为疗法', '记录焦虑日记，识别触发因素和思维模式', '避免通过回避行为应对焦虑，逐步面对', '告知家人或朋友你的状态', '咨询医生是否需要辅助治疗'],
    }
  } else {
    result.value = {
      level: '重度焦虑',
      color: '#ef233c',
      description: '你的得分表明存在重度焦虑症状，这严重影响你的日常生活。请尽快寻求专业帮助。',
      analysis: '得分 15–21 分属于重度焦虑范围。在这个阶段，焦虑症状已经严重影响你的生活功能。重度焦虑障碍是可以通过专业治疗（包括心理治疗和/或药物治疗）得到有效改善的，请不要独自承受，寻求专业帮助是正确的选择。',
      suggestions: ['请尽快就诊精神科或心理科', '如实告诉医生你的症状持续时间和严重程度', '在获得专业帮助之前，确保与他人保持联系', '避免通过酒精或其他物质暂时缓解焦虑', '危机时刻请拨打心理援助热线 400-161-9995'],
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
/* 焦虑症测试主色调：琥珀橙 */
.anxiety-page {
  min-height: 100vh;
  --test-accent: #f48c06;
  --test-accent-rgb: 244, 140, 6;
}
.test-hero-sub { color: #f48c06; }
</style>
