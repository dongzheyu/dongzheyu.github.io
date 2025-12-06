<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="project-detail">
          <header class="mb-4">
            <h1 class="fw-bold">Minecraft Tools</h1>
            <div class="text-muted mb-3">
              <span class="badge bg-primary me-2">便捷</span>
              <span class="badge bg-success me-2">快速</span>
              <span class="badge bg-info">C++</span>
            </div>
          </header>
          <div class="project-content">
            <h2>项目简介</h2>
            <p>Minecraft-Tools是一个便捷、快速的我的世界工具箱</p>
            <h2>核心功能</h2>
            <ul>
              <li><strong>功能丰富</strong>：集成多种我的世界工具、网站，按按键盘即可使用</li>
            </ul>
            <h2>技术架构</h2>
            <h3>技术栈</h3>
            <ul>
              <li><strong>C++</strong></li>
            </ul>
            <footer class="mt-5">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <a href="https://github.com/dongzheyu/minecraft-tools" class="btn btn-outline-primary">
                    <i class="bi bi-github"></i> 查看源码
                  </a>
                </div>
                <router-link to="/projects" class="btn btn-outline-secondary">
                  <i class="bi bi-arrow-left"></i> 返回项目列表
                </router-link>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>