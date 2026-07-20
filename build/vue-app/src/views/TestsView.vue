<template>
  <div class="tests-page">
    <section class="page-head">
      <h1>
        <span>$ ls /tests/  # 心理评估</span><br>
        <span class="typewriter" style="font-size:var(--font-size-lg);">{{ display }}</span>
        <span class="typewriter-cursor" :class="{ done }"></span>
      </h1>
      <p class="subtitle" style="transform:translateX(40px);">基于标准量表的心理自评工具，仅供参考。</p>
    </section>

    <section class="tests-section">
      <div class="geek-section-inner">
        <div class="category-filter">
          <button
            v-for="cat in categories"
            :key="cat.value"
            class="filter-btn"
            :class="{ active: activeCategory === cat.value }"
            @click="activeCategory = cat.value"
          >
            <Icon :icon="cat.icon" />
            {{ cat.label }}
            <span v-if="cat.value !== 'all'" class="filter-count">{{ getCategoryCount(cat.value) }}</span>
          </button>
        </div>

        <div class="test-grid">
          <div
            v-for="(test, index) in filteredTests"
            :key="test.id"
            class="animate-slide-up"
            :class="{ visible: isVisible }"
            :style="`animation-delay: ${0.1 + index * 0.15}s`"
          >
            <RouterLink :to="test.path" class="test-card card-geek">
              <div class="test-card-top">
                <Icon :icon="test.icon" class="test-card-icon" />
                <span class="tag-pill">{{ test.badge }}</span>
              </div>
              <h5 class="test-card-title">{{ test.title }}</h5>
              <p class="test-card-desc text-dim">{{ test.description }}</p>
              <div class="flex gap-16" style="font-size:var(--font-size-xs); color:var(--color-text-faint);">
                <span class="flex items-center gap-8"><Icon icon="mdi:format-list-checks" />{{ test.questions }} 题</span>
                <span class="flex items-center gap-8"><Icon icon="mdi:clock" />约 {{ test.minutes }} 分钟</span>
              </div>
              <div class="btn-geek" style="margin-top:20px; width:100%; justify-content:center;">开始评估 ></div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-60">
      <div class="geek-section-inner">
        <div class="disclaimer-box">
          <Icon icon="mdi:alert-circle" class="disclaimer-icon" />
          <div>
            <strong>⚠️ 重要免责声明</strong>
            <p>
              本页面所有测试均为<strong>心理健康自评筛查工具</strong>，仅供个人参考与自我认知，<strong>不构成任何医学或心理学诊断依据</strong>，也不能替代专业医疗建议。测试结果受多种因素影响，可能存在偏差。若你感到持续的心理困扰，请及时联系心理卫生专业人士或前往正规医疗机构就诊。请勿将测试结果作为自我诊断或他人诊断的依据。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { useTypewriter } from '@/composables/useTypewriter'

const { display, cursor, done } = useTypewriter('了解自己，从自评开始。', 50)

const isVisible = ref(false)
onMounted(() => { setTimeout(() => { isVisible.value = true }, 80) })
const activeCategory = ref('all')

const categories = [
  { value: 'all', label: '全部', icon: 'mdi:view-grid' },
  { value: '人格', label: '人格测试', icon: 'mdi:account-badge' },
  { value: '情绪', label: '情绪评估', icon: 'mdi:emoticon' },
  { value: '焦虑', label: '焦虑相关', icon: 'mdi:alert-circle' },
  { value: '创伤', label: '创伤障碍', icon: 'mdi:flash-alert' },
  { value: '成瘾', label: '成瘾行为', icon: 'mdi:dependency' },
]

const filteredTests = computed(() => {
  if (activeCategory.value === 'all') return tests.value
  return tests.value.filter((t) => t.category === activeCategory.value)
})

const getCategoryCount = (category: string) => {
  return tests.value.filter((t) => t.category === category).length
}

