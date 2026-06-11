<template>
  <div class="history-container">
    <div class="history-header">
      <h3 class="history-title">
        <Icon icon="mdi:history" /> 历史记录
      </h3>
      <button
        v-if="history.length > 0"
        class="clear-btn"
        @click="$emit('clear')"
      >
        <Icon icon="mdi:delete-outline" /> 清空
      </button>
    </div>

    <div v-if="history.length === 0" class="empty-history">
      <Icon icon="mdi:clipboard-text-clock-outline" class="empty-icon" />
      <p>暂无历史记录</p>
      <small>完成测试或阅读博客后，记录将显示在这里</small>
    </div>

    <template v-else>
      <div
        v-for="group in groupedHistory"
        :key="group.label"
        class="history-group"
      >
        <h4 class="group-label">{{ group.label }}</h4>
        <div class="group-items">
          <div
            v-for="item in group.items"
            :key="item.id"
            class="history-item"
            @click="$emit('itemClick', item)"
          >
            <div class="item-icon" :class="`item-type-${item.type}`">
              <Icon :icon="item.type === 'test' ? 'mdi:clipboard-check-outline' : 'mdi:book-open-variant'" />
            </div>
            <div class="item-content">
              <h4 class="item-title">{{ item.title }}</h4>
              <div class="item-meta">
                <span v-if="item.type === 'test'" class="item-score" :class="getLevelClass(item.level)">
                  <Icon icon="mdi:star-outline" :size="14" />
                  {{ item.score }}分 · {{ item.level }}
                </span>
                <span v-else class="item-read">
                  <Icon icon="mdi:check-circle" :size="14" />
                  已读
                </span>
                <span class="item-date">
                  <Icon icon="mdi:clock-outline" :size="14" />
                  {{ formatTime(item.completedAt) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'

export interface HistoryRecord {
  id: string
  testId?: string
  blogId?: string
  title: string
  type: 'test' | 'blog'
  score?: number
  level?: string
  completedAt: string | Date
}

const props = defineProps<{
  history: HistoryRecord[]
}>()

defineEmits<{
  itemClick: [item: HistoryRecord]
  clear: []
}>()

const groupedHistory = computed(() => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const groups: { label: string; items: HistoryRecord[] }[] = [
    { label: '今天', items: [] },
    { label: '昨天', items: [] },
    { label: '更早', items: [] },
  ]

  const sorted = [...props.history].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )

  for (const item of sorted) {
    const d = new Date(item.completedAt)
    const itemDate = new Date(d.getFullYear(), d.getMonth(), d.getDate())

    if (itemDate.getTime() === today.getTime()) {
      groups[0].items.push(item)
    } else if (itemDate.getTime() === yesterday.getTime()) {
      groups[1].items.push(item)
    } else {
      groups[2].items.push(item)
    }
  }

  return groups.filter((g) => g.items.length > 0)
})

const getLevelClass = (level?: string) => {
  if (!level) return ''
  if (level.includes('优秀') || level.includes('良好') || level.includes('正常') || level.includes('轻度'))
    return 'level-good'
  if (level.includes('中度') || level.includes('一般'))
    return 'level-moderate'
  return 'level-severe'
}

const formatTime = (date: string | Date) => {
  const d = new Date(date)
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}
</script>

<style scoped>
.history-container {
  padding: 1.5rem;
  background: var(--color-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.history-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.clear-btn {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  color: #ef233c;
  border-color: #ef233c;
  background: rgba(239, 35, 60, 0.05);
}

.empty-history {
  text-align: center;
  padding: 2.5rem 1rem;
  color: var(--color-text-muted);
}

.empty-icon {
  font-size: 3rem;
  opacity: 0.3;
  margin-bottom: 0.5rem;
}

.history-group {
  margin-bottom: 1rem;
}

.history-group:last-child {
  margin-bottom: 0;
}

.group-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
  padding-left: 0.25rem;
}

.group-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.history-item:hover {
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.item-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.item-icon.item-type-test {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
}

.item-icon.item-type-blog {
  background: rgba(33, 150, 243, 0.1);
  color: #2196f3;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
}

.item-score {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-weight: 600;
}

.item-score.level-good {
  color: #4caf50;
}

.item-score.level-moderate {
  color: #ff9800;
}

.item-score.level-severe {
  color: #f44336;
}

.item-read {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: #2196f3;
}

.item-date {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: var(--color-text-muted);
}

@media (max-width: 640px) {
  .history-container {
    padding: 1rem;
  }

  .item-title {
    font-size: 0.85rem;
  }

  .item-meta {
    font-size: 0.7rem;
  }
}
</style>
