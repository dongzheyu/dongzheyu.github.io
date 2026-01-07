<script setup lang="ts">
</script>
<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="project-detail">
          <header class="mb-4">
            <h1 class="fw-bold">GoodMinecraft</h1>
            <div class="text-muted mb-3">
              <span class="badge bg-primary me-2">优化</span>
              <span class="badge bg-success me-2">美观</span>
              <span class="badge bg-info">高性能</span>
            </div>
          </header>
          <div class="project-content">
            <h2>项目简介</h2>
            <p>GoodMinecraft整合包是一个集合与各种优化和高性能的Minecraft的整合包</p>
            <h2>核心组件</h2>
            <ul>
              <li><strong>原汁原味的原版体验</strong></li>
              <li><strong>钠、钠拓展、Iris性能优化</strong></li>
              <li><strong>各种提升原版体验的mod</strong></li>
              <li><strong>各种美观整合包任您挑选</strong></li>
            </ul>
          </div>
          <footer class="mb-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <a href="https://modrinth.com/modpack/goodm" target="_blank" class="btn btn-primary me-2">
                  <i class="bi bi-github"></i> modrinth
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
<style scoped>
.project-detail {
  line-height: 1.8;
}

.project-content h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.project-content h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.project-content h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.project-content pre {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0.375rem;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.project-content code {
  background-color: #e9ecef;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.project-content ul, .project-content ol {
  margin-bottom: 1rem;
}

.project-content li {
  margin-bottom: 0.5rem;
}
</style>