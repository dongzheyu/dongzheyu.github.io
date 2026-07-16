<template>
  <div class="test-page-wrapper" :class="themeClass">
    <!-- 阅读进度条 -->
    <ReadingProgress />

    <section class="test-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" :style="{ paddingLeft: heroPadding }">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <Icon icon="mdi:arrow-left" /> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">
              {{ title }}
              <button
                class="favorite-btn"
                :class="{ active: isFavorite(testId) }"
                @click="toggleFavorite({ id: testId, title: testTitle, type: 'test' })"
                :title="isFavorite(testId) ? '取消收藏' : '收藏此测试'"
              >
                <Icon :icon="isFavorite(testId) ? 'mdi:heart' : 'mdi:heart-outline'" />
              </button>
            </h1>
            <p class="test-hero-sub mb-2">{{ subtitle }}</p>
            <p class="test-hero-desc" v-html="description"></p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-4 test-body">
      <!-- 进度恢复对话框 -->
      <div v-if="showRestoreDialog" class="restore-dialog mb-4">
        <div class="restore-card">
          <Icon icon="mdi:history" class="restore-icon" />
          <div class="restore-content">
            <h4>检测到未完成的测试</h4>
            <p class="restore-info">{{ savedProgressInfo }}</p>
          </div>
          <div class="restore-actions">
            <button class="btn btn-sm btn-primary me-2" @click="restoreProgress">恢复进度</button>
            <button class="btn btn-sm btn-outline" @click="discardProgress">重新开始</button>
          </div>
        </div>
      </div>

      <!-- 答题区域 -->
      <div v-if="!showResult">
        <p class="freq-instruction mb-5" :style="{ paddingLeft: instructionPadding }">
          {{ instruction }}
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
              v-for="opt in options"
              :key="opt.value"
              class="freq-btn"
              :class="{ selected: answers[q.id] === opt.value }"
              @click="selectAnswer(q.id, opt.value)"
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

      <!-- 结果区域 -->
      <div v-if="showResult" class="result-section">
        <div class="score-card mb-5">
          <div class="score-circle" :style="`--score-color: ${result.color}`">
            <span class="score-num">{{ totalScore }}</span>
            <span class="score-total">/ {{ maxScore }}</span>
          </div>
          <div class="score-info">
            <div class="score-level" :style="`color: ${result.color}`">{{ result.level }}</div>
            <p class="score-desc">{{ result.description }}</p>
          </div>
        </div>

        <!-- 维度分析（可选） -->
        <div v-if="dimensions && dimensions.length > 0" class="dimension-section mb-5">
          <h3 class="review-title">症状维度分析</h3>
          <div class="dimension-grid">
            <div v-for="dim in dimensions" :key="dim.name" class="dim-card">
              <div class="dim-icon"><Icon :icon="dim.icon" /></div>
              <div class="dim-content">
                <h4 class="dim-title">{{ dim.name }}</h4>
                <p class="dim-score">{{ dim.score }} / {{ dim.maxScore }}</p>
                <p class="dim-desc">{{ dim.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 详细分析 -->
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

        <!-- 重要提示 -->
        <div class="important-notice mb-5">
          <Icon icon="mdi:alert" class="notice-icon" />
          <div>
            <strong>{{ disclaimerTitle }}</strong>
            <p>{{ disclaimer }}</p>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="text-center" :style="{ textAlign: buttonAlign }">
          <button class="btn btn-animate me-3" @click="resetTest">重新测试</button>
          <RouterLink to="/tests" class="btn btn-primary btn-animate">查看其他测试</RouterLink>
          <RouterLink to="/profile?tab=history" class="btn btn-animate ms-3 history-link">
            <Icon icon="mdi:history" class="me-1" /> 查看历史记录
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, type PropType } from 'vue'
import { RouterLink } from 'vue-router'
import ReadingProgress from '@/components/ReadingProgress.vue'
import Icon from './Icon.vue'
import { useFavorites, useHistory, useTestProgress } from '@/composables/useStore'

interface Question {
  id: number
  text: string
  dimension?: string
}

interface Option {
  value: number
  label: string
}

interface Dimension {
  name: string
  icon: string
  description: string
  score: number
  maxScore: number
}

interface Result {
  level: string
  color: string
  description: string
  analysis: string
  suggestions: string[]
}

const props = defineProps({
  // 基本信息
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  instruction: { type: String, required: true },
  testId: { type: String, required: true },
  testTitle: { type: String, required: true },

  // 题目和选项
  questions: { type: Array as PropType<Question[]>, required: true },
  options: { type: Array as PropType<Option[]>, required: true },

  // 结果计算函数
  calculateResultFn: {
    type: Function as PropType<(answers: Record<number, number>) => Result>,
    required: true,
  },

  // 样式配置
  themeClass: { type: String, default: '' },
  heroPadding: { type: String, default: '' },
  instructionPadding: { type: String, default: '' },
  buttonAlign: { type: String, default: 'left' },

  // 免责声明
  disclaimerTitle: { type: String, default: '重要说明' },
  disclaimer: { type: String, required: true },

  // 维度分析（可选）
  dimensions: { type: Array as PropType<Dimension[]>, default: () => [] },
})

const answers = ref<Record<number, number>>({})
const showResult = ref(false)
const result = ref<Result | null>(null)
const showRestoreDialog = ref(false)
const savedProgressInfo = ref<string>('')

const { isFavorite, toggleFavorite, loadFavorites } = useFavorites()
const { addToHistory } = useHistory()
const { getProgress, saveProgress, clearProgress } = useTestProgress()

const answeredCount = computed(
  () => props.questions.filter((q) => answers.value[q.id] !== undefined).length,
)

const totalScore = computed(() =>
  props.questions.reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0),
)

