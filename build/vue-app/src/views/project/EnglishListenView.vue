<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="project-detail">
          <header class="mb-4">
            <h1 class="fw-bold">English-Listen</h1>
            <div class="text-muted mb-3">
              <span class="badge bg-primary me-2">教育</span>
              <span class="badge bg-success me-2">开源</span>
              <span class="badge bg-info">C++\QT</span>
            </div>
          </header>
          
          <div class="project-content">
            <h2>项目简介</h2>
            <p>English-Listen是一个专业的英语听力训练工具，旨在帮助用户提升英语听力水平。该工具提供了丰富的听力材料和科学的训练方法，适合不同英语水平的学习者使用。</p>
            
            <h2>核心功能</h2>
            <ul>
              <li><strong></strong>：原汁原味的系统API朗读，支持WindowsXP以上系统</li>
            </ul>
            
            <h2>技术架构</h2>
            <h3>技术栈</h3>
            <ul>
              <li><strong>QT6UI</strong>：现代化设计</li>
              <li><strong>SAPI</strong>：文字转语音</li>
            </ul>
          
          <footer class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <a href="https://github.com/dongzheyu/english-listen" target="_blank" class="btn btn-primary me-2">
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
