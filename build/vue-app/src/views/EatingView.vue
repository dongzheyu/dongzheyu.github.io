<template>
  <div class="eating-page">
    <!-- 阅读进度条 -->
    <ReadingProgress />
    
    <!-- Hero -->
    <section class="test-hero eating-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">进食障碍自评测试</h1>
            <p class="test-hero-sub mb-2">EAT-26 进食态度测试 · 26 道题 · 约 6 分钟</p>
            <p class="test-hero-desc">
              EAT-26（Eating Attitudes Test-26）是筛查厌食症、贪食症等进食障碍风险的自评工具，
              广泛应用于临床和研究领域。请根据过去三个月内你的真实情况作答。
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
              <div class="score-range">筛查临界值 20 分</div>
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
import ReadingProgress from '@/components/ReadingProgress.vue'

// 进食障碍 EAT-26 题目
const questions = ref([
  { text: '我害怕体重增加', hint: '体重恐惧' },
  { text: '当我感到饥饿时，我会避免进食', hint: '饥饿回避' },
  { text: '我会被食物的想法占据脑海', hint: '食物强迫思维' },
  { text: '我有暴食发作（短时间内吃大量食物）', hint: '暴食行为' },
  { text: '我会故意让自己呕吐来控制体重', hint: '呕吐行为' },
  { text: '我对自己吃了多少食物非常在意', hint: '进食监控' },
  { text: '我会避免吃碳水化合物（如米饭、面包）', hint: '回避碳水化合物' },
  { text: '我觉得别人希望我吃更多', hint: '他人期望' },
  { text: '我会在进食后感到内疚', hint: '进食内疚' },
  { text: '我强烈渴望变得苗条', hint: '瘦身渴望' },
  { text: '我会为了燃烧卡路里而过度运动', hint: '过度运动' },
  { text: '我觉得我的生活围绕着食物', hint: '食物中心化' },
  { text: '别人告诉我我太瘦了', hint: '他人评价' },
  { text: '我会用药物（如泻药、利尿剂）来控制体重', hint: '药物滥用' },
  { text: '我觉得我的进食行为失去控制', hint: '失控感' },
  { text: '我会秘密地进食', hint: '秘密进食' },
  { text: '我对自己的身体形象不满意', hint: '身体不满' },
  { text: '我有强烈的减肥冲动', hint: '减肥冲动' },
  { text: '我吃得太快', hint: '进食速度' },
  { text: '我觉得食物主导了我的生活', hint: '食物主导' },
  { text: '我会因为情绪问题而进食', hint: '情绪化进食' },
  { text: '我尝试过极端节食', hint: '极端节食' },
  { text: '我觉得自己超重，即使别人说我不胖', hint: '体重感知偏差' },
  { text: '我喜欢空腹的感觉', hint: '空腹偏好' },
  { text: '我有冲动的进食行为', hint: '冲动进食' },
  { text: '我会在感到饱之前停止进食', hint: '提前停止' }
])

// 评分选项 (EAT-26标准：总是/经常/经常/有时/很少/从不，对应3-0分)
const options = ref([
  { label: '总是', desc: '3分', value: 3 },
  { label: '经常', desc: '2分', value: 2 },
  { label: '有时', desc: '1分', value: 1 },
  { label: '很少', desc: '0分', value: 0 }
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

// 结果解读
const resultInterpretation = computed(() => {
  const score = totalScore.value
  
  if (score < 20) {
    return '<strong>进食态度正常范围</strong><br>您的分数表明您的进食态度和饮食行为在正常范围内，没有明显的进食障碍风险。'
  } else {
    return '<strong>进食障碍风险较高</strong><br>您的分数达到或超过了筛查临界值（20分），提示可能存在进食障碍风险。建议寻求专业饮食障碍评估。'
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
.eating-hero {
  background: linear-gradient(135deg, rgba(255,93,143,0.15) 0%, rgba(255,113,163,0.08) 100%);
}

.eating-hero::before {
  background: radial-gradient(ellipse at 30% 50%, rgba(255,93,143,0.25) 0%, transparent 70%);
}

.test-hero-title {
  color: #ff5d8f;
}

.test-hero-sub {
  color: rgba(255,93,143,0.7);
}

.question-card {
  background: var(--color-bg-card);
  border-left: 4px solid #ff5d8f;
}

.option-btn.selected {
  background: linear-gradient(135deg, rgba(255,93,143,0.1) 0%, rgba(255,113,163,0.05) 100%);
  border-color: #ff5d8f;
  color: #ff5d8f;
}

.submit-btn {
  --btn-color: #ff5d8f;
}

.score-value {
  color: #ff5d8f;
  font-size: 3rem;
}

.result-card {
  border-left: 6px solid #ff5d8f;
}
</style>