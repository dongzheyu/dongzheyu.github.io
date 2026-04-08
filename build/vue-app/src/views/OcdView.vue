<template>
  <div class="ocd-page">
    <!-- Hero -->
    <section class="test-hero ocd-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">强迫症自评测试</h1>
            <p class="test-hero-sub mb-2">OCI-R 强迫症状量表 · 18 道题 · 约 5 分钟</p>
            <p class="test-hero-desc">
              OCI-R（Obsessive-Compulsive Inventory-Revised）是评估强迫思维和强迫行为的自评工具，
              已被广泛用于研究和临床筛查。请根据过去一个月内你的真实感受作答。
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
                  v-for="(option, optIndex) in options"
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
              <span class="score-label">您的总分</span>
              <div class="score-value">{{ totalScore }}</div>
              <div class="score-range">满分 {{ maxScore }}</div>
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

// 强迫症 OCI-R 题目
const questions = ref([
  { text: '我会被不愉快的想法困扰，即使我不想这样', hint: '强迫思维' },
  { text: '我会觉得必须反复检查事情，比如锁门或关煤气', hint: '检查行为' },
  { text: '我会被害怕失去控制的念头困扰', hint: '失控恐惧' },
  { text: '我会因为害怕细菌或污染而避免触摸某些物品', hint: '污染恐惧' },
  { text: '我会保存很多用不上的东西', hint: '囤积行为' },
  { text: '我会因为对称、顺序或精确性的需要而感到不安', hint: '对称需求' },
  { text: '我会为了减少焦虑而必须做一些重复的动作', hint: '重复动作' },
  { text: '我必须按特定的方式整理物品，否则会感到不安', hint: '整理仪式' },
  { text: '我会因为脑海中出现不道德的念头而感到困扰', hint: '道德困扰' },
  { text: '我需要反复确认自己没说错话或做错事', hint: '反复确认' },
  { text: '我会被暴力的画面或想法困扰', hint: '暴力念头' },
  { text: '我需要多次重复日常活动，比如进出房间', hint: '重复日常' },
  { text: '我会因为担心自己可能伤害他人而感到不安', hint: '伤害恐惧' },
  { text: '我会反复计数或重复特定的词语', hint: '计数仪式' },
  { text: '我需要按照特定的顺序做事情', hint: '顺序需求' },
  { text: '我会被与性相关的不愉快想法困扰', hint: '性念头' },
  { text: '我会有清洗或清洁的冲动，即使不脏', hint: '清洗冲动' },
  { text: '我会反复寻求他人的保证', hint: '寻求保证' }
])

// 评分选项 (0-4分)
const options = ref([
  { label: '从无', desc: '0分', value: 0 },
  { label: '很少', desc: '1分', value: 1 },
  { label: '有时', desc: '2分', value: 2 },
  { label: '经常', desc: '3分', value: 3 },
  { label: '总是', desc: '4分', value: 4 }
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

// 总分
const totalScore = computed(() => {
  return userAnswers.value.reduce((sum, answerIndex) => {
    return sum + (answerIndex !== -1 ? options.value[answerIndex].value : 0)
  }, 0)
})

// 最高分
const maxScore = computed(() => {
  return questions.value.length * 4
})

// 结果解读
const resultInterpretation = computed(() => {
  const score = totalScore.value
  
  if (score < 21) {
    return '<strong>轻度或无强迫症状</strong><br>您的分数表明您目前没有明显的强迫症状，或者症状非常轻微，对日常生活影响很小。'
  } else if (score < 41) {
    return '<strong>中度强迫症状</strong><br>您的分数表明您可能有一些强迫症状，建议关注这些症状是否影响到您的日常生活。'
  } else {
    return '<strong>明显强迫症状</strong><br>您的分数表明您可能有较明显的强迫症状，建议考虑寻求专业心理咨询师的评估和帮助。'
  }
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
.ocd-hero {
  background: linear-gradient(135deg, rgba(58,12,163,0.15) 0%, rgba(88,42,193,0.08) 100%);
}

.ocd-hero::before {
  background: radial-gradient(ellipse at 30% 50%, rgba(58,12,163,0.25) 0%, transparent 70%);
}

.test-hero-title {
  color: #3a0ca3;
}

.test-hero-sub {
  color: rgba(58,12,163,0.7);
}

.question-card {
  background: var(--color-bg-card);
  border-left: 4px solid #3a0ca3;
}

.option-btn.selected {
  background: linear-gradient(135deg, rgba(58,12,163,0.1) 0%, rgba(88,42,193,0.05) 100%);
  border-color: #3a0ca3;
  color: #3a0ca3;
}

.submit-btn {
  --btn-color: #3a0ca3;
}

.score-value {
  color: #3a0ca3;
  font-size: 3rem;
}

.result-card {
  border-left: 6px solid #3a0ca3;
}
</style>