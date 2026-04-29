<template>
  <div class="depression-page">
    <!-- 阅读进度条 -->
    <ReadingProgress />
    
    <!-- Hero -->
    <section class="test-hero depression-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">抑郁症自评测试</h1>
            <p class="test-hero-sub mb-2">PHQ-9 患者健康问卷 · 9 道题 · 约 5 分钟</p>
            <p class="test-hero-desc">
              PHQ-9（Patient Health Questionnaire-9）是国际上广泛使用的抑郁症筛查工具，
              已被翻译为多种语言并在临床环境中广泛验证。请根据过去两周内你的真实感受作答。
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-4 test-body">

      <!-- 测试题目 -->
      <div v-if="!showResult">
        <p class="freq-instruction mb-5" style="padding-left: 5%;">
          在过去两周内，以下问题出现的频率如何？
        </p>

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
          <p v-if="answeredCount < questions.length" class="submit-hint">
            还有 {{ questions.length - answeredCount }} 道题未作答
          </p>
          <button
            class="btn btn-primary btn-animate btn-lg"
            :disabled="answeredCount < questions.length"
            @click="calculateResult"
          >
            查看结果
          </button>
        </div>
      </div>

      <!-- 结果 -->
      <div v-if="showResult" class="result-section">
        <!-- 总分展示 -->
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

        <!-- 各题得分 -->
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

        <!-- 功能损害评估 -->
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

        <!-- 心理健康资源 -->
        <div class="resources-section mb-5">
          <h3 class="review-title">心理健康求助资源</h3>
          <p class="resources-intro">无论测试结果如何，当你感到心理上的困扰时，都可以联系以下专业资源：</p>
          <div class="resources-grid">
            <div v-for="r in resources" :key="r.name" class="resource-card">
              <div class="resource-name">{{ r.name }}</div>
              <div class="resource-contact">{{ r.contact }}</div>
              <div class="resource-desc">{{ r.desc }}</div>
            </div>
          </div>
        </div>

        <!-- 重要免责声明 -->
        <div class="important-notice mb-5">
          <i class="bi bi-exclamation-triangle notice-icon"></i>
          <div>
            <strong>重要说明</strong>
            <p>PHQ-9 是筛查工具，不是诊断工具。测试结果不能替代精神科医生或心理咨询师的专业评估。如果你对自己的心理健康状况感到担忧，请务必寻求专业帮助。如果你有伤害自己的想法，请立即拨打危机热线或前往最近的急诊室。</p>
          </div>
        </div>

        <div class="text-center">
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
  { id: 1, text: '做事时提不起劲或没有兴趣' },
  { id: 2, text: '感到心情低落、沮丧或绝望' },
  { id: 3, text: '入睡困难、睡不安稳或睡眠过多' },
  { id: 4, text: '感觉疲倦或没有活力' },
  { id: 5, text: '食欲不振或吃太多' },
  { id: 6, text: '觉得自己很糟，或觉得自己很失败，或让自己或家人失望' },
  { id: 7, text: '对事物专注有困难，例如阅读报纸或看电视时' },
  { id: 8, text: '动作或说话速度缓慢到别人已经察觉，或正好相反，烦躁或坐立不安、动来动去的情况更胜于平常' },
  { id: 9, text: '有不如死掉或用某种方式伤害自己的念头' },
])

const answers = ref<Record<number, number>>({})
const showResult = ref(false)
const result = ref<any>(null)

const answeredCount = computed(() =>
  questions.value.filter(q => answers.value[q.id] !== undefined).length
)

