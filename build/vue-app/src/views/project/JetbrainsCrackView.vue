<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="project-detail">
          <header class="mb-4">
            <h1 class="fw-bold">Jetbrains-Crack</h1>
            <div class="text-muted mb-3">
              <span class="badge bg-primary me-2">开发工具</span>
              <span class="badge bg-warning me-2">工具</span>
              <span class="badge bg-info">Java</span>
            </div>
          </header>
          
          <div class="project-content">
            <h2>项目简介</h2>
            <p>作为热衷于编程学习的学生，我需要使用各种IDE进行开发学习。由于本人囊中羞涩，我开发了这个激活工具，仅供个人学习和研究使用。该工具支持IntelliJ IDEA、PyCharm、CLion等JetBrains系列IDE。</p>
            
            <div class="alert alert-warning" role="alert">
              <i class="bi bi-exclamation-triangle me-2"></i>
              <strong>免责声明：</strong>本项目仅供学习和研究使用，请支持正版软件。商业使用请购买官方授权。
            </div>
            
            <h2>学习初衷</h2>
            <p>开发这个项目是为了解JetBrains IDE的内部机制和激活原理，这让我在逆向工程和软件分析方面学到了很多知识。通过这个项目，我对Java程序的运行机制有了更深入的理解。</p>
            
            <h2>支持的产品</h2>
            <ul>
              <li><strong>IntelliJ IDEA</strong>：Java开发首选IDE</li>
              <li><strong>PyCharm</strong>：Python开发环境</li>
              <li><strong>WebStorm</strong>：JavaScript/TypeScript开发</li>
              <li><strong>CLion</strong>：C/C++开发环境</li>
              <li><strong>DataGrip</strong>：数据库管理工具</li>
              <li><strong>RubyMine</strong>：Ruby和Rails开发</li>
              <li><strong>PhpStorm</strong>：PHP开发环境</li>
              <li><strong>GoLand</strong>：Go语言开发</li>
              <li><strong>Rider</strong>：.NET开发环境</li>
            </ul>
            <h2>使用方法</h2>
            <h3>系统要求</h3>
            <ul>
              <li>Windows 10/11（推荐）</li>
              <li>已安装JetBrains IDE</li>
            </ul>
            
            <h3>使用步骤</h3>
            <ol>
              <li>下载最新版本的激活工具</li>
              <li>关闭所有JetBrains IDE</li>
              <li>运行激活脚本</li>
              <li>启动IDE输入激活码激活</li>
            </ol>
            <div class="alert alert-info" role="alert">
              <i class="bi bi-info-circle me-2"></i>
              <strong>温馨提示：</strong>Jetbrains开发这么几款好用的IDE投入了大量精力，建议支持正版软件，为开发者贡献价值。
            </div>
          </div>
          
          <footer class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <a href="https://www.u-p.vip/s/lJNviK" target="_blank" class="btn btn-outline-primary">
                  <i class="bi bi-download"></i> 下载（提取码：jetbrains）
                </a>
              </div>
              <router-link to="/projects" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left"></i> 返回项目列表
              </router-link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  </div>
</template>
