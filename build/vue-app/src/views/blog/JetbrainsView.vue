<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="blog-post">
          <header class="mb-4">
            <h1 class="fw-bold">JetBrains IDE使用技巧</h1>
            <div class="text-muted mb-3">
              <time datetime="2024-01-10">2024年1月10日</time> · 作者：JetCPP Team
            </div>
          </header>
          
          <div class="blog-content">
            <h2>引言</h2>
            <p>JetBrains系列IDE（IntelliJ IDEA、CLion、PyCharm等）是现代开发者的强大工具。掌握这些IDE的高级功能可以显著提升开发效率。本文将分享一些实用的技巧和最佳实践。</p>
            
            <h2>快捷键 mastery</h2>
            <h3>基础导航快捷键</h3>
            <ul>
              <li><code>Ctrl + N</code>：快速查找类</li>
              <li><code>Ctrl + Shift + N</code>：快速查找文件</li>
              <li><code>Ctrl + Shift + A</code>：查找动作</li>
              <li><code>Ctrl + E</code>：查看最近文件</li>
              <li><code>Ctrl + Shift + E</code>：查看最近编辑位置</li>
            </ul>
            
            <h3>代码编辑快捷键</h3>
            <ul>
              <li><code>Ctrl + D</code>：复制当前行</li>
              <li><code>Ctrl + Y</code>：删除当前行</li>
              <li><code>Ctrl + W</code>：逐步选择代码块</li>
              <li><code>Ctrl + Alt + T</code>：环绕代码</li>
              <li><code>Ctrl + Alt + V</code>：提取变量</li>
            </ul>
            
            <h2>代码生成与模板</h2>
            <h3>Live Templates</h3>
            <p>使用Live Templates快速生成常用代码结构：</p>
            <ul>
              <li><code>fori</code>：生成for循环</li>
              <li><code>psvm</code>：生成main方法</li>
              <li><code>sout</code>：生成System.out.println</li>
              <li><code>ifn</code>：生成if null判断</li>
            </ul>
            
            <h3>Postfix Completion</h3>
            <p>使用后缀补全简化代码编写：</p>
            <pre><code>list.for          // 生成for循环
str.sout          // 打印字符串
obj.notNull       // 生成非空判断
array.fori        // 生成索引循环</code></pre>
            
            <h2>重构工具</h2>
            <h3>安全重构</h3>
            <p>JetBrains提供了强大的重构功能：</p>
            <ul>
              <li><strong>重命名</strong>：<code>Shift + F6</code>，智能重命名变量、方法、类</li>
              <li><strong>提取方法</strong>：<code>Ctrl + Alt + M</code>，将代码块提取为方法</li>
              <li><strong>内联</strong>：<code>Ctrl + Alt + N</code>，内联变量或方法</li>
              <li><strong>改变签名</strong>：<code>Ctrl + F6</code>，修改方法参数</li>
            </ul>
            
            <h2>调试技巧</h2>
            <h3>高级断点</h3>
            <ul>
              <li><strong>条件断点</strong>：设置断点触发条件</li>
              <li><strong>日志断点</strong>：断点触发时输出日志而不暂停</li>
              <li><strong>异常断点</strong>：在异常抛出时自动暂停</li>
            </ul>
            
            <h3>调试视图</h3>
            <ul>
              <li>使用<code>Alt + F8</code>计算表达式</li>
              <li>使用监视窗口跟踪变量变化</li>
              <li>使用<code>F9</code>恢复程序执行</li>
            </ul>
            
            <h2>版本控制集成</h2>
            <h3>Git集成</h3>
            <ul>
              <li><strong>Git Blame</strong>：<code>Ctrl + Shift + A</code>搜索"Annotate"</li>
              <li><strong>分支操作</strong>：右下角快速切换分支</li>
              <li><strong>提交</strong>：<code>Ctrl + K</code>快速提交</li>
              <li><strong>推送</strong>：<code>Ctrl + Shift + K</code>推送到远程</li>
            </ul>
            
            <h2>插件生态</h2>
            <h3>推荐插件</h3>
            <ul>
              <li><strong>.ignore</strong>：支持.gitignore文件高亮</li>
              <li><strong>Rainbow Brackets</strong>：彩色括号匹配</li>
              <li><strong>Key Promoter X</strong>：提示快捷键</li>
              <li><strong>String Manipulation</strong>：字符串操作工具</li>
            </ul>
            
            <h2>性能优化</h2>
            <h3>IDE性能调优</h3>
            <ul>
              <li>调整JVM参数：<code>-Xms2g -Xmx4g</code></li>
              <li>禁用不必要的插件</li>
              <li>配置代码分析级别</li>
              <li>使用内存监视器监控使用情况</li>
            </ul>
            
            <h2>总结</h2>
            <p>掌握JetBrains IDE的高级功能需要时间和练习，但投资回报是巨大的。建议：</p>
            <ul>
              <li>从最常用的快捷键开始</li>
              <li>定期学习新功能和技巧</li>
              <li>根据个人工作流程定制IDE设置</li>
              <li>参与社区交流，学习他人经验</li>
            </ul>
          </div>
          
          <footer class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div class="tags">
                <span class="badge bg-primary me-1">JetBrains</span>
                <span class="badge bg-secondary me-1">IDE</span>
                <span class="badge bg-info">开发工具</span>
              </div>
              <router-link to="/blog" class="btn btn-outline-primary">
                <i class="bi bi-arrow-left"></i> 返回博客列表
              </router-link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-post {
  line-height: 1.8;
}

.blog-content h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.blog-content h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.blog-content pre {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0.375rem;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.blog-content code {
  background-color: #e9ecef;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.blog-content ul, .blog-content ol {
  margin-bottom: 1rem;
}

.blog-content li {
  margin-bottom: 0.5rem;
}

[data-bs-theme="dark"] .blog-content pre {
  background-color: #2d3748;
  border-color: #4a5568;
}

[data-bs-theme="dark"] .blog-content code {
  background-color: #4a5568;
  color: #e2e8f0;
}
</style>