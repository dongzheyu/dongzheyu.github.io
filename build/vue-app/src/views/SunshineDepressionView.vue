<template>
  <div class="sunshine-page">
    <!-- Hero -->
    <section class="test-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <RouterLink to="/tests" class="back-link mb-4 d-inline-flex align-items-center gap-2">
              <i class="bi bi-arrow-left"></i> 返回评估列表
            </RouterLink>
            <h1 class="test-hero-title mb-3">阳光抑郁症测试</h1>
            <p class="test-hero-sub mb-2">微笑型抑郁筛查 · 15 道题 · 约 8 分钟</p>
            <p class="test-hero-desc">
              "阳光抑郁症"（Smiling Depression）又称微笑型抑郁，指一种表面上看起来开朗、积极、功能正常，
              内心却承受着持续痛苦、空洞感和无意义感的心理状态。
              这种状态因为外表与内心的落差，常常被自己和他人忽视。
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-4 test-body">

      <!-- 测试题目 -->
      <div v-if="!showResult">
        <p class="instruction mb-5" style="padding-left: 5%;">
          请根据你的真实感受作答，选择最能描述你状态的选项。
        </p>

        <div
          v-for="(q, index) in questions"
          :key="q.id"
          class="question-card mb-4"
          :class="{ answered: answers[q.id] !== undefined }"
        >
          <div class="question-number">{{ index + 1 }} / {{ questions.length }}</div>
          <p class="question-text">{{ q.text }}</p>
          <div class="agree-options">
            <button
              v-for="opt in agreeOptions"
              :key="opt.value"
              class="agree-btn"
              :class="{ selected: answers[q.id] === opt.value }"
              @click="answers[q.id] = opt.value; answers = { ...answers }"
            >
              <span class="agree-score">{{ opt.value }}</span>
              <span class="agree-label">{{ opt.label }}</span>
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
          <div class="score-visual" :style="`--score-color: ${result.color}`">
            <div class="score-ring">
              <span class="score-num">{{ totalScore }}</span>
              <span class="score-max">/ 60</span>
            </div>
            <div class="score-bar-wrap">
              <div class="score-bar-fill" :style="`width: ${(totalScore / 60) * 100}%; background: ${result.color}`"></div>
            </div>
          </div>
          <div class="score-info">
            <div class="score-badge" :style="`background: ${result.color}20; color: ${result.color}; border-color: ${result.color}40`">
              {{ result.level }}
            </div>
            <p class="score-desc mt-3">{{ result.description }}</p>
          </div>
        </div>

        <!-- 维度分析 -->
        <div class="dimension-analysis mb-5">
          <h3 class="section-title">核心特征分析</h3>
          <div class="dimension-grid">
            <div v-for="dim in dimensionResults" :key="dim.name" class="dim-card">
              <div class="dim-header">
                <span class="dim-name">{{ dim.name }}</span>
                <span class="dim-score-badge" :class="getDimClass(dim.percent)">
                  {{ dim.score }} / {{ dim.max }}
                </span>
              </div>
              <div class="dim-bar-wrap">
                <div class="dim-bar-fill" :class="getDimClass(dim.percent)" :style="`width: ${dim.percent}%`"></div>
              </div>
              <p class="dim-desc">{{ dim.desc }}</p>
            </div>
          </div>
        </div>

        <!-- 详细说明 -->
        <div class="detail-section mb-5">
          <div class="detail-grid">
            <div class="detail-block">
              <h4 class="detail-block-title">什么是阳光抑郁</h4>
              <p class="detail-block-text">{{ result.analysis }}</p>
            </div>
            <div class="detail-block">
              <h4 class="detail-block-title">你可以做什么</h4>
              <ul class="detail-list">
                <li v-for="s in result.suggestions" :key="s">{{ s }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 心理援助资源 -->
        <div class="resources-section mb-5">
          <h3 class="section-title">心理援助热线</h3>
          <div class="hotline-list">
            <div v-for="h in hotlines" :key="h.name" class="hotline-item">
              <span class="hotline-name">{{ h.name }}</span>
              <span class="hotline-num">{{ h.number }}</span>
            </div>
          </div>
        </div>

        <!-- 免责声明 -->
        <div class="notice-box mb-5">
          <i class="bi bi-info-circle notice-icon"></i>
          <div>
            <strong>测试说明</strong>
            <p>本测试基于阳光抑郁症的研究特征设计，不是临床诊断工具。得分偏高并不意味着你患有抑郁症，但值得认真对待自己的内心感受。如果你长期感到内外不一致的痛苦，建议寻求专业心理咨询。</p>
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

const agreeOptions = [
  { value: 0, label: '完全不符合' },
  { value: 1, label: '偶尔符合' },
  { value: 2, label: '有时符合' },
  { value: 3, label: '经常符合' },
  { value: 4, label: '完全符合' },
]

// 分四个维度：面具维度(Q1-5)、内心痛苦(Q6-10)、功能维持(Q11-13)、意义感(Q14-15)
const questions = ref([
  // 面具维度
  { id: 1,  dim: 'mask',  text: '我会在他人面前展现出开朗、快乐的一面，即使内心并不是这样' },
  { id: 2,  dim: 'mask',  text: '朋友或家人认为我是个积极乐观的人，但我自己并不这么觉得' },
  { id: 3,  dim: 'mask',  text: '当别人问我过得怎么样时，我习惯性地回答"挺好的"' },
  { id: 4,  dim: 'mask',  text: '我担心如果表现出真实的情绪，会让身边的人担心或失望' },
  { id: 5,  dim: 'mask',  text: '我觉得自己在"表演"一种比真实状态更好的状态' },
  // 内心痛苦
  { id: 6,  dim: 'pain',  text: '在表面平静甚至欢笑的背后，我感到一种难以言说的空洞感' },
  { id: 7,  dim: 'pain',  text: '我常常在独处时感到莫名的悲伤或情绪低落' },
  { id: 8,  dim: 'pain',  text: '我有时会感到内心很疲惫，尽管外表看起来没什么问题' },
  { id: 9,  dim: 'pain',  text: '我觉得没有人真正理解我内心的感受' },
  { id: 10, dim: 'pain',  text: '有时候我会在笑完之后突然感到一阵莫名的悲伤' },
  // 功能维持
  { id: 11, dim: 'func',  text: '即便内心状态不好，我依然能维持正常的工作、学习和社交功能' },
  { id: 12, dim: 'func',  text: '我的日常生活表面上看起来和常人无异，甚至比很多人更"能干"' },
  { id: 13, dim: 'func',  text: '别人很难看出我其实在内心挣扎' },
  // 意义感
  { id: 14, dim: 'meaning', text: '我有时会感到自己所做的一切都失去了意义，即使我依然在做' },
  { id: 15, dim: 'meaning', text: '我对未来缺乏期待，但我不会让别人发现这一点' },
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

const dimensionResults = computed(() => {
  const dims = [
    { name: '外在面具感', key: 'mask', max: 20, desc: '在他人面前隐藏真实情绪、维持积极形象的程度' },
    { name: '内心痛苦感', key: 'pain', max: 20, desc: '内心隐性痛苦、空洞感和情绪低落的程度' },
    { name: '功能维持度', key: 'func', max: 12, desc: '在内心困扰下仍维持正常日常功能的能力' },
    { name: '意义感缺失', key: 'meaning', max: 8, desc: '对生活失去意义感却不向外表露的程度' },
  ]
  return dims.map(d => {
    const qs = questions.value.filter(q => q.dim === d.key)
    const score = qs.reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
    const percent = Math.round((score / d.max) * 100)
    return { ...d, score, percent }
  })
})

const getDimClass = (percent: number) => {
  if (percent < 40) return 'dim-low'
  if (percent < 65) return 'dim-mid'
  return 'dim-high'
}

const calculateResult = () => {
  const score = totalScore.value

  if (score <= 15) {
    result.value = {
      level: '特征不明显',
      color: '#52b788',
      description: '你的得分较低，目前阳光抑郁症的典型特征并不明显。你的内外状态相对一致。',
      analysis: '阳光抑郁症的核心是内外极大的落差——表面积极，内心痛苦。你目前的得分表明这种落差程度较低，这是一个积极的信号。当然，每个人都可能有情绪起伏，保持对自己内心的关注仍然重要。',
      suggestions: [
        '保持对自己情绪状态的觉察习惯',
        '有情绪时，尝试找信任的人表达',
        '定期检查自己的内心状态',
      ]
    }
  } else if (score <= 30) {
    result.value = {
      level: '部分特征符合',
      color: '#f48c06',
      description: '你的得分表明你在某些方面存在阳光抑郁症的特征，内外之间存在一定程度的落差。',
      analysis: '你可能在某些情境下习惯压抑真实感受、维持积极外表。这种模式如果长期持续，可能导致内心的积累和疲惫感。并非所有存在这些特征的人都患有抑郁症，但值得认真审视自己内心真实的状态。',
      suggestions: [
        '尝试找一个安全的空间（或人），允许自己表达真实感受',
        '减少对"必须表现得好"的自我要求',
        '尝试写日记，记录真实的内心状态',
        '考虑进行一次心理咨询，了解自己',
      ]
    }
  } else if (score <= 45) {
    result.value = {
      level: '中度特征符合',
      color: '#ff8c42',
      description: '你的得分表明你具有较明显的阳光抑郁症特征。外表与内心之间存在明显落差，这值得认真对待。',
      analysis: '你可能长期以来习惯了"表演"积极、维持正常运转，而把内心的痛苦、空洞感或无意义感隐藏起来。这种状态非常消耗心理资源，且因为外表正常，很难被他人发现。长期处于这种状态可能导致心理资源耗尽，建议认真考虑专业支持。',
      suggestions: [
        '请认真考虑预约心理咨询师',
        '向至少一个你信任的人透露你真实的状态',
        '停止强迫自己"必须表现得好"',
        '关注生活中那些能给你带来真实愉悦的小事',
        '进行 PHQ-9 测试，评估是否同时存在抑郁症状',
      ]
    }
  } else {
    result.value = {
      level: '高度特征符合',
      color: '#ef233c',
      description: '你的得分较高，强烈建议认真对待，寻求专业心理健康支持。',
      analysis: '你的得分显示出非常典型的阳光抑郁症特征——在外表维持正常甚至积极的同时，内心承受着较大程度的痛苦、空洞感或意义感缺失。这种状态若长期持续，风险比显性抑郁更难被识别，也更难被帮助。请不要继续独自承受，寻求帮助是对自己的关爱。',
      suggestions: [
        '请尽快寻求心理咨询师或精神科医生的帮助',
        '完成 PHQ-9 测试，进行更全面的抑郁症状评估',
        '告诉至少一个你信任的人你的真实状态',
        '不要再强迫自己"假装没事"，你不必独自撑着',
        '如有自伤想法，请立即拨打危机热线',
        '记住：寻求帮助不是软弱，而是对自己的负责',
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

const hotlines = [
  { name: '全国心理援助热线', number: '400-161-9995' },
  { name: '北京心理危机干预', number: '010-82951332' },
  { name: '生命热线（自杀危机）', number: '400-821-1215' },
  { name: '希望24热线', number: '400-161-9995' },
  { name: '青少年心理援助', number: '12320-5' },
]
</script>

<style scoped>
/* 阳光抑郁症测试主色调：暖橙 */
.sunshine-page {
  min-height: 100vh;
  --test-accent: #f48c06;
  --test-accent-rgb: 244, 140, 6;
}
.test-hero-sub { color: #f48c06; }

/* agree-btn 样式（5级量表，与公共 freq-btn 类似但标签不同） */
.agree-options {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}
@media (max-width: 600px) { .agree-options { grid-template-columns: repeat(3, 1fr); } }

.agree-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 6px;
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.18s ease;
}
.agree-btn:hover { border-color: var(--color-border-hover); background: var(--color-bg-elevated); }
.agree-btn.selected { border-color: #f48c06; background: rgba(244,140,6,0.1); }
.agree-score { font-size: 1.1rem; font-weight: 800; color: var(--color-text-muted); }
.agree-btn.selected .agree-score { color: #f48c06; }
.agree-label { font-size: 0.67rem; color: var(--color-text-muted); text-align: center; line-height: 1.3; }
.agree-btn.selected .agree-label { color: var(--color-text-secondary); }

/* 维度卡片（sunshine专用，有颜色标签） */
.dim-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 10px; padding: 18px 20px; }
.dim-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.dim-name { font-size: 0.85rem; font-weight: 700; color: var(--color-text); }
.dim-score-badge { font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
.dim-low  { background: rgba(82,183,136,0.15); color: #52b788; }
.dim-mid  { background: rgba(244,140,6,0.15); color: #f48c06; }
.dim-high { background: rgba(239,35,60,0.15); color: #ef233c; }
.dim-bar-wrap { height: 4px; background: var(--color-bg-mute); border-radius: 2px; overflow: hidden; margin-bottom: 10px; }
.dim-bar-fill { height: 100%; border-radius: 2px; transition: width 0.8s cubic-bezier(0.34,1.56,0.64,1); }
.dim-low.dim-bar-fill  { background: #52b788 !important; }
.dim-mid.dim-bar-fill  { background: #f48c06 !important; }
.dim-high.dim-bar-fill { background: #ef233c !important; }
.dim-desc { font-size: 0.78rem; color: var(--color-text-muted); margin: 0; line-height: 1.5; }

/* 热线列表 */
.hotline-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
@media (max-width: 640px) { .hotline-list { grid-template-columns: 1fr 1fr; } }
.hotline-item { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 8px; padding: 14px 16px; display: flex; flex-direction: column; gap: 4px; }
.hotline-name { font-size: 0.78rem; color: var(--color-text-muted); }
.hotline-num { font-size: 1rem; font-weight: 800; color: var(--color-primary); font-family: monospace; letter-spacing: 0.04em; }

/* 分数环（sunshine使用 score-ring 而非 score-circle） */
.score-visual { display: flex; flex-direction: column; align-items: center; gap: 12px; flex-shrink: 0; }
.score-ring { width: 100px; height: 100px; border-radius: 50%; border: 3px solid var(--score-color, var(--color-primary)); display: flex; flex-direction: column; align-items: center; justify-content: center; }
.score-max { font-size: 0.75rem; color: var(--color-text-muted); }
.score-bar-wrap { width: 100px; height: 4px; background: var(--color-bg-mute); border-radius: 2px; overflow: hidden; }
.score-bar-fill { height: 100%; border-radius: 2px; transition: width 0.8s cubic-bezier(0.34,1.56,0.64,1); }
.score-badge { display: inline-block; font-size: 0.95rem; font-weight: 700; padding: 6px 16px; border-radius: 6px; border: 1px solid transparent; }
.section-title { font-size: 1rem; font-weight: 700; color: var(--color-heading); margin-bottom: 16px; }

/* 注意事项框（使用 bg-soft 而非 accent 色） */
.notice-box { display: flex; gap: 16px; align-items: flex-start; padding: 20px 24px; background: var(--color-bg-soft); border: 1px solid var(--color-border); border-radius: 10px; }
.notice-box strong { display: block; font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 6px; }
.notice-box p { font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.65; margin: 0; }
</style>
