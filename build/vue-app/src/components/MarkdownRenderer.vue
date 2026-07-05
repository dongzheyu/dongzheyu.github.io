<template>
  <div class="markdown-content" v-html="renderedHtml"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps<{
  content: string
}>()

// 生成 slug（中文支持）
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\u3400-\u4dbf]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-')
}

// 初始化 markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
})

// 为标题添加 id 和锚点链接
md.renderer.rules.heading_open = (tokens, idx) => {
  const token = tokens[idx]
  const nextToken = tokens[idx + 1]
  const text = nextToken.children?.reduce((acc: string, t: any) => acc + t.content, '') || ''
  const id = slugify(text)
  return `<h${token.tagLevel} id="${id}"><a class="header-anchor" href="#${id}" aria-hidden="true"></a>`
}

// 自定义代码块渲染，添加复制按钮
const defaultRender =
  md.renderer.rules.fence ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const code = token.content
  const lang = token.info.trim()

  // 生成唯一ID
  const codeId = `code-${Math.random().toString(36).substr(2, 9)}`

  // 原始代码块HTML
  const originalHtml = defaultRender(tokens, idx, options, env, self)

  // 包裹在带有复制按钮的容器中
  return `
    <div class="code-block-wrapper">
      ${lang ? `<div class="code-lang-badge">${lang}</div>` : ''}
      <button class="code-copy-btn" onclick="copyCode('${codeId}')" title="复制代码">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span class="copy-text">复制</span>
      </button>
      <div class="code-content" id="${codeId}">${originalHtml}</div>
    </div>
  `
}

// 渲染 Markdown
const renderedHtml = computed(() => {
  return md.render(props.content)
})

// 挂载后添加复制功能
onMounted(() => {
  // 将复制函数挂载到 window 对象
  ;(window as any).copyCode = async (elementId: string) => {
    const codeElement = document.getElementById(elementId)?.querySelector('code')
    if (!codeElement) return

    const code = codeElement.textContent || ''

    try {
      await navigator.clipboard.writeText(code)

      // 显示成功提示
      const btn = document.querySelector(`button[onclick="copyCode('${elementId}')"]`)
      if (btn) {
        const copyText = btn.querySelector('.copy-text')
        if (copyText) {
          const originalText = copyText.textContent
          copyText.textContent = '已复制!'
          btn.classList.add('copied')

          setTimeout(() => {
            copyText.textContent = originalText
            btn.classList.remove('copied')
          }, 2000)
        }
      }
    } catch (err) {
      console.error('复制失败:', err)
      // 降级方案：使用传统方法
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        const btn = document.querySelector(`button[onclick="copyCode('${elementId}')"]`)
        if (btn) {
          const copyText = btn.querySelector('.copy-text')
          if (copyText) {
            copyText.textContent = '已复制!'
            setTimeout(() => {
              copyText.textContent = '复制'
            }, 2000)
          }
        }
      } catch (e) {
        console.error('复制失败:', e)
      }
      document.body.removeChild(textarea)
    }
  }
})
</script>

<style scoped>
@import '@/assets/markdown-styles.css';
</style>
