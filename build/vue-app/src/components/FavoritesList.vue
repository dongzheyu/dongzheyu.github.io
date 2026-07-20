<template>
  <div class="favorites-container">
    <h3 class="favorites-title"><Icon icon="mdi:heart" /> 我的收藏</h3>

    <div v-if="items.length === 0" class="empty-favorites">
      <Icon icon="mdi:heart-outline" class="empty-icon" />
      <p>暂无收藏</p>
      <small>点击内容卡片上的 ❤ 按钮添加收藏</small>
    </div>

    <template v-else>
      <div v-for="group in groupedItems" :key="group.type" class="favorites-group">
        <h4 class="group-label">
          <Icon
            :icon="group.type === 'test' ? 'mdi:clipboard-check-outline' : 'mdi:book-open-variant'"
            :size="16"
          />
          {{ group.type === 'test' ? '测试' : '博客' }}
          <span class="group-count">{{ group.items.length }}</span>
        </h4>
        <div class="group-items">
          <div
            v-for="item in group.items"
            :key="item.id"
            class="favorite-item"
            @click="$emit('itemClick', item)"
          >
            <div class="fav-icon" :style="`background: ${item.color}20; color: ${item.color}`">
              <Icon :icon="item.icon" />
            </div>
            <div class="fav-content">
              <h4 class="fav-title">{{ item.title }}</h4>
              <p class="fav-desc">{{ item.description }}</p>
            </div>
            <button class="fav-remove" @click.stop="$emit('remove', item.id)" title="取消收藏">
              <Icon icon="mdi:close" />
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

export interface FavoriteItem {
  id: string
  title: string
  description: string
  icon: string
  color: string
  type: 'test' | 'blog'
}

const props = defineProps<{
  items: FavoriteItem[]
}>()

defineEmits<{
  itemClick: [item: FavoriteItem]
  remove: [id: string]
}>()

const groupedItems = computed(() => {
  const map = new Map<string, FavoriteItem[]>()
  for (const item of props.items) {
    const arr = map.get(item.type) || []
    arr.push(item)
    map.set(item.type, arr)
  }
  return Array.from(map.entries()).map(([type, items]) => ({ type, items }))
})
</script>

<style scoped>
.favorites-container {
  padding: 1.5rem;
  background: var(--color-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.favorites-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.empty-favorites {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--color-text-muted);
}

.empty-icon {
  font-size: 3rem;
  opacity: 0.3;
  margin-bottom: 0.5rem;
}

.favorites-group {
  margin-bottom: 1rem;
}

.favorites-group:last-child {
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
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.group-count {
  background: var(--color-bg-mute);
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
  font-size: 0.65rem;
}

.group-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.favorite-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.favorite-item:hover {
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.fav-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.fav-content {
  flex: 1;
  min-width: 0;
}

.fav-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fav-desc {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin: 0.25rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fav-remove {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.fav-remove:hover {
  background: rgba(239, 35, 60, 0.1);
  color: #ef233c;
}

@media (max-width: 640px) {
  .favorites-container {
    padding: 1rem;
  }

  .fav-title {
    font-size: 0.85rem;
  }

  .fav-desc {
    font-size: 0.7rem;
  }
}
</style>
