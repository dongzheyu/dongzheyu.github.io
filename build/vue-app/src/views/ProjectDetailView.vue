<template>
  <div class="project-detail-page">
    <div class="container">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>加载项目中...</p>
      </div>

      <!-- 项目内容 -->
      <article v-else-if="projectContent" class="project-detail">
        <header class="project-header">
          <h1 class="project-title">{{ projectTitle }}</h1>
        </header>

        <MarkdownRenderer :content="projectContent" />

        <!-- 评论区 -->
        <CommentsSection :post-slug="route.params.slug as string" />

        <footer class="project-footer">
          <RouterLink to="/projects" class="btn btn-outline-light">
            <Icon icon="mdi:arrow-left" size="16" style="margin-right: 4px;" />
            返回项目列表
          </RouterLink>
        </footer>
      </article>

      <!-- 项目不存在 -->
      <div v-else class="not-found">
        <Icon icon="mdi:folder-remove" size="64" class="icon-large" />
        <h2>项目不存在</h2>
        <p>该项目可能已被删除或移动</p>
        <RouterLink to="/projects" class="btn btn-primary btn-animate">
          返回项目列表
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import CommentsSection from '@/components/CommentsSection.vue'
import Icon from '@/components/Icon.vue'

const route = useRoute()
const loading = ref(true)
const projectContent = ref('')
const projectTitle = ref('')

onMounted(async () => {
  await loadProject()
})

async function loadProject() {
  loading.value = true
  
  try {
    const slug = route.params.slug as string
    
    // 从 public/project 目录加载 Markdown 文件
    const response = await fetch(`/project/${slug}.md`)
    
    if (!response.ok) {
      throw new Error('项目不存在')
    }
    
    const content = await response.text()
    
    // 解析 Front Matter（如果有的话）
    const { title, body } = parseFrontMatter(content)
    
    projectTitle.value = title || slug
    projectContent.value = body
    
  } catch (err: any) {
    console.error('加载项目失败:', err)
    projectContent.value = ''
  } finally {
    loading.value = false
  }
}

// 解析 Front Matter
function parseFrontMatter(content: string) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontMatterRegex)
  
  if (match) {
    const [, frontMatterStr = '', body = ''] = match
    const frontMatter: Record<string, string> = {}
    
    // 解析 YAML front matter
    frontMatterStr.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        frontMatter[key.trim()] = valueParts.join(':').trim()
      }
    })
    
    return {
      title: frontMatter.title || '',
      body: body.trim(),
    }
  }
  
  // 没有 front matter，直接返回内容
  return {
    title: '',
    body: content.trim(),
  }
}
</script>

<style scoped>
.project-detail-page {
  min-height: calc(100vh - 200px);
  padding-top: 80px; /* 为 sticky 导航栏留出空间 */
  padding-bottom: 3rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 4rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(25, 118, 210, 0.2);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.project-detail {
  max-width: 900px;
  margin: 0 auto;
  background: var(--color-bg-card);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.project-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.project-title {
  font-size: 2.5rem;
  margin: 0;
  color: var(--color-text);
  line-height: 1.3;
}

.project-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
}

.not-found {
  text-align: center;
  padding: 4rem 0;
}

.icon-large {
  color: var(--color-text-secondary);
  opacity: 0.3;
  margin-bottom: 1.5rem;
}

.not-found h2 {
  color: var(--color-text);
  margin-bottom: 1rem;
}

.not-found p {
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .project-detail {
    padding: 2rem 1.5rem;
  }
  
  .project-title {
    font-size: 2rem;
  }
}
</style>
