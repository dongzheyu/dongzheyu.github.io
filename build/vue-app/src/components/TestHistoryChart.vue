<template>
  <div class="history-chart">
    <h3 class="chart-title">
      <Icon icon="mdi:chart-bar" /> 测试历史
    </h3>

    <div v-if="history.length === 0" class="empty-history">
      <Icon icon="mdi:clipboard-text-clock-outline" class="empty-icon" />
      <p>暂无测试记录</p>
      <small>完成测试后，历史记录将显示在这里</small>
    </div>

    <template v-else>
      <div class="chart-bar-container">
        <div class="bar-y-axis">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
        <div class="chart-bars">
          <div
            v-for="(item, index) in history"
            :key="item.testId + '-' + index"
            class="bar-group"
          >
            <div class="bar-wrapper">
              <div
                class="bar"
                :style="{ height: getBarHeight(item.score, item.maxScore) + '%' }"
                :class="getLevelClass(item.level)"
              >
                <span class="bar-value">{{ getScorePercent(item.score, item.maxScore) }}%</span>
              </div>
            </div>
            <span class="bar-label" :title="item.testTitle">{{ truncateTitle(item.testTitle) }}</span>
          </div>
        </div>
      </div>

      <div class="history-list">
        <div
          v-for="(item, index) in history"
          :key="'list-' + item.testId + '-' + index"
          class="history-item"
        >
          <div class="item-score-ring" :class="getLevelClass(item.level)">
            <span class="item-score-num">{{ item.score }}</span>
            <span class="item-score-total">/ {{ item.maxScore }}</span>
          </div>
          <div class="item-info">
            <h4 class="item-title">{{ item.testTitle }}</h4>
            <div class="item-meta">
              <span class="item-level" :class="getLevelClass(item.level)">{{ item.level }}</span>
              <span class="item-date">
                <Icon icon="mdi:calendar-outline" :size="14" />
                {{ formatDate(item.completedAt) }}
              </span>
            </div>
          </div>
          <div class="item-bar-mini">
            <div
              class="mini-bar-track"
            >
              <div
                class="mini-bar-fill"
                :class="getLevelClass(item.level)"
                :style="{ width: getScorePercent(item.score, item.maxScore) + '%' }"
              />
            </div>
            <span class="mini-bar-pct">{{ getScorePercent(item.score, item.maxScore) }}%</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'

interface HistoryItem {
  testId: string
  testTitle: string
  score: number
  maxScore: number
  level: string
  completedAt: string | Date
}

const props = defineProps<{
  history: HistoryItem[]
}>()

const getScorePercent = (score: number, maxScore: number) => {
  if (maxScore === 0) return 0
  return Math.round((score / maxScore) * 100)
}

const getBarHeight = (score: number, maxScore: number) => {
  return getScorePercent(score, maxScore)
}

const getLevelClass = (level: string) => {
  if (level.includes('优秀') || level.includes('良好') || level.includes('正常') || level.includes('轻度')) return 'level-good'
  if (level.includes('中度') || level.includes('一般')) return 'level-moderate'
  return 'level-severe'
}

const truncateTitle = (title: string) => {
  return title.length > 8 ? title.slice(0, 8) + '…' : title
}

const formatDate = (date: string | Date) => {
  const d = new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
</script>

<style scoped>
.history-chart {
  padding: 1.5rem;
  background: var(--color-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.chart-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

/* ── bar chart ── */
.chart-bar-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--color-bg);
  border-radius: 10px;
  border: 1px solid var(--color-border);
}

.bar-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.65rem;
  color: var(--color-text-muted);
  padding: 0 0.25rem;
  min-width: 32px;
  text-align: right;
}

.chart-bars {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  height: 160px;
  border-bottom: 1px solid var(--color-border);
  border-left: 1px solid var(--color-border);
  padding: 0 0.5rem 0 0.5rem;
  position: relative;
}

.chart-bars::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to top,
    transparent,
    transparent calc(25% - 0.5px),
    var(--color-border) calc(25% - 0.5px),
    var(--color-border) 25%
  );
  pointer-events: none;
}

.bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
}

.bar-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar {
  width: 70%;
  max-width: 40px;
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 4px;
  transition: height 0.5s ease;
  position: relative;
}

.bar-value {
  font-size: 0.6rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.bar-label {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* ── level colors ── */
.level-good {
  background: linear-gradient(180deg, #4caf50, #388e3c);
}

.level-moderate {
  background: linear-gradient(180deg, #ff9800, #f57c00);
}

.level-severe {
  background: linear-gradient(180deg, #f44336, #c62828);
}

/* ── history list ── */
.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: border-color 0.2s;
}

.history-item:hover {
  border-color: var(--color-border-hover);
}

.item-score-ring {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2.5px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-score-ring.level-good { border-color: #4caf50; }
.item-score-ring.level-moderate { border-color: #ff9800; }
.item-score-ring.level-severe { border-color: #f44336; }

.item-score-num {
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1;
}

.item-score-ring.level-good .item-score-num { color: #4caf50; }
.item-score-ring.level-moderate .item-score-num { color: #ff9800; }
.item-score-ring.level-severe .item-score-num { color: #f44336; }

.item-score-total {
  font-size: 0.55rem;
  color: var(--color-text-muted);
  line-height: 1;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 0 0 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
}

.item-level {
  font-weight: 600;
}

.item-level.level-good { color: #4caf50; }
.item-level.level-moderate { color: #ff9800; }
.item-level.level-severe { color: #f44336; }

.item-date {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: var(--color-text-muted);
}

/* ── mini bar ── */
.item-bar-mini {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  width: 120px;
}

.mini-bar-track {
  flex: 1;
  height: 6px;
  background: var(--color-bg-mute);
  border-radius: 3px;
  overflow: hidden;
}

.mini-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.mini-bar-fill.level-good { background: #4caf50; }
.mini-bar-fill.level-moderate { background: #ff9800; }
.mini-bar-fill.level-severe { background: #f44336; }

.mini-bar-pct {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  min-width: 28px;
  text-align: right;
}

/* ── responsive ── */
@media (max-width: 640px) {
  .chart-bar-container {
    padding: 0.75rem;
  }

  .chart-bars {
    height: 120px;
  }

  .item-bar-mini {
    display: none;
  }

  .item-score-ring {
    width: 40px;
    height: 40px;
  }

  .item-score-num {
    font-size: 0.8rem;
  }

  .item-score-total {
    font-size: 0.5rem;
  }

  .item-title {
    font-size: 0.8rem;
  }
}
</style>
