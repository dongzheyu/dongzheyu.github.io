<script setup lang="ts">
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useScrollAnimation } from '@/composables/useAnimations'

const { observe } = useScrollAnimation()

onMounted(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observe(el as HTMLElement)
    })
  })
})
</script>

<template>
  <section class="privacy-section">
    <div class="container">
      <div class="privacy-header animate-on-scroll">
        <h1 class="privacy-title">隐私政策</h1>
        <p class="privacy-update">最后更新时间：2026年5月21日</p>
        <p class="privacy-intro">
          JetCPP
          Website（以下简称"我们"）尊重和保护用户的隐私权。本隐私政策说明我们如何收集、使用、存储和保护您的个人信息。
          请您在使用我们的服务前仔细阅读本隐私政策。
        </p>
      </div>

      <div class="privacy-content">
        <!-- 1. 信息收集 -->
        <div class="privacy-section animate-on-scroll">
          <h2 class="privacy-subtitle">一、信息的收集与使用</h2>

          <div class="privacy-item">
            <h3>1.1 注册与登录</h3>
            <p>当我们提供用户注册功能时，我们会收集以下信息：</p>
            <ul>
              <li><strong>邮箱地址</strong>：用于创建账号、登录验证、密码重置以及发送重要通知</li>
              <li>
                <strong>密码</strong>：您的密码会以加密形式存储，我们不会查看或记录您的明文密码
              </li>
            </ul>
            <p>您提供的信息仅用于改善您的使用体验和我们的服务质量。</p>
          </div>

          <div class="privacy-item">
            <h3>1.2 自动收集的信息</h3>
            <p>当您访问本网站时，我们的服务器可能会自动记录以下信息：</p>
            <ul>
              <li>访问日志（包括页面访问记录、访问时间等）</li>
              <li>浏览器类型和设备信息（用于优化显示效果）</li>
              <li>IP地址（仅用于安全防护和地域分析，不关联个人身份）</li>
            </ul>
          </div>

          <div class="privacy-item">
            <h3>1.3 不会收集的信息</h3>
            <p>未经您的明确同意，我们不会收集以下敏感信息：</p>
            <ul>
              <li>身份证号、手机号等个人身份信息</li>
              <li>支付信息、银行账号等财务信息</li>
              <li>位置信息、通讯录、相册等设备权限信息</li>
              <li>人脸识别、指纹等生物识别信息</li>
            </ul>
          </div>
        </div>

        <!-- 2. 信息的使用 -->
        <div class="privacy-section animate-on-scroll">
          <h2 class="privacy-subtitle">二、信息的使用方式</h2>

          <div class="privacy-item">
            <p>我们收集的信息仅用于以下目的：</p>
            <ul>
              <li>✓ 为您提供账号登录和服务访问功能</li>
              <li>✓ 保存您发布的内容（如博客文章、项目评论等）</li>
              <li>✓ 保障账号安全和系统稳定运行</li>
              <li>✓ 改进网站功能和使用体验</li>
              <li>✓ 发送重要的系统通知和安全提醒</li>
            </ul>
            <p class="highlight">
              <strong>我们承诺：不会将您的个人信息出售给第三方，不会用于商业营销目的。</strong>
            </p>
          </div>
        </div>

        <!-- 3. 信息的存储 -->
        <div class="privacy-section animate-on-scroll">
          <h2 class="privacy-subtitle">三、信息的存储与保护</h2>

          <div class="privacy-item">
            <h3>3.1 数据存储</h3>
            <ul>
              <li>您的账号信息存储在 <strong>Supabase</strong>（数据库服务）上</li>
              <li>您发布的公开内容通过 <strong>GitHub Pages</strong> 进行托管和展示</li>
              <li>所有数据传输均使用 <strong>HTTPS 加密</strong></li>
            </ul>
          </div>

          <div class="privacy-item">
            <h3>3.2 安全措施</h3>
            <ul>
              <li>密码使用 bcrypt 算法加密存储</li>
              <li>使用 JWT Token 进行身份验证</li>
              <li>定期更新安全策略和系统补丁</li>
              <li>限制服务器访问权限，防止未授权访问</li>
            </ul>
          </div>

          <div class="privacy-item">
            <h3>3.3 数据存储期限</h3>
            <p>我们仅在必要的时间内存储您的个人信息：-</p>
            <ul>
              <li>活跃账号的信息会一直保留，直到您主动删除账号</li>
              <li>您发布的公开内容会一直展示，直到您主动删除</li>
              <li>登录日志会在 30 天后自动清理</li>
            </ul>
          </div>
        </div>

        <!-- 4. 信息共享 -->
        <div class="privacy-section animate-on-scroll">
          <h2 class="privacy-subtitle">四、信息的共享与披露</h2>

          <div class="privacy-item">
            <p>我们绝不会主动与任何第三方分享您的个人信息，除非：</p>
            <ul>
              <li>✦ 获得您的明确同意</li>
              <li>✦ 根据法律法规或政府要求必须披露</li>
              <li>✦ 为维护公众利益、保护 ourselves 或用户的合法权益所必需</li>
            </ul>
          </div>

          <div class="privacy-item">
            <h3>第三方服务说明</h3>
            <p>本网站使用了以下第三方服务，这些服务可能会有有限的信息收集：</p>
            <ul>
              <li>
                <strong>Supabase</strong>：提供数据库和认证服务，详见其<a
                  href="https://supabase.com/terms/of-sale"
                  target="_blank"
                  rel="noopener noreferrer"
                  >隐私政策</a
                >
              </li>
              <li>
                <strong>GitHub Pages</strong>：提供静态页面托管服务，详见其<a
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                  >隐私政策</a
                >
              </li>
              <li>
                <strong>Cloudflare</strong>：提供CDN和安全服务，详见其<a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >隐私政策</a
                >
              </li>
            </ul>
            <p class="note">我们建议您了解这些第三方服务的安全策略，以做出明智的决定。</p>
          </div>
        </div>

        <!-- 5. 您的权利 -->
        <div class="privacy-section animate-on-scroll">
          <h2 class="privacy-subtitle">五、您的权利</h2>

          <div class="privacy-item">
            <p>根据相关法律法规，您享有以下权利：</p>
            <ul>
              <li><strong>访问权</strong>：您可以查看我们存储的您的个人信息</li>
              <li>
                <strong>更正权</strong>：您可以要求更正不准确的个人信息（通过修改个人资料实现）
              </li>
              <li><strong>删除权</strong>：您可以随时删除自己的账号和发布的内容</li>
              <li><strong>撤回同意权</strong>：您可以撤回之前给予的同意（登出并删除本地缓存）</li>
              <li>
                <strong>投诉权</strong>：如果您认为我们的数据处理侵害了您的权益，可以向监管部门投诉
              </li>
            </ul>
          </div>
        </div>

        <!-- 6. Cookie 和技术 -->
        <div class="privacy-section animate-on-scroll">
          <h2 class="privacy-subtitle">六、Cookie 和技术</h2>

          <div class="privacy-item">
            <p>本网站可能使用以下技术：</p>
            <ul>
              <li>
                <strong>Local Storage</strong
                >：用于存储用户的登录状态和界面偏好设置（仅保存在您的浏览器中）
              </li>
              <li><strong>Session Storage</strong>：临时存储会话数据，关闭浏览器后自动清除</li>
            </ul>
            <p>这些技术仅用于提升用户体验，不会追踪您的浏览行为或收集敏感信息。</p>
          </div>
        </div>

        <!-- 7. 未成年人保护 -->
        <div class="privacy-section animate-on-scroll">
          <h2 class="privacy-subtitle">七、未成年人保护</h2>

          <div class="privacy-item">
            <p>本网站面向所有年龄层的用户开放，但我们非常重视未成年人的隐私保护：</p>
            <ul>
              <li>若您是未满 14 周岁的未成年人，请在监护人的指导下使用我们的服务</li>
              <li>监护人应了解并同意本隐私政策的内容</li>
              <li>我们不会故意收集未成年人的个人信息</li>
            </ul>
          </div>
        </div>

        <!-- 8. 联系方式 -->
        <div class="privacy-section animate-on-scroll">
          <h2 class="privacy-subtitle">八、联系我们</h2>

          <div class="privacy-item">
            <p>如果您对本隐私政策有任何疑问、建议或投诉，请通过以下方式联系我们：</p>
            <ul>
              <li>
                <strong>GitHub</strong>：<a
                  href="https://github.com/dongzheyu"
                  target="_blank"
                  rel="noopener noreferrer"
                  >https://github.com/dongzheyu</a
                >
              </li>
              <li>
                <strong>Gitee</strong>：<a
                  href="https://gitee.com/jetcpp"
                  target="_blank"
                  rel="noopener noreferrer"
                  >https://gitee.com/jetcpp</a
                >
              </li>
              <li>
                <strong>哔哩哔哩</strong>：<a
                  href="https://space.bilibili.com/3546730880567808"
                  target="_blank"
                  rel="noopener noreferrer"
                  >https://space.bilibili.com/3546730880567808</a
                >
              </li>
            </ul>
            <p>我们会在收到您的请求后 7 个工作日内予以回复。</p>
          </div>
        </div>

        <!-- 9. 政策更新 -->
        <div class="privacy-section animate-on-scroll">
          <h2 class="privacy-subtitle">九、政策的更新</h2>

          <div class="privacy-item">
            <p>我们可能会适时更新本隐私政策。更新后的政策会在本网站公布，恕不另行个别通知。</p>
            <p>当政策发生重大变化时，我们会通过以下方式通知您：</p>
            <ul>
              <li>在网站显著位置发布更新公告</li>
              <li>登录时通过弹窗提示</li>
            </ul>
            <p>若您继续使用我们的服务，即表示同意受更新后的隐私政策约束。</p>
          </div>
        </div>
      </div>

      <div class="privacy-footer animate-on-scroll">
        <p class="footer-note">
          本隐私政策依据《中华人民共和国个人信息保护法》《中华人民共和国网络安全法》等相关法律法规制定。
        </p>
        <RouterLink to="/" class="back-link">
          <Icon icon="mdi:arrow-left" /> 返回首页
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.privacy-section {
  min-height: 100vh;
  padding: 80px 0 60px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.privacy-header {
  text-align: center;
  margin-bottom: 60px;
}

.privacy-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.privacy-update {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.privacy-intro {
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
}

.privacy-content {
  margin-bottom: 60px;
}

.privacy-section {
  margin-bottom: 48px;
  padding: 32px;
  background: var(--color-bg-card);
  border-radius: 12px;
  border-left: 4px solid var(--color-primary);
}

.privacy-subtitle {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.05);
}

.privacy-item {
  margin-bottom: 24px;
}

.privacy-item h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 12px;
}

.privacy-item p {
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: 12px;
}

.privacy-item ul {
  padding-left: 24px;
  margin-bottom: 12px;
}

.privacy-item li {
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: 8px;
}

.highlight {
  background: rgba(var(--color-primary-rgb), 0.1);
  padding: 16px 20px;
  border-radius: 8px;
  border-left: 3px solid var(--color-primary);
}

[data-theme='light'] .highlight {
  background: rgba(var(--color-primary-rgb), 0.05);
}

.note {
  background: rgba(255, 193, 7, 0.08);
  padding: 16px 20px;
  border-radius: 8px;
  border-left: 3px solid #ffc107;
  font-size: 0.95rem;
}

.privacy-footer {
  text-align: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-note {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: var(--color-primary-light);
}

@media (max-width: 768px) {
  .privacy-section {
    padding: 60px 0 40px;
  }

  .privacy-section {
    padding: 24px;
  }

  .privacy-subtitle {
    font-size: 1.3rem;
  }
}
</style>
