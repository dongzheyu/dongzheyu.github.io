<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="about-title mb-4 animate-slide-up" :class="{ 'visible': isVisible }">
              嗨，我是 <span class="text-gradient">dongle</span>
            </h1>
            <p class="about-subtitle mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.15s">
              "用代码重塑世界，用创新驱动未来"
            </p>
            <p class="about-desc animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.3s">
              一个热爱编程的小学生，专注于创造实用的软件工具，让技术更贴近生活。
            </p>
          </div>
          <div class="col-lg-4">
            <div class="hero-illustration animate-float" :class="{ 'visible': isVisible }" style="animation-delay: 0.45s">
              <i class="bi bi-person-fill display-1" style="color: var(--color-primary); opacity: 0.3;"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术世界 Section -->
    <section class="tech-world-section">
      <div class="container-fluid px-5">
        <h2 class="section-title mb-5 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.5s">
          我的技术世界
        </h2>

        <!-- Minecraft Section -->
        <div class="tech-category mb-5 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.6s">
          <h3 class="category-title mb-4">
            <i class="bi bi-controller me-2"></i>Minecraft 是我的游乐场
          </h3>
          <p class="category-desc mb-4">
            我是一个狂热的 Minecraft 玩家，同时也是一个工具开发者！我创建了一系列 Minecraft 相关的工具，帮助玩家们更好地享受游戏：
          </p>
          <div class="row g-4">
            <div class="col-md-4">
              <div class="project-card card h-100 border-0 shadow-sm card-hover">
                <div class="card-body p-4">
                  <h5 class="card-title fw-bold mb-3">Minecraft-Toos</h5>
                  <p class="card-text">C++ 编写的多功能工具包，一键管理启动器和游戏环境</p>
                  <a href="https://github.com/dongzheyu/Minecraft-Toos" target="_blank" class="btn btn-sm btn-animate">
                    <i class="bi bi-github me-1"></i>查看项目
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="project-card card h-100 border-0 shadow-sm card-hover">
                <div class="card-body p-4">
                  <h5 class="card-title fw-bold mb-3">GoodMinecraft</h5>
                  <p class="card-text">高性能的 Minecraft 整合包，优化游戏体验，让每台电脑都能流畅运行</p>
                  <a href="https://github.com/dongzheyu/GoodMinecraft" target="_blank" class="btn btn-sm btn-animate">
                    <i class="bi bi-github me-1"></i>查看项目
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="project-card card h-100 border-0 shadow-sm card-hover">
                <div class="card-body p-4">
                  <h5 class="card-title fw-bold mb-3">JetCPPWebsite</h5>
                  <p class="card-text">我的技术博客网站，分享编程经验和项目故事</p>
                  <a href="https://github.com/dongzheyu/JetCPPWebsite" target="_blank" class="btn btn-sm btn-animate">
                    <i class="bi bi-github me-1"></i>查看项目
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p class="mt-4 text-muted">
            <strong>为什么做这些？</strong> 因为我曾经也是个被复杂配置困扰的玩家，所以想用技术让游戏变得更简单、更有趣！
          </p>
        </div>

        <!-- 实用工具 Section -->
        <div class="tech-category mb-5 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.7s">
          <h3 class="category-title mb-4">
            <i class="bi bi-tools me-2"></i>实用工具开发者
          </h3>
          <div class="row g-4">
            <div class="col-md-12">
              <div class="project-card card h-100 border-0 shadow-sm card-hover">
                <div class="card-body p-4">
                  <h5 class="card-title fw-bold mb-3">JetCPPWebsite</h5>
                  <p class="card-text">我的技术博客网站，分享编程经验和项目故事</p>
                  <a href="https://github.com/dongzheyu/JetCPPWebsite" target="_blank" class="btn btn-sm btn-animate">
                    <i class="bi bi-github me-1"></i>查看项目
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 网站与文档 Section -->
        <div class="tech-category mb-5 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.8s">
          <h3 class="category-title mb-4">
            <i class="bi bi-globe me-2"></i>网站与文档
          </h3>
          <div class="row g-4">
            <div class="col-md-6">
              <div class="project-card card h-100 border-0 shadow-sm card-hover">
                <div class="card-body p-4">
                  <h5 class="card-title fw-bold mb-3">dongzheyu.github.io</h5>
                  <p class="card-text">我的个人主页</p>
                  <a href="https://github.com/dongzheyu/dongzheyu.github.io" target="_blank" class="btn btn-sm btn-animate">
                    <i class="bi bi-github me-1"></i>查看项目
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="project-card card h-100 border-0 shadow-sm card-hover">
                <div class="card-body p-4">
                  <h5 class="card-title fw-bold mb-3">Office-Tool-docs</h5>
                  <p class="card-text">文档项目，帮助更多人学习技术</p>
                  <a href="https://github.com/dongzheyu/Office-Tool-docs" target="_blank" class="btn btn-sm btn-animate">
                    <i class="bi bi-github me-1"></i>查看项目
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 编程哲学 Section -->
    <section class="philosophy-section">
      <div class="container-fluid px-5">
        <h2 class="section-title mb-5 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 0.9s">
          我的编程哲学
        </h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="philosophy-card card h-100 border-0 shadow-sm animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 1.0s">
              <div class="card-body text-center p-4">
                <div class="philosophy-icon mb-3">
                  <i class="bi bi-stars fs-1"></i>
                </div>
                <h5 class="card-title fw-bold mb-3">简单就是美</h5>
                <p class="card-text">我坚信好的工具应该让用户感到轻松，而不是增加负担。</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="philosophy-card card h-100 border-0 shadow-sm animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 1.1s">
              <div class="card-body text-center p-4">
                <div class="philosophy-icon mb-3">
                  <i class="bi bi-person-check fs-1"></i>
                </div>
                <h5 class="card-title fw-bold mb-3">从用户出发</h5>
                <p class="card-text">每个项目都是因为我自己遇到了问题，然后想出了解决方案。</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="philosophy-card card h-100 border-0 shadow-sm animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 1.2s">
              <div class="card-body text-center p-4">
                <div class="philosophy-icon mb-3">
                  <i class="bi bi-arrow-repeat fs-1"></i>
                </div>
                <h5 class="card-title fw-bold mb-3">持续学习</h5>
                <p class="card-text">编程路上我还在不断学习，每次解决问题都是一次进步。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能栈 Section -->
    <section class="skills-section">
      <div class="container-fluid px-5">
        <h2 class="section-title mb-5 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 1.3s">
          我的技能栈
        </h2>
        <div class="row g-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 1.4s">
          <div class="col-md-6 col-lg-3">
            <div class="skill-card card h-100 border-0 shadow-sm">
              <div class="card-body p-4">
                <h5 class="card-title fw-bold mb-3">
                  <i class="bi bi-joystick me-2"></i>游戏开发
                </h5>
                <p class="card-text text-muted">Minecraft Modding | C++ | Java</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="skill-card card h-100 border-0 shadow-sm">
              <div class="card-body p-4">
                <h5 class="card-title fw-bold mb-3">
                  <i class="bi bi-pc-display me-2"></i>系统工具
                </h5>
                <p class="card-text text-muted">Windows 开发 | 环境配置 | 自动化</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="skill-card card h-100 border-0 shadow-sm">
              <div class="card-body p-4">
                <h5 class="card-title fw-bold mb-3">
                  <i class="bi bi-window-desktop me-2"></i>前端技术
                </h5>
                <p class="card-text text-muted">HTML | CSS | JavaScript | VitePress</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="skill-card card h-100 border-0 shadow-sm">
              <div class="card-body p-4">
                <h5 class="card-title fw-bold mb-3">
                  <i class="bi bi-book me-2"></i>学习方法
                </h5>
                <p class="card-text text-muted">实践驱动 | 问题导向 | 持续迭代</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目亮点 Section -->
    <section class="highlights-section">
      <div class="container-fluid px-5">
        <h2 class="section-title mb-5 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 1.5s">
          项目亮点
        </h2>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="highlight-card card h-100 border-0 shadow-sm animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 1.6s">
              <div class="card-body p-4">
                <h4 class="card-title fw-bold mb-3">
                  <i class="bi bi-trophy me-2 text-warning"></i>最让我自豪的项目
                </h4>
                <h5 class="mb-3">Minecraft-Toos</h5>
                <p class="card-text">这是我目前最用心的作品，因为它：</p>
                <ul class="list-unstyled">
                  <li><i class="bi bi-check-circle-fill me-2 text-success"></i>解决了玩家们的实际痛点</li>
                  <li><i class="bi bi-check-circle-fill me-2 text-success"></i>采用了简洁高效的设计</li>
                  <li><i class="bi bi-check-circle-fill me-2 text-success"></i>支持正版游戏体验</li>
                  <li><i class="bi bi-check-circle-fill me-2 text-success"></i>完全开源，让每个人都能受益</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="highlight-card card h-100 border-0 shadow-sm animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 1.7s">
              <div class="card-body p-4">
                <h4 class="card-title fw-bold mb-3">
                  <i class="bi bi-award me-2 text-warning"></i>最有成就感的作品
                </h4>
                <h5 class="mb-3">JetCPPWebsite</h5>
                <p class="card-text">用 Vue 3 + TypeScript + Vite 开发的个人网站，整合了博客和项目展示功能。从设计到实现，让我感受到了全栈开发的乐趣！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 成长轨迹 Section -->
    <section class="timeline-section">
      <div class="container-fluid px-5">
        <h2 class="section-title mb-5 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 1.8s">
          成长轨迹
        </h2>
        <div class="timeline animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 1.9s">
          <div class="timeline-item">
            <div class="timeline-year">2024年</div>
            <div class="timeline-content">开始系统学习编程，从简单的脚本开始</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2025年</div>
            <div class="timeline-content">发布第一个正式项目 Minecraft-Toos</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">现在</div>
            <div class="timeline-content">专注于完善现有项目，学习更多技术</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 正在学习 Section -->
    <section class="learning-section">
      <div class="container-fluid px-5">
        <h2 class="section-title mb-5 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 2.0s">
          正在学习
        </h2>
        <div class="row g-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 2.1s">
          <div class="col-md-6">
            <div class="learning-card card h-100 border-0 shadow-sm">
              <div class="card-body p-4">
                <h5 class="card-title fw-bold mb-3">
                  <i class="bi bi-graph-up me-2"></i>算法与数据结构
                </h5>
                <p class="card-text text-muted">打好编程基础</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="learning-card card h-100 border-0 shadow-sm">
              <div class="card-body p-4">
                <h5 class="card-title fw-bold mb-3">
                  <i class="bi bi-wifi me-2"></i>网络编程
                </h5>
                <p class="card-text text-muted">让程序能够互相交流</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GitHub Section -->
    <section class="github-stats-section">
      <div class="container-fluid px-5">
        <div class="text-center mb-5">
          <h2 class="section-title mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 2.4s">
            在 GitHub 上关注我
          </h2>
          <p class="lead mb-4 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 2.5s">
            查看我的开源项目和代码贡献
          </p>
          <div class="animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 2.6s">
            <a href="https://github.com/dongzheyu" target="_blank" class="btn btn-primary btn-lg btn-animate">
              <i class="bi bi-github me-2"></i>访问我的 GitHub 主页
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 最后想说 Section -->
    <section class="closing-section">
      <div class="container-fluid px-5">
        <div class="closing-card card border-0 shadow-lg animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 2.6s">
          <div class="card-body p-5 text-center">
            <h3 class="mb-4">最后想说</h3>
            <p class="lead mb-4">编程对我来说不只是写代码，更是创造价值的过程。</p>
            <p class="mb-4">每个项目都是一个小故事，记录着我的成长轨迹。</p>
            <p class="fw-bold mb-0">感谢你的关注！希望我的项目能给你带来一些启发或帮助</p>
            <hr class="my-4">
            <p class="text-muted fst-italic">"代码改变世界，梦想驱动未来"</p>
            <p class="text-muted">— dongle</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container-fluid px-5">
        <div class="text-center mb-5">
          <h2 class="contact-title mb-3 animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 2.7s">
            联系我
          </h2>
          <p class="lead animate-slide-up" :class="{ 'visible': isVisible }" style="animation-delay: 2.8s">
            欢迎通过以下方式与我取得联系
          </p>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="contact-links d-flex justify-content-center gap-3 flex-wrap animate-slide-up"
                 :class="{ 'visible': isVisible }"
                 style="animation-delay: 2.9s">
              <a href="https://github.com/dongzheyu" target="_blank" class="btn btn-animate">
                <i class="bi bi-github me-2"></i> GitHub
              </a>
              <a href="https://gitee.com/jetcpp" target="_blank" class="btn btn-animate">
                <i class="bi bi-git me-2"></i> Gitee
              </a>
              <a href="https://space.bilibili.com/3546730880567808" target="_blank" class="btn btn-animate">
                <i class="bi bi-play-circle me-2"></i> 哔哩哔哩
              </a>
              <a href="https://afdian.com/a/JetCPP" target="_blank" class="btn btn-primary btn-animate">
                <i class="bi bi-heart me-2"></i> 赞助支持
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimations } from '@/composables/useAnimations'

