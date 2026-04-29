<template>
  <div class="gaming-page">
    <!-- 阅读进度条 -->
    <ReadingProgress />
    
    <section class="test-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">游戏障碍自评测试</h1>
            <p class="test-hero-sub mb-2">网络游戏障碍测试（IGD-20） · 20 道题 · 约 6 分钟</p>
            <p class="test-hero-desc">
              网络游戏障碍测试（Internet Gaming Disorder Test-20）是根据 DSM-5 研究标准开发的自评工具，用于评估游戏成瘾风险。
              请根据过去一年的情况回答。
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
            <span class="score-total">/ 80</span>
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
            <p>IGD-20 是筛查工具，不能替代专业诊断。游戏障碍是一种行为成瘾，通过认知行为疗法、家庭治疗和时间管理技巧通常能够显著改善。如果你感觉游戏已经控制了你的生活，寻求帮助是正确的选择。</p>
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
  { value: 0, label: '完全不符合' },
  { value: 1, label: '不太符合' },
  { value: 2, label: '有点符合' },
  { value: 3, label: '比较符合' },
  { value: 4, label: '完全符合' },
]

const questions = ref([
  { id: 1, text: '我花越来越多时间玩游戏' },
  { id: 2, text: '当不玩游戏时，我会想游戏的事' },
  { id: 3, text: '我需要玩更长时间才能获得同样的满足感' },
  { id: 4, text: '我尝试减少游戏时间但失败了' },
  { id: 5, text: '不玩游戏时我感到烦躁、焦虑或易怒' },
  { id: 6, text: '我玩游戏是为了逃避现实问题或负面情绪' },
  { id: 7, text: '我对自己玩游戏的时间撒谎' },
  { id: 8, text: '我因为玩游戏而失去重要机会' },
  { id: 9, text: '我因为玩游戏而与家人或朋友发生冲突' },
  { id: 10, text: '我因为玩游戏而忽视其他责任' },
  { id: 11, text: '游戏已经影响了我的学业或工作表现' },
  { id: 12, text: '我即使知道游戏有负面影响也无法停止' },
  { id: 13, text: '我需要不断升级装备或角色' },
  { id: 14, text: '我因为玩游戏而睡眠不足' },
  { id: 15, text: '我因为玩游戏而忽视个人卫生' },
  { id: 16, text: '我因为玩游戏而饮食不规律' },
  { id: 17, text: '我为了玩游戏而减少其他活动' },
  { id: 18, text: '我花费超出预算的钱在游戏上' },
  { id: 19, text: '我感觉游戏控制了我的生活' },
  { id: 20, text: '我即使意识到问题也无法减少游戏时间' },
])

const answers = ref<Record<number, number>>({})
const showResult = ref(false)
const result = ref<any>(null)

const answeredCount = computed(() => questions.value.filter(q => answers.value[q.id] !== undefined).length)
const totalScore = computed(() => questions.value.reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0))

const getScoreClass = (score: number) => {
  if (score === 0) return 'score-none'
  if (score <= 1) return 'score-low'
  if (score <= 2) return 'score-mid'
  return 'score-high'
}

const calculateResult = () => {
  const score = totalScore.value
  // IGD-20 阈值：≥71 高风险
  
  if (score <= 30) {
    result.value = {
      level: '健康游戏习惯',
      color: '#52b788',
      description: '你的游戏习惯基本健康，没有出现游戏障碍风险。',
      analysis: '总得分 ≤30 分表明你的游戏习惯在健康范围内。你能够控制游戏时间，游戏不太可能影响你的生活。',
      suggestions: ['继续保持健康的游戏习惯', '设定明确的游戏时间限制', '保持游戏与其他活动的平衡'],
    }
  } else if (score <= 50) {
    result.value = {
      level: '风险游戏行为',
      color: '#f48c06',
      description: '你有一些风险游戏行为，值得关注但可能未达到障碍水平。',
      analysis: '总得分 31-50 分表明存在一些风险游戏行为。你可能在某些方面过度游戏，但尚未构成障碍。建议主动管理游戏时间。',
      suggestions: ['设定具体的每日游戏时间限制', '寻找替代的娱乐活动', '记录游戏时间和影响', '避免使用游戏逃避现实问题'],
    }
  } else if (score <= 70) {
    result.value = {
      level: '中度游戏障碍风险',
      color: '#ff8c42',
      description: '你的游戏行为显示中度风险，很可能存在游戏障碍，建议寻求专业评估。',
      analysis: '总得分 51-70 分达到中度风险标准。在这个水平，游戏很可能已经开始影响你的生活和功能。游戏障碍可以通过行为干预有效改善。',
      suggestions: ['建议预约心理咨询师或成瘾专科医生', '了解认知行为疗法对行为成瘾的效果', '参加数字健康支持团体', '使用应用程序监控和限制游戏时间'],
    }
  } else {
    result.value = {
      level: '重度游戏障碍风险',
      color: '#ef233c',
      description: '你的游戏行为显示高风险，很可能符合游戏障碍诊断，建议立即寻求专业帮助。',
      analysis: '总得分 ≥71 分属于重度游戏障碍风险范围。在这个水平，游戏很可能已经严重影响你的生活、健康和人际关系。游戏障碍需要系统的专业治疗干预。',
      suggestions: ['请尽快就诊成瘾医学专科或精神科', '如实告诉医生你的游戏情况和影响', '考虑住院治疗或强化门诊治疗选项', '危机时刻请拨打行为成瘾援助热线 400-161-9995'],
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
/* 游戏障碍测试主色调：青色 */
.gaming-page {
  min-height: 100vh;
  --test-accent: #06d6a0;
  --test-accent-rgb: 6, 214, 160;
}
.test-hero-sub { color: #06d6a0; }
</style>