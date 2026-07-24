<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const showModal = ref(false)
const mobileMenuOpen = ref(false)
const carouselRef = ref<HTMLElement | null>(null)

let carouselRaf = 0

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  mobileMenuOpen.value = false
}

const toggleModal = () => { showModal.value = !showModal.value; document.body.style.overflow = showModal.value ? 'hidden' : '' }

const features = [
  { icon: 'mdi:earth', title: '智能分流', desc: '内置 GFWList 规则集，数万个被封锁域名开箱即通。' },
  { icon: 'mdi:lightning-bolt', title: 'CF 优选 IP', desc: '自动从 Cloudflare 全球节点池中挑选延迟最低的节点。' },
  { icon: 'mdi:dns', title: 'DNS 上游', desc: '支持配置 DNS 上游服务器，配合域名绕过功能，智能解析 DNS 请求。' },
  { icon: 'mdi:lan', title: 'TUN 模式', desc: '虚拟网卡实现全局流量代理，所有应用无需配置即可使用。' },
  { icon: 'mdi:code-json', title: 'JSON 规则', desc: '支持域名、IP CIDR、策略组，编辑 JSON 即时生效，无需重启。' },
  { icon: 'mdi:certificate', title: '证书管理', desc: '内置 MITM 代理 CA 证书安装向导，一键完成。' },
  { icon: 'mdi:speedometer', title: '延迟测试', desc: '内置节点测速，智能选择最优路径。' },
  { icon: 'mdi:account-group', title: '多平台支持', desc: '支持 Discord、Twitch 和 XChat 等平台的智能分流和代理规则。' },
]

const faqs = [
  {
    q: '为什么要安装根证书？',
    a: 'SniShaper 通过 MITM（中间人代理）技术实现流量拦截和分析，以便对特定域名进行智能分流。MITM 代理需要安装自定义 CA 根证书来解密 HTTPS 流量。安装后，所有由 SniShaper 签发的证书都会被系统信任。'
  },
  {
    q: 'TLS-RF 和 ECH 模式有什么区别？',
    html: true,
    content: '<strong style="color:var(--color-white)">TLS-RF</strong>&nbsp;（TLS 分片）通过将 Client Hello 拆分为多个 TLS 记录分片传输，适用于大多数场景，无需服务器特殊配置。<br/><br/><strong style="color:var(--color-white)">ECH</strong>&nbsp;（加密 Client Hello）将原本明文的 TLS 扩展部分完全加密，安全性更高，但需要目标服务器支持 ECH（如 Cloudflare CDN）。'
  },
  {
    q: '如何选择合适的代理模式？',
    list: [
      { label: 'TLS-RF', desc: '推荐作为默认选项，兼容性好' },
      { label: 'ECH', desc: '最高防护级别，适合 Cloudflare 站点' },
      { label: 'QUIC', desc: '基于 UDP，规避 TCP 特征检测' },
    ]
  },
  {
    q: 'TUN 模式和系统代理有什么区别？',
    a1: '系统代理：只影响支持代理设置的应用程序（如浏览器），需要应用主动使用代理配置。',
    a2: 'TUN 模式：通过虚拟网卡接管全部流量，实现全局代理，无需应用程序额外配置。适合游戏、桌面应用等不支持代理协议的场景。'
  },
  {
    q: 'Cloudflare 优选 IP 是什么原理？',
    a: 'Cloudflare 拥有全球数百万个 IP 节点。通过 API 获取 IP 池后，SniShaper 会自动对每个 IP 进行延迟测试，挑选出延迟最低的节点使用。这可以显著提升访问速度和稳定性。'
  },
  {
    q: 'SniShaper 是否开源免费？',
    a: '是的，SniShaper 采用 MIT 开源许可证，完全免费使用。源代码托管在 GitHub 上，接受社区贡献。你可以自由查看、修改和分发代码。'
  },
]

