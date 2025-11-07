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
            <p>Jetbrains-Crack是一个JetBrains系列IDE激活工具，支持IntelliJ IDEA、PyCharm、WebStorm、CLion等所有JetBrains产品。该工具旨在为开发者提供便捷的IDE激活解决方案。</p>
            
            <div class="alert alert-warning" role="alert">
              <i class="bi bi-exclamation-triangle me-2"></i>
              <strong>免责声明：</strong>本项目仅供学习和研究使用，请支持正版软件。商业使用请购买官方授权。
            </div>
            
            <h2>支持的产品</h2>
            <ul>
              <li><strong>IntelliJ IDEA</strong>：Ultimate和Community版本</li>
              <li><strong>PyCharm</strong>：Professional和Community版本</li>
              <li><strong>WebStorm</strong>：JavaScript/TypeScript IDE</li>
              <li><strong>CLion</strong>：C/C++ IDE</li>
              <li><strong>DataGrip</strong>：数据库管理工具</li>
              <li><strong>RubyMine</strong>：Ruby和Rails IDE</li>
              <li><strong>PhpStorm</strong>：PHP IDE</li>
              <li><strong>GoLand</strong>：Go语言IDE</li>
              <li><strong>Rider</strong>：.NET IDE</li>
            </ul>
            
            <h2>主要功能</h2>
            <ul>
              <li><strong>一键激活</strong>：简单快捷的激活流程</li>
              <li><strong>自动检测</strong>：自动识别已安装的JetBrains产品</li>
              <li><strong>版本兼容</strong>：支持最新版本和旧版本</li>
              <li><strong>重置试用</strong>：重置30天试用期</li>
              <li><strong>离线激活</strong>：支持离线环境激活</li>
            </ul>
            
            <h2>技术实现</h2>
            <h3>激活原理</h3>
            <p>基于JetBrains IDE的许可证验证机制：</p>
            <ul>
              <li>修改许可证验证逻辑</li>
              <li>模拟许可证服务器响应</li>
              <li>绕过在线验证检查</li>
            </ul>
            
            <h3>核心代码结构</h3>
            <pre><code>├── jetbrains-crack/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/jetcpp/cracker/
│   │   │   │       ├── core/        # 核心激活逻辑
│   │   │   │       ├── utils/       # 工具类
│   │   │   │       ├── config/      # 配置管理
│   │   │   │       └── ui/          # 用户界面
│   │   │   └── resources/
│   │   └── test/
│   ├── agent/                         # Java Agent
│   └── scripts/                       # 安装脚本</code></pre>
            
            <h2>使用方法</h2>
            <h3>系统要求</h3>
            <ul>
              <li>Java 8或更高版本</li>
              <li>Windows 10/11, macOS 10.14+, Linux</li>
              <li>已安装JetBrains IDE</li>
            </ul>
            
            <h3>激活步骤</h3>
            <ol>
              <li>下载最新版本的Jetbrains-Crack</li>
              <li>关闭所有JetBrains IDE</li>
              <li>运行激活工具</li>
              <li>选择要激活的IDE</li>
              <li>点击"激活"按钮</li>
              <li>启动IDE验证激活状态</li>
            </ol>
            
            <h3>重置试用</h3>
            <pre><code># 使用命令行重置
java -jar jetbrains-crack.jar --reset-trial

# 或使用图形界面
1. 启动工具
2. 选择"重置试用"选项
3. 选择目标IDE
4. 确认重置</code></pre>
            
            <h2>配置选项</h2>
            <h3>激活配置</h3>
            <pre><code>{
    "license": {
        "type": "commercial",
        "user": "JetCPP User",
        "expiration": "2099-12-31"
    },
    "auto_update": true,
        "backup_original": true,
    "log_level": "INFO"
}</code></pre>
            
            <h3>高级选项</h3>
            <ul>
              <li><strong>自动更新</strong>：自动检查和更新激活状态</li>
              <li><strong>备份原文件</strong>：激活前备份原始文件</li>
              <li><strong>日志记录</strong>：详细的操作日志</li>
              <li><strong>静默模式</strong>：后台运行无界面</li>
            </ul>
            
            <h2>故障排除</h2>
            <h3>常见问题</h3>
            <ul>
              <li><strong>激活失败</strong>：检查IDE版本和权限</li>
              <li><strong>许可证过期</strong>：重新运行激活工具</li>
              <li><strong>无法启动</strong>：检查Java环境和防火墙</li>
            </ul>
            
            <h3>调试模式</h3>
            <pre><code># 启用调试日志
java -jar jetbrains-crack.jar --debug

# 查看详细错误信息
java -jar jetbrains-crack.jar --verbose</code></pre>
            
            <h2>安全说明</h2>
            <h3>隐私保护</h3>
            <ul>
              <li>不收集用户个人信息</li>
              <li>不上传使用数据到远程服务器</li>
              <li>本地计算激活码</li>
            </ul>
            
            <h3>安全建议</h3>
            <ul>
              <li>从官方渠道下载</li>
              <li>验证文件完整性</li>
              <li>定期更新工具</li>
            </ul>
            
            <h2>更新日志</h2>
            <h3>v2.5.0 (2024-01-15)</h3>
            <ul>
              <li>支持2024.1版本IDE</li>
              <li>改进激活稳定性</li>
              <li>修复macOS兼容性问题</li>
            </ul>
            
            <h3>v2.4.0 (2023-12-20)</h3>
            <ul>
              <li>新增RustRover支持</li>
              <li>优化激活速度</li>
              <li>添加自动备份功能</li>
            </ul>
            
            <h2>开发计划</h2>
            <ul>
              <li>[ ] 支持更多JetBrains新产品</li>
              <li>[ ] Web管理界面</li>
              <li>[ ] 批量激活功能</li>
              <li>[ ] 企业版功能</li>
            </ul>
            
            <h2>技术支持</h2>
            <p>如遇到问题，可以通过以下方式获取帮助：</p>
            <ul>
              <li>查看FAQ文档</li>
              <li>提交Issue到GitHub</li>
              <li>加入技术交流群</li>
            </ul>
            
            <div class="alert alert-info" role="alert">
              <i class="bi bi-info-circle me-2"></i>
              <strong>提示：</strong>为了获得最佳体验和完整功能支持，建议购买JetBrains官方正版授权。
            </div>
          </div>
          
          <footer class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <a href="https://github.com/dongzheyu/jetbrains-crack" target="_blank" class="btn btn-primary me-2">
                  <i class="bi bi-github"></i> 查看源码
                </a>
                <a href="https://github.com/dongzheyu/jetbrains-crack/releases" target="_blank" class="btn btn-outline-primary">
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