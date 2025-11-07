<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="project-detail">
          <header class="mb-4">
            <h1 class="fw-bold">GoodMinecraft</h1>
            <div class="text-muted mb-3">
              <span class="badge bg-primary me-2">游戏工具</span>
              <span class="badge bg-success me-2">开源</span>
              <span class="badge bg-info">Java</span>
            </div>
          </header>
          
          <div class="project-content">
            <h2>项目简介</h2>
            <p>GoodMinecraft是一个优化的Minecraft启动器和资源管理工具，旨在为Minecraft玩家提供更好的游戏体验。该工具集成了多种实用功能，支持模组管理、资源包优化、性能调优等功能。</p>
            
            <h2>主要特性</h2>
            <ul>
              <li><strong>优化启动</strong>：快速启动游戏，减少加载时间</li>
              <li><strong>内存管理</strong>：智能内存分配和垃圾回收优化</li>
              <li><strong>模组支持</strong>：完善的模组管理和兼容性检查</li>
              <li><strong>多版本管理</strong>：支持多个Minecraft版本并存</li>
              <li><strong>资源优化</strong>：自动优化资源包和纹理</li>
              <li><strong>性能监控</strong>：实时监控游戏性能和资源使用</li>
            </ul>
            
            <h2>技术架构</h2>
            <h3>核心技术</h3>
            <ul>
              <li><strong>Java 17</strong>：主要开发语言</li>
              <li><strong>JavaFX</strong>：现代化用户界面</li>
              <li><strong>Minecraft Launcher API</strong>：与官方启动器集成</li>
              <li><strong>OpenGL</strong>：图形优化和渲染</li>
              <li><strong>ASM</strong>：字节码操作和优化</li>
            </ul>
            
            <h3>项目结构</h3>
            <pre><code>├── goodminecraft/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/jetcpp/goodminecraft/
│   │   │   │       ├── launcher/     # 启动器核心
│   │   │   │       ├── mod/          # 模组管理
│   │   │   │       ├── optimize/     # 性能优化
│   │   │   │       ├── ui/           # 用户界面
│   │   │   │       └── utils/        # 工具类
│   │   │   └── resources/
│   │   └── test/
│   ├── assets/                       # 资源文件
│   └── libs/                         # 依赖库</code></pre>
            
            <h2>功能详解</h2>
            <h3>启动器优化</h3>
            <ul>
              <li>预加载常用资源</li>
              <li>并行初始化组件</li>
              <li>缓存游戏文件</li>
              <li>智能更新检查</li>
            </ul>
            
            <h3>内存优化</h3>
            <ul>
              <li>动态JVM参数调整</li>
              <li>垃圾回收策略优化</li>
              <li>内存泄漏检测</li>
              <li>堆内存可视化</li>
            </ul>
            
            <h3>模组系统</h3>
            <ul>
              <li>模组依赖解析</li>
              <li>冲突检测和解决</li>
              <li>版本兼容性检查</li>
              <li>一键安装卸载</li>
            </ul>
            
            <h2>安装使用</h2>
            <h3>系统要求</h3>
            <ul>
              <li>Java 17或更高版本</li>
              <li>Windows 10/11, macOS 10.15+, Linux</li>
              <li>至少4GB内存（推荐8GB+）</li>
              <li>2GB可用磁盘空间</li>
            </ul>
            
            <h3>安装步骤</h3>
            <ol>
              <li>从GitHub下载最新版本</li>
              <li>解压到任意目录</li>
              <li>运行GoodMinecraft.exe（Windows）或启动脚本</li>
              <li>首次运行会自动配置环境</li>
              <li>添加Minecraft游戏目录</li>
            </ol>
            
            <h2>配置说明</h2>
            <h3>启动配置</h3>
            <pre><code>{
    "java_path": "auto",
    "jvm_args": "-Xmx4G -XX:+UseG1GC",
    "window_size": "1920x1080",
    "fullscreen": false,
    "custom_args": ""
}</code></pre>
            
            <h3>优化配置</h3>
            <pre><code>{
    "memory_optimization": true,
    "graphics_optimization": true,
    "fps_limit": 60,
    "render_distance": 12,
    "particles": "decreased",
    "clouds": "fast"
}</code></pre>
            
            <h2>性能优化</h2>
            <h3>JVM优化</h3>
            <ul>
              <li>垃圾回收器选择和调优</li>
              <li>内存分配策略优化</li>
              <li>JIT编译优化</li>
              <li>线程池配置</li>
            </ul>
            
            <h3>图形优化</h3>
            <ul>
              <li>OpenGL渲染优化</li>
              <li>纹理压缩和缓存</li>
              <li>视锥剔除优化</li>
              <li>LOD（细节层次）管理</li>
            </ul>
            
            <h2>高级功能</h2>
            <h3>脚本系统</h3>
            <ul>
              <li>自定义启动脚本</li>
              <li>模组加载顺序控制</li>
              <li>自动化任务执行</li>
              <li>条件判断和循环</li>
            </ul>
            
            <h3>插件系统</h3>
            <ul>
              <li>第三方插件支持</li>
              <li>插件API接口</li>
              <li>热插拔功能</li>
              <li>插件市场</li>
            </ul>
            
            <h2>监控和分析</h2>
            <h3>性能监控</h3>
            <ul>
              <li>实时FPS显示</li>
              <li>内存使用监控</li>
              <li>CPU使用率统计</li>
              <li>网络延迟检测</li>
            </ul>
            
            <h3>日志分析</h3>
            <ul>
              <li>游戏日志解析</li>
              <li>错误诊断</li>
              <li>性能瓶颈分析</li>
              <li>崩溃报告生成</li>
            </ul>
            
            <h2>故障排除</h2>
            <h3>常见问题</h3>
            <ul>
              <li><strong>启动失败</strong>：检查Java环境和权限</li>
              <li><strong>内存不足</strong>：调整JVM参数</li>
              <li><strong>模组冲突</strong>：使用冲突检测工具</li>
              <li><strong>性能问题</strong>：启用性能优化选项</li>
            </ul>
            
            <h3>调试模式</h3>
            <pre><code># 启用调试日志
GoodMinecraft.exe --debug --verbose

# 生成诊断报告
GoodMinecraft.exe --diagnostic

# 安全模式启动
GoodMinecraft.exe --safe-mode</code></pre>
            
            <h2>开发计划</h2>
            <ul>
              <li>[ ] 云端存档同步</li>
              <li>[ ] 移动端配套应用</li>
              <li>[ ] 服务器管理功能</li>
              <li>[ ] AI性能建议</li>
              <li>[ ] 社区功能集成</li>
            </ul>
            
            <h2>贡献指南</h2>
            <p>我们欢迎社区贡献：</p>
            <ul>
              <li>代码贡献和bug修复</li>
              <li>新功能建议和实现</li>
              <li>文档改进和翻译</li>
              <li>测试和反馈</li>
            </ul>
            
            <h2>支持与反馈</h2>
            <ul>
              <li>GitHub Issues：问题报告和功能请求</li>
              <li>Discord社区：实时交流和技术支持</li>
              <li>Wiki文档：详细使用指南</li>
              <li>邮件支持：support@goodminecraft.com</li>
            </ul>
          </div>
          
          <footer class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <a href="https://github.com/dongzheyu/goodminecraft" target="_blank" class="btn btn-primary me-2">
                  <i class="bi bi-github"></i> 查看源码
                </a>
                <a href="https://github.com/dongzheyu/goodminecraft/releases" target="_blank" class="btn btn-outline-primary">
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