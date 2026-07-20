<template>
  <div class="term-page">
    <ReadingProgress />

    <div class="term-window">
      <div class="term-bar">
        <span class="term-dot"></span>
        <span class="term-dot"></span>
        <span class="term-dot"></span>
        <span class="term-title">assessment: audit-dast</span>
      </div>

      <div class="term-body">
        <div class="term-cmd">
          <span class="prompt">$</span> <span class="cmd">cat assessments/substance-20.yaml</span>
        </div>

        <header class="page-head">
          <h1 class="page-title">物质使用障碍测试</h1>
          <p class="page-meta">AUDIT + DAST-10 综合筛查 · 6 道题 · 约 3 分钟</p>
          <p class="page-desc">
            本测试结合酒精使用障碍测试（AUDIT）和药物滥用筛查（DAST-10），
            综合评估酒精和药物使用相关问题。请根据过去一年内你的真实情况作答。
          </p>
          <RouterLink to="/tests" class="back">
            <Icon icon="mdi:arrow-left" /> 返回评估列表
          </RouterLink>
        </header>

        <div v-if="!showResult" class="test-area">
          <div class="prog-bar">
            <div class="prog-fill" :style="{ width: progressPct + '%' }"></div>
            <span class="prog-label">{{ answeredCount }}/{{ questions.length }}</span>
          </div>

          <form @submit.prevent="calculateScore">
            <div
              v-for="(question, index) in questions"
              :key="index"
              class="q-block"
              :class="{ 'q-done': userAnswers[index] !== -1 }"
            >
              <div class="q-head">
                <span class="q-num">{{ index + 1 }}</span>
                <span class="q-text">{{ question.text }}</span>
                <span class="q-tag">{{ question.hint }}</span>
              </div>
              <div class="q-opts">
                <button
                  v-for="(option, optIndex) in question.options"
                  :key="optIndex"
                  type="button"
                  class="opt"
                  :class="{ 'opt-on': userAnswers[index] === optIndex }"
                  @click="selectAnswer(index, optIndex)"
                >
                  {{ option.label }}
                  <span class="opt-val">{{ option.desc }}</span>
                </button>
              </div>
            </div>

            <div class="submit-line">
              <button type="submit" class="btn-geek" :disabled="!allAnswered">
                查看结果
              </button>
              <span v-if="!allAnswered" class="submit-remind">
                还有 {{ questions.length - answeredCount }} 题未答
              </span>
            </div>
          </form>
        </div>

        <div v-if="showResult" class="result-area">
          <div class="term-cmd">
            <span class="prompt">$</span> <span class="cmd">./score --id audit-dast --answers {{ answeredCount }}/{{ questions.length }}</span>
          </div>

          <div class="r-card">
            <div class="r-score-wrap" style="flex-direction:column;gap:0.5rem;">
              <div style="display:flex;align-items:baseline;gap:0.25rem;">
                <span style="font-size:0.8rem;color:var(--color-text-secondary);">酒精:</span>
                <span class="r-score" style="font-size:2rem;">{{ alcoholScore }}</span>
              </div>
              <div style="display:flex;align-items:baseline;gap:0.25rem;">
                <span style="font-size:0.8rem;color:var(--color-text-secondary);">药物:</span>
                <span class="r-score" style="font-size:2rem;">{{ drugScore }}</span>
              </div>
            </div>
            <div class="r-body">
              <div class="r-head">结果解读</div>
              <p class="r-text" v-html="resultInterpretation"></p>
            </div>
          </div>

          <div class="r-actions">
            <button @click="resetTest" class="btn-geek">重新测试</button>
            <RouterLink to="/tests" class="btn-geek">其他测试</RouterLink>
          </div>
        </div>

        <div class="notice">
          <Icon icon="mdi:alert" class="notice-ico" />
          <div>
            <strong>重要说明</strong>
            <p>AUDIT 和 DAST-10 是筛查工具，不能替代专业诊断。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ReadingProgress from '@/components/ReadingProgress.vue'
import { Icon } from '@iconify/vue'

