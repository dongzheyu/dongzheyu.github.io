<template>
  <div class="markdown-content" v-html="renderedHtml"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps<{
  content: string
}>()

// 初始化 markdown-it
const md = new MarkdownIt({
  html: true,        // 允许 HTML 标签
  linkify: true,     // 自动识别链接
  typographer: true, // 启用智能引号等
  breaks: true,      // 转换换行符为 <br>
})

// 渲染 Markdown
const renderedHtml = computed(() => {
  return md.render(props.content)
})
</script>

<style scoped>
.markdown-content {
  line-height: 1.8;
  color: var(--color-text);
}

/* 标题样式 */
.markdown-content :deep(h1) {
  font-size: 2rem;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary);
  color: var(--color-text);
}

.markdown-content :deep(h2) {
  font-size: 1.75rem;
  margin: 1.75rem 0 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text);
}

.markdown-content :deep(h3) {
  font-size: 1.5rem;
  margin: 1.5rem 0 0.75rem;
  color: var(--color-text);
}

.markdown-content :deep(h4) {
  font-size: 1.25rem;
  margin: 1.25rem 0 0.5rem;
  color: var(--color-text);
}

/* 段落 */
.markdown-content :deep(p) {
  margin: 1rem 0;
  line-height: 1.8;
}

/* 链接 */
.markdown-content :deep(a) {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.markdown-content :deep(a:hover) {
  color: var(--color-primary-light);
  text-decoration: underline;
}

/* 代码块 */
.markdown-content :deep(code) {
  background: rgba(255, 140, 66, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
  color: var(--color-primary);
}

.markdown-content :deep(pre) {
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
  color: var(--color-text);
  font-size: 0.9rem;
  line-height: 1.6;
}

/* 列表 */
.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.markdown-content :deep(li) {
  margin: 0.5rem 0;
  line-height: 1.8;
}

.markdown-content :deep(ul li) {
  list-style-type: disc;
}

.markdown-content :deep(ol li) {
  list-style-type: decimal;
}

/* 引用块 */
.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--color-primary);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  background: rgba(255, 140, 66, 0.05);
  border-radius: 0 8px 8px 0;
  color: var(--color-text-secondary);
}

.markdown-content :deep(blockquote p) {
  margin: 0.5rem 0;
}

/* 图片 */
.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 表格 */
.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  overflow: hidden;
}

.markdown-content :deep(th) {
  background: rgba(255, 140, 66, 0.15);
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--color-text);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.markdown-content :deep(td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--color-text);
}

.markdown-content :deep(tr:hover) {
  background: rgba(255, 255, 255, 0.03);
}

/* 分隔线 */
.markdown-content :deep(hr) {
  border: none;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
}

/* 任务列表 */
.markdown-content :deep(input[type="checkbox"]) {
  margin-right: 0.5rem;
  accent-color: var(--color-primary);
}
</style>
