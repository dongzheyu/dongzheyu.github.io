<template>
  <div class="post-editor-page">
    <div class="container">
      <div class="editor-header">
        <h1>{{ isEditing ? '编辑文章' : '发布新文章' }}</h1>
        <RouterLink to="/blog" class="btn btn-secondary">
          <Icon icon="mdi:arrow-left" />
          返回博客
        </RouterLink>
      </div>

      <!-- 错误提示 -->
      <div v-if="error" class="error-alert">
        <Icon icon="mdi:alert" />
        {{ error }}
        <button @click="error = ''" class="close-btn">&times;</button>
      </div>

      <!-- 成功提示 -->
      <div v-if="successMessage" class="success-alert">
        <Icon icon="mdi:check-circle" />
        {{ successMessage }}
      </div>

      <form @submit.prevent="handleSubmit" class="editor-form">
        <!-- 标题 -->
        <div class="form-group">
          <label for="title">文章标题 *</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            placeholder="输入文章标题"
            required
            maxlength="100"
            class="form-input"
          />
          <small class="form-hint">{{ form.title.length }}/100</small>
        </div>

        <!-- Slug -->
        <div class="form-group">
          <label for="slug">文章标识 *</label>
          <input
            id="slug"
            v-model="form.slug"
            type="text"
            placeholder="例如: my-awesome-post"
            required
            pattern="[a-z0-9-]+"
            class="form-input"
          />
          <small class="form-hint">只能使用小写字母、数字和连字符，将用于 URL</small>
        </div>

        <!-- 分类和颜色 -->
        <div class="form-row">
          <div class="form-group">
            <label for="category">分类</label>
            <input
              id="category"
              v-model="form.category"
              type="text"
              placeholder="例如: 编程教程"
              maxlength="50"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="color">主题色</label>
            <input id="color" v-model="form.color" type="color" class="form-input color-input" />
          </div>
        </div>

        <!-- 简介 -->
        <div class="form-group">
          <label for="excerpt">文章简介</label>
          <textarea
            id="excerpt"
            v-model="form.excerpt"
            placeholder="简短描述文章内容（可选）"
            rows="3"
            maxlength="300"
            class="form-input"
          ></textarea>
          <small class="form-hint">{{ form.excerpt.length }}/300</small>
        </div>

        <!-- Markdown 编辑器 -->
        <div class="form-group">
          <label for="content">文章内容 (Markdown) *</label>
          <div class="editor-toolbar">
            <button type="button" @click="insertMarkdown('**', '**')" title="粗体">
              <Icon icon="mdi:format-bold" />
            </button>
            <button type="button" @click="insertMarkdown('*', '*')" title="斜体">
              <Icon icon="mdi:format-italic" />
            </button>
            <button type="button" @click="insertMarkdown('# ', '')" title="标题">
              <Icon icon="mdi:format-header-1" />
            </button>
            <button type="button" @click="insertMarkdown('- ', '')" title="列表">
              <Icon icon="mdi:format-list-bulleted" />
            </button>
            <button type="button" @click="insertMarkdown('```\n', '\n```')" title="代码块">
              <Icon icon="mdi:code-tags" />
            </button>
            <button type="button" @click="insertMarkdown('[', '](url)')" title="链接">
              <Icon icon="mdi:link" />
            </button>
            <button type="button" @click="insertMarkdown('![alt](', ')')" title="图片">
              <Icon icon="mdi:image" />
            </button>
            <button type="button" @click="insertMarkdown('> ', '')" title="引用">
              <Icon icon="mdi:format-quote-close" />
            </button>
            <button type="button" @click="handleImageUpload" title="上传图片">
              <Icon icon="mdi:upload" />
            </button>
          </div>
          <textarea
            id="content"
            v-model="form.content"
            placeholder="使用 Markdown 编写文章内容..."
            rows="20"
            required
            class="form-input markdown-editor"
          ></textarea>
          <small class="form-hint">支持标准 Markdown 语法</small>
        </div>

        <!-- 预览 -->
        <div class="form-group">
          <label>预览</label>
          <div class="preview-container">
            <MarkdownRenderer v-if="form.content" :content="form.content" />
            <div v-else class="preview-empty">
              <Icon icon="mdi:eye" />
              <p>在上方输入内容以查看预览</p>
            </div>
          </div>
        </div>

        <!-- 发布选项 -->
        <div class="form-group">
          <label class="checkbox-label">
            <input v-model="form.published" type="checkbox" class="checkbox-input" />
            <span>立即发布（取消勾选则保存为草稿）</span>
          </label>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <button
            type="button"
            @click="handleSaveDraft"
            class="btn btn-secondary"
            :disabled="saving"
          >
            {{ saving ? '保存中...' : '保存草稿' }}
          </button>
          <button
            type="submit"
            class="btn btn-primary btn-animate"
            :disabled="saving || !isFormValid"
          >
            {{ saving ? '发布中...' : isEditing ? '更新文章' : '发布文章' }}
          </button>
        </div>
      </form>
    </div>

    <!-- 隐藏的文件输入 -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="handleFileSelect"
      style="display: none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/supabase/client'
import { useAuth } from '@/composables/useAuth'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'

const router = useRouter()
const route = useRoute()
const { user, isAuthenticated } = useAuth()

const fileInput = ref<HTMLInputElement | null>(null)
const isEditing = computed(() => !!route.params.id)
const saving = ref(false)
const uploading = ref(false)
const error = ref('')
const successMessage = ref('')

