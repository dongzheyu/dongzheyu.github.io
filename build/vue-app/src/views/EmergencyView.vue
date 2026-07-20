<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ReadingProgress from '@/components/ReadingProgress.vue'

const simulateCall = (number: string) => {
  alert(`模拟拨打 ${number}\n\n紧急情况请立即拨打相应号码。`)
}
</script>

<template>
  <div>
    <ReadingProgress />

    <section class="page-head">
      <h1>
        <span>$ cat emergency.md</span><br>
        <span style="font-size:var(--font-size-lg); color:rgba(255,255,255,0.85);">紧急求助 · 报警电话 · 自救指南</span>
      </h1>
      <p class="subtitle" style="transform:translateX(40px);">当你或身边的人遇到紧急情况时，请立即拨打相应电话求助。</p>
    </section>

    <section class="mb-60" style="padding-left:40px;">
      <h2 class="section-title">// 紧急联系电话</h2>
      <p class="text-dim mb-40">以下电话均为 24 小时服务</p>

      <div class="grid-3 mb-40">
        <div class="card-geek">
          <Icon icon="mdi:phone" width="28" style="color:rgba(255,255,255,0.45); margin-bottom:12px;" />
          <div style="font-size:var(--font-size-lg); color:rgba(255,255,255,0.85); letter-spacing:0.06em;">110</div>
          <span class="text-dim" style="font-size:var(--font-size-xs);">公安报警</span>
          <p class="text-dim mt-20">刑事、治安案件，交通事故，火灾等紧急情况。</p>
          <div class="text-dim" style="font-size:var(--font-size-xs); margin:12px 0 20px;">
            保持冷静 · 说明地点 · 描述事件
          </div>
          <button class="btn-geek" @click="simulateCall('110')">
            <Icon icon="mdi:phone-outgoing" width="14" /> 模拟拨打
          </button>
        </div>

        <div class="card-geek">
          <Icon icon="mdi:heart-pulse" width="28" style="color:rgba(255,255,255,0.45); margin-bottom:12px;" />
          <div style="font-size:var(--font-size-lg); color:rgba(255,255,255,0.85); letter-spacing:0.06em;">120</div>
          <span class="text-dim" style="font-size:var(--font-size-xs);">医疗急救</span>
          <p class="text-dim mt-20">突发疾病、意外受伤、需要紧急医疗救助。</p>
          <div class="text-dim" style="font-size:var(--font-size-xs); margin:12px 0 20px;">
            患者情况 · 准确地址 · 联系方式
          </div>
          <button class="btn-geek" @click="simulateCall('120')">
            <Icon icon="mdi:phone-outgoing" width="14" /> 模拟拨打
          </button>
        </div>

        <div class="card-geek">
          <Icon icon="mdi:fire" width="28" style="color:rgba(255,255,255,0.45); margin-bottom:12px;" />
          <div style="font-size:var(--font-size-lg); color:rgba(255,255,255,0.85); letter-spacing:0.06em;">119</div>
          <span class="text-dim" style="font-size:var(--font-size-xs);">消防报警</span>
          <p class="text-dim mt-20">火灾、燃气泄漏、危险化学品事故。</p>
          <div class="text-dim" style="font-size:var(--font-size-xs); margin:12px 0 20px;">
            起火地点 · 火势大小 · 被困人员
          </div>
          <button class="btn-geek" @click="simulateCall('119')">
            <Icon icon="mdi:phone-outgoing" width="14" /> 模拟拨打
          </button>
        </div>
      </div>

      <div class="card-geek mb-40">
        <div style="font-size:var(--font-size-base); color:rgba(255,255,255,0.82); margin-bottom:24px;">
          <Icon icon="mdi:view-grid" width="18" style="margin-right:8px;" />完整报警电话速查
        </div>

        <div class="flex flex-col gap-24">
          <div>
            <div class="tag-pill mb-12">核心报警与救援</div>
            <div class="flex flex-col gap-8" style="padding-left:12px;">
              <div class="flex gap-24 text-dim" style="font-size:var(--font-size-xs);"><span style="color:rgba(255,255,255,0.82); min-width:60px;">110</span><span>公安报警电话</span><span style="color:var(--color-text-faint);">—— 受理刑事、治安案件</span></div>
              <div class="flex gap-24 text-dim" style="font-size:var(--font-size-xs);"><span style="color:rgba(255,255,255,0.82); min-width:60px;">119</span><span>火警报警电话</span><span style="color:var(--color-text-faint);">—— 火灾、爆炸等灾害事故</span></div>
              <div class="flex gap-24 text-dim" style="font-size:var(--font-size-xs);"><span style="color:rgba(255,255,255,0.82); min-width:60px;">120</span><span>医疗急救电话</span><span style="color:var(--color-text-faint);">—— 突发疾病或事故伤害</span></div>
              <div class="flex gap-24 text-dim" style="font-size:var(--font-size-xs);"><span style="color:rgba(255,255,255,0.82); min-width:60px;">122</span><span>交通事故报警</span><span style="color:var(--color-text-faint);">—— 道路交通事故</span></div>
            </div>
          </div>

          <div>
            <div class="tag-pill mb-12">特殊情况报警</div>
            <div class="flex flex-col gap-8" style="padding-left:12px;">
              <div class="flex gap-24 text-dim" style="font-size:var(--font-size-xs);"><span style="color:rgba(255,255,255,0.82); min-width:60px;">12110</span><span>短信报警</span><span style="color:var(--color-text-faint);">—— 不便语音通话时使用</span></div>
            </div>
          </div>

          <div>
            <div class="tag-pill mb-12">特定场景专用</div>
            <div class="flex flex-col gap-8" style="padding-left:12px;">
              <div class="flex gap-24 text-dim" style="font-size:var(--font-size-xs);"><span style="color:rgba(255,255,255,0.82); min-width:60px;">12395</span><span>水上遇险</span><span style="color:var(--color-text-faint);">—— 船舶遇险、人员落水</span></div>
              <div class="flex gap-24 text-dim" style="font-size:var(--font-size-xs);"><span style="color:rgba(255,255,255,0.82); min-width:60px;">12119</span><span>森林火警</span><span style="color:var(--color-text-faint);">—— 森林、草原火灾</span></div>
              <div class="flex gap-24 text-dim" style="font-size:var(--font-size-xs);"><span style="color:rgba(255,255,255,0.82); min-width:60px;">112</span><span>紧急呼叫</span><span style="color:var(--color-text-faint);">—— 无SIM卡也可拨打</span></div>
            </div>
          </div>

          <div>
            <div class="tag-pill mb-12">其他常用服务</div>
            <div class="flex flex-col gap-8" style="padding-left:12px;">
              <div class="flex gap-24 text-dim" style="font-size:var(--font-size-xs);"><span style="color:rgba(255,255,255,0.82); min-width:60px;">12121</span><span>天气预报</span></div>
              <div class="flex gap-24 text-dim" style="font-size:var(--font-size-xs);"><span style="color:rgba(255,255,255,0.82); min-width:60px;">12117</span><span>报时服务</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card-geek">
          <Icon icon="mdi:heart" width="28" style="color:rgba(255,255,255,0.45); margin-bottom:12px;" />
          <div style="font-size:var(--font-size-lg); color:rgba(255,255,255,0.85); letter-spacing:0.06em;">12320</div>
          <span class="text-dim" style="font-size:var(--font-size-xs);">心理卫生热线</span>
          <p class="text-dim mt-20">情绪困扰、心理危机、自杀意念等求助。</p>
          <div class="flex flex-col gap-8 text-dim" style="font-size:var(--font-size-xs); margin:12px 0;">
            <span><span style="color:rgba(255,255,255,0.72);">400-161-9995</span> 希望24热线</span>
            <span><span style="color:rgba(255,255,255,0.72);">010-82951332</span> 北京心理援助</span>
          </div>
          <button class="btn-geek" @click="simulateCall('12320')">
            <Icon icon="mdi:phone-outgoing" width="14" /> 模拟拨打
          </button>
        </div>

        <div class="card-geek">
          <Icon icon="mdi:account-heart" width="28" style="color:rgba(255,255,255,0.45); margin-bottom:12px;" />
          <div style="font-size:var(--font-size-lg); color:rgba(255,255,255,0.85); letter-spacing:0.06em;">12338</div>
          <span class="text-dim" style="font-size:var(--font-size-xs);">妇女维权热线</span>
          <p class="text-dim mt-20">家庭暴力、性别歧视、妇女儿童权益侵害。</p>
          <div class="flex flex-col gap-8 text-dim" style="font-size:var(--font-size-xs); margin:12px 0;">
            <span><span style="color:rgba(255,255,255,0.72);">12355</span> 青少年服务台</span>
            <span><span style="color:rgba(255,255,255,0.72);">12309</span> 检察服务热线</span>
          </div>
          <button class="btn-geek" @click="simulateCall('12338')">
            <Icon icon="mdi:phone-outgoing" width="14" /> 模拟拨打
          </button>
        </div>
      </div>
    </section>

    <section class="mb-60" style="padding-left:40px;">
      <h2 class="section-title">// 常用自救方法</h2>
      <p class="text-dim mb-40">在等待救援的过程中，正确的自救措施可能挽救生命。</p>

      <div class="flex flex-col gap-16">
        <details class="card-geek" open>
          <summary style="cursor:pointer; color:rgba(255,255,255,0.82); font-size:var(--font-size-base);">
            <Icon icon="mdi:heart-pulse" width="18" style="margin-right:8px;" /> 心肺复苏（CPR）基本步骤
          </summary>
          <div class="mt-20 text-dim" style="padding-left:12px;">
            <ol style="display:flex; flex-direction:column; gap:8px; padding-left:20px;">
              <li><strong style="color:rgba(255,255,255,0.72);">判断意识：</strong>轻拍双肩，大声呼唤</li>
              <li><strong style="color:rgba(255,255,255,0.72);">呼叫急救：</strong>立即拨打120</li>
              <li><strong style="color:rgba(255,255,255,0.72);">检查呼吸：</strong>观察胸腹部 5-10 秒</li>
              <li><strong style="color:rgba(255,255,255,0.72);">胸外按压：</strong>两乳头连线中点，5-6cm 深度，100-120次/分</li>
              <li><strong style="color:rgba(255,255,255,0.72);">人工呼吸：</strong>每30次按压后2次呼吸</li>
              <li><strong style="color:rgba(255,255,255,0.72);">持续进行：</strong>直到专业救援到达</li>
            </ol>
          </div>
        </details>

        <details class="card-geek">
          <summary style="cursor:pointer; color:rgba(255,255,255,0.82); font-size:var(--font-size-base);">
            <Icon icon="mdi:water" width="18" style="margin-right:8px;" /> 外伤止血方法
          </summary>
          <div class="mt-20 text-dim" style="padding-left:12px;">
            <div class="grid-2">
              <div>
                <div style="color:rgba(255,255,255,0.72); margin-bottom:8px;">直接压迫止血法</div>
                <ul style="display:flex; flex-direction:column; gap:4px; padding-left:16px; font-size:var(--font-size-xs);">
                  <li>干净纱布直接压迫伤口</li>
                  <li>保持压力 15-20 分钟</li>
                  <li>不要频繁查看伤口</li>
                  <li>纱布浸透则再加一层</li>
                </ul>
              </div>
              <div>
                <div style="color:rgba(255,255,255,0.72); margin-bottom:8px;">加压包扎法</div>
                <ul style="display:flex; flex-direction:column; gap:4px; padding-left:16px; font-size:var(--font-size-xs);">
                  <li>伤口上放置多层纱布</li>
                  <li>绷带加压包扎</li>
                  <li>松紧适度，能止血又不阻断血循环</li>
                  <li>观察肢体末端颜色</li>
                </ul>
              </div>
            </div>
          </div>
        </details>

        <details class="card-geek">
          <summary style="cursor:pointer; color:rgba(255,255,255,0.82); font-size:var(--font-size-base);">
            <Icon icon="mdi:fire" width="18" style="margin-right:8px;" /> 火灾逃生要点
          </summary>
          <div class="mt-20 text-dim" style="padding-left:12px;">
            <div style="color:rgba(255,255,255,0.72); margin-bottom:8px;">基本原则：</div>
            <ul style="display:flex; flex-direction:column; gap:4px; padding-left:16px; font-size:var(--font-size-xs);">
              <li>立即拨打 119</li>
              <li>保持冷静，低姿前进</li>
              <li>湿毛巾捂口鼻</li>
              <li>房门发烫则堵住门缝，退到阳台求救</li>
              <li>身上着火就地打滚</li>
            </ul>
          </div>
        </details>

        <details class="card-geek">
          <summary style="cursor:pointer; color:rgba(255,255,255,0.82); font-size:var(--font-size-base);">
            <Icon icon="mdi:heart" width="18" style="margin-right:8px;" /> 心理危机应对方法
          </summary>
          <div class="mt-20 text-dim" style="padding-left:12px;">
            <div class="grid-2">
              <div>
                <div style="color:rgba(255,255,255,0.72); margin-bottom:8px;">当自己感到心理危机时</div>
                <ul style="display:flex; flex-direction:column; gap:4px; padding-left:16px; font-size:var(--font-size-xs);">
                  <li>立即拨打心理援助热线</li>
                  <li>联系信任的人</li>
                  <li>远离危险物品和场所</li>
                  <li>分散注意力，深呼吸</li>
                  <li>不要在情绪极端时做重大决定</li>
                </ul>
              </div>
              <div>
                <div style="color:rgba(255,255,255,0.72); margin-bottom:8px;">帮助他人应对心理危机</div>
                <ul style="display:flex; flex-direction:column; gap:4px; padding-left:16px; font-size:var(--font-size-xs);">
                  <li>认真倾听，不评判</li>
                  <li>表达关心和在意</li>
                  <li>不要让对方独处</li>
                  <li>鼓励或陪同求助专业人士</li>
                  <li>移除可能的危险物品</li>
                </ul>
              </div>
            </div>
          </div>
        </details>
      </div>
    </section>

    <section class="mb-60" style="padding-left:40px;">
      <h2 class="section-title">// 重要提醒</h2>
      <div class="card-geek">
        <div class="grid-2 mb-20">
          <div>
            <Icon icon="mdi:alert" width="20" style="color:rgba(255,255,255,0.45); margin-bottom:8px;" />
            <div style="color:rgba(255,255,255,0.72); margin-bottom:4px;">紧急情况处理原则</div>
            <p class="text-dim" style="font-size:var(--font-size-xs);">保持冷静 → 确保安全 → 寻求帮助 → 实施救助</p>
          </div>
          <div>
            <Icon icon="mdi:shield-check" width="20" style="color:rgba(255,255,255,0.45); margin-bottom:8px;" />
            <div style="color:rgba(255,255,255,0.72); margin-bottom:4px;">求救信息要点</div>
            <p class="text-dim" style="font-size:var(--font-size-xs);">地点准确 → 情况清楚 → 联系方式 → 保持通话</p>
          </div>
        </div>
        <p class="text-center text-dim" style="font-size:var(--font-size-xs);">
          <strong style="color:rgba(255,255,255,0.72);">生命至上，安全第一！</strong> 掌握基本求救知识，关键时刻可能挽救生命。
        </p>
      </div>
    </section>
  </div>
</template>