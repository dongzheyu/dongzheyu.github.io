<template>
  <div class="tag-cloud-container">
    <h3 class="tag-cloud-title"><Icon icon="mdi:tag-multiple" /> 标签云</h3>
    <div class="tag-cloud">
      <span
        v-for="(count, name) in tags"
        :key="name"
        class="tag-item"
        :style="{
          fontSize: `${getSize(count)}rem`,
          opacity: 0.6 + (count / maxCount) * 0.4,
        }"
        @click="$emit('tagClick', name as string)"
      >
        {{ name }}
        <span class="tag-count">{{ count }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps<{
  tags: Record<string, number>
}>()

defineEmits<{
  tagClick: [name: string]
}>()

const maxCount = computed(() => Math.max(...Object.values(props.tags), 1))

const getSize = (count: number) => {
  const min = Math.min(...Object.values(props.tags))
  const max = maxCount.value
  const normalized = max > min ? (count - min) / (max - min) : 0.5
  return 0.85 + normalized * 0.85
}
</script>

<style scoped>
.tag-cloud-container {
  padding: 1.5rem;
  background: var(--color-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.tag-cloud-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  line-height: 1.8;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-bg);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-weight: 500;
}

.tag-item:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(27, 217, 106, 0.3);
}

.tag-count {
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  background: rgba(27, 217, 106, 0.15);
  border-radius: 10px;
  color: var(--color-primary);
}

.tag-item:hover .tag-count {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}
</style>