const changelogs = [
  {
    version: '1.28',
    tag: 'latest',
    title: '原生 TUN & 迁移模式',
    items: [
      '移除 Mihomo 二进制文件并添加原生 TUN 支持',
      '优化 GUI 响应速度并修复部分问题',
      '添加 NAT64 支持（请勿滥用公共服务）',
      '移除服务器中转模式',
      '添加迁移模式',
    ]
  },
  {
    version: '1.26',
    title: 'DNS 上游 & 平台支持增强',
    items: [
      '支持 DNS 上游服务器配置，配合域名绕过功能',
      'QUIC 和 ECH 模式组合使用支持',
      '集成 Meta 平台专属 ECH 支持',
      '界面全面支持英文语言',
      '移除内置 WARP 支持',
      '修复大量已知问题，解决配置不一致',
      '升级部分依赖，降低轮询频率优化性能',
      '规则编辑页面智能显示，根据当前模式只显示相关选项',
      '实现 Discord、Twitch 和 XChat 支持',
    ]
  },
  {
    version: '1.25',
    title: '增加 TUN 模式支持',
    items: ['增加 TUN 模式支持', '增加一批网站适配', '前后端进一步分离']
  },
  {
    version: '1.24',
    title: '暗色模式 UI 修复 & 配置分离',
    items: ['修复暗黑模式 UI 显示问题', '规则配置与用户配置解耦，需重新调整设置', '新增开机自启选项', '修复部分已知问题，提升稳定性']
  },
  {
    version: '1.22',
    title: '实验性 QUIC 直连 & 完整 DoH 支持',
    items: ['增加实验性 QUIC 直连支持，基于 quic-go 自带分片特性', '完整 DoH 解析支持，可指定 IPv4 / IPv6']
  },
  {
    version: '1.21',
    title: '外挂证书验证 & 规则完善',
    items: ['增加外挂证书验证逻辑，提升域前置的安全性', '完善部分规则']
  },
  {
    version: '1.1',
    title: '里程碑版本：最稳定最强大',
    items: [
      '修复 MITM 模式 HTTP 网页问题，增加自动跳转 HTTPS',
      '引入 TLS 分片模式，可实用性用于部分网站',
      '修复 Google 系配置，同时支持 Google、YouTube 和 Gemini',
      '引入 WARP 作为可选分流，部分网站如 ChatGPT 恢复访问',
      'ECH 逻辑与 Cloudflare 解耦，后续可接入其他网站 ECH 支持',
      '优化部分页面 UI 显示',
    ]
  },
  {
    version: '1.0',
    title: '首个正式版本',
    items: ['实现 Cloudflare ECH、并行拨号、ECDSA 证书及 UI']
  },
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).classList.add('snip-section-visible')
      }
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.snip-section').forEach(el => observer.observe(el))

  const carousel = carouselRef.value
  if (carousel) {
    const BASE_SPEED = 0.65
    let speed = 0, direction = 1, paused = false
    const tick = () => {
      if (!paused) {
        speed += (BASE_SPEED - speed) * 0.08
        carousel.scrollLeft += speed * direction
        const max = carousel.scrollWidth - carousel.clientWidth
        if (direction === 1 && carousel.scrollLeft >= max) { direction = -1; carousel.scrollLeft = max }
        else if (direction === -1 && carousel.scrollLeft <= 0) { direction = 1; carousel.scrollLeft = 0 }
      }
      carouselRaf = requestAnimationFrame(tick)
    }
    const onEnter = () => { paused = true; speed = 0 }
    const onLeave = () => { paused = false }
    carousel.addEventListener('mouseenter', onEnter)
    carousel.addEventListener('mouseleave', onLeave)
    carousel.style.scrollSnapType = 'none'
    carousel.style.overflowX = 'hidden'
    carouselRaf = requestAnimationFrame(tick)
  }
})

