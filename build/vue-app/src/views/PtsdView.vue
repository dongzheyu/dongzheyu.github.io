<template>
  <div class="ptsd-page">
    <!-- 阅读进度条 -->
    <ReadingProgress />
    
    <section class="test-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">创伤后应激障碍（PTSD）自评测试</h1>
            <p class="test-hero-sub mb-2">PTSD 检查表（PCL-5） · 20 道题 · 约 6 分钟</p>
            <p class="test-hero-desc">
              PTSD 检查表（Posttraumatic Stress Disorder Checklist for DSM-5）是根据 DSM-5 标准开发的自评工具，用于评估创伤后应激障碍症状。
              请根据过去一个月的情况回答。
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-4 test-body">
      <div v-if="!showResult">
        <p class="freq-instruction mb-5" style="padding-left: 5%;">以下问题涉及你在经历创伤事件后可能出现的反应。请根据过去一个月的情况，评估每种问题对你的困扰程度：</p>
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
            <span class="score-total">/ 80</span>
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
          <h3 class="review-title">DSM-5 症状群分析</h3>
          <div class="dimension-grid">
            <div class="dim-card">
              <div class="dim-icon"><i class="bi bi-eye-fill"></i></div>
              <div class="dim-content">
                <h4 class="dim-title">再体验症状</h4>
                <p class="dim-score">{{ clusterB }} / 20</p>
                <p class="dim-desc">侵入性回忆、噩梦、闪回</p>
              </div>
            </div>
            <div class="dim-card">
              <div class="dim-icon"><i class="bi bi-slash-circle-fill"></i></div>
              <div class="dim-content">
                <h4 class="dim-title">回避症状</h4>
                <p class="dim-score">{{ clusterC }} / 8</p>
                <p class="dim-desc">回避创伤相关刺激</p>
              </div>
            </div>
            <div class="dim-card">
              <div class="dim-icon"><i class="bi bi-lightning-fill"></i></div>
              <div class="dim-content">
                <h4 class="dim-title">负性认知情绪</h4>
                <p class="dim-score">{{ clusterD }} / 28</p>
                <p class="dim-desc">认知扭曲、负性情绪</p>
              </div>
            </div>
            <div class="dim-card">
              <div class="dim-icon"><i class="bi bi-activity"></i></div>
              <div class="dim-content">
                <h4 class="dim-title">过度警觉</h4>
                <p class="dim-score">{{ clusterE }} / 24</p>
                <p class="dim-desc">易怒、惊跳反应、失眠</p>
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
            <p>PCL-5 是筛查工具，不能替代临床诊断。PTSD 是一种可能影响任何人（无论创伤事件类型）的精神障碍，通过适当的治疗（如眼动脱敏与再处理疗法、认知加工疗法）通常能够显著改善。如果你经历过创伤事件并持续感到困扰，请寻求专业帮助。</p>
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
  { value: 0, label: '一点也没有' },
  { value: 1, label: '有一点' },
  { value: 2, label: '中等程度' },
  { value: 3, label: '相当严重' },
  { value: 4, label: '极其严重' },
]

const questions = ref([
  { id: 1, text: '反复出现、不自主、令人痛苦的创伤记忆', cluster: 'B' },
  { id: 2, text: '反复做与创伤事件相关的不愉快的梦', cluster: 'B' },
  { id: 3, text: '出现闪回或感觉创伤事件正在重现', cluster: 'B' },
  { id: 4, text: '接触到创伤提醒时感到强烈的心理痛苦', cluster: 'B' },
  { id: 5, text: '接触到创伤提醒时出现强烈的生理反应', cluster: 'B' },
  { id: 6, text: '回避与创伤事件相关的记忆或想法', cluster: 'C' },
  { id: 7, text: '回避与创伤事件相关的外部提醒', cluster: 'C' },
  { id: 8, text: '无法回忆起创伤事件的重要细节', cluster: 'D' },
  { id: 9, text: '对自己、他人或世界持持续的消极信念', cluster: 'D' },
  { id: 10, text: '因为自己或他人的原因责备自己或他人', cluster: 'D' },
  { id: 11, text: '持续存在负性情绪状态（如恐惧、愤怒）', cluster: 'D' },
  { id: 12, text: '对重要活动失去兴趣或参与减少', cluster: 'D' },
  { id: 13, text: '感到与其他人疏远或脱离', cluster: 'D' },
  { id: 14, text: '持续无法体验到积极情绪', cluster: 'D' },
  { id: 15, text: '易怒的行为或易发怒', cluster: 'E' },
  { id: 16, text: '鲁莽或自我毁灭的行为', cluster: 'E' },
  { id: 17, text: '过度警觉', cluster: 'E' },
  { id: 18, text: '惊跳反应过度', cluster: 'E' },
  { id: 19, text: '注意力难以集中', cluster: 'E' },
  { id: 20, text: '睡眠障碍', cluster: 'E' },
])