const form = ref({
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  category: '个人文章',
  color: '#FF6B6B',
  published: false,
})

// 表单验证
const isFormValid = computed(() => {
  return form.value.title.trim() && form.value.slug.trim() && form.value.content.trim()
})

onMounted(async () => {
  if (!isAuthenticated.value) {
    router.push('/auth')
    return
  }

  // 如果是编辑模式，加载文章
  if (isEditing.value) {
    await loadPost()
  }
})

// 加载文章（编辑模式）
async function loadPost() {
  try {
    const postId = route.params.id as string

    const { data, error: fetchError } = await supabase
      .from('user_posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (fetchError) throw fetchError

    if (data.author_id !== user.value?.id) {
      error.value = '你没有权限编辑这篇文章'
      return
    }

    form.value = {
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt || '',
      category: data.category || '个人文章',
      color: data.color || '#FF6B6B',
      published: data.published || false,
    }
  } catch (err: any) {
    console.error('加载文章失败:', err)
    error.value = '加载文章失败: ' + (err.message || '请稍后重试')
  }
}

// 插入 Markdown 语法
function insertMarkdown(before: string, after: string) {
  const textarea = document.getElementById('content') as HTMLTextAreaElement
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = form.value.content
  const selectedText = text.substring(start, end)

  const newText = text.substring(0, start) + before + selectedText + after + text.substring(end)
  form.value.content = newText

  // 恢复光标位置
  setTimeout(() => {
    textarea.focus()
    textarea.setSelectionRange(start + before.length, end + before.length)
  }, 0)
}

// 处理图片上传
function handleImageUpload() {
  fileInput.value?.click()
}

async function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    error.value = '只支持图片文件'
    return
  }

  // 验证文件大小（5MB）
  if (file.size > 5 * 1024 * 1024) {
    error.value = '图片大小不能超过 5MB'
    return
  }

  uploading.value = true
  error.value = ''

  try {
    // 生成文件名
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.value?.id}/${Date.now()}.${fileExt}`

    // 上传到 Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (uploadError) throw uploadError

    // 获取公开 URL
    const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName)

    const imageUrl = data.publicUrl

    // 插入 Markdown 图片语法
    insertMarkdown(`![图片](${imageUrl})`, '')

    successMessage.value = '图片上传成功！'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err: any) {
    console.error('上传图片失败:', err)
    error.value = '上传图片失败: ' + (err.message || '请稍后重试')
  } finally {
    uploading.value = false
    // 清空文件输入
    if (target) target.value = ''
  }
}

// 保存草稿
async function handleSaveDraft() {
  form.value.published = false
  await handleSubmit()
}

// 提交表单
async function handleSubmit() {
  if (!isFormValid.value || !user.value) return

  saving.value = true
  error.value = ''
  successMessage.value = ''

  try {
    const postData = {
      title: form.value.title.trim(),
      slug: form.value.slug.trim().toLowerCase(),
      content: form.value.content,
      excerpt: form.value.excerpt.trim() || form.value.content.substring(0, 200),
      category: form.value.category || '个人文章',
      color: form.value.color || '#FF6B6B',
      published: form.value.published,
      author_id: user.value.id,
    }

    let result

    if (isEditing.value) {
      // 更新文章
      const postId = route.params.id as string
      result = await supabase
        .from('user_posts')
        .update(postData)
        .eq('id', postId)
        .eq('author_id', user.value.id)
        .select()
        .single()
    } else {
      // 创建新文章
      result = await supabase.from('user_posts').insert(postData).select().single()
    }

    if (result.error) throw result.error

    successMessage.value = form.value.published ? '文章发布成功！' : '草稿保存成功！'

    // 2秒后跳转到文章页面
    setTimeout(() => {
      router.push(`/blog/${form.value.slug}`)
    }, 2000)
  } catch (err: any) {
    console.error('保存文章失败:', err)

    if (err.code === '23505') {
      error.value = '文章标识已存在，请使用其他标识'
    } else {
      error.value = '保存文章失败: ' + (err.message || '请稍后重试')
    }
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.post-editor-page {
  min-height: calc(100vh - 200px);
  padding: 3rem 0;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.editor-header h1 {
  margin: 0;
  color: var(--color-text);
  font-size: 2rem;
}

.error-alert,
.success-alert {
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.error-alert {
  background: rgba(255, 71, 87, 0.1);
  color: #ff4757;
  border: 1px solid rgba(255, 71, 87, 0.3);
}

.success-alert {
  background: rgba(46, 213, 115, 0.1);
  color: #2ed573;
  border: 1px solid rgba(46, 213, 115, 0.3);
}

.close-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.close-btn:hover {
  opacity: 1;
}

.editor-form {
  background: var(--color-bg-card);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text);
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: rgba(255, 255, 255, 0.08);
}

.color-input {
  height: 50px;
  padding: 0.25rem;
  cursor: pointer;
}

.form-hint {
  display: block;
  margin-top: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
}

.editor-toolbar {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  flex-wrap: wrap;
}

.editor-toolbar button {
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.3s ease;
}

.editor-toolbar button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-primary);
}

.markdown-editor {
  border-radius: 0 0 8px 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  line-height: 1.6;
}

.preview-container {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 2rem;
  min-height: 200px;
}

.preview-empty {
  text-align: center;
  color: var(--color-text-secondary);
  padding: 3rem 0;
}

.preview-empty i {
  font-size: 3rem;
  opacity: 0.3;
  margin-bottom: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  color: var(--color-text);
}

.checkbox-input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
  }
}
</style>
