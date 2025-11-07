<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="project-detail">
          <header class="mb-4">
            <h1 class="fw-bold">Minecraft-Toos_Help</h1>
            <div class="text-muted mb-3">
              <span class="badge bg-primary me-2">帮助文档</span>
              <span class="badge bg-success me-2">开源</span>
              <span class="badge bg-info">Markdown</span>
            </div>
          </header>
          
          <div class="project-content">
            <h2>项目简介</h2>
            <p>Minecraft-Toos_Help是Minecraft-Toos工具的详细帮助文档和用户指南。该项目为Minecraft-Toos提供了完整的使用说明、故障排除指南和最佳实践，帮助用户充分利用工具的各项功能。</p>
            
            <h2>文档结构</h2>
            <ul>
              <li><strong>快速入门</strong>：新用户快速上手指南</li>
              <li><strong>功能详解</strong>：各项功能的详细说明</li>
              <li><strong>配置指南</strong>：高级配置和优化</li>
              <li><strong>故障排除</strong>：常见问题解决方案</li>
              <li><strong>API文档</strong>：开发者接口说明</li>
              <li><strong>更新日志</strong>：版本更新记录</li>
            </ul>
            
            <h2>技术规格</h2>
            <h3>文档格式</h3>
            <ul>
              <li><strong>Markdown</strong>：主要文档格式</li>
              <li><strong>GitHub Pages</strong>：在线托管</li>
              <li><strong>Jekyll</strong>：静态网站生成</li>
              <li><strong>MathJax</strong>：数学公式渲染</li>
              <li><strong>Mermaid</strong>：图表和流程图</li>
            </ul>
            
            <h3>文档架构</h3>
            <pre><code>├── minecraft-toos-help/
│   ├── docs/                       # 文档内容
│   │   ├── getting-started/        # 快速入门
│   │   ├── features/               # 功能说明
│   │   ├── configuration/          # 配置指南
│   │   ├── troubleshooting/        # 故障排除
│   │   ├── api/                    # API文档
│   │   └── changelog/              # 更新日志
│   ├── assets/                     # 静态资源
│   │   ├── images/                 # 图片资源
│   │   ├── videos/                 # 视频教程
│   │   └── css/                    # 样式文件
│   ├── _config.yml                 # Jekyll配置
│   ├── index.md                    # 首页
│   └── README.md                   # 项目说明</code></pre>
            
            <h2>内容体系</h2>
            <h3>快速入门</h3>
            <h4>安装指南</h4>
            <ul>
              <li>系统要求检查</li>
              <li>下载和安装步骤</li>
              <li>首次启动配置</li>
              <li>基本设置介绍</li>
            </ul>
            
            <h4>基础操作</h4>
            <ul>
              <li>界面布局说明</li>
              <li>基本功能使用</li>
              <li>常用快捷键</li>
              <li>工作流程介绍</li>
            </ul>
            
            <h3>功能详解</h3>
            <h4>资源包管理</h4>
            <ul>
              <li>资源包安装方法</li>
              <li>兼容性检查</li>
              <li>优先级设置</li>
              <li>故障排除</li>
            </ul>
            
            <h4>模组管理</h4>
            <ul>
              <li>模组安装和卸载</li>
              <li>依赖关系管理</li>
              <li>版本兼容性</li>
              <li>冲突解决</li>
            </ul>
            
            <h4>世界备份</h4>
            <ul>
              <li>自动备份设置</li>
              <li>手动备份操作</li>
              <li>备份恢复方法</li>
              <li>云端备份配置</li>
            </ul>
            
            <h3>配置指南</h3>
            <h4>基础配置</h4>
            <pre><code># 基本配置示例
{
    "minecraft_path": "~/.minecraft",
    "language": "zh_CN",
    "theme": "dark",
    "auto_update": true
}</code></pre>
            
            <h4>高级配置</h4>
            <ul>
              <li>性能优化设置</li>
              <li>网络配置选项</li>
              <li>安全设置</li>
              <li>自定义样式</li>
            </ul>
            
            <h3>故障排除</h3>
            <h4>常见问题</h4>
            <ul>
              <li><strong>启动失败</strong>：Java环境配置问题</li>
              <li><strong>模组加载错误</strong>：版本不兼容</li>
              <li><strong>备份失败</strong>：权限或空间不足</li>
              <li><strong>性能问题</strong>：内存或CPU限制</li>
            </ul>
            
            <h4>错误代码</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>错误代码</th>
                  <th>问题描述</th>
                  <th>解决方案</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>E001</td>
                  <td>Java环境未找到</td>
                  <td>安装Java 17或更高版本</td>
                </tr>
                <tr>
                  <td>E002</td>
                  <td>Minecraft目录无效</td>
                  <td>检查路径配置和权限</td>
                </tr>
                <tr>
                  <td>E003</td>
                  <td>网络连接失败</td>
                  <td>检查防火墙和代理设置</td>
                </tr>
                <tr>
                  <td>E004</td>
                  <td>内存不足</td>
                  <td>增加JVM内存分配</td>
                </tr>
              </tbody>
            </table>
            
            <h3>API文档</h3>
            <h4>REST API</h4>
            <pre><code># 获取模组列表
