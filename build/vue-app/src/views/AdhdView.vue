<template>
  <TestTemplate
    title="注意力缺陷多动障碍（ADHD）自评测试"
    subtitle="成人 ADHD 自评量表（ASRS-v1.1） · 18 道题 · 约 5 分钟"
    description="成人 ADHD 自评量表（Adult ADHD Self-Report Scale v1.1）是根据 DSM-5 标准开发的自评工具，用于筛查成人 ADHD 症状。请根据过去六个月的情况回答。"
    instruction="请评估以下情况在过去六个月中发生的频率："
    test-id="asrs"
    test-title="ADHD自评测试"
    :questions="questions"
    :options="freqOptions"
    :calculate-result-fn="calculateResult"
    theme-class="adhd-page"
    :dimensions="dimensionData"
    disclaimer="ASRS 是筛查工具，不能替代专业诊断。ADHD 是一种神经发育障碍，通过药物治疗、行为治疗和技能训练通常能够显著改善功能。如果你怀疑自己可能有 ADHD，建议寻求专业的神经精神科评估。"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TestTemplate from '@/components/TestTemplate.vue'

const freqOptions = [
  { value: 0, label: '从不' },
  { value: 1, label: '很少' },
  { value: 2, label: '有时' },
  { value: 3, label: '经常' },
  { value: 4, label: '总是' },
]

const questions = ref([
  { id: 1, text: '你难以完成细节任务或工作中不注意细节而犯错吗？', dimension: 'inattention' },
  { id: 2, text: '你难以在任务或活动中保持注意力吗？', dimension: 'inattention' },
  { id: 3, text: '别人对你说话时，你似乎没有在听吗？', dimension: 'inattention' },
  { id: 4, text: '你不按照指示做事，无法完成工作吗？', dimension: 'inattention' },
  { id: 5, text: '你难以组织任务和活动吗？', dimension: 'inattention' },
  { id: 6, text: '你回避、不喜欢或不愿意从事需要持久脑力劳动的任务吗？', dimension: 'inattention' },
  { id: 7, text: '你丢失任务或活动所需的东西吗？', dimension: 'inattention' },
  { id: 8, text: '你容易因外来刺激而分心吗？', dimension: 'inattention' },
  { id: 9, text: '你在日常活动中健忘吗？', dimension: 'inattention' },
  { id: 10, text: '你坐立不安或手脚动个不停吗？', dimension: 'hyperactivity' },
  { id: 11, text: '你在应该坐着时离开座位吗？', dimension: 'hyperactivity' },
  { id: 12, text: '你在不适当的场合过度奔跑或攀爬吗？', dimension: 'hyperactivity' },
  { id: 13, text: '你难以安静地从事休闲活动吗？', dimension: 'hyperactivity' },
  { id: 14, text: '你好像被马达驱动一样不停活动吗？', dimension: 'hyperactivity' },
  { id: 15, text: '你说话过多吗？', dimension: 'hyperactivity' },
  { id: 16, text: '你在问题还没问完时就抢答吗？', dimension: 'hyperactivity' },
  { id: 17, text: '你难以等待轮到自己吗？', dimension: 'hyperactivity' },
  { id: 18, text: '你打断或侵扰他人吗？', dimension: 'hyperactivity' },
])

interface Result {
  level: string
  color: string
  description: string
  analysis: string
  suggestions: string[]
}

const dimensionData = computed(() => {
  const inattention = questions.value
    .filter((q) => q.dimension === 'inattention')
    .reduce((sum, q) => sum + (currentAnswers.value[q.id] ?? 0), 0)
  const hyperactivity = questions.value
    .filter((q) => q.dimension === 'hyperactivity')
    .reduce((sum, q) => sum + (currentAnswers.value[q.id] ?? 0), 0)
  return [
    {
      name: '注意缺陷',
      icon: 'mdi:lightbulb-on',
      description: '注意力不集中、容易分心、健忘',
      score: inattention,
      maxScore: 36,
    },
    {
      name: '多动冲动',
      icon: 'mdi:lightning-bolt',
      description: '坐立不安、难以等待、打断他人',
      score: hyperactivity,
      maxScore: 36,
    },
  ]
})

const currentAnswers = ref<Record<number, number>>({})

const calculateResult = (answers: Record<number, number>): Result => {
  currentAnswers.value = answers
  const score = Object.values(answers).reduce((sum, val) => sum + val, 0)
  const inattention = questions.value
    .filter((q) => q.dimension === 'inattention')
    .reduce((sum, q) => sum + (answers[q.id] ?? 0), 0)

  const part1Score = questions.value
    .slice(0, 6)
    .reduce((sum, q) => sum + (answers[q.id] ?? 0), 0)
  const isPositive = part1Score >= 4

  if (score <= 20) {
    return {
      level: '极轻微症状',
      color: 'var(--color-brand)',
      description: '你的ADHD症状水平很低，属于正常范围。',
      analysis:
        '总得分 ≤20 分表明ADHD症状极轻微。大多数人都有一些注意力不集中或冲动的时刻，这是正常的。你的得分显示ADHD不太可能影响你的生活。',
      suggestions: ['继续保持现有的生活习惯', '如症状加重，可重新评估', '了解ADHD的正常表现范围'],
    }
  } else if (score <= 40) {
    return {
      level: '轻度症状',
      color: '#f48c06',
      description: '你存在一定程度的ADHD症状，但可能未达到临床水平。',
      analysis:
        '总得分 21-40 分属于轻度症状范围。你可能有一些注意力或多动冲动困难，但尚未严重影响功能。执行功能训练可能对你有帮助。',
      suggestions: [
        '学习时间管理和组织技巧',
        '尝试使用待办事项清单和提醒工具',
        '记录分心时间和触发因素',
        '考虑阅读ADHD自助书籍',
      ],
    }
  } else if (score <= 60) {
    return {
      level: '中度症状',
      color: '#ff8c42',
      description: '你的ADHD症状已达到临床显著水平，建议寻求专业评估。',
      analysis:
        '总得分 41-60 分达到临床显著阈值。在这个水平，ADHD症状很可能已经开始影响你的工作、学习或人际关系。ADHD是可以通过药物和行为治疗有效管理的神经发育障碍。',
      suggestions: [
        '建议预约神经精神科医生或心理医生',
        '了解ADHD的诊断标准和治疗选项',
        '寻找ADHD专科治疗师',
        '考虑参加ADHD支持团体',
      ],
    }
  } else {
    return {
      level: '重度症状',
      color: '#ef233c',
      description: '你的ADHD症状非常严重，很可能显著损害你的功能，建议立即寻求专业帮助。',
      analysis:
        '总得分 ≥61 分属于重度ADHD症状范围。在这个水平，症状很可能已经严重影响你的日常生活功能。重度ADHD需要系统的专业评估和治疗干预。',
      suggestions: [
        '请尽快就诊神经精神科或精神科',
        '如实告诉医生你的症状严重程度和持续时间',
        '了解药物治疗和心理治疗的联合方案',
        '考虑参加ADHD强化治疗项目',
      ],
    }
  }
}
</script>

<style scoped>
.adhd-page {
  --test-accent: #a7f3d0;
  --test-accent-rgb: 167, 243, 208;
}
.adhd-page :deep(.test-hero-sub) {
  color: #34d399;
}
</style>