onUnmounted(() => {
  if (carouselRaf) cancelAnimationFrame(carouselRaf)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="snishaper-page">
    <section class="page-head snip-section">
      <div class="flex items-center gap-8 mb-20">
        <span class="pulse-dot"></span>
        <span class="text-faint" style="font-size:var(--font-size-xs);">v1.28 Windows 原生应用</span>
      </div>
      <div style="display:flex;align-items:flex-start;gap:60px;flex-wrap:wrap;">
        <div style="flex:1;min-width:300px;">
          <h1 style="font-size:var(--font-size-2xl);line-height:1.15;margin-bottom:20px;">
            <span class="snip-gradient">SniShaper</span>
            <br>专为复杂网络环境设计
          </h1>
          <p class="subtitle" style="font-size:var(--font-size-base);margin-bottom:32px;">
            TLS 分片、QUIC 重建、ECH 注入 — 让你的流量在封锁网络中持续可用。
          </p>
          <div class="flex gap-12 flex-wrap">
            <button class="btn-geek" @click="toggleModal">
              <Icon icon="mdi:download" width="16" /> 立即下载
            </button>
            <button class="btn-geek" @click="scrollTo('tech')">
              <Icon icon="mdi:chip" width="16" /> 了解技术原理
            </button>
          </div>
        </div>
        <div class="term-block" style="flex:1;min-width:280px;max-width:420px;">
          <div class="term-bar">
            <span class="term-dot"></span>
            <span class="term-dot"></span>
            <span class="term-dot"></span>
            <span style="margin-left:8px;opacity:0.5;">snishaper status</span>
          </div>
          <div class="term-body" style="font-size:12px;">
            <div class="term-line">snishaper --status</div>
            <div class="term-line-out"><span class="pulse-dot"></span> 代理状态：运行中</div>
            <div class="term-line-out" style="display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;margin-top:8px;">
              <span>上行: <span style="color:var(--color-white);">1.2 MB/s</span></span>
              <span>下行: <span style="color:var(--color-white);">4.7 MB/s</span></span>
              <span>模式: <span style="color:var(--color-white);">TLS-RF</span></span>
              <span>GUI: <span style="color:var(--color-white);">v1.28</span></span>
            </div>
            <div class="term-line" style="margin-top:8px;">exit 0</div>
            <span class="term-cursor-block"></span>
          </div>
        </div>
      </div>
    </section>

    <div class="divider-geek mb-60">
      <span>// snishaper</span>
    </div>

    <nav class="snip-subnav mb-60 snip-section">
      <span v-for="item in ['features','tech','faq','quickstart','changelog','download']" :key="item"
        class="tag-pill" style="cursor:pointer;text-transform:none;"
        @click="scrollTo(item)">{{ item === 'quickstart' ? '快速上手' : item === 'changelog' ? '更新日志' : { features: '功能特性', tech: '核心技术', faq: '常见问题', download: '下载' }[item] || item }}</span>
    </nav>

    <section id="features" class="snip-section mb-60">
      <h2 class="section-title-term">// advantages</h2>
      <div class="grid-3">
        <div class="card-geek">
          <Icon icon="mdi:cloud-off-outline" width="24" style="color:var(--color-white);margin-bottom:12px;" />
          <h3 style="font-size:var(--font-size-base);font-weight:400;color:var(--color-white);margin-bottom:8px;">无需外部代理节点</h3>
          <p class="text-dim">直接利用 Cloudflare 全球 CDN 网络作为出口，无节点订阅费用，无中转服务器运维负担。</p>
        </div>
        <div class="card-geek">
          <Icon icon="mdi:swap-horizontal-bold" width="24" style="color:var(--color-white);margin-bottom:12px;" />
          <h3 style="font-size:var(--font-size-base);font-weight:400;color:var(--color-white);margin-bottom:8px;">多协议协同，覆盖面广</h3>
          <p class="text-dim">TLS-RF、ECH、QUIC 多种模式灵活切换，绑定不同策略应对不同封锁场景，兼容性极强。</p>
        </div>
        <div class="card-geek">
          <Icon icon="mdi:monitor-dashboard" width="24" style="color:var(--color-white);margin-bottom:12px;" />
          <h3 style="font-size:var(--font-size-base);font-weight:400;color:var(--color-white);margin-bottom:8px;">原生图形界面，真正易用</h3>
          <p class="text-dim">基于 Wails + React 构建的原生 Windows 应用，视觉清晰，操作直观，不再需要编辑配置文件。</p>
        </div>
      </div>
    </section>

    <section id="tech" class="snip-section mb-60">
      <h2 class="section-title-term">// core technology</h2>
      <div class="grid-3 mb-40">
        <div class="card-geek">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
            <span class="badge-geek">TLS-RF</span>
            <span style="font-size:var(--font-size-xs);color:var(--color-white);">客户端实现</span>
          </div>
          <p class="text-dim" style="font-size:var(--font-size-sm);">TLS 分片技术将 Client Hello 拆分为多个 TLS 记录分片传输。DPI 设备通常只检查第一个分片，真实 SNI 得以隐藏。</p>
        </div>
        <div class="card-geek">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
            <span class="badge-geek">QUIC</span>
            <span style="font-size:var(--font-size-xs);color:var(--color-white);">基于 quic-go</span>
          </div>
          <p class="text-dim" style="font-size:var(--font-size-sm);">基于 UDP 的 QUIC 协议天然规避 TCP 特征检测。在本地重建 QUIC 连接，将真实流量封装其中。</p>
        </div>
        <div class="card-geek">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
            <span class="badge-geek">ECH</span>
            <span style="font-size:var(--font-size-xs);color:var(--color-white);">TLS 1.3 标准</span>
          </div>
          <p class="text-dim" style="font-size:var(--font-size-sm);">加密 Client Hello 将原本明文的部分加密，连 TLS 握手的第一步都无法被窥探。兼容 Cloudflare 等主流 ECH 基础设施。</p>
        </div>
      </div>
      <div class="card-geek" style="border-color:rgba(255,255,255,0.12);">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <Icon icon="mdi:swap-horizontal-circle" width="20" style="color:var(--color-white);" />
          <span style="font-weight:500;">迁移模式</span>
          <span class="text-dim" style="font-size:var(--font-size-xs);">多种技术组合使用，最大化封锁环境下的可用性。</span>
        </div>
      </div>
    </section>

    <section id="features-carousel" class="snip-section mb-60">
      <h2 class="section-title-term">// features</h2>
      <div ref="carouselRef" class="snip-carousel" style="display:flex;gap:16px;padding-bottom:8px;">
        <div v-for="(f, i) in features" :key="i" class="card-geek" style="min-width:260px;flex-shrink:0;">
          <Icon :icon="f.icon" width="20" style="color:var(--color-white);margin-bottom:12px;" />
          <h3 style="font-size:var(--font-size-base);font-weight:400;color:var(--color-white);margin-bottom:8px;">{{ f.title }}</h3>
          <p class="text-dim" style="font-size:var(--font-size-sm);">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <section id="faq" class="snip-section mb-60">
      <h2 class="section-title-term">// faq</h2>
      <div style="max-width:800px;">
        <div v-for="(faq, i) in faqs" :key="i" class="card-geek" style="margin-bottom:12px;padding:0;">
          <details class="snip-faq-details" style="padding:20px 24px;">
            <summary style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;list-style:none;font-weight:500;">
              <span>{{ faq.q }}</span>
              <Icon icon="mdi:chevron-down" width="18" style="transition:transform 0.3s;color:var(--color-white);" class="snip-faq-chevron" />
            </summary>
            <div style="margin-top:16px;font-size:var(--font-size-sm);color:var(--color-white);line-height:1.8;border-top:1px solid var(--color-border);padding-top:16px;">
              <template v-if="faq.html">
                <span v-html="faq.content"></span>
              </template>
              <template v-else-if="faq.list">
                <ul style="list-style:none;padding:0;">
                  <li v-for="(item, j) in faq.list" :key="j" style="padding:6px 0;">
                    <strong style="color:var(--color-white);">{{ item.label }}</strong>: {{ item.desc }}
                  </li>
                </ul>
              </template>
              <template v-else-if="faq.a1">
                <strong style="color:var(--color-white);">系统代理</strong>: {{ faq.a1 }}<br><br>
                <strong style="color:var(--color-white);">TUN</strong>: {{ faq.a2 }}
              </template>
              <template v-else>
                {{ faq.a }}
              </template>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="quickstart" class="snip-section mb-60">
      <h2 class="section-title-term">// quickstart</h2>
      <div class="grid-3 mb-40">
        <div class="card-geek snip-step-card">
          <div class="snip-step-num">1</div>
          <h3 style="font-size:var(--font-size-base);font-weight:400;color:var(--color-white);margin-bottom:8px;">下载安装</h3>
          <p class="text-dim" style="font-size:var(--font-size-sm);margin-bottom:12px;">从网站下载最新版本的 SniShaper，解压后双击运行 snishaper.exe。</p>
          <div style="padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:2px;font-size:11px;color:var(--color-white);font-family:var(--font-mono);">Windows 10/11 x64</div>
        </div>
        <div class="card-geek snip-step-card">
          <div class="snip-step-num">2</div>
          <h3 style="font-size:var(--font-size-base);font-weight:400;color:var(--color-white);margin-bottom:8px;">安装证书</h3>
          <p class="text-dim" style="font-size:var(--font-size-sm);margin-bottom:12px;">首次运行后，进入证书管理页面，点击「安装根证书」，按系统提示完成安装。</p>
          <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--color-white);"><span style="width:6px;height:6px;border-radius:50%;background:var(--color-green);"></span>Windows 安全提示确认</div>
        </div>
        <div class="card-geek snip-step-card">
          <div class="snip-step-num">3</div>
          <h3 style="font-size:var(--font-size-base);font-weight:400;color:var(--color-white);margin-bottom:8px;">启动代理</h3>
          <p class="text-dim" style="font-size:var(--font-size-sm);margin-bottom:12px;">选择合适的代理模式，点击「开启代理」。可选择开启系统代理或 TUN 模式。</p>
          <div style="display:flex;gap:6px;">
            <span class="badge-geek">TLS-RF</span>
            <span class="badge-geek">ECH</span>
            <span class="badge-geek">QUIC</span>
          </div>
        </div>
      </div>
      <div class="card-geek">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
          <Icon icon="mdi:lightbulb-outline" width="18" style="color:var(--color-white);" />
          <span style="font-weight:500;">小贴士</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:var(--font-size-sm);color:var(--color-white);">
          <div v-for="(tip, i) in ['首次使用建议选择 TLS-RF 模式，兼容性最好','开启系统代理后浏览器即可使用，无需单独配置','游戏或桌面应用建议开启 TUN 模式实现全局代理','勾选开机自启和最小化到托盘获得最佳体验']" :key="i" style="display:flex;align-items:flex-start;gap:8px;">
            <span style="color:var(--color-white);">-</span>
            <span>{{ tip }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="snip-section mb-60">
      <h2 class="section-title-term">// stack</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;">
        <div>
          <p class="text-dim" style="margin-bottom:24px;">Wails v3 带来原生 Windows 桌面体验。Go 后端处理核心逻辑 — TLS 混淆、QUIC 重建、规则匹配。React/TypeScript 前端提供响应式图形界面。</p>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div v-for="item in [{label:'Go',text:'高性能代理核心'},{label:'React',text:'TypeScript + Vite 构建 UI'},{label:'Wails',text:'原生 Windows 桌面应用'},{label:'MIT',text:'开源免费'}]" :key="item.label" style="display:flex;align-items:center;gap:12px;">
              <div style="width:32px;height:32px;background:rgba(255,255,255,0.06);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--color-white);">{{ item.label }}</div>
              <span style="font-size:var(--font-size-sm);">{{ item.text }}</span>
            </div>
          </div>
        </div>
        <div class="term-block">
          <div class="term-body" style="font-size:11px;">
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;">
              <span style="color:var(--color-white);width:80px;">本地应用</span>
              <span style="flex:1;border-top:1px dashed var(--color-border);"></span>
              <span class="badge-geek" style="border-color:rgba(255,255,255,0.15);">客户端</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;">
              <span style="color:var(--color-white);width:80px;">SniShaper</span>
              <span style="padding:4px 10px;background:rgba(255,255,255,0.05);border-radius:2px;">TLS-RF / ECH / QUIC</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;">
              <span style="color:var(--color-white);width:80px;"></span>
              <span style="flex:1;border-top:1px dashed var(--color-border);"></span>
              <span class="badge-geek">Cloudflare / VPS</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;">
              <span style="color:var(--color-white);width:80px;">目标网站</span>
              <span style="flex:1;border-top:1px dashed var(--color-border);"></span>
              <span class="badge-geek" style="border-color:rgba(120,220,160,0.2);color:var(--color-green);">畅通</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="changelog" class="snip-section mb-60">
      <h2 class="section-title-term">// changelog</h2>
      <div style="max-width:700px;">
        <div v-for="(cl, i) in changelogs" :key="i" class="snip-cl-item" :class="{ 'snip-cl-latest': i === 0 }">
          <div class="snip-cl-dot"></div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
              <span class="badge-geek" :class="{ 'badge-geek-latest': i === 0 }">v{{ cl.version }}</span>
              <span v-if="cl.tag" style="font-size:11px;color:var(--color-white);">最新发行版</span>
            </div>
            <h3 style="font-size:var(--font-size-base);font-weight:400;color:var(--color-white);margin-bottom:8px;">{{ cl.title }}</h3>
            <ul style="list-style:none;padding:0;font-size:var(--font-size-sm);color:var(--color-white);">
              <li v-for="(item, j) in cl.items" :key="j" style="display:flex;align-items:flex-start;gap:8px;padding:3px 0;">
                <span style="color:var(--color-white);">-</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="text-dim" style="font-size:var(--font-size-xs);text-align:center;margin-top:24px;">更多版本见 <a href="https://github.com/SniShaper/SniShaper/releases" target="_blank" style="color:var(--color-white);">GitHub Releases</a></div>
      </div>
    </section>

    <section id="download" class="snip-section mb-60" style="text-align:center;">
      <div class="card-geek" style="max-width:600px;margin:0 auto;">
        <h2 style="font-size:var(--font-size-xl);font-weight:400;margin-bottom:16px;">准备掌控流量了吗？</h2>
        <p class="text-dim" style="margin-bottom:24px;">下载 SniShaper Windows 版本。开源免费，无需注册。</p>
        <button class="btn-geek" style="font-size:var(--font-size-base);padding:12px 32px;" @click="toggleModal">
          <Icon icon="mdi:download" width="18" /> 下载 Windows x64 (v1.28)
        </button>
        <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-top:16px;font-size:var(--font-size-xs);color:var(--color-white);">
          <span style="display:flex;align-items:center;gap:6px;"><span style="width:6px;height:6px;border-radius:50%;background:var(--color-green);"></span>Windows 10/11</span>
          <span>|</span>
          <span>图形界面</span>
          <span>|</span>
          <span>开源项目</span>
        </div>
      </div>
    </section>

    <div v-if="showModal" class="snip-modal-overlay" @click.self="toggleModal">
      <div class="card-geek snip-modal-content">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
          <h3 style="font-size:var(--font-size-lg);font-weight:400;">选择下载方式</h3>
          <button class="btn-geek" style="padding:4px 12px;" @click="toggleModal"><Icon icon="mdi:close" width="16" /></button>
        </div>
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div class="card-geek" style="padding:20px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
              <Icon icon="mdi:microsoft-windows" width="24" style="color:var(--color-white);" />
              <span style="font-size:var(--font-size-base);font-weight:500;">安装程序 (exe)</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;font-size:var(--font-size-sm);">
              <a href="https://github.com/SniShaper/SniShaper/releases/download/v1.28/Snishaper-1.28-x64Setup.exe" target="_blank" class="btn-geek" style="justify-content:center;">
                <Icon icon="mdi:github" width="16" /> GitHub 原链下载
              </a>
              <a href="https://v6.gh-proxy.org/https://github.com/SniShaper/SniShaper/releases/download/v1.28/Snishaper-1.28-x64Setup.exe" target="_blank" class="btn-geek" style="justify-content:center;">
                <Icon icon="mdi:flash" width="16" /> 加速站下载
              </a>
            </div>
          </div>
          <div class="card-geek" style="padding:20px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
              <Icon icon="mdi:archive" width="24" style="color:var(--color-white);" />
              <span style="font-size:var(--font-size-base);font-weight:500;">便携版 (7z)</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;font-size:var(--font-size-sm);">
              <a href="https://github.com/SniShaper/SniShaper/releases/download/v1.28/SniShaper-x64.7z" target="_blank" class="btn-geek" style="justify-content:center;">
                <Icon icon="mdi:github" width="16" /> GitHub 原链下载
              </a>
              <a href="https://v6.gh-proxy.org/https://github.com/SniShaper/SniShaper/releases/download/v1.28/SniShaper-x64.7z" target="_blank" class="btn-geek" style="justify-content:center;">
                <Icon icon="mdi:flash" width="16" /> 加速站下载
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.snishaper-page,
.snishaper-page * {
  color: var(--color-white) !important;
  font-family: 'Microsoft YaHei', '微软雅黑', sans-serif !important;
}

.snip-gradient {
  color: var(--color-white);
}

.snip-section {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
}
.snip-section-visible {
  opacity: 1;
  transform: translateY(0);
}

.snip-subnav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.snip-carousel {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.snip-carousel::-webkit-scrollbar { height: 3px; }
.snip-carousel::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

.snip-faq-details[open] .snip-faq-chevron {
  transform: rotate(180deg);
}

.snip-cl-item {
  position: relative;
  padding-left: 28px;
  padding-bottom: 28px;
  border-left: 2px solid var(--color-border);
}
.snip-cl-dot {
  position: absolute;
  left: -6px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border);
}
.badge-geek-latest {
  border-color: rgba(255,255,255,0.25) !important;
  color: var(--color-white) !important;
}

.snip-step-card {
  display: flex;
  flex-direction: column;
}
.snip-step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border-hover);
  border-radius: 50%;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}

.snip-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.snip-modal-content {
  max-width: 480px;
  width: 100%;
  padding: 32px;
}

@media (max-width: 768px) {
  .snip-subnav { gap: 4px; }
}
</style>