const tests = ref([
  { id: 'mbti', path: '/tests/mbti', title: 'MBTI 人格测试', description: '基于迈尔斯-布里格斯类型指标，通过 93 道题目测出你在四个维度上的偏好，识别 16 种人格类型之一。', icon: 'mdi:graph-outline', badge: 'MBTI', category: '人格', questions: 93, minutes: 15 },
  { id: 'depression', path: '/tests/depression', title: '抑郁症自评测试', description: '基于 PHQ-9 患者健康问卷，是国际广泛使用的抑郁症筛查工具，包含 9 个核心症状问题。', icon: 'mdi:heart-pulse', badge: 'PHQ-9', category: '情绪', questions: 9, minutes: 5 },
  { id: 'sunshine', path: '/tests/sunshine', title: '阳光抑郁症测试', description: '识别"微笑型抑郁"特征——表面乐观开朗，内心却承受痛苦。通过 15 道题目评估这一隐性状态。', icon: 'mdi:weather-sunny', badge: '微笑抑郁', category: '情绪', questions: 15, minutes: 8 },
  { id: 'anxiety', path: '/tests/anxiety', title: '焦虑症自评测试', description: '基于 GAD-7 广泛性焦虑量表，评估过去两周内的焦虑症状频率，共 7 个核心问题。', icon: 'mdi:shield-alert', badge: 'GAD-7', category: '焦虑', questions: 7, minutes: 3 },
  { id: 'bipolar', path: '/tests/bipolar', title: '双相情感障碍测试', description: '心境障碍问卷（MDQ）筛查工具，评估躁狂/轻躁狂症状，共 13 个问题。', icon: 'mdi:arrow-up-down-bold', badge: 'MDQ', category: '情绪', questions: 13, minutes: 5 },
  { id: 'phobia', path: '/tests/phobia', title: '恐惧症综合测试', description: '结合社交恐惧量表（SPIN）和特定恐惧症筛查，评估各类恐惧症状，共 22 题。', icon: 'mdi:emoticon-sad', badge: 'SPIN', category: '焦虑', questions: 22, minutes: 7 },
  { id: 'ptsd', path: '/tests/ptsd', title: 'PTSD 自评测试', description: '基于 PTSD 检查表（PCL-5），评估创伤后应激障碍症状，符合 DSM-5 标准，共 20 题。', icon: 'mdi:lightning-bolt', badge: 'PCL-5', category: '创伤', questions: 20, minutes: 6 },
  { id: 'ocd', path: '/tests/ocd', title: '强迫症自评测试', description: '强迫症状量表（OCI-R）评估强迫思维和行为，包含 18 个核心症状问题。', icon: 'mdi:repeat', badge: 'OCI-R', category: '焦虑', questions: 18, minutes: 5 },
  { id: 'eating', path: '/tests/eating', title: '进食障碍自评测试', description: '进食态度测试（EAT-26）筛查厌食症、贪食症等进食障碍风险，共 26 题。', icon: 'mdi:heart-half-full', badge: 'EAT-26', category: '情绪', questions: 26, minutes: 6 },
  { id: 'substance', path: '/tests/substance', title: '物质使用障碍测试', description: '结合酒精使用障碍测试（AUDIT）和药物滥用筛查（DAST-10），共 20 题。', icon: 'mdi:water-percent', badge: 'AUDIT', category: '成瘾', questions: 20, minutes: 5 },
  { id: 'gambling', path: '/tests/gambling', title: '赌博障碍自评测试', description: '赌博问题严重性指数（PGSI）评估赌博问题严重程度，共 9 题。', icon: 'mdi:dice-6', badge: 'PGSI', category: '成瘾', questions: 9, minutes: 3 },
  { id: 'gaming', path: '/tests/gaming', title: '游戏障碍自评测试', description: '网络游戏障碍测试（IGD-20）根据 DSM-5 研究标准开发，共 20 题。', icon: 'mdi:gamepad-variant', badge: 'IGD-20', category: '成瘾', questions: 20, minutes: 6 },
  { id: 'adhd', path: '/tests/adhd', title: 'ADHD 自评测试', description: '成人 ADHD 自评量表（ASRS-v1.1）根据 DSM-5 标准开发，共 18 题。', icon: 'mdi:lightning-bolt', badge: 'ASRS', category: '情绪', questions: 18, minutes: 5 },
  { id: 'asd', path: '/tests/asd', title: '自闭症谱系初筛', description: '自闭症谱系商数（AQ-10）简短筛查工具，评估自闭症谱系特征，共 10 题。', icon: 'mdi:puzzle', badge: 'AQ-10', category: '人格', questions: 10, minutes: 3 },
  { id: 'bpd', path: '/tests/bpd', title: '边缘型人格障碍测试', description: '边缘症状量表（MSI-BPD）筛查边缘型人格障碍风险，共 10 题。', icon: 'mdi:heart-broken', badge: 'MSI-BPD', category: '人格', questions: 10, minutes: 3 },
  { id: 'somatic', path: '/tests/somatic', title: '躯体症状障碍测试', description: '躯体症状量表（PHQ-15）评估常见躯体症状严重程度，共 15 题。', icon: 'mdi:thermometer', badge: 'PHQ-15', category: '情绪', questions: 15, minutes: 4 },
])
</script>

<style scoped>
.tests-section {
  padding: 0 0 60px;
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 1024px) {
  .test-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .test-grid { grid-template-columns: 1fr; }
}

.test-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  padding: 28px;
  height: 100%;
  cursor: pointer;
  transition: all 0.25s var(--ease-out-expo);
}
.test-card:hover {
  border-color: var(--color-border-hover);
  background: rgba(255,255,255,0.04);
}

.test-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.test-card-icon {
  font-size: 1.6rem;
  color: var(--color-white);
}

.test-card-title {
  font-size: var(--font-size-base);
  color: var(--color-white);
  margin: 0 0 8px;
  font-weight: 400;
}

.test-card-desc {
  font-size: var(--font-size-xs);
  line-height: 1.6;
  margin-bottom: 16px;
  flex: 1;
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--color-border);
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text-dim);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}
.filter-btn:hover {
  border-color: var(--color-border-hover);
  color: var(--color-white);
}
.filter-btn.active {
  background: rgba(255,255,255,0.08);
  border-color: var(--color-border-hover);
  color: var(--color-white);
}

.filter-count {
  font-size: 0.7rem;
  padding: 1px 6px;
  background: rgba(255,255,255,0.06);
  border-radius: 8px;
  margin-left: 2px;
}

.disclaimer-box {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 20px 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.disclaimer-icon {
  font-size: 1.3rem;
  color: var(--color-text-faint);
  flex-shrink: 0;
  margin-top: 2px;
}

.disclaimer-box strong {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-dim);
  margin-bottom: 6px;
}

.disclaimer-box p {
  font-size: var(--font-size-xs);
  color: var(--color-text-faint);
  line-height: 1.7;
  margin: 0;
}
</style>