const totalScore = computed(() =>
  questions.value.reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
)

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
      level: '无或极轻微抑郁',
      color: '#52b788',
      description: '你目前的得分处于正常范围。过去两周内，你很少或几乎没有经历上述抑郁相关症状。',
      analysis: '得分 0–4 分表示当前抑郁症状在正常波动范围内。每个人偶尔都会有情绪低落的时候，这是正常的情绪反应，并不代表存在心理健康问题。保持规律的作息、运动和社交活动有助于维持良好的心理状态。',
      suggestions: [
        '保持规律睡眠，每天 7–9 小时',
        '进行适度的体育锻炼',
        '保持社交连接，与朋友和家人保持联系',
        '如果未来状态有变化，可以再次评估',
      ]
    }
  } else if (score <= 9) {
    result.value = {
      level: '轻度抑郁',
      color: '#f48c06',
      description: '你的得分表明存在轻度抑郁症状。这些症状可能对日常生活产生一定影响，值得关注。',
      analysis: '得分 5–9 分属于轻度抑郁范围。你可能在情绪、精力或兴趣方面感到一定程度的困扰。在此阶段，通过生活方式调整和自我关怀，很多人的状态能够得到显著改善。同时，考虑寻求心理咨询也是明智的选择。',
      suggestions: [
        '考虑寻求心理咨询师的支持',
        '保持规律的运动习惯，这对情绪有显著帮助',
        '减少孤立，主动和信任的人倾诉',
        '记录情绪日记，了解触发情绪低落的因素',
        '保证充足的睡眠和均衡的饮食',
      ]
    }
  } else if (score <= 14) {
    result.value = {
      level: '中度抑郁',
      color: '#ff8c42',
      description: '你的得分表明存在中度抑郁症状，这些症状可能正在明显影响你的日常功能和生活质量。',
      analysis: '得分 10–14 分属于中度抑郁范围。在这个阶段，症状已经足够影响你的工作、学习和人际关系。强烈建议主动寻求专业的心理健康支持。心理治疗（如认知行为疗法）对这一阶段的抑郁有很好的效果。',
      suggestions: [
        '强烈建议尽快预约心理咨询师或精神科医生',
        '告知家人或朋友你的状态，寻求支持',
        '避免通过酒精或其他物质来应对情绪',
        '尝试认知行为疗法（CBT）等循证心理干预',
        '如果感到无法完成日常工作，告知你的老师或上级',
      ]
    }
  } else if (score <= 19) {
    result.value = {
      level: '中重度抑郁',
      color: '#ef233c',
      description: '你的得分表明存在中重度抑郁症状。请认真对待这一结果，并尽快寻求专业帮助。',
      analysis: '得分 15–19 分属于中重度抑郁范围。在这个阶段，症状已经严重影响你的日常生活能力。专业的心理治疗和可能的药物治疗能够有效帮助你。请不要独自承受，向专业人士求助是正确且勇敢的选择。',
      suggestions: [
        '请尽快就诊精神科或心理科，进行专业评估',
        '如实告诉医生你的症状和持续时间',
        '遵从医生建议，如需药物治疗请配合',
        '告知至少一位你信任的家人或朋友你的状态',
        '避免在这一时期做重大人生决策',
        '如有伤害自己的念头，请立即拨打危机热线',
      ]
    }
  } else {
    result.value = {
      level: '重度抑郁',
      color: '#d90429',
      description: '你的得分表明存在重度抑郁症状。请立即寻求专业帮助，这非常重要。',
      analysis: '得分 20–27 分属于重度抑郁范围。这一结果表明你正在经历严重的抑郁症状，这些症状已经严重影响你的整体功能。重度抑郁是一种可治疗的疾病，但需要专业的医疗干预。请不要延误，立即联系心理健康专业人士或前往医院就诊。',
      suggestions: [
        '请立即就医，前往精神科或心理科门诊',
        '如症状非常严重，可考虑前往急诊评估',
        '在得到专业帮助前，请确保身边有人陪伴',
        '立即告知家人或朋友你的状况',
        '如有自伤或自杀的念头，请立即拨打危机热线',
        '这是一种疾病，不是你的错，治疗可以帮助你',
      ]
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

const resources = [
  {
    name: '北京心理危机研究与干预中心',
    contact: '010-82951332',
    desc: '24小时心理援助热线，提供心理危机干预服务'
  },
  {
    name: '全国心理援助热线',
    contact: '400-161-9995',
    desc: '由中国心理卫生协会主办的全国性心理援助热线'
  },
  {
    name: '北京大学第六医院',
    contact: '010-82801984',
    desc: '专业精神科/心理科门诊，提供专业诊断和治疗'
  },
  {
    name: '生命热线',
    contact: '400-821-1215',
    desc: '专门为有自杀倾向人群提供危机干预'
  },
  {
    name: '希望24热线',
    contact: '400-161-9995',
    desc: '为情绪困扰、心理危机人群提供情感支持'
  },
  {
    name: '青少年心理援助',
    contact: '12320-5',
    desc: '针对青少年群体的专业心理援助服务'
  },
]
</script>

<style scoped>
/* 抑郁症测试主色调：危险红 */
.depression-page {
  min-height: 100vh;
  --test-accent: #ef233c;
  --test-accent-rgb: 239, 35, 60;
}
.test-hero-sub { color: var(--color-danger, #ef233c); }
</style>