const { isVisible } = useAnimations()
</script>

<style scoped>
.about-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.02em;
}

.about-subtitle {
  font-size: 1.2rem;
  color: var(--color-primary);
  font-weight: 600;
  font-style: italic;
}

.about-desc {
  font-size: 1rem;
  color: var(--color-text-secondary);
  max-width: 520px;
  line-height: 1.7;
}

.section-title {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.02em;
}

.category-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-heading);
}

.category-desc {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.project-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border) !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
}

.philosophy-card,
.skill-card,
.learning-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border) !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.philosophy-card:hover,
.skill-card:hover,
.learning-card:hover {
  transform: translateY(-3px);
}

.philosophy-icon {
  color: var(--color-primary);
}

.highlight-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border) !important;
}

.highlight-card ul li {
  padding: 0.5rem 0;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-primary);
  opacity: 0.3;
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
  padding-left: 1.5rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -1.65rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  background: var(--color-primary);
  border-radius: 50%;
}

.timeline-year {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.timeline-content {
  color: var(--color-text-secondary);
}

.github-stats-section {
  padding: 3rem 0;
}

.closing-card {
  background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-soft) 100%);
  border: 1px solid var(--color-border) !important;
}

.contact-title {
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.02em;
}

.tech-world-section,
.philosophy-section,
.skills-section,
.highlights-section,
.timeline-section,
.learning-section,
.closing-section {
  padding: 3rem 0;
}
</style>
