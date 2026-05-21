<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useAnimations'

const { observe } = useScrollAnimation()

onMounted(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observe(el as HTMLElement)
    })
  })
})
</script>

<template>
  <section class="terms-section">
    <div class="container">
      <div class="terms-header animate-on-scroll">
        <h1 class="terms-title">服务条款</h1>
        <p class="terms-update">最后更新时间：2026年5月21日</p>
        <p class="terms-intro">
          欢迎使用 JetCPP Website（以下简称"服务"）。
          在您使用本服务前，请仔细阅读并理解本条款。
          继续使用即表示您同意接受本条款的所有内容。
        </p>
      </div>

      <div class="terms-content">
        <!-- 1. 服务说明 -->
        <div class="terms-section animate-on-scroll">
          <h2 class="terms-subtitle">一、服务说明</h2>
          
          <div class="terms-item">
            <p>JetCPP Website 提供以下内容服务：</p>
            <ul>
              <li>📝 技术博客文章的发布与阅读</li>
              <li>📁 项目作品的展示与分享</li>
              <li>👤 用户账号注册与管理</li>
              <li>💬 评论区互动功能（如开启）</li>
              <li>🎯 心理测评问卷测试（仅供参考）</li>
            </ul>
            <p>我们保留随时修改、暂停或终止部分或全部服务的权利，无需提前通知。</p>
          </div>
        </div>

        <!-- 2. 用户注册与账号 -->
        <div class="terms-section animate-on-scroll">
          <h2 class="privacy-subtitle">二、用户注册与账号安全</h2>
          
          <div class="terms-item">
            <h3>2.1 账号注册</h3>
            <ul>
              <li>您需使用有效的邮箱地址进行注册</li>
              <li>您需提供真实、准确的信息完成注册</li>
              <li>每个账号仅限注册用户本人使用，不得转让、出借或售卖</li>
            </ul>
          </div>

          <div class="terms-item">
            <h3>2.2 账号安全</h3>
            <ul>
              <li>您有责任维护账号密码的机密性和安全性</li>
              <li>所有使用您的账号进行的活动均由您负责</li>
              <li>如发现任何未经授权的使用，请立即联系我们</li>
              <li>我们建议定期更换密码并使用强密码</li>
            </ul>
          </div>

          <div class="terms-item">
            <h3>2.3 账号封禁</h3>
            <p>如您违反本条款或平台规则，我们有权暂停或终止您的账号，包括但不限于：</p>
            <ul>
              <li>发布违法、违规内容</li>
              <li>侵犯他人知识产权或合法权益</li>
              <li>进行恶意攻击、骚扰其他用户</li>
              <li>利用服务从事非法活动</li>
            </ul>
          </div>
        </div>

        <!-- 3. 用户行为规范 -->
        <div class="terms-section animate-on-scroll">
          <h2 class="terms-subtitle">三、用户行为规范</h2>
          
          <div class="terms-item">
            <h3>3.1 禁止行为</h3>
            <p>在使用本服务时，您不得：</p>
            <ul>
              <li>❌ 发布违反国家法律法规的内容</li>
              <li>❌ 发布淫秽、色情、暴力、恐怖主义内容</li>
              <li>❌ 发布侵犯他人知识产权、商业秘密等内容</li>
              <li>❌ 发布垃圾广告、恶意营销、诱导分享内容</li>
              <li>❌ 发布谣言、虚假信息，损害他人或机构声誉</li>
              <li>❌ 恶意扫描、攻击服务器或干扰服务正常运行</li>
              <li>❌ 收集或存储其他用户的个人信息</li>
              <li>❌ 利用技术手段恶意刷量、刷赞</li>
            </ul>
          </div>

          <div class="terms-item">
            <h3>3.2 内容责任</h3>
            <p>用户对自己在平台上发布的内容负全部责任，包括但不限于：</p>
            <ul>
              <li>确保内容不侵犯任何第三方的知识产权、肖像权、名誉权等</li>
              <li>确保内容真实、准确，不构成误导或欺诈</li>
              <li>承担因内容违法而引发的全部法律责任</li>
            </ul>
          </div>
        </div>

        <!-- 4. 知识产权 -->
        <div class="terms-section animate-on-scroll">
          <h2 class="terms-subtitle">四、知识产权声明</h2>
          
          <div class="terms-item">
            <h3>4.1 平台内容</h3>
            <p>本平台的所有内容（包括但不限于文字、图片、代码、设计、布局）均受知识产权法保护，归平台所有者或相应权利人所有。</p>
          </div>

          <div class="terms-item">
            <h3>4.2 用户内容</h3>
            <p>您在平台上发布的内容，版权仍归您所有，但您授予平台在全球范围内、永久的、非排他性的许可，允许平台展示、传播该内容。</p>
          </div>

          <div class="terms-item">
            <h3>4.3 开源项目</h3>
            <p>平台上展示的开源项目，其版权归项目作者所有，使用范围遵循各项目附带的开源许可证（如 MIT、GPL 等）。</p>
          </div>
        </div>

        <!-- 5. 免责声明 -->
        <div class="terms-section animate-on-scroll">
          <h2 class="terms-subtitle">五、免责声明</h2>
          
          <div class="terms-item">
            <h3>5.1 服务可用性</h3>
            <p>我们尽量保证服务的连续性和稳定性，但不保证：</p>
            <ul>
              <li>服务永远不会中断或出错</li>
              <li>服务完全不受病毒、木马等恶意程序影响</li>
              <li>数据永远不会丢失</li>
            </ul>
          </div>

          <div class="terms-item">
            <h3>5.2 第三方链接</h3>
            <p>本平台可能包含指向第三方网站的链接，这些链接仅供您参考：</p>
            <ul>
              <li>我们对第三方网站的内容、隐私政策、安全性不承担责任</li>
              <li>使用第三方网站的风险由您自行承担</li>
              <li>我们与第三方之间不存在任何形式的合作关系（除非明确声明）</li>
            </ul>
          </div>

          <div class="terms-item">
            <h3>5.3 测评结果</h3>
            <p>平台提供的心理测评问卷（如 MBTI、抑郁测试等）仅供参考，不构成专业医疗诊断或建议。如有心理健康问题，请咨询专业医生。</p>
          </div>
        </div>

        <!-- 6. 隐私保护 -->
        <div class="terms-section animate-on-scroll">
          <h2 class="terms-subtitle">六、隐私保护</h2>
          
          <div class="terms-item">
            <p>我们重视您的隐私，详细的数据收集和使用政策请参考我们的<a href="/privacy" class="terms-link">隐私政策</a>。</p>
            <p>使用本服务即表示您同意我们按照隐私政策收集、使用和保护您的信息。</p>
          </div>
        </div>

        <!-- 7. 违规处理 -->
        <div class="terms-section animate-on-scroll">
          <h2 class="terms-subtitle">七、违规处理</h2>
          
          <div class="terms-item">
            <p>如您违反上述条款，我们有权采取以下一项或多项措施：</p>
            <ul>
              <li>⚠️ 警告并要求限期整改</li>
              <li>🚫 删除违规内容</li>
              <li>⏸️ 暂时封禁账号</li>
              <li>🔨 永久封禁账号</li>
              <li>📋 向相关监管部门报告</li>
            </ul>
            <p>您对处理决定有异议的，可以通过 GitHub Issues 提出申诉。</p>
          </div>
        </div>

        <!-- 8. 条款变更 -->
        <div class="terms-section animate-on-scroll">
          <h2 class="terms-subtitle">八、条款变更</h2>
          
          <div class="terms-item">
            <p>我们可能会不时修订本条款。修订后的条款会在本网站公布，恕不另行个别通知。</p>
            <p>当条款发生重大变化时，我们会通过以下方式通知您：</p>
            <ul>
              <li>在网站显著位置发布更新公告</li>
              <li>登录时通过弹窗提示</li>
            </ul>
            <p>若您继续使用我们的服务，即表示同意受修订后条款的约束。</p>
          </div>
        </div>

        <!-- 9. 其他 -->
        <div class="terms-section animate-on-scroll">
          <h2 class="terms-subtitle">九、其他</h2>
          
          <div class="terms-item">
            <ul>
              <li>本条款的解释、效力适用中华人民共和国法律</li>
              <li>如本条款的任何部分被认定为无效，不影响其他部分的效力</li>
              <li>我们未及时行使本条款下的权利，不构成对该权利的放弃</li>
            </ul>
          </div>
        </div>

        <!-- 10. 联系方式 -->
        <div class="terms-section animate-on-scroll">
          <h2 class="terms-subtitle">十、联系我们</h2>
          
          <div class="terms-item">
            <p>如对本条款有任何疑问，请通过以下方式联系我们：</p>
            <ul>
              <li><strong>GitHub</strong>：<a href="https://github.com/dongzheyu" target="_blank" rel="noopener noreferrer">https://github.com/dongzheyu</a></li>
              <li><strong>Gitee</strong>：<a href="https://gitee.com/jetcpp" target="_blank" rel="noopener noreferrer">https://gitee.com/jetcpp</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="terms-footer animate-on-scroll">
        <p class="footer-note">
          本服务条款依据《中华人民共和国民法典》《中华人民共和国网络安全法》《中华人民共和国数据安全法》等相关法律法规制定。
        </p>
        <RouterLink to="/" class="back-link">
          <i class="bi bi-arrow-left"></i> 返回首页
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.terms-section {
  min-height: 100vh;
  padding: 80px 0 60px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.terms-header {
  text-align: center;
  margin-bottom: 60px;
}

.terms-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.terms-update {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.terms-intro {
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
}

.terms-content {
  margin-bottom: 60px;
}

.terms-section {
  margin-bottom: 48px;
  padding: 32px;
  background: var(--color-bg-card);
  border-radius: 12px;
  border-left: 4px solid var(--color-primary);
}

.terms-subtitle,
.terms-item h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.05);
}

.terms-item h3 {
  font-size: 1.1rem;
}

.terms-item {
  margin-bottom: 24px;
}

.terms-item p {
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: 12px;
}

.terms-item ul {
  padding-left: 24px;
  margin-bottom: 12px;
}

.terms-item li {
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: 8px;
}

.terms-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  color: var(--color-primary-light);
  text-decoration: underline;
}

.terms-footer {
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

.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 450ms var(--ease-out-expo),
    transform 450ms var(--ease-out-expo);
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .terms-section {
    padding: 60px 0 40px;
  }

  .terms-section {
    padding: 24px;
  }

  .terms-subtitle {
    font-size: 1.3rem;
  }
}
</style>