GET /api/mods?version=1.19.2

# 安装模组
POST /api/mods/install
{
    "mod_id": "fabric-api",
    "version": "0.14.0"
}

# 创建备份
POST /api/backup/create
{
    "world_name": "world",
    "backup_type": "full"
}</code></pre>
            
            <h4>插件开发</h4>
            <ul>
              <li>插件API接口</li>
              <li>事件系统</li>
              <li>钩子函数</li>
              <li>示例代码</li>
            </ul>
            
            <h2>文档维护</h2>
            <h3>更新流程</h3>
            <ol>
              <li>功能更新文档同步</li>
              <li>用户反馈收集</li>
              <li>文档内容审核</li>
              <li>版本发布更新</li>
            </ol>
            
            <h3>质量保证</h3>
            <ul>
              <li>文档内容审核</li>
              <li>链接有效性检查</li>
              <li>代码示例验证</li>
              <li>用户反馈处理</li>
            </ul>
            
            <h2>多语言支持</h2>
            <h3>支持语言</h3>
            <ul>
              <li>简体中文 (zh-CN)</li>
              <li>繁体中文 (zh-TW)</li>
              <li>英语 (en-US)</li>
              <li>日语 (ja-JP)</li>
            </ul>
            
            <h3>翻译贡献</h3>
            <ul>
              <li>翻译流程</li>
              <li>术语统一</li>
              <li>质量审核</li>
              <li>社区协作</li>
            </ul>
            
            <h2>搜索功能</h2>
            <h3>全文搜索</h3>
            <ul>
              <li>关键词搜索</li>
              <li>高级搜索语法</li>
              <li>搜索结果排序</li>
              <li>搜索历史记录</li>
            </ul>
            
            <h3>搜索优化</h3>
            <ul>
              <li>索引构建</li>
              <li>同义词扩展</li>
              <li>相关性算法</li>
              <li>搜索分析</li>
            </ul>
            
            <h2>用户反馈</h2>
            <h3>反馈渠道</h3>
            <ul>
              <li>GitHub Issues</li>
              <li>邮件反馈</li>
              <li>社区论坛</li>
              <li>在线调查</li>
            </ul>
            
            <h3>反馈处理</h3>
            <ul>
              <li>问题分类</li>
              <li>优先级评估</li>
              <li>解决方案制定</li>
              <li>用户通知</li>
            </ul>
            
            <h2>性能优化</h2>
            <h3>网站优化</h3>
            <ul>
              <li>页面加载优化</li>
              <li>图片压缩</li>
              <li>CDN加速</li>
              <li>缓存策略</li>
            </ul>
            
            <h3>搜索优化</h3>
            <ul>
              <li>搜索索引优化</li>
              <li>查询性能提升</li>
              <li>结果缓存</li>
              <li>搜索分析</li>
            </ul>
            
            <h2>开发计划</h2>
            <ul>
              <li>[ ] 交互式教程</li>
              <li>[ ] 视频指南</li>
              <li>[ ] 离线版本</li>
              <li>[ ] 移动端适配</li>
              <li>[ ] AI智能助手</li>
            </ul>
            
            <h2>贡献指南</h2>
            <p>欢迎参与文档改进：</p>
            <ul>
              <li>内容贡献和修正</li>
              <li>翻译和本地化</li>
              <li>示例代码提供</li>
              <li>用户体验改进</li>
            </ul>
          </div>
          
          <footer class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <a href="https://github.com/dongzheyu/minecraft-toos-help" target="_blank" class="btn btn-primary me-2">
                  <i class="bi bi-github"></i> 查看源码
                </a>
                <a href="https://help.minecraft-toos.com" target="_blank" class="btn btn-outline-primary">
                  <i class="bi bi-book"></i> 查看文档
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

.table {
  margin: 1rem 0;
}

[data-bs-theme="dark"] .project-content pre {
  background-color: #2d3748;
  border-color: #4a5568;
}

[data-bs-theme="dark"] .project-content code {
  background-color: #4a5568;
  color: #e2e8f0;
}

[data-bs-theme="dark"] .table {
  --bs-table-bg: #2d3748;
  --bs-table-striped-bg: #374151;
  --bs-table-color: #e2e8f0;
}
</style>