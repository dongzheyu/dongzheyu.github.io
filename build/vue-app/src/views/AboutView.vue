<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useTypewriter } from '@/composables/useTypewriter'
import { useStaggeredFade } from '@/composables/useStaggeredFade'

const { display, cursor, done } = useTypewriter('关于这个组织。', 55)

const members = [
  { name: 'JetCPP 团队', role: '系统软件 / 工具链', icon: 'mdi:code-braces' },
  { name: '开源社区', role: '工程共同体', icon: 'mdi:account-group-outline' },
]
const { visible: memVisible } = useStaggeredFade(members.length, 120)

const skills = ['C++', 'Rust', 'Vue 3', 'TypeScript', 'WinUI 3', 'Supabase', 'Vite', 'Git']
const { visible: skVisible } = useStaggeredFade(skills.length, 70)

const values = [
  { title: '开源优先', desc: '所有工具公开。复刻、改进、分享。' },
  { title: '性能至上', desc: '每个时钟周期都有价值。我们交付精简代码。' },
  { title: '公开学习', desc: '记录失败比修饰沉默更有价值。' },
]
const { visible: valVisible } = useStaggeredFade(values.length, 100)
</script>

<template>
  <div>
    <section class="page-head">
      <h1>
        <span>$ whoami  # 查看身份</span><br>
        <span class="typewriter" style="font-size:var(--font-size-lg);">{{ display }}</span>
        <span class="typewriter-cursor" :class="{ done }"></span>
      </h1>
      <p class="subtitle" style="transform:translateX(40px);">一个小团队，构建系统软件、开发者工具和创意工程项目。</p>
    </section>

    <section class="mb-60">
      <h2 class="section-title">// 成员</h2>
      <div class="grid-2">
        <div
          v-for="(m, i) in members" :key="m.name"
          class="card-geek stagger-item" :class="{ visible: memVisible[i] }"
        >
          <Icon :icon="m.icon" width="24" style="color:rgba(255,255,255,0.45); margin-bottom:12px;" />
          <div style="font-size:var(--font-size-base); color:rgba(255,255,255,0.82);">{{ m.name }}</div>
          <span class="text-dim" style="font-size:var(--font-size-xs);">{{ m.role }}</span>
        </div>
      </div>
    </section>

    <section class="mb-60">
      <h2 class="section-title">// 理念</h2>
      <div class="flex flex-col gap-24" style="padding-left:40px;">
        <p v-for="(v, i) in values" :key="v.title"
          class="stagger-item" :class="{ visible: valVisible[i] }"
        >
          <span style="color:rgba(255,255,255,0.82);">{{ v.title }}</span><br>
          <span class="text-dim">{{ v.desc }}</span>
        </p>
      </div>
    </section>

    <section class="mb-60">
      <h2 class="section-title">// 技能</h2>
      <div class="flex gap-12 flex-wrap" style="padding-left:40px;">
        <span v-for="(s, i) in skills" :key="s"
          class="tag-pill stagger-item" :class="{ visible: skVisible[i] }"
        >{{ s }}</span>
      </div>
    </section>

    <section class="mb-60">
      <h2 class="section-title">// 联系</h2>
      <div class="flex flex-col gap-12 text-dim" style="padding-left:40px;">
        <span>email: <a href="mailto:dongzheyu@outlook.com" style="color:rgba(255,255,255,0.82);">dongzheyu@outlook.com</a></span>
        <span>github: <a href="https://github.com/dongzheyu" target="_blank" style="color:rgba(255,255,255,0.82);">github.com/dongzheyu</a></span>
        <span>bilibili: <a href="https://space.bilibili.com/3546730880567808" target="_blank" style="color:rgba(255,255,255,0.82);">JetCPP</a></span>
      </div>
    </section>

    <section class="mb-60">
      <span class="text-faint">// ctrl+c 退出</span>
    </section>
  </div>
</template>