const answers = ref<Record<number, number>>({})
const showResult = ref(false)
const result = ref<any>(null)

const answeredCount = computed(() => questions.value.filter(q => answers.value[q.id] !== undefined).length)
const totalScore = computed(() => questions.value.reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0))

const clusterB = computed(() => {
  return questions.value.filter(q => q.cluster === 'B')
    .reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
})

const clusterC = computed(() => {
  return questions.value.filter(q => q.cluster === 'C')
    .reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
})

const clusterD = computed(() => {
  return questions.value.filter(q => q.cluster === 'D')
    .reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
})

const clusterE = computed(() => {
  return questions.value.filter(q => q.cluster === 'E')
    .reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
})

const getScoreClass = (score: number) => {
  if (score === 0) return 'score-none'
  if (score <= 1) return 'score-low'
  if (score === 2) return 'score-mid'
  return 'score-high'
}

const calculateResult = () => {
  const score = totalScore.value
  
  // PCL-5 筛查阈值：≥31–33（取决于研究）
  const isPositive = score >= 31
  
  // DSM-5 诊断算法：B≥1, C≥1, D≥2, E≥2
  const meetsDSM5 = clusterB.value >= 1 && clusterC.value >= 1 && clusterD.value >= 2 && clusterE.value >= 2
  
  if (score <= 20) {
    result.value = {
      level: '极轻微症状',
      color: '#52b788',
      description: '你的PTSD症状水平很低，创伤事件可能未对你造成持久影响。',
      analysis: '总得分 ≤20 分表明创伤后应激症状极轻微。许多人经历创伤事件后会自然恢复，你的得分显示你可能已经较好地适应或处理了创伤经历。',
      suggestions: ['继续保持现有的应对策略', '保持与支持系统的联系', '如未来症状加重，可重新评估', '了解创伤后正常反应与病理反应的界限'],
    }
  } else if (score <= 30) {
    result.value = {
      level: '轻度症状',
      color: '#f48c06',
      description: '你存在一定程度的创伤后症状，但可能未达到PTSD的诊断标准。',
      analysis: '总得分 21–30 分属于轻度症状范围。你可能体验到一些创伤相关困扰，但尚未严重到符合PTSD的诊断阈值。这些症状仍值得关注，因为它们可能影响生活质量。',
      suggestions: ['学习创伤知情自我照顾技巧', '考虑与心理咨询师讨论创伤经历', '练习正念和接地技术', '避免通过物质使用来缓解症状'],
    }
  } else if (score <= 50) {
    result.value = {
      level: '中度症状',
      color: '#ff8c42',
      description: '你的PTSD症状已达到临床显著水平，建议寻求专业评估。',
      analysis: '总得分 31–50 分达到PTSD筛查阳性标准。在这个水平，创伤后症状很可能已经影响你的日常生活功能。PTSD是可通过循证治疗（如EMDR、CPT、PE）有效治疗的障碍。',
      suggestions: ['建议预约精神科医生或心理治疗师', '询问关于EMDR或认知加工疗法的信息', '寻找创伤知情治疗师', '与信任的人分享你的经历'],
    }
  } else {
    result.value = {
      level: '重度症状',
      color: '#ef233c',
      description: '你的PTSD症状非常严重，很可能显著损害你的功能，建议立即寻求专业帮助。',
      analysis: '总得分 ≥51 分属于重度PTSD症状范围。在这个水平，症状可能导致严重的功能障碍、生活质量下降和共病风险增高。重度PTSD需要系统、专业的治疗干预。',
      suggestions: ['请尽快就诊精神科或创伤专科', '如实告诉医生你的症状严重程度和持续时间', '考虑住院治疗或强化门诊治疗选项', '危机时刻请拨打心理援助热线 400-161-9995'],
    }
  }
  
  // 补充DSM-5算法信息
  if (meetsDSM5) {
    result.value.analysis += ' 你的症状模式符合DSM-5 PTSD诊断算法（B≥1, C≥1, D≥2, E≥2）。'
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
/* PTSD测试主色调：深红色系 */
.ptsd-page {
  min-height: 100vh;
  --test-accent: #9d0208;
  --test-accent-rgb: 157, 2, 8;
}
.test-hero-sub { color: #9d0208; }
</style>