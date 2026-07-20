<template>
  <div>
    <section class="page-head">
      <h1>
        <span>$ auth --login</span><br>
        <span class="typewriter" style="font-size:var(--font-size-lg);">{{ display }}</span>
        <span class="typewriter-cursor" :class="{ done }"></span>
      </h1>
    </section>

    <section class="mb-60" style="padding-left:40px; max-width:520px;">
      <AuthForm v-if="!isAuthenticated" />
      <div v-else class="term-block">
        <div class="term-bar">
          <span class="term-dot"></span>
          <span class="term-dot"></span>
          <span class="term-dot"></span>
          <span style="margin-left:8px; opacity:0.5;">session.sh</span>
        </div>
        <div class="term-body">
          <div class="term-line">whoami</div>
          <div class="term-line-out" style="margin-top:8px;">{{ user?.email }}</div>
          <div class="term-line-out" style="margin-top:12px;">
            <span class="pulse-dot"></span> authenticated
          </div>
          <div style="margin-top:16px;">
            <div class="term-line-out">uid: <span style="color:var(--color-white);">{{ user?.id }}</span></div>
            <div class="term-line-out">since: <span style="color:var(--color-white);">{{ formatDate(user?.created_at) }}</span></div>
          </div>
          <div class="flex gap-12 mt-20">
            <button @click="handleSignOut" class="btn-geek" style="font-size:var(--font-size-xs);">
              <Icon icon="mdi:logout" width="14" /> 退出登录
            </button>
          </div>
          <div class="term-line" style="margin-top:16px;">exit 0</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useTypewriter } from '@/composables/useTypewriter'
import AuthForm from '@/components/AuthForm.vue'
import { useAuth } from '@/composables/useAuth'

const { display, cursor, done } = useTypewriter('JetCPP 统一认证', 55)
const { user, isAuthenticated, signOut } = useAuth()

const handleSignOut = async () => {
  try { await signOut() } catch (_) {}
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleString('zh-CN')
}
</script>

<style scoped>
:deep(.auth-container) { padding: 0; }
:deep(.cp-card) {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0;
  overflow: hidden;
}
:deep(.cp-card__inner) { padding: 32px; }
:deep(.auth-title) {
  font-family: var(--font-mono);
  font-size: var(--font-size-base);
  font-weight: 400;
  color: var(--color-white);
  text-align: left;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}
:deep(.form-input) {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  padding: 8px 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-white);
  width: 100%;
}
:deep(.form-input:focus) {
  outline: none;
  border-color: rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.06);
}
:deep(.form-group label) {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-dim);
  font-weight: 400;
}
:deep(.btn-primary) {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--color-white);
  background: rgba(255,255,255,0.08);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  padding: 8px 24px;
  transition: all 0.25s var(--ease-out-expo);
  width: 100%;
}
:deep(.btn-primary:hover:not(:disabled)) {
  background: rgba(255,255,255,0.14);
  border-color: rgba(255,255,255,0.18);
}
:deep(.btn-primary:disabled) { opacity: 0.4; cursor: not-allowed; }
:deep(.error-message) {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: #ff5f57;
  padding: 8px 12px;
  border: 1px solid rgba(255,95,87,0.2);
  border-radius: var(--radius-sm);
  margin-top: 12px;
}
:deep(.success-message) {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--color-green);
  padding: 8px 12px;
  border: 1px solid rgba(120,220,160,0.2);
  border-radius: var(--radius-sm);
  margin-top: 12px;
}
:deep(.auth-switch),
:deep(.forgot-password-link),
:deep(.switch-btn),
:deep(.link-btn) {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-dim);
}
:deep(.switch-btn),
:deep(.link-btn) {
  color: var(--color-white);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
}
:deep(.social-btn) {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-dim);
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
}
:deep(.social-btn:hover:not(:disabled)) {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.18);
  color: var(--color-white);
}
:deep(.data-consent-info),
:deep(.terms-consent) {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-dim);
}
:deep(.data-consent-info a),
:deep(.consent-label a) {
  color: var(--color-white);
}
:deep(.divider) {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-dim);
  display: flex;
  align-items: center;
  gap: 12px;
}
:deep(.divider::before),
:deep(.divider::after) {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-border);
}
:deep(.divider span) { padding: 0; }
:deep(.password-toggle) { color: var(--color-text-faint); }
</style>
