<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="project-detail">
          <header class="mb-4">
            <h1 class="fw-bold">Github-Clone</h1>
            <div class="text-muted mb-3">
              <span class="badge bg-primary me-2">工具</span>
              <span class="badge bg-success me-2">开源</span>
              <span class="badge bg-info">Python</span>
            </div>
          </header>
          
          <div class="project-content">
            <h2>项目简介</h2>
            <p>作为一个热爱开源技术的学生，我经常需要研究和学习各种开源项目。为了更方便地管理这些项目，我开发了Github-Clone工具，可以批量下载和管理GitHub项目。这个工具特别适合学习和研究多个开源项目，提高学习效率。</p>
            
            <h2>开发背景</h2>
            <p>在学习编程的过程中，我经常需要研究不同的开源项目来提升自己的技能。手动一个个克隆仓库非常耗时，所以我决定开发这个工具来自动化这个过程。通过这个项目，我不仅解决了实际问题，还学习了Python的多线程和网络编程。</p>
            
            <h2>主要功能</h2>
            <ul>
              <li><strong>批量克隆</strong>：支持一次性克隆多个GitHub仓库</li>
              <li><strong>智能过滤</strong>：可以根据语言、星标数、更新时间等条件筛选仓库</li>
              <li><strong>进度显示</strong>：实时显示克隆进度和状态</li>
              <li><strong>断点续传</strong>：支持中断后继续克隆</li>
              <li><strong>分类管理</strong>：按用户或组织自动分类存储</li>
            </ul>
            
            <h2>技术学习</h2>
            <h3>核心技术栈</h3>
            <ul>
              <li><strong>Python 3.8+</strong>：主要开发语言</li>
              <li><strong>GitHub API</strong>：获取仓库信息</li>
              <li><strong>Git命令</strong>：执行克隆操作</li>
              <li><strong>多线程</strong>：提高克隆效率</li>
            </ul>
            
            <h3>项目结构</h3>
            <pre><code>├── github_clone/
│   ├── __init__.py
│   ├── api.py          # GitHub API交互
│   ├── git_handler.py  # Git操作封装
│   ├── filter.py       # 仓库过滤逻辑
│   ├── progress.py     # 进度显示
│   └── main.py         # 主程序入口</code></pre>
            
            <h2>使用方法</h2>
            <h3>安装依赖</h3>
            <pre><code>pip install requests gitpython tqdm</code></pre>
            
            <h3>基本用法</h3>
            <pre><code># 克隆单个用户的所有仓库
python github_clone.py --user dongzheyu

# 按语言筛选
python github_clone.py --user dongzheyu --language python

# 限制克隆数量
python github_clone.py --user dongzheyu --limit 10</code></pre>
            
            <h3>学习模式</h3>
            <pre><code># 只克隆有特定星标的仓库（适合研究高质量项目）
python github_clone.py --user dongzheyu --min-stars 50

# 排除fork仓库（只关注原创项目）
python github_clone.py --user dongzheyu --no-forks

# 指定保存目录
python github_clone.py --user dongzheyu --output ./study-projects</code></pre>
            
            <h2>配置文件</h2>
            <p>支持通过配置文件自定义设置：</p>
            <pre><code>{
    "github_token": "your_token_here",
    "default_output": "./github_repos",
    "max_concurrent": 3,
    "timeout": 30,
    "exclude_patterns": ["*.exe", "*.dll"],
    "study_mode": true
}</code></pre>
            
            <h2>学习心得</h2>
            <h3>并发控制</h3>
            <ul>
              <li>学习了线程池的使用方法</li>
              <li>理解了API限速的重要性</li>
              <li>掌握了缓存机制的实现</li>
            </ul>
            
            <h3>编程技能提升</h3>
            <ul>
              <li>Python多线程编程</li>
              <li>网络请求处理</li>
              <li>错误处理和异常管理</li>
              <li>命令行参数解析</li>
            </ul>
            
            <h2>遇到的挑战</h2>
            <h3>API限制</h3>
            <p>GitHub API有访问频率限制，我通过以下方式解决：</p>
            <ul>
              <li>使用Personal Access Token提高限制</li>
              <li>合理设置并发数量</li>
              <li>实现指数退避重试机制</li>
            </ul>
            
            <h3>学习收获</h3>
            <ul>
              <li>支持代理配置</li>
              <li>自动重试失败的请求</li>
              <li>超时设置和错误处理</li>
            </ul>
            
            <h2>未来计划</h2>
            <ul>
              <li>[ ] 支持GitLab等其他平台</li>
              <li>[ ] 添加图形界面</li>
              <li>[ ] 实现仓库分析功能</li>
              <li>[ ] 添加学习笔记功能</li>
            </ul>
            
            <h2>学习建议</h2>
            <p>如果你也想学习如何开发类似工具：</p>
            <ul>
              <li>从简单的命令行工具开始</li>
              <li>学习Python的网络编程</li>
              <li>了解GitHub API的使用</li>
              <li>实践多线程编程</li>
            </ul>
          </div>
          
          <footer class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <a href="https://github.com/dongzheyu/github-clone" target="_blank" class="btn btn-primary me-2">
                  <i class="bi bi-github"></i> 查看源码
                </a>
                <a href="https://github.com/dongzheyu/github-clone/releases" target="_blank" class="btn btn-outline-primary">
                  <i class="bi bi-download"></i> 下载
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

[data-bs-theme="dark"] .project-content pre {
  background-color: #2d3748;
  border-color: #4a5568;
}

[data-bs-theme="dark"] .project-content code {
  background-color: #4a5568;
  color: #e2e8f0;
}
</style>