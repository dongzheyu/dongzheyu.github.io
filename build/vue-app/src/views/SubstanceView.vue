<template>
  <div class="substance-page">
    <!-- Hero -->
    <section class="test-hero substance-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">物质使用障碍测试</h1>
            <p class="test-hero-sub mb-2">AUDIT + DAST-10 综合筛查 · 20 道题 · 约 5 分钟</p>
            <p class="test-hero-desc">
              本测试结合酒精使用障碍测试（AUDIT）和药物滥用筛查（DAST-10），
              综合评估酒精和药物使用相关问题。请根据过去一年内你的真实情况作答。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 测试部分 -->
    <section class="test-section">
      <div class="container">
        <form @submit.prevent="calculateScore">
          <!-- 题目列表 -->
          <div class="questions-list">
            <div v-for="(question, index) in questions" :key="index" class="question-card">
              <div class="question-header">
                <h3 class="question-number">{{ index + 1 }}. {{ question.text }}</h3>
                <div class="question-hint">{{ question.hint }}</div>
              </div>
              <div class="options-grid">
                <button
                  v-for="(option, optIndex) in question.options"
                  :key="optIndex"
                  type="button"
                  class="option-btn"
                  :class="{ 
                    'selected': userAnswers[index] === optIndex,
                    'gradient-border': userAnswers[index] === optIndex
                  }"
                  @click="selectAnswer(index, optIndex)"
                >
                  <span class="option-label">{{ option.label }}</span>
                  <span class="option-desc">{{ option.desc }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 提交按钮 -->
          <div class="submit-section">
            <button type="submit" class="btn btn-animate submit-btn" :disabled="!allAnswered">
              {{ allAnswered ? '查看评估结果' : `请完成所有题目 (${answeredCount}/${questions.length})` }}
            </button>
          </div>
        </form>

        <!-- 结果部分 -->
        <div v-if="showResult" class="result-section">
          <h2 class="result-title">评估结果</h2>
          <div class="result-card">
            <div class="score-display">
              <span class="score-label">酒精风险评分</span>
              <div class="score-value">{{ alcoholScore }}</div>
              <div class="score-range">药物风险评分: {{ drugScore }}</div>
            </div>
            <div class="result-interpretation">
              <h3>结果解读</h3>
              <p v-html="resultInterpretation"></p>
            </div>
            <div class="result-actions">
              <button @click="resetTest" class="btn btn-secondary">重新评估</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 物质使用障碍题目 (AUDIT + DAST-10)
const questions = ref([
  {
    text: '你多久喝一次含酒精的饮料？',
    hint: '饮酒频率',
    options: [
      { label: '从不', desc: '0分', value: 0 },
      { label: '每月一次或更少', desc: '1分', value: 1 },
      { label: '每月2-4次', desc: '2分', value: 2 },
      { label: '每周2-3次', desc: '3分', value: 3 },
      { label: '每周4次或更多', desc: '4分', value: 4 }
    ]
  },
  {
    text: '在喝酒的日子里，你通常喝多少标准杯？',
    hint: '饮酒量',
    options: [
      { label: '1-2杯', desc: '0分', value: 0 },
      { label: '3-4杯', desc: '1分', value: 1 },
      { label: '5-6杯', desc: '2分', value: 2 },
      { label: '7-9杯', desc: '3分', value: 3 },
      { label: '10杯或更多', desc: '4分', value: 4 }
    ]
  },
  {
    text: '你一次喝6杯或以上的频率是？',
    hint: '大量饮酒',
    options: [
      { label: '从不', desc: '0分', value: 0 },
      { label: '每月少于一次', desc: '1分', value: 1 },
      { label: '每月一次', desc: '2分', value: 2 },
      { label: '每周一次', desc: '3分', value: 3 },
      { label: '每天或几乎每天', desc: '4分', value: 4 }
    ]
  },
  {
    text: '过去一年中，你因为喝酒而不能停止饮酒的频率？',
    hint: '控制困难',
    options: [
      { label: '从不', desc: '0分', value: 0 },
      { label: '每月少于一次', desc: '1分', value: 1 },
      { label: '每月一次', desc: '2分', value: 2 },
      { label: '每周一次', desc: '3分', value: 3 },
      { label: '每天或几乎每天', desc: '4分', value: 4 }
    ]
  },
  {
    text: '你是否曾因饮酒而导致失职、学习或工作表现下降？',
    hint: 'DAST-10题目',
    options: [
      { label: '否', desc: '0分', value: 0 },
      { label: '是', desc: '1分', value: 1 }
    ]
  },
  {
    text: '你是否因使用药物/酒精而忽视家庭责任？',
    hint: '家庭责任',
    options: [
      { label: '否', desc: '0分', value: 0 },
      { label: '是', desc: '1分', value: 1 }
    ]
  }
])

const userAnswers = ref<number[]>(Array(questions.value.length).fill(-1))
const showResult = ref(false)

// 计算已答题目数量
const answeredCount = computed(() => {
  return userAnswers.value.filter(answer => answer !== -1).length
})

// 检查是否全部答完
const allAnswered = computed(() => {
  return userAnswers.value.every(answer => answer !== -1)
})

// 酒精评分 (前4题)
const alcoholScore = computed(() => {
  let score = 0
  for (let i = 0; i < 4 && i < userAnswers.value.length; i++) {
    if (userAnswers.value[i] !== -1) {
      score += questions.value[i].options[userAnswers.value[i]].value
    }
  }
  return score
})

// 药物评分 (后2题)
const drugScore = computed(() => {
  let score = 0
  for (let i = 4; i < userAnswers.value.length; i++) {
    if (userAnswers.value[i] !== -1) {
      score += questions.value[i].options[userAnswers.value[i]].value
    }
  }
  return score
})

// 结果解读
const resultInterpretation = computed(() => {
  const alcScore = alcoholScore.value
  const drgScore = drugScore.value
  
  let result = '<strong>酒精使用风险：</strong>'
  
  if (alcScore < 8) {
    result += '低风险<br>'
  } else if (alcScore < 16) {
    result += '有害使用（建议减少）<br>'
  } else {
    result += '高风险（建议专业评估）<br>'
  }
  
  result += '<strong>药物使用风险：</strong>'
  if (drgScore === 0) {
    result += '无风险<br>'
  } else if (drgScore < 3) {
    result += '低风险<br>'
  } else if (drgScore < 6) {
    result += '中等风险（建议评估）<br>'
  } else {
    result += '高风险（建议专业帮助）<br>'
  }
  
  return result
})

// 选择答案
const selectAnswer = (questionIndex: number, optionIndex: number) => {
  userAnswers.value[questionIndex] = optionIndex
}

// 计算分数
const calculateScore = () => {
  if (allAnswered.value) {
    showResult.value = true
    window.scrollTo({ top: document.querySelector('.result-section')?.offsetTop || 0, behavior: 'smooth' })
  }
}

// 重置测试
const resetTest = () => {
  userAnswers.value = Array(questions.value.length).fill(-1)
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.substance-hero {
  background: linear-gradient(135deg, rgba(232,93,4,0.15) 0%, rgba(242,113,24,0.08) 100%);
}

.substance-hero::before {
  background: radial-gradient(ellipse at 30% 50%, rgba(232,93,4,0.25) 0%, transparent 70%);
}

.test-hero-title {
  color: #e85d04;
}

.test-hero-sub {
  color: rgba(232,93,4,0.7);
}

.question-card {
  background: var(--color-bg-card);
  border-left: 4px solid #e85d04;
}

.option-btn.selected {
  background: linear-gradient(135deg, rgba(232,93,4,0.1) 0%, rgba(242,113,24,0.05) 100%);
  border-color: #e85d04;
  color: #e85d04;
}

.submit-btn {
  --btn-color: #e85d04;
}

.score-value {
  color: #e85d04;
  font-size: 3rem;
}

.result-card {
  border-left: 6px solid #e85d04;
}
</style>