const questions = ref([
  {
    text: '你多久喝一次含酒精的饮料？',
    hint: '饮酒频率',
    options: [
      { label: '从不', desc: '0分', value: 0 },
      { label: '每月一次或更少', desc: '1分', value: 1 },
      { label: '每月2-4次', desc: '2分', value: 2 },
      { label: '每周2-3次', desc: '3分', value: 3 },
      { label: '每周4次或更多', desc: '4分', value: 4 },
    ],
  },
  {
    text: '在喝酒的日子里，你通常喝多少标准杯？',
    hint: '饮酒量',
    options: [
      { label: '1-2杯', desc: '0分', value: 0 },
      { label: '3-4杯', desc: '1分', value: 1 },
      { label: '5-6杯', desc: '2分', value: 2 },
      { label: '7-9杯', desc: '3分', value: 3 },
      { label: '10杯或更多', desc: '4分', value: 4 },
    ],
  },
  {
    text: '你一次喝6杯或以上的频率是？',
    hint: '大量饮酒',
    options: [
      { label: '从不', desc: '0分', value: 0 },
      { label: '每月少于一次', desc: '1分', value: 1 },
      { label: '每月一次', desc: '2分', value: 2 },
      { label: '每周一次', desc: '3分', value: 3 },
      { label: '每天或几乎每天', desc: '4分', value: 4 },
    ],
  },
  {
    text: '过去一年中，你因为喝酒而不能停止饮酒的频率？',
    hint: '控制困难',
    options: [
      { label: '从不', desc: '0分', value: 0 },
      { label: '每月少于一次', desc: '1分', value: 1 },
      { label: '每月一次', desc: '2分', value: 2 },
      { label: '每周一次', desc: '3分', value: 3 },
      { label: '每天或几乎每天', desc: '4分', value: 4 },
    ],
  },
  {
    text: '你是否曾因饮酒而导致失职、学习或工作表现下降？',
    hint: 'DAST-10题目',
    options: [
      { label: '否', desc: '0分', value: 0 },
      { label: '是', desc: '1分', value: 1 },
    ],
  },
  {
    text: '你是否因使用药物/酒精而忽视家庭责任？',
    hint: '家庭责任',
    options: [
      { label: '否', desc: '0分', value: 0 },
      { label: '是', desc: '1分', value: 1 },
    ],
  },
])

const userAnswers = ref<number[]>(Array(questions.value.length).fill(-1))
const showResult = ref(false)

const answeredCount = computed(() => userAnswers.value.filter(a => a !== -1).length)
const allAnswered = computed(() => userAnswers.value.every(a => a !== -1))
const progressPct = computed(() => Math.round((answeredCount.value / questions.value.length) * 100))

const alcoholScore = computed(() => {
  let score = 0
  for (let i = 0; i < 4 && i < userAnswers.value.length; i++) {
    const answerIndex = userAnswers.value[i]
    if (answerIndex !== -1) {
      const question = questions.value[i]
      const option = question?.options[answerIndex]
      score += option ? option.value : 0
    }
  }
  return score
})

const drugScore = computed(() => {
  let score = 0
  for (let i = 4; i < userAnswers.value.length; i++) {
    const answerIndex = userAnswers.value[i]
    if (answerIndex !== -1) {
      const question = questions.value[i]
      const option = question?.options[answerIndex]
      score += option ? option.value : 0
    }
  }
  return score
})

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

const selectAnswer = (questionIndex: number, optionIndex: number) => {
  userAnswers.value[questionIndex] = optionIndex
}

const calculateScore = () => {
  if (allAnswered.value) {
    showResult.value = true
    const el = document.querySelector('.result-area') as HTMLElement | null
    window.scrollTo({ top: el?.offsetTop || 0, behavior: 'smooth' })
  }
}

const resetTest = () => {
  userAnswers.value = Array(questions.value.length).fill(-1)
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.term-page {
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.term-window {
  width: 100%;
  max-width: 720px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.term-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(255,255,255,0.04);
  border-bottom: 1px solid var(--color-border);
}

.term-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
}

.term-title {
  margin-left: auto;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.term-body {
  padding: 2rem 1.5rem;
}

.term-cmd {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255,255,255,0.03);
  border-radius: var(--radius-sm);
}

.prompt {
  color: var(--color-text);
  margin-right: 0.5rem;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.page-meta {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.page-desc {
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
  opacity: 0.8;
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-decoration: none;
}
.back:hover {
  color: var(--color-text);
}

.prog-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 24px;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0 0.75rem;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
}

.prog-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: rgba(255,255,255,0.12);
  transition: width 0.4s ease;
}

.prog-label {
  position: relative;
  z-index: 1;
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--color-text);
  margin-left: auto;
}

.q-block {
  margin-bottom: 1.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: border-color 0.2s;
}

.q-block.q-done {
  border-color: rgba(255,255,255,0.25);
}

.q-head {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.q-num {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  min-width: 1.5rem;
}

.q-text {
  flex: 1;
  font-size: 0.95rem;
}

.q-tag {
  font-size: 0.7rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.q-opts {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.opt {
  flex: 1;
  min-width: 70px;
  padding: 0.6rem 0.5rem;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: var(--radius-sm);
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  font-size: 0.85rem;
}

.opt:hover {
  border-color: rgba(255,255,255,0.35);
}

.opt-on {
  border-color: rgba(255,255,255,0.4);
  background: rgba(255,255,255,0.1);
}

.opt-val {
  font-size: 0.7rem;
  color: var(--color-text-secondary);
}

.submit-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-remind {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.r-card {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
}

.r-score-wrap {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  flex-shrink: 0;
}

.r-score {
  font-size: 3rem;
  font-family: var(--font-mono);
  line-height: 1;
}

.r-body {
  flex: 1;
}

.r-head {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
}

.r-text {
  font-size: 0.9rem;
  line-height: 1.7;
}

.r-text :deep(strong) {
  display: block;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.r-actions {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.notice {
  display: flex;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: rgba(255,255,255,0.02);
}

.notice-ico {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.notice strong {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.notice p {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}
</style>
