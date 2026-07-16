import './index.css';

// ── i18n translations ────────────────────────────────────────────────────────

import zh from './locales/zh.json';
import en from './locales/en.json';

type Translations = Record<string, string>;

// ── Language state ───────────────────────────────────────────────────────────

let currentLang: 'zh' | 'en' = 'zh';
let T: Translations = zh;

function setLang(lang: 'zh' | 'en') {
  currentLang = lang;
  T = lang === 'zh' ? zh : en;
  localStorage.setItem('snishaper-lang', lang);
  renderI18n();
  updateLangToggle();
}

function getLang(): 'zh' | 'en' {
  const stored = localStorage.getItem('snishaper-lang');
  if (stored === 'zh' || stored === 'en') return stored;
  return 'zh';
}

function updateLangToggle() {
  const btn = document.getElementById('lang-toggle-btn');
  if (btn) {
    btn.textContent = currentLang === 'zh' ? 'EN' : '\u4E2D';
    btn.setAttribute('aria-label', currentLang === 'zh' ? 'Switch to English' : '\u5207\u6362\u5230\u4E2D\u6587');
  }
}

function renderI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')!;
    if (T[key] !== undefined) el.textContent = T[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html')!;
    if (T[key] !== undefined) el.innerHTML = T[key];
  });
  document.documentElement.lang = currentLang;
}

// ── App init ─────────────────────────────────────────────────────────────────

