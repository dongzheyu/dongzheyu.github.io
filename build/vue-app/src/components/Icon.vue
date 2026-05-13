<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  icon: string
  size?: number | string
  color?: string
}>()
</script>

<template>
  <Icon :icon="icon" :width="size" :height="size" :style="{ color }" />
</template>
