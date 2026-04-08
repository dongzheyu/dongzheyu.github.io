<template>
  <div class="emergency-page">
    <!-- Hero 区域 -->
    <section class="emergency-hero">
      <div class="container-fluid px-4">
        <div class="row align-items-center">
          <div class="col-lg-8" style="padding-left: 5%;">
            <h1 class="emergency-title mb-3">紧急求助</h1>
            <p class="emergency-subtitle mb-2">报警电话 · 心理援助 · 自救指南</p>
            <p class="emergency-desc">
              当你或身边的人遇到紧急情况时，请立即拨打相应电话求助。<br>
              本页面提供常用紧急联系电话和基本自救方法，建议收藏并分享给需要的人。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 紧急联系卡片 -->
    <section class="emergency-section">
      <div class="container">
        <h2 class="section-title mb-4">紧急联系电话</h2>
        <p class="section-subtitle mb-5">以下电话均为 24 小时服务，请根据实际情况拨打相应号码。</p>
        
        <div class="row g-4">
          <!-- 报警电话 -->
          <div class="col-lg-4 col-md-6">
            <div class="emergency-card police-card">
              <div class="card-icon">
                <i class="bi bi-telephone"></i>
              </div>
              <h3 class="card-title">报警电话</h3>
              <div class="phone-number">
                <span class="number-display">110</span>
                <span class="number-label">（公安报警）</span>
              </div>
              <p class="card-desc">
                遇到刑事、治安案件，交通事故，火灾等紧急情况时拨打。
              </p>
              <div class="card-tips">
                <strong>拨打须知：</strong>
                <ul>
                  <li>保持冷静，清晰说明事发地点</li>
                  <li>简要描述事件性质</li>
                  <li>提供尽可能多的细节信息</li>
                </ul>
              </div>
              <button class="btn call-btn" @click="simulateCall('110')">
                <i class="bi bi-telephone-outbound"></i> 模拟拨打
              </button>
            </div>
          </div>

          <!-- 急救电话 -->
          <div class="col-lg-4 col-md-6">
            <div class="emergency-card medical-card">
              <div class="card-icon">
                <i class="bi bi-heart-pulse"></i>
              </div>
              <h3 class="card-title">急救电话</h3>
              <div class="phone-number">
                <span class="number-display">120</span>
                <span class="number-label">（医疗急救）</span>
              </div>
              <p class="card-desc">
                突发疾病、意外受伤、需要紧急医疗救助时拨打。
              </p>
              <div class="card-tips">
                <strong>拨打须知：</strong>
                <ul>
                  <li>说明患者年龄、性别</li>
                  <li>描述主要症状或伤情</li>
                  <li>提供准确地址和联系方式</li>
                </ul>
              </div>
              <button class="btn call-btn" @click="simulateCall('120')">
                <i class="bi bi-telephone-outbound"></i> 模拟拨打
              </button>
            </div>
          </div>

          <!-- 火警电话 -->
          <div class="col-lg-4 col-md-6">
            <div class="emergency-card fire-card">
              <div class="card-icon">
                <i class="bi bi-fire"></i>
              </div>
              <h3 class="card-title">火警电话</h3>
              <div class="phone-number">
                <span class="number-display">119</span>
                <span class="number-label">（消防报警）</span>
              </div>
              <p class="card-desc">
                发生火灾、燃气泄漏、危险化学品事故等时拨打。
              </p>
              <div class="card-tips">
                <strong>拨打须知：</strong>
                <ul>
                  <li>说明起火地点和火势大小</li>
                  <li>报告有无人员被困</li>
                  <li>描述燃烧物质类型</li>
                </ul>
              </div>
              <button class="btn call-btn" @click="simulateCall('119')">
                <i class="bi bi-telephone-outbound"></i> 模拟拨打
              </button>
            </div>
          </div>

          <!-- 心理援助 -->
          <div class="col-lg-6">
            <div class="emergency-card mental-card">
              <div class="card-icon">
                <i class="bi bi-heart"></i>
              </div>
              <h3 class="card-title">心理援助热线</h3>
              <div class="phone-number">
                <span class="number-display">12320</span>
                <span class="number-label">（心理卫生热线）</span>
              </div>
              <p class="card-desc">
                情绪困扰、心理危机、自杀意念等心理问题求助。
              </p>
              <div class="additional-numbers">
                <div class="additional-number">
                  <span class="add-number">400-161-9995</span>
                  <span class="add-label">希望24热线（全国）</span>
                </div>
                <div class="additional-number">
                  <span class="add-number">010-82951332</span>
                  <span class="add-label">北京心理援助中心</span>
                </div>
              </div>
              <button class="btn call-btn" @click="simulateCall('12320')">
                <i class="bi bi-telephone-outbound"></i> 模拟拨打
              </button>
            </div>
          </div>

          <!-- 妇女儿童保护 -->
          <div class="col-lg-6">
            <div class="emergency-card women-card">
              <div class="card-icon">
                <i class="bi bi-person-heart"></i>
              </div>
              <h3 class="card-title">妇女儿童保护</h3>
              <div class="phone-number">
                <span class="number-display">12338</span>
                <span class="number-label">（妇女维权热线）</span>
              </div>
              <p class="card-desc">
                家庭暴力、性别歧视、妇女儿童权益侵害等求助。
              </p>
              <div class="additional-numbers">
                <div class="additional-number">
                  <span class="add-number">12355</span>
                  <span class="add-label">青少年服务台</span>
                </div>
                <div class="additional-number">
                  <span class="add-number">12309</span>
                  <span class="add-label">检察服务热线</span>
                </div>
              </div>
              <button class="btn call-btn" @click="simulateCall('12338')">
                <i class="bi bi-telephone-outbound"></i> 模拟拨打
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 自救指南 -->
    <section class="selfhelp-section">
      <div class="container">
        <h2 class="section-title mb-4">常用自救方法</h2>
        <p class="section-subtitle mb-5">在等待救援的过程中，正确的自救措施可能挽救生命。</p>
        
        <div class="accordion" id="selfHelpAccordion">
          <!-- 心肺复苏 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                <i class="bi bi-heart-pulse me-3"></i> 心肺复苏（CPR）基本步骤
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <ol>
                  <li><strong>判断意识：</strong>轻拍双肩，大声呼唤</li>
                  <li><strong>呼叫急救：</strong>立即拨打120或请他人拨打</li>
                  <li><strong>检查呼吸：</strong>观察胸腹部有无起伏（5-10秒）</li>
                  <li><strong>胸外按压：</strong>
                    <ul>
                      <li>位置：两乳头连线中点</li>
                      <li>深度：5-6厘米</li>
                      <li>频率：100-120次/分钟</li>
                      <li>让胸廓完全回弹</li>
                    </ul>
                  </li>
                  <li><strong>人工呼吸：</strong>每30次按压后2次呼吸</li>
                  <li><strong>持续进行：</strong>直到专业救援到达</li>
                </ol>
              </div>
            </div>
          </div>

          <!-- 止血方法 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                <i class="bi bi-droplet me-3"></i> 外伤止血方法
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse">
              <div class="accordion-body">
                <div class="row">
                  <div class="col-md-6">
                    <h5>直接压迫止血法</h5>
                    <ul>
                      <li>用干净纱布或布料直接压迫伤口</li>
                      <li>保持压力15-20分钟</li>
                      <li>不要频繁查看伤口</li>
                      <li>如果纱布浸透，再加一层</li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <h5>加压包扎法</h5>
                    <ul>
                      <li>在伤口上放置多层纱布</li>
                      <li>用绷带加压包扎</li>
                      <li>松紧适度，能止血又不阻断血液循环</li>
                      <li>观察肢体末端颜色和温度</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 火灾逃生 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                <i class="bi bi-fire me-3"></i> 火灾逃生要点
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse">
              <div class="accordion-body">
                <h5>基本原则：</h5>
                <ul>
                  <li><strong>报警第一：</strong>立即拨打119</li>
                  <li><strong>保持冷静：</strong>不要惊慌，迅速判断</li>
                  <li><strong>低姿前进：</strong>烟气上升，贴近地面</li>
                  <li><strong>湿毛巾捂口鼻：</strong>减少吸入有毒烟气</li>
                </ul>
                <h5 class="mt-3">不同情况应对：</h5>
                <ul>
                  <li><strong>房门发烫：</strong>不要开门，用湿布堵住门缝</li>
                  <li><strong>无法逃生：</strong>退到阳台或窗口求救</li>
                  <li><strong>楼下着火：</strong>不要向下逃生</li>
                  <li><strong>身上着火：</strong>就地打滚，不要奔跑</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 心理危机应对 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                <i class="bi bi-heart me-3"></i> 心理危机应对方法
              </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse">
              <div class="accordion-body">
                <h5>当自己感到心理危机时：</h5>
                <ul>
                  <li><strong>立即求助：</strong>拨打心理援助热线（12320）</li>
                  <li><strong>联系信任的人：</strong>告诉家人或朋友你的感受</li>
                  <li><strong>环境安全：</strong>远离危险物品和场所</li>
                  <li><strong>分散注意力：</strong>听音乐、深呼吸、数数</li>
                  <li><strong>延迟决定：</strong>不要在情绪极端时做重大决定</li>
                </ul>
                <h5 class="mt-3">帮助他人应对心理危机：</h5>
                <ul>
                  <li><strong>认真倾听：</strong>不评判，不打断</li>
                  <li><strong>表达关心：</strong>明确表示你在意对方</li>
                  <li><strong>提供陪伴：</strong>不要让对方独处</li>
                  <li><strong>寻求专业帮助：</strong>鼓励或陪同求助专业人士</li>
                  <li><strong>确保安全：</strong>移除可能的危险物品</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="notice-section">
      <div class="container">
        <div class="notice-card">
          <h3 class="notice-title">重要提醒</h3>
          <div class="notice-content">
            <div class="row">
              <div class="col-md-6">
                <div class="notice-item">
                  <i class="bi bi-exclamation-triangle"></i>
                  <h5>紧急情况处理原则</h5>
                  <p>保持冷静 → 确保安全 → 寻求帮助 → 实施救助</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="notice-item">
                  <i class="bi bi-shield-check"></i>
                  <h5>求救信息要点</h5>
                  <p>地点准确 → 情况清楚 → 联系方式 → 保持通话</p>
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <p class="mb-0"><strong>生命至上，安全第一！</strong> 掌握基本求救知识，关键时刻可能挽救生命。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟拨打电话
const simulateCall = (number: string) => {
  alert(`模拟拨打 ${number}\n\n请注意：这是模拟演示，实际紧急情况请立即拨打相应号码。\n\n手机用户可点击确定后直接拨打。`)
  // 在实际应用中，可以调用 tel: 链接
  // window.location.href = `tel:${number}`
}
</script>