const maxScore = computed(() => {
  const maxOptionValue = Math.max(...props.options.map((o) => o.value))
  return props.questions.length * maxOptionValue
})

const selectAnswer = (questionId: number, value: number) => {
  answers.value[questionId] = value
  answers.value = { ...answers.value }
  saveProgress(props.testId, answers.value, questionId)
}

const calculateResult = () => {
  result.value = props.calculateResultFn(answers.value)
  showResult.value = true
  clearProgress(props.testId)
  addToHistory({
    testId: props.testId,
    testTitle: props.testTitle,
    score: totalScore.value,
    maxScore: maxScore.value,
    level: result.value.level,
    completedAt: new Date().toISOString(),
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const restoreProgress = () => {
  const saved = getProgress(props.testId)
  if (saved) {
    answers.value = saved.answers
    showRestoreDialog.value = false
  }
}

const discardProgress = () => {
  clearProgress(props.testId)
  showRestoreDialog.value = false
}

onMounted(() => {
  loadFavorites()
  const saved = getProgress(props.testId)
  if (saved && Object.keys(saved.answers).length > 0) {
    const time = new Date(saved.savedAt).toLocaleString('zh-CN')
    savedProgressInfo.value = `${time}，已答 ${Object.keys(saved.answers).length} 题`
    showRestoreDialog.value = true
  }
})

// 暴露给父组件
defineExpose({
  totalScore,
  answers,
})
</script>

<style scoped>
/* 通用测试页面样式 */
.test-page-wrapper {
  min-height: 100vh;
}

.back-link {
  color: var(--test-accent);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.8;
}

.test-hero-title {
  font-size: 2rem;
  font-weight: 700;
}

.test-hero-sub {
  font-size: 1.1rem;
  font-weight: 600;
}

.test-hero-desc {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
}

.question-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s;
}

.question-card.answered {
  background: rgba(var(--test-accent-rgb), 0.1);
}

.question-number {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--test-accent);
  margin-bottom: 0.5rem;
}

.question-text {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.freq-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.freq-btn {
  flex: 1;
  min-width: 100px;
  padding: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: all 0.2s;
}

.freq-btn:hover {
  border-color: var(--test-accent);
}

.freq-btn.selected {
  border-color: var(--test-accent);
  background: rgba(var(--test-accent-rgb), 0.2);
}

.freq-score {
  display: block;
  font-weight: 700;
  font-size: 1.2rem;
}

.freq-label {
  display: block;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.submit-section {
  text-align: center;
}

.submit-hint {
  color: var(--test-accent, var(--color-brand));
  margin-bottom: 1rem;
}

.score-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--score-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.score-num {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--score-color);
}

.score-total {
  font-size: 1rem;
  opacity: 0.7;
}

.score-level {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.score-desc {
  font-size: 1rem;
  line-height: 1.6;
}

.dimension-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.dim-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.dim-icon {
  font-size: 2rem;
  color: var(--test-accent);
}

.dim-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.dim-score {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--test-accent);
  margin-bottom: 0.5rem;
}

.dim-desc {
  font-size: 0.9rem;
  opacity: 0.8;
}

.detail-grid {
  display: grid;
  gap: 1.5rem;
}

.detail-block-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--test-accent);
}

.detail-block-text {
  line-height: 1.8;
}

.detail-list {
  list-style: none;
  padding: 0;
}

.detail-list li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.detail-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--test-accent);
  font-weight: 700;
}

.important-notice {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid var(--test-accent, var(--color-brand));
  border-radius: 8px;
}

.notice-icon {
  font-size: 1.5rem;
  color: var(--test-accent, var(--color-brand));
}

/* 收藏按钮 */
.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.5);
  transition:
    color 0.3s,
    transform 0.2s;
  vertical-align: middle;
  margin-left: 0.5rem;
  padding: 0;
  line-height: 1;
}

.favorite-btn:hover {
  color: #ff6b6b;
  transform: scale(1.15);
}

.favorite-btn.active {
  color: #ff4757;
}

/* 进度恢复对话框 */
.restore-dialog {
  margin-bottom: 2rem;
}

.restore-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 193, 7, 0.12);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 12px;
}

.restore-icon {
  font-size: 2rem;
  color: #ffc107;
  flex-shrink: 0;
}

.restore-content {
  flex: 1;
}

.restore-content h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.restore-info {
  font-size: 0.85rem;
  opacity: 0.7;
  margin: 0;
}

.restore-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.btn-outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: inherit;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* 历史记录链接 */
.history-link {
  font-size: 0.9rem;
  opacity: 0.8;
}

.history-link:hover {
  opacity: 1;
}
</style>
