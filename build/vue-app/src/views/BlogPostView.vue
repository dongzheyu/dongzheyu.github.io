<template>
  <div class="blog-post-page">
    <div class="container">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>加载文章中...</p>
      </div>

      <!-- 文章内容 -->
      <article v-else-if="postContent" class="blog-post">
        <header class="post-header">
          <h1 class="post-title">{{ postTitle }}</h1>
          <div class="post-meta">
            <span class="post-date" v-if="postDate">
              <i class="bi bi-calendar"></i>
              {{ postDate }}
            </span>
          </div>
        </header>

        <MarkdownRenderer :content="postContent" />

        <!-- 评论区 -->
        <CommentsSection :post-slug="route.params.slug as string" />

        <footer class="post-footer">
          <RouterLink to="/blog" class="btn btn-outline-light">
            <i class="bi bi-arrow-left"></i>
            返回博客列表
          </RouterLink>
        </footer>
      </article>

      <!-- 文章不存在 -->
      <div v-else class="not-found">
        <i class="bi bi-file-text icon-large"></i>
        <h2>文章不存在</h2>
        <p>该文章可能已被删除或移动</p>
        <RouterLink to="/blog" class="btn btn-primary btn-animate">
          返回博客列表
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

const route = useRoute()
const loading = ref(true)
const postContent = ref('')
const postTitle = ref('')
const postDate = ref('')

onMounted(async () => {
  await loadPost()
})

async function loadPost() {
  loading.value = true
  
  try {
    const slug = route.params.slug as string
    
    // 从 public/blog 目录加载 markdown 文件
    const response = await fetch(`/blog/${slug}.md`)
    
    if (!response.ok) {
      throw new Error('文章不存在')
    }
    
    const content = await response.text()
    
    // 解析 Front Matter（如果有的话）
    const { title, date, body } = parseFrontMatter(content)
    
    postTitle.value = title || slug
    postDate.value = date || ''
    postContent.value = body
    
  } catch (err: any) {
    console.error('加载文章失败:', err)
    postContent.value = ''
  } finally {
    loading.value = false
  }
}

// 解析 Front Matter
function parseFrontMatter(content: string) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontMatterRegex)
  
  if (match) {
    const [, frontMatterStr, body] = match
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
      date: frontMatter.date || '',
      body: body.trim(),
    }
  }
  
  // 没有 front matter，直接返回内容
  return {
    title: '',
    date: '',
    body: content.trim(),
  }
}
</script>

<style scoped>
.blog-post-page {
  min-height: calc(100vh - 200px);
  padding: 3rem 0;
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
  border: 4px solid rgba(255, 140, 66, 0.2);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.blog-post {
  max-width: 900px;
  margin: 0 auto;
  background: var(--color-bg-card);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.post-title {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  color: var(--color-text);
  line-height: 1.3;
}

.post-meta {
  display: flex;
  gap: 1.5rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.post-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.post-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
}

.not-found {
  text-align: center;
  padding: 4rem 0;
}

.not-found .icon-large {
  font-size: 5rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.not-found h2 {
  margin: 0 0 1rem 0;
  color: var(--color-text);
}

.not-found p {
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}
</style>
