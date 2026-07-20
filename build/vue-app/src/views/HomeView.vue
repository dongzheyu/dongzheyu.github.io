<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useTypewriter } from '@/composables/useTypewriter'
import { useParallaxTilt } from '@/composables/useParallaxTilt'
import { useStaggeredFade } from '@/composables/useStaggeredFade'

const { display, cursor, done } = useTypewriter('代码重塑世界。', 55)

const cardA = ref<HTMLElement | null>(null)
const cardB = ref<HTMLElement | null>(null)
const cardC = ref<HTMLElement | null>(null)
const { transform: ta, onMove: ma, onLeave: la } = useParallaxTilt(cardA, 10)
const { transform: tb, onMove: mb, onLeave: lb } = useParallaxTilt(cardB, 7)
const { transform: tc, onMove: mc, onLeave: lc } = useParallaxTilt(cardC, 7)

const features = [
  { icon: 'mdi:code-brackets', title: '系统编程', text: '底层 C++、Rust 与 WASM 工具链。' },
  { icon: 'mdi:lan-connect', title: '网络协议', text: '自定义协议设计、Socket 框架。' },
  { icon: 'mdi:cube-outline', title: '桌面应用', text: 'WinUI 3、Qt、跨平台开发。' },
  { icon: 'mdi:chart-line', title: '极致性能', text: '性能分析、SIMD、缓存优化。' },
]
const { visible: featVisible } = useStaggeredFade(features.length, 100)

const tags = ['C++', 'Rust', 'Vue 3', 'TypeScript', 'WebAssembly', '开源']
const { visible: tagVisible } = useStaggeredFade(tags.length, 80)

// GitHub 统计数据
const uptime = ref(0)
const stars = ref(0)
const repoCount = ref(0)
const langCount = ref(0)
const topLang = ref('--')
const recentCommits = ref(0)
const activeRepos = ref<string[]>([])
const forks = ref(0)

onMounted(async () => {
  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch('https://api.github.com/users/dongzheyu'),
      fetch('https://api.github.com/users/dongzheyu/repos?per_page=100&sort=updated'),
      fetch('https://api.github.com/users/dongzheyu/events?per_page=60'),
    ])
    const user = await userRes.json()
    const repos = await reposRes.json()
    const events = await eventsRes.json()

    const created = new Date(user.created_at)
    uptime.value = Math.floor((Date.now() - created.getTime()) / 86400000)
    repoCount.value = user.public_repos
    stars.value = repos.reduce((sum: number, r: any) => sum + r.stargazers_count, 0)
    forks.value = repos.reduce((sum: number, r: any) => sum + r.forks_count, 0)

    const langs = new Set(repos.filter((r: any) => r.language).map((r: any) => r.language))
    langCount.value = langs.size

    const langCounts: Record<string, number> = {}
    repos.filter((r: any) => r.language).forEach((r: any) => {
      langCounts[r.language] = (langCounts[r.language] || 0) + 1
    })
    topLang.value = Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '--'

    // 贡献详情: 从 PushEvent 统计近期提交
    const repoSet = new Set<string>()
    let commitCount = 0
    events.forEach((e: any) => {
      if (e.type === 'PushEvent') {
        commitCount += e.payload?.size || 0
        const name = e.repo?.name?.replace('dongzheyu/', '') || ''
        if (name && repoSet.size < 5) repoSet.add(name)
      }
    })
    recentCommits.value = commitCount
    activeRepos.value = [...repoSet].slice(0, 5)
  } catch (_) {}
})
</script>

<template>
  <div>
    <section class="page-head flex" style="align-items: flex-start;">
      <div style="flex:1">
        <h1>
          <span class="typewriter">{{ display }}</span>
          <span class="typewriter-cursor" :class="{ done }"></span>
        </h1>
        <p class="subtitle" style="transform: translateX(28px);">
          // JetCPP &mdash; 系统软件、工具链与创意工程<br>
          // since 2021. 构建可编译的一切。
        </p>
        <div class="flex gap-12 mt-40">
          <RouterLink to="/projects" class="btn-geek">[ 查看项目 ]</RouterLink>
          <a href="https://github.com/dongzheyu" target="_blank" class="btn-geek">
            <Icon icon="mdi:github" width="16" /> Github
          </a>
        </div>
      </div>
      <div class="undraw-placeholder" style="margin-left:auto; transform: translateY(-8px);">
        <svg viewBox="0 0 400 200" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.2">
          <rect x="40" y="100" width="80" height="80" rx="4" stroke-dasharray="6 4"/>
          <circle cx="280" cy="90" r="50" stroke-dasharray="6 4"/>
          <path d="M180 40 L220 40 L220 80 L260 80 L260 120 L220 120 L220 160 L180 160 Z" stroke-dasharray="6 4"/>
          <line x1="60" y1="40" x2="160" y2="40"/>
          <line x1="100" y1="20" x2="140" y2="20"/>
        </svg>
      </div>
    </section>

    <section class="mt-60 mb-60">
      <h2 class="section-title">// 核心能力</h2>
      <div class="grid-2" style="padding-left: 40px;">
        <div
          v-for="(f, i) in features" :key="i"
          class="card-geek stagger-item" :class="{ visible: featVisible[i] }"
          :ref="i === 0 ? cardA : i === 1 ? cardB : i === 2 ? cardC : undefined"
          @mousemove="i === 0 ? ma : i === 1 ? mb : i === 2 ? mc : undefined"
          @mouseleave="i === 0 ? la : i === 1 ? lb : i === 2 ? lc : undefined"
          :style="{ transform: (i === 0 ? ta : i === 1 ? tb : i === 2 ? tc : 'none') }"
        >
          <Icon :icon="f.icon" width="28" style="color:rgba(255,255,255,0.45)" />
          <h3 style="font-size:var(--font-size-base); font-weight:400; margin:16px 0 8px; color:rgba(255,255,255,0.82);">{{ f.title }}</h3>
          <p class="text-dim">{{ f.text }}</p>
        </div>
      </div>
    </section>

    <section class="mb-60">
      <h2 class="section-title">// 技术栈</h2>
      <div class="flex gap-12 flex-wrap" style="padding-left: 40px;">
        <span
          v-for="(t, i) in tags" :key="t"
          class="tag-pill stagger-item" :class="{ visible: tagVisible[i] }"
        >{{ t }}</span>
      </div>
    </section>

    <section class="mb-60" style="padding-left: 40px;">
      <h2 class="section-title">// 会话统计</h2>
      <div class="flex flex-col gap-12 text-dim">
        <span>&gt; 活跃: <span style="color:rgba(255,255,255,0.82)">{{ uptime }} 天</span> | Star: <span style="color:rgba(255,255,255,0.82)">{{ stars }}</span> | Fork: <span style="color:rgba(255,255,255,0.82)">{{ forks }}</span> | 仓库: <span style="color:rgba(255,255,255,0.82)">{{ repoCount }}</span></span>
        <span>&gt; 语言种类: <span style="color:rgba(255,255,255,0.82)">{{ langCount }}</span> | 主力语言: <span style="color:rgba(255,255,255,0.82)">{{ topLang }}</span> | 近期提交: <span style="color:rgba(255,255,255,0.82)">{{ recentCommits }}</span></span>
        <span v-if="activeRepos.length">&gt; 活跃仓库: <span style="color:rgba(255,255,255,0.82)">{{ activeRepos.join(', ') }}</span></span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.undraw-placeholder svg { width: 100%; max-width: 340px; }
@media (max-width: 768px) {
  .undraw-placeholder { display: none; }
}
</style>