export function initApp(): void {
  setLang(getLang());

  const app = document.getElementById('app');
  if (!app) { console.error('App element not found'); return; }

  app.innerHTML = `
    <div class="noise-bg min-h-screen">
      <!-- Navigation -->
      <nav class="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img src="./logo.png" alt="SniShaper" class="w-10 h-10" />
            <span class="text-lg font-semibold tracking-tight">SniShaper</span>
          </div>
          <div class="hidden md:flex items-center gap-8 text-sm text-snip-muted">
            <a href="#features" class="hover:text-snip-orange transition-colors" data-i18n="nav_features">${T.nav_features}</a>
            <a href="#tech" class="hover:text-snip-orange transition-colors" data-i18n="nav_tech">${T.nav_tech}</a>
            <a href="#faq" class="hover:text-snip-orange transition-colors" data-i18n="nav_faq">${T.nav_faq}</a>
            <a href="#download" class="hover:text-snip-orange transition-colors" data-i18n="nav_download">${T.nav_download}</a>
          </div>
          <div class="flex items-center gap-3">
            <button id="lang-toggle-btn" class="px-2 py-1 text-xs font-mono text-snip-muted hover:text-snip-orange border border-snip-gray-light rounded transition-colors">${currentLang === 'zh' ? 'EN' : '\u4E2D'}</button>
            <button id="mobile-menu-btn" class="md:hidden p-2 text-snip-muted hover:text-snip-orange transition-colors">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <!-- Hero -->
      <section class="relative min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12 overflow-hidden">
        <div class="absolute top-32 right-12 w-64 h-64 bg-snip-orange/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-32 left-1/4 w-96 h-96 bg-snip-orange/3 rounded-full blur-3xl"></div>
        <div class="max-w-7xl mx-auto w-full">
          <div class="grid lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-7 space-y-8">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-snip-gray rounded-full text-xs text-snip-muted border border-snip-gray-light">
                <span class="w-2 h-2 bg-snip-orange rounded-full animate-pulse"></span>
                <span class="font-mono" data-i18n="hero_badge">${T.hero_badge}</span>
              </div>
              <h1 class="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
                <span class="block">Sni</span><span class="block text-gradient">Shaper</span>
              </h1>
              <p class="text-lg md:text-xl text-snip-muted max-w-xl leading-relaxed" data-i18n="hero_desc">${T.hero_desc}</p>
              <div class="flex flex-wrap gap-4">
                <a href="#download" class="group relative px-6 py-3 bg-snip-orange text-white font-medium rounded-lg overflow-hidden transition-all hover:scale-105 glow-orange">
                  <span class="relative z-10" data-i18n="hero_btn_download">${T.hero_btn_download}</span>
                </a>
                <a href="#tech" class="hero-secondary-btn px-6 py-3 border border-snip-gray-light rounded-lg text-snip-text hover:border-snip-orange transition-colors" data-i18n="hero_btn_tech">${T.hero_btn_tech}</a>
              </div>
            </div>
            <div class="lg:col-span-5 relative">
              <div class="relative w-full max-w-md ml-auto">
                <div class="code-block overflow-hidden" style="transform: rotate(-1deg)">
                  <div class="flex items-center gap-2 px-4 py-3 bg-snip-gray-light border-b border-snip-gray">
                    <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
                    <span class="ml-4 text-xs text-snip-muted font-mono">SniShaper v1.27</span>
                  </div>
                  <div class="p-4 space-y-3">
                    <div class="flex items-center justify-between px-3 py-2 bg-snip-dark rounded-lg">
                      <span class="text-sm" data-i18n="hero_status">${T.hero_status}</span>
                      <span class="flex items-center gap-2 text-snip-orange">
                        <span class="w-2 h-2 bg-snip-orange rounded-full animate-pulse"></span>
                        <span data-i18n="hero_running">${T.hero_running}</span>
                      </span>
                    </div>
                    <div class="flex gap-2">
                      <div class="flex-1 px-3 py-2 bg-snip-orange/20 border border-snip-orange rounded-lg text-center text-xs">TLS-RF</div>
                      <div class="flex-1 px-3 py-2 bg-snip-dark rounded-lg text-center text-xs text-snip-muted">QUIC</div>
                      <div class="flex-1 px-3 py-2 bg-snip-dark rounded-lg text-center text-xs text-snip-muted">ECH</div>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <div class="px-3 py-2 bg-snip-dark rounded-lg">
                        <div class="text-xs text-snip-muted" data-i18n="hero_upload">${T.hero_upload}</div>
                        <div class="text-sm font-mono text-green-400">\u2191 12.5 MB/s</div>
                      </div>
                      <div class="px-3 py-2 bg-snip-dark rounded-lg">
                        <div class="text-xs text-snip-muted" data-i18n="hero_download">${T.hero_download}</div>
                        <div class="text-sm font-mono text-snip-orange">\u2193 45.2 MB/s</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="absolute -top-4 -right-4 px-3 py-1.5 bg-snip-gray rounded-lg text-xs font-mono border border-snip-gray-light" style="transform: rotate(6deg)">Wails v3</div>
                <div class="absolute -bottom-2 -left-6 px-3 py-1.5 bg-snip-gray rounded-lg text-xs font-mono border border-snip-gray-light" style="transform: rotate(-8deg)" data-i18n="hero_gui">${T.hero_gui}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Advantages -->
      <section class="relative py-24 px-6 md:px-12 bg-snip-gray">
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-0 left-1/4 w-px h-full bg-snip-orange"></div>
          <div class="absolute top-0 right-1/3 w-px h-full bg-snip-orange"></div>
        </div>
        <div class="max-w-7xl mx-auto relative">
          <div class="grid lg:grid-cols-12 gap-12">
            <div class="lg:col-span-4">
              <h2 class="text-3xl md:text-4xl font-bold mb-4" data-i18n="adv_title">${T.adv_title}</h2>
              <p class="text-snip-muted" data-i18n="adv_subtitle">${T.adv_subtitle}</p>
            </div>
            <div class="lg:col-span-8 space-y-6">
              <div class="asym-card bg-snip-dark p-6 rounded-xl border border-snip-gray-light">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-snip-orange/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-snip-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1" data-i18n="adv1_title">${T.adv1_title}</h3>
                    <p class="text-snip-muted text-sm" data-i18n="adv1_desc">${T.adv1_desc}</p>
                  </div>
                </div>
              </div>
              <div class="asym-card-2 bg-snip-dark p-6 rounded-xl border border-snip-gray-light ml-8">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-snip-orange/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-snip-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1" data-i18n="adv2_title">${T.adv2_title}</h3>
                    <p class="text-snip-muted text-sm" data-i18n="adv2_desc">${T.adv2_desc}</p>
                  </div>
                </div>
              </div>
              <div class="asym-card bg-snip-dark p-6 rounded-xl border border-snip-gray-light">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-snip-orange/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-snip-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1" data-i18n="adv3_title">${T.adv3_title}</h3>
                    <p class="text-snip-muted text-sm" data-i18n="adv3_desc">${T.adv3_desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tech -->
      <section id="tech" class="relative py-24 px-6 md:px-12">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4" data-i18n="tech_title">${T.tech_title}</h2>
            <p class="text-snip-muted max-w-2xl mx-auto" data-i18n="tech_subtitle">${T.tech_subtitle}</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="group relative p-8 bg-snip-gray rounded-2xl border border-snip-gray-light hover:border-snip-orange/50 transition-all hover:-translate-y-1" style="transform: rotate(-0.5deg)">
              <div class="absolute top-4 right-4 text-xs font-mono text-snip-muted">01</div>
              <div class="w-12 h-12 bg-snip-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-snip-orange/20 transition-colors">
                <svg class="w-6 h-6 text-snip-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              </div>
              <h3 class="text-xl font-semibold mb-3" data-i18n="tech1_name">${T.tech1_name}</h3>
              <p class="text-snip-muted text-sm mb-4" data-i18n="tech1_desc">${T.tech1_desc}</p>
              <div class="text-xs text-snip-orange font-mono" data-i18n="tech1_tag">${T.tech1_tag}</div>
            </div>
            <div class="group relative p-8 bg-snip-gray rounded-2xl border border-snip-gray-light hover:border-snip-orange/50 transition-all hover:-translate-y-1 md:translate-y-8" style="transform: rotate(1deg)">
              <div class="absolute top-4 right-4 text-xs font-mono text-snip-muted">02</div>
              <div class="w-12 h-12 bg-snip-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-snip-orange/20 transition-colors">
                <svg class="w-6 h-6 text-snip-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 class="text-xl font-semibold mb-3" data-i18n="tech2_name">${T.tech2_name}</h3>
              <p class="text-snip-muted text-sm mb-4" data-i18n="tech2_desc">${T.tech2_desc}</p>
              <div class="text-xs text-snip-orange font-mono" data-i18n="tech2_tag">${T.tech2_tag}</div>
            </div>
            <div class="group relative p-8 bg-snip-gray rounded-2xl border border-snip-gray-light hover:border-snip-orange/50 transition-all hover:-translate-y-1 md:-translate-y-4" style="transform: rotate(-0.8deg)">
              <div class="absolute top-4 right-4 text-xs font-mono text-snip-muted">03</div>
              <div class="w-12 h-12 bg-snip-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-snip-orange/20 transition-colors">
                <svg class="w-6 h-6 text-snip-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 class="text-xl font-semibold mb-3" data-i18n="tech3_name">${T.tech3_name}</h3>
              <p class="text-snip-muted text-sm mb-4" data-i18n="tech3_desc">${T.tech3_desc}</p>
              <div class="text-xs text-snip-orange font-mono" data-i18n="tech3_tag">${T.tech3_tag}</div>
            </div>
          </div>
          <div class="mt-12 grid md:grid-cols-2 gap-6">
            <div class="p-6 bg-snip-dark rounded-xl border border-snip-gray-light flex items-start gap-4">
              <div class="w-8 h-8 bg-snip-muted/10 rounded-lg flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-snip-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" /></svg>
              </div>
              <div>
                <h4 class="font-medium mb-1" data-i18n="tech_mode1_title">${T.tech_mode1_title}</h4>
                <p class="text-snip-muted text-sm" data-i18n="tech_mode1_desc">${T.tech_mode1_desc}</p>
              </div>
            </div>
            <div class="p-6 bg-snip-dark rounded-xl border border-snip-gray-light flex items-start gap-4">
              <div class="w-8 h-8 bg-snip-muted/10 rounded-lg flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-snip-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <div>
                <h4 class="font-medium mb-1" data-i18n="tech_mode2_title">${T.tech_mode2_title}</h4>
                <p class="text-snip-muted text-sm" data-i18n="tech_mode2_desc">${T.tech_mode2_desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section id="features" class="relative py-24 px-6 md:px-12 bg-snip-gray">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4" data-i18n="feat_title">${T.feat_title}</h2>
            <p class="text-snip-muted max-w-2xl mx-auto" data-i18n="feat_subtitle">${T.feat_subtitle}</p>
          </div>
          <div class="scroll-container pb-4 -mx-6 px-6" id="features-carousel">
            ${[1,2,3,4,5,6,7,8].map(i => `
            <div class="scroll-item w-80 p-6 bg-snip-dark rounded-xl border border-snip-gray-light">
              <div class="w-10 h-10 bg-snip-orange/10 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-snip-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  ${[0,1,2,3,4,5,6,7].includes(i) ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />' : ''}
                  ${i===1?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />':''}
                  ${i===2?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />':''}
                  ${i===4?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />':''}
                  ${i===6?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />':''}
                  ${i===0?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />':''}
                  ${i===3?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />':''}
                  ${i===5?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />':''}
                  ${i===7?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />':''}
                </svg>
              </div>
              <h3 class="font-semibold mb-2" data-i18n="feat${i}_title">${T[`feat${i}_title`]}</h3>
              <p class="text-snip-muted text-sm" data-i18n="feat${i}_desc">${T[`feat${i}_desc`]}</p>
            </div>`).join('')}
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section id="faq" class="relative py-24 px-6 md:px-12">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4" data-i18n="faq_title">${T.faq_title}</h2>
            <p class="text-snip-muted max-w-2xl mx-auto" data-i18n="faq_subtitle">${T.faq_subtitle}</p>
          </div>
          <div class="space-y-4">
            <details class="group bg-snip-dark rounded-xl border border-snip-gray-light overflow-hidden">
              <summary class="flex items-center justify-between p-6 cursor-pointer list-none">
                <span class="font-medium" data-i18n="faq1_q">${T.faq1_q}</span>
                <svg class="w-5 h-5 text-snip-muted transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div class="px-6 pb-6 text-snip-muted text-sm leading-relaxed" data-i18n="faq1_a">${T.faq1_a}</div>
            </details>
            <details class="group bg-snip-dark rounded-xl border border-snip-gray-light overflow-hidden">
              <summary class="flex items-center justify-between p-6 cursor-pointer list-none">
                <span class="font-medium" data-i18n="faq2_q">${T.faq2_q}</span>
                <svg class="w-5 h-5 text-snip-muted transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div class="px-6 pb-6 text-snip-muted text-sm leading-relaxed">
                <strong class="text-snip-text">TLS-RF</strong>&nbsp;<span data-i18n="faq2_a1">${T.faq2_a1}</span><br/><br/>
                <strong class="text-snip-text">ECH</strong>&nbsp;<span data-i18n="faq2_a2">${T.faq2_a2}</span>
              </div>
            </details>
            <details class="group bg-snip-dark rounded-xl border border-snip-gray-light overflow-hidden">
              <summary class="flex items-center justify-between p-6 cursor-pointer list-none">
                <span class="font-medium" data-i18n="faq3_q">${T.faq3_q}</span>
                <svg class="w-5 h-5 text-snip-muted transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div class="px-6 pb-6 text-snip-muted text-sm leading-relaxed">
                <ul class="list-disc list-inside space-y-2">
                  <li><strong class="text-snip-text">TLS-RF</strong>:&nbsp;<span data-i18n="faq3_l1">${T.faq3_l1}</span></li>
                  <li><strong class="text-snip-text">ECH</strong>:&nbsp;<span data-i18n="faq3_l2">${T.faq3_l2}</span></li>
                  <li><strong class="text-snip-text">QUIC</strong>:&nbsp;<span data-i18n="faq3_l3">${T.faq3_l3}</span></li>
                  <li><strong class="text-snip-text">Server</strong>:&nbsp;<span data-i18n="faq3_l4">${T.faq3_l4}</span></li>
                </ul>
              </div>
            </details>
            <details class="group bg-snip-dark rounded-xl border border-snip-gray-light overflow-hidden">
              <summary class="flex items-center justify-between p-6 cursor-pointer list-none">
                <span class="font-medium" data-i18n="faq4_q">${T.faq4_q}</span>
                <svg class="w-5 h-5 text-snip-muted transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div class="px-6 pb-6 text-snip-muted text-sm leading-relaxed">
                <strong class="text-snip-text">${currentLang==='zh'?'\u7CFB\u7EDF\u4EE3\u7406':'System proxy'}</strong>:&nbsp;<span data-i18n="faq4_a1">${T.faq4_a1}</span><br/><br/>
                <strong class="text-snip-text">TUN</strong>:&nbsp;<span data-i18n="faq4_a2">${T.faq4_a2}</span>
              </div>
            </details>
            <details class="group bg-snip-dark rounded-xl border border-snip-gray-light overflow-hidden">
              <summary class="flex items-center justify-between p-6 cursor-pointer list-none">
                <span class="font-medium" data-i18n="faq5_q">${T.faq5_q}</span>
                <svg class="w-5 h-5 text-snip-muted transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div class="px-6 pb-6 text-snip-muted text-sm leading-relaxed" data-i18n="faq5_a">${T.faq5_a}</div>
            </details>
            <details class="group bg-snip-dark rounded-xl border border-snip-gray-light overflow-hidden">
              <summary class="flex items-center justify-between p-6 cursor-pointer list-none">
                <span class="font-medium" data-i18n="faq6_q">${T.faq6_q}</span>
                <svg class="w-5 h-5 text-snip-muted transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div class="px-6 pb-6 text-snip-muted text-sm leading-relaxed" data-i18n="faq6_a">${T.faq6_a}</div>
            </details>
          </div>
        </div>
      </section>

      <!-- Quickstart -->
      <section id="quickstart" class="relative py-24 px-6 md:px-12 bg-snip-gray">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4" data-i18n="qs_title">${T.qs_title}</h2>
            <p class="text-snip-muted max-w-2xl mx-auto" data-i18n="qs_subtitle">${T.qs_subtitle}</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            ${[1,2,3].map(n => `
            <div class="relative p-8 bg-snip-dark rounded-2xl border border-snip-gray-light${n===2?' md:transform md:-translate-y-4':''}">
              <div class="absolute -top-4 left-6 w-10 h-10 bg-snip-orange rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-snip-orange/20">${n}</div>
              <h3 class="text-xl font-bold mb-4 mt-2" data-i18n="qs_step${n}_title">${T[`qs_step${n}_title`]}</h3>
              <p class="text-snip-muted text-sm mb-4" data-i18n="qs_step${n}_desc">${T[`qs_step${n}_desc`]}</p>
              ${n===1?'<div class="p-3 bg-snip-gray rounded-lg font-mono text-xs text-snip-muted" data-i18n="qs_step1_tag">${T.qs_step1_tag}</div>':''}
              ${n===2?'<div class="p-3 bg-snip-gray rounded-lg text-xs space-y-1"><div class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span><span class="text-snip-muted" data-i18n="qs_step2_tip">${T.qs_step2_tip}</span></div></div>':''}
              ${n===3?'<div class="flex gap-2"><span class="px-2 py-1 bg-snip-orange/20 text-snip-orange rounded text-xs">TLS-RF</span><span class="px-2 py-1 bg-snip-gray rounded text-xs text-snip-muted">ECH</span><span class="px-2 py-1 bg-snip-gray rounded text-xs text-snip-muted">QUIC</span></div>':''}
            </div>`).join('')}
          </div>
          <div class="mt-12 p-6 bg-snip-dark rounded-2xl border border-snip-gray-light">
            <h4 class="font-semibold mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-snip-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              <span data-i18n="qs_tips_title">${T.qs_tips_title}</span>
            </h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm text-snip-muted">
              ${[1,2,3,4].map(n => `<div class="flex items-start gap-3"><span class="text-snip-orange mt-1">-</span><span data-i18n="qs_tip${n}">${T[`qs_tip${n}`]}</span></div>`).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- Tech Stack Details -->
      <section class="relative py-24 px-6 md:px-12">
        <div class="max-w-7xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 class="text-4xl font-bold mb-6" data-i18n="stack_title">${T.stack_title}</h2>
              <p class="text-snip-muted mb-8 leading-relaxed" data-i18n="stack_desc">${T.stack_desc}</p>
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-xs font-bold text-blue-400">Go</div>
                  <span class="text-sm" data-i18n="stack_go">${T.stack_go}</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center text-xs font-bold text-cyan-400">React</div>
                  <span class="text-sm" data-i18n="stack_react">${T.stack_react}</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-snip-orange/10 rounded-lg flex items-center justify-center text-xs font-bold text-snip-orange">Wails</div>
                  <span class="text-sm" data-i18n="stack_wails">${T.stack_wails}</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center text-xs font-bold text-green-400">MIT</div>
                  <span class="text-sm" data-i18n="stack_mit">${T.stack_mit}</span>
                </div>
              </div>
            </div>
            <div class="relative">
              <div class="code-block p-6">
                <div class="space-y-6 font-mono text-sm">
                  <div class="flex items-center gap-4">
                    <div class="w-24 text-snip-muted" data-i18n="arch_local">${T.arch_local}</div>
                    <div class="flex-1 border-t border-dashed border-snip-gray-light"></div>
                    <div class="px-3 py-1 bg-snip-orange/20 text-snip-orange rounded text-xs" data-i18n="arch_client">${T.arch_client}</div>
                  </div>
                  <div class="flex items-center gap-4"><div class="w-24"></div><div class="flex-1 border-t border-dashed border-snip-muted/30"></div></div>
                  <div class="flex items-center gap-4"><div class="w-24 text-snip-muted">SniShaper</div><div class="px-3 py-1 bg-snip-gray-light rounded text-xs">TLS-RF / ECH / QUIC</div></div>
                  <div class="flex items-center gap-4"><div class="w-24"></div><div class="flex-1 border-t border-dashed border-snip-muted/30"></div></div>
                  <div class="flex items-center gap-4"><div class="w-24"></div><div class="px-3 py-1 bg-snip-gray-light rounded text-xs" data-i18n="arch_server">${T.arch_server}</div></div>
                  <div class="flex items-center gap-4"><div class="w-24"></div><div class="flex-1 border-t border-dashed border-snip-muted/30"></div></div>
                  <div class="flex items-center gap-4">
                    <div class="w-24 text-snip-muted" data-i18n="arch_target">${T.arch_target}</div>
                    <div class="flex-1 border-t border-dashed border-snip-gray-light"></div>
                    <div class="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs" data-i18n="arch_success">${T.arch_success}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Changelog -->
      <section id="changelog" class="relative py-24 px-6 md:px-12">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4" data-i18n="cl_title">${T.cl_title}</h2>
            <p class="text-snip-muted max-w-2xl mx-auto" data-i18n="cl_subtitle">${T.cl_subtitle}</p>
          </div>
          <div class="space-y-8">
            <div class="relative pl-8 border-l-2 border-snip-orange/30">
              <div class="absolute -left-2 top-0 w-4 h-4 bg-snip-orange rounded-full"></div>
              <div class="space-y-3">
                <div class="flex items-center gap-3 flex-wrap">
                  <span class="px-3 py-1 bg-snip-orange text-white rounded-full text-sm font-bold">v1.27</span>
                  <span class="px-2 py-0.5 bg-snip-orange/20 text-snip-orange rounded text-xs font-medium" data-i18n="cl_latest">${T.cl_latest}</span>
                </div>
                <h3 class="text-lg font-bold" data-i18n="cl127_title">${T.cl127_title}</h3>
                <ul class="space-y-2 text-snip-muted text-sm">
                  ${[1,2,3,4,5,6,7,8,9].map(n => `<li class="flex items-start gap-2"><span class="text-snip-orange shrink-0">-</span><span data-i18n="cl127_l${n}">${T[`cl127_l${n}`]}</span></li>`).join('')}
                </ul>
              </div>
            </div>
            ${[['126',''],['125',''],['124','stable'],['122',''],['121',''],['11x','final'],['10','']].map(([ver,tag]) => {
              const displayVer = ver === '10' ? '1.0' : ver === '11x' ? '1.1' : `1.${ver.slice(1)}`;
              return `
            <div class="relative pl-8 border-l-2 border-snip-gray-light">
              <div class="absolute -left-2 top-0 w-4 h-4 bg-snip-gray-light rounded-full"></div>
              <div class="space-y-3">
                <span class="px-3 py-1 bg-snip-gray text-snip-muted rounded-full text-sm font-bold">v${displayVer}${tag ? '-'+tag : ''}</span>
                <h3 class="text-lg font-bold" data-i18n="cl${ver}_title">${T[`cl${ver}_title`]}</h3>
                <ul class="space-y-2 text-snip-muted text-sm">
                  ${ver==='127'?[1,2,3,4,5,6,7,8,9].map(n=>`<li class="flex items-start gap-2"><span class="text-snip-orange shrink-0">-</span><span data-i18n="cl127_l${n}">${T[`cl127_l${n}`]}</span></li>`).join(''):''}
                  ${ver==='126'?[1,2,3,4,5,6,7,8,9].map(n=>`<li class="flex items-start gap-2"><span class="text-snip-orange shrink-0">-</span><span data-i18n="cl126_l${n}">${T[`cl126_l${n}`]}</span></li>`).join(''):''}
                  ${ver==='125'?[1,2,3].map(n=>`<li class="flex items-start gap-2"><span class="text-snip-orange shrink-0">-</span><span data-i18n="cl125_l${n}">${T[`cl125_l${n}`]}</span></li>`).join(''):''}
                  ${ver==='124'?[1,2,3,4].map(n=>`<li class="flex items-start gap-2"><span class="text-snip-orange shrink-0">-</span><span data-i18n="cl124_l${n}">${T[`cl124_l${n}`]}</span></li>`).join(''):''}
                  ${ver==='122'?[1,2].map(n=>`<li class="flex items-start gap-2"><span class="text-snip-orange shrink-0">-</span><span data-i18n="cl122_l${n}">${T[`cl122_l${n}`]}</span></li>`).join(''):''}
                  ${ver==='121'?[1,2].map(n=>`<li class="flex items-start gap-2"><span class="text-snip-orange shrink-0">-</span><span data-i18n="cl121_l${n}">${T[`cl121_l${n}`]}</span></li>`).join(''):''}
                  ${ver==='11x'?[1,2,3,4,5,6].map(n=>`<li class="flex items-start gap-2"><span class="text-snip-orange shrink-0">-</span><span data-i18n="cl11x_l${n}">${T[`cl11x_l${n}`]}</span></li>`).join(''):''}
                  ${ver==='10'?'<li class="flex items-start gap-2"><span class="text-snip-orange shrink-0">-</span><span data-i18n="cl10_l1">${T.cl10_l1}</span></li>':''}
                </ul>
              </div>
            </div>`;}).join('')}
            <div class="text-center pt-4"><span class="text-snip-muted text-sm" data-i18n="cl_more">${T.cl_more}</span></div>
          </div>
        </div>
      </section>

      <!-- Download CTA -->
      <section id="download" class="relative py-24 px-6 md:px-12 bg-snip-gray">
        <div class="max-w-4xl mx-auto text-center relative">
          <div class="absolute inset-0 bg-snip-orange/5 rounded-3xl blur-3xl"></div>
          <div class="relative">
            <h2 class="text-4xl md:text-5xl font-bold mb-6" data-i18n="dl_title">${T.dl_title}</h2>
            <p class="text-snip-muted mb-10 max-w-xl mx-auto" data-i18n="dl_desc">${T.dl_desc}</p>
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <button id="download-btn" class="group relative px-8 py-4 bg-snip-orange text-white font-semibold rounded-xl overflow-hidden transition-all hover:scale-105 glow-orange cursor-pointer">
                <span class="relative z-10 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span data-i18n="dl_btn">${T.dl_btn}</span>
                </span>
              </button>
            </div>
            <div class="flex items-center justify-center gap-6 text-sm text-snip-muted">
              <span class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span><span data-i18n="dl_win">${T.dl_win}</span></span>
              <span>|</span>
              <span data-i18n="dl_gui">${T.dl_gui}</span>
              <span>|</span>
              <span data-i18n="dl_open">${T.dl_open}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="relative py-16 px-6 md:px-12 border-t border-snip-gray-light">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-4 gap-12 mb-12">
            <div class="md:col-span-2">
              <div class="flex items-center gap-3 mb-4">
                <img src="./logo.png" alt="SniShaper" class="w-10 h-10" />
                <span class="font-bold text-lg" data-i18n="footer_brand">${T.footer_brand}</span>
              </div>
              <p class="text-snip-muted text-sm max-w-md leading-relaxed mb-4" data-i18n="footer_desc">${T.footer_desc}</p>
            </div>
            <div>
              <h4 class="font-semibold mb-4" data-i18n="footer_res">${T.footer_res}</h4>
              <ul class="space-y-3 text-sm text-snip-muted">
                <li><a href="#quickstart" class="hover:text-snip-orange transition-colors" data-i18n="footer_quickstart">${T.footer_quickstart}</a></li>
                <li><a href="#changelog" class="hover:text-snip-orange transition-colors" data-i18n="footer_changelog">${T.footer_changelog}</a></li>
                <li><a href="https://github.com/jhonsmithsamsmith/SniShaper/wiki" target="_blank" class="hover:text-snip-orange transition-colors" data-i18n="footer_wiki">${T.footer_wiki}</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4" data-i18n="footer_community">${T.footer_community}</h4>
              <ul class="space-y-3 text-sm text-snip-muted">
                <li><span class="text-snip-text font-medium" data-i18n="footer_license">${T.footer_license}</span></li>
                <li><span class="text-snip-text" data-i18n="footer_stack">${T.footer_stack}</span></li>
              </ul>
            </div>
          </div>
          <div class="pt-8 border-t border-snip-gray text-center text-xs text-snip-muted">
            <p class="mb-2" data-i18n="footer_legal">${T.footer_legal}</p>
            <p data-i18n="footer_credit">${T.footer_credit}</p>
            <p class="mt-3 opacity-25 leading-relaxed" style="font-size:10px;max-width:480px;margin-left:auto;margin-right:auto;" data-i18n="footer_notice">${T.footer_notice}</p>
          </div>
        </div>
      </footer>

      <!-- Download Modal -->
      <div id="download-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
        <div class="bg-snip-dark rounded-2xl border border-snip-gray-light max-w-lg w-full p-8 relative">
          <button id="download-modal-close" class="absolute top-4 right-4 p-2 text-snip-muted hover:text-snip-orange transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <h3 class="text-2xl font-bold mb-6" data-i18n="modal_title">${T.modal_title}</h3>
          <div class="space-y-4">
            <a href="https://workdrive.zohopublic.com.cn/external/e0630c15869d11d9e527030dd2c34264b40e34ae1313205051fe840f41481ce4/download" target="_blank" class="download-option flex items-start gap-4 p-4 bg-snip-gray rounded-xl border border-snip-gray-light hover:border-snip-orange/50 transition-all group">
              <div class="w-10 h-10 bg-snip-orange/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-snip-orange/20 transition-colors">
                <svg class="w-5 h-5 text-snip-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
              </div>
              <div>
                <div class="font-medium mb-1" data-i18n="modal_zoho">${T.modal_zoho}</div>
                <div class="text-sm text-snip-muted" data-i18n="modal_zoho_desc">${T.modal_zoho_desc}</div>
              </div>
            </a>
            <a href="https://github.com/SniShaper/SniShaper/releases/download/v1.27/Snishaper-Win-x64-1.27Setup.exe" target="_blank" class="download-option flex items-start gap-4 p-4 bg-snip-gray rounded-xl border border-snip-gray-light hover:border-snip-orange/50 transition-all group">
              <div class="w-10 h-10 bg-snip-orange/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-snip-orange/20 transition-colors">
                <svg class="w-5 h-5 text-snip-orange" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.02.837.58-.16 1.201-.24 1.82-.242.618.002 1.239.082 1.82.242 1.012-1.159 2.02-.837 2.02-.837.652 1.652.241 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <div>
                <div class="font-medium mb-1" data-i18n="modal_github">${T.modal_github}</div>
                <div class="text-sm text-snip-muted" data-i18n="modal_github_desc">${T.modal_github_desc}</div>
              </div>
            </a>
            <a href="https://files.zohopublic.com.cn/public/workdrive-public/download/27xz8047bd39882bf4a9f8f6a12c2668bb416?x-cli-msg=%7B%22linkId%22%3A%221GumWstpbIf-35NGn%22%2C%22isFileOwner%22%3Afalse%2C%22version%22%3A%221.0%22%2C%22isWDSupport%22%3Afalse%7D" target="_blank" class="download-option flex items-start gap-4 p-4 bg-snip-gray rounded-xl border border-snip-gray-light hover:border-snip-orange/50 transition-all group">
              <div class="w-10 h-10 bg-snip-orange/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-snip-orange/20 transition-colors">
                <svg class="w-5 h-5 text-snip-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <div class="font-medium mb-1" data-i18n="modal_direct">${T.modal_direct}</div>
                <div class="text-sm text-snip-muted" data-i18n="modal_direct_desc">${T.modal_direct_desc}</div>
              </div>
            </a>
          </div>
          <div class="mt-6 text-center">
            <button id="download-modal-close-btn" class="px-6 py-2 bg-snip-gray text-snip-muted rounded-lg hover:text-snip-orange transition-colors cursor-pointer" data-i18n="modal_close">${T.modal_close}</button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="fixed inset-0 bg-snip-dark/95 backdrop-blur-lg z-50 hidden flex-col items-center justify-center gap-8">
        <button id="mobile-menu-close" class="absolute top-6 right-6 p-2 text-snip-muted hover:text-snip-orange transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <a href="#features" class="text-2xl font-medium hover:text-snip-orange transition-colors mobile-link" data-i18n="mob_features">${T.mob_features}</a>
        <a href="#tech" class="text-2xl font-medium hover:text-snip-orange transition-colors mobile-link" data-i18n="mob_tech">${T.mob_tech}</a>
        <a href="#faq" class="text-2xl font-medium hover:text-snip-orange transition-colors mobile-link" data-i18n="mob_faq">${T.mob_faq}</a>
        <a href="#download" class="text-2xl font-medium hover:text-snip-orange transition-colors mobile-link" data-i18n="mob_download">${T.mob_download}</a>
      </div>
    </div>
  `;

  // Language toggle
  const langBtn = document.getElementById('lang-toggle-btn');
  langBtn?.addEventListener('click', () => setLang(currentLang === 'zh' ? 'en' : 'zh'));

  // Mobile menu
  const mobileMenuBtn   = document.getElementById('mobile-menu-btn');
  const mobileMenu      = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileLinks     = document.querySelectorAll<HTMLElement>('.mobile-link');
  function openMobileMenu()  { mobileMenu!.classList.remove('hidden'); mobileMenu!.classList.add('flex'); document.body.style.overflow = 'hidden'; }
  function closeMobileMenu() { mobileMenu!.classList.add('hidden');    mobileMenu!.classList.remove('flex'); document.body.style.overflow = ''; }
  mobileMenuBtn?.addEventListener('click', openMobileMenu);
  mobileMenuClose?.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // Download modal
  const downloadBtn = document.getElementById('download-btn');
  const downloadModal = document.getElementById('download-modal');
  const downloadModalClose = document.getElementById('download-modal-close');
  const downloadModalCloseBtn = document.getElementById('download-modal-close-btn');
  function openDownloadModal() { downloadModal!.classList.remove('hidden'); downloadModal!.classList.add('flex'); document.body.style.overflow = 'hidden'; }
  function closeDownloadModal() { downloadModal!.classList.add('hidden'); downloadModal!.classList.remove('flex'); document.body.style.overflow = ''; }
  downloadBtn?.addEventListener('click', openDownloadModal);
  downloadModalClose?.addEventListener('click', closeDownloadModal);
  downloadModalCloseBtn?.addEventListener('click', closeDownloadModal);
  downloadModal?.addEventListener('click', (e) => { if (e.target === downloadModal) closeDownloadModal(); });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href')!);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Intersection Observer
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).classList.add('opacity-100', 'translate-y-0');
        (entry.target as HTMLElement).classList.remove('opacity-0', 'translate-y-8');
      }
    });
  }, observerOptions);
  document.querySelectorAll('section').forEach(section => {
    (section as HTMLElement).classList.add('transition-opacity', 'transition-transform', 'duration-700');
    observer.observe(section);
  });

  // Features carousel
  (function () {
    const carousel = document.getElementById('features-carousel');
    if (!carousel) return;
    const BASE_SPEED = 0.65;
    let speed = 0, direction = 1, paused = false;
    function tick() {
      if (!paused) {
        speed += (BASE_SPEED - speed) * 0.08;
        carousel!.scrollLeft += speed * direction;
        const max = carousel!.scrollWidth - carousel!.clientWidth;
        if (direction === 1 && carousel!.scrollLeft >= max) { direction = -1; carousel!.scrollLeft = max; }
        else if (direction === -1 && carousel!.scrollLeft <= 0) { direction = 1; carousel!.scrollLeft = 0; }
      }
      requestAnimationFrame(tick);
    }
    carousel!.addEventListener('mouseenter', () => { paused = true; speed = 0; });
    carousel!.addEventListener('mouseleave', () => { paused = false; });
    carousel!.addEventListener('touchstart', () => { paused = true; speed = 0; }, { passive: true });
    carousel!.addEventListener('touchend',   () => { paused = false; }, { passive: true });
    carousel!.style.scrollSnapType = 'none';
    carousel!.style.overflowX = 'hidden';
    requestAnimationFrame(tick);
  })();
}

document.addEventListener('DOMContentLoaded', () => initApp());
