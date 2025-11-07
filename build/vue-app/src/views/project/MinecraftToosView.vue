<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="project-detail">
          <header class="mb-4">
            <h1 class="fw-bold">Minecraft-Toos</h1>
            <div class="text-muted mb-3">
              <span class="badge bg-primary me-2">游戏工具</span>
              <span class="badge bg-success me-2">开源</span>
              <span class="badge bg-info">Java</span>
            </div>
          </header>
          
          <div class="project-content">
            <h2>项目简介</h2>
            <p>Minecraft-Toos是一个专为Minecraft玩家设计的实用工具集，提供了多种游戏辅助功能，旨在提升玩家的游戏体验和效率。无论是新手还是资深玩家，都能从中获得便利。</p>
            
            <h2>主要功能</h2>
            <ul>
              <li><strong>资源包管理</strong>：快速切换和管理资源包</li>
              <li><strong>模组管理</strong>：便捷的模组安装和配置</li>
              <li><strong>世界备份</strong>：自动备份游戏世界</li>
              <li><strong>服务器监控</strong>：实时监控服务器状态</li>
              <li><strong>材质生成</strong>：自定义材质生成工具</li>
              <li><strong>红石助手</strong>：红石电路设计和模拟</li>
            </ul>
            
            <h2>技术特点</h2>
            <h3>核心技术栈</h3>
            <ul>
              <li><strong>Java 17</strong>：主要开发语言</li>
              <li><strong>JavaFX</strong>：图形用户界面</li>
              <li><strong>Minecraft API</strong>：与游戏交互</li>
              <li><strong>SQLite</strong>：本地数据存储</li>
            </ul>
            
            <h3>架构设计</h3>
            <pre><code>├── minecraft-toos/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   ├── com/jetcpp/minecraft/
│   │   │   │   │   ├── ui/           # 用户界面
│   │   │   │   │   ├── core/         # 核心功能
│   │   │   │   │   ├── utils/        # 工具类
│   │   │   │   │   └── config/       # 配置管理
│   │   │   └── resources/            # 资源文件
│   │   └── test/                     # 测试代码
│   └── pom.xml                       # Maven配置</code></pre>
            
            <h2>功能详解</h2>
            <h3>资源包管理器</h3>
            <ul>
              <li>支持多种资源包格式</li>
              <li>一键安装和卸载</li>
              <li>资源包预览功能</li>
              <li>兼容性检测</li>
            </ul>
            
            <h3>模组管理器</h3>
            <ul>
              <li>自动依赖解析</li>
              <li>版本兼容性检查</li>
              <li>模组冲突检测</li>
              <li>批量操作支持</li>
            </ul>
            
            <h3>世界备份系统</h3>
            <ul>
              <li>定时自动备份</li>
              <li>增量备份优化</li>
              <li>备份压缩和加密</li>
              <li>云端备份支持</li>
            </ul>
            
            <h2>安装使用</h2>
            <h3>系统要求</h3>
            <ul>
              <li>Java 17或更高版本</li>
              <li>Windows 10/11, macOS 10.15+, Linux</li>
              <li>至少2GB可用内存</li>
              <li>100MB磁盘空间</li>
            </ul>
            
            <h3>安装步骤</h3>
            <ol>
              <li>下载最新版本的Minecraft-Toos</li>
              <li>解压到任意目录</li>
              <li>运行启动脚本（Windows: .bat, macOS/Linux: .sh）</li>
              <li>首次运行会自动配置环境</li>
            </ol>
            
            <h2>使用指南</h2>
            <h3>资源包管理</h3>
            <pre><code>1. 点击"资源包"标签页
2. 点击"添加资源包"按钮
3. 选择资源包文件
4. 配置启用/禁用状态
5. 点击"应用更改"</code></pre>
            
            <h3>模组管理</h3>
            <pre><code>1. 切换到"模组"标签页
2. 选择Minecraft版本
3. 从模组库搜索或添加本地模组
4. 解决依赖关系
5. 启动游戏测试</code></pre>
            
            <h2>配置文件</h2>
            <p>主配置文件位于<code>config/settings.json</code>：</p>
            <pre><code>{
    "minecraft_path": "~/.minecraft",
    "backup_interval": 24,
    "max_backups": 10,
    "auto_update": true,
    "theme": "dark",
    "language": "zh_CN"
}</code></pre>
            
            <h2>插件系统</h2>
            <p>Minecraft-Toos支持插件扩展：</p>
            <ul>
              <li>标准插件API</li>
              <li>热插拔支持</li>
              <li>插件市场</li>
              <li>自定义UI组件</li>
            </ul>
            
            <h2>性能优化</h2>
            <h3>内存管理</h3>
            <ul>
              <li>智能缓存机制</li>
              <li>内存泄漏防护</li>
              <li>大文件流式处理</li>
            </ul>
            
            <h3>启动优化</h3>
            <ul>
              <li>延迟加载</li>
              <li>并行初始化</li>
              <li>启动时间缓存</li>
            </ul>
            
            <h2>故障排除</h2>
            <h3>常见问题</h3>
            <ul>
              <li><strong>启动失败</strong>：检查Java版本和权限设置</li>
              <li><strong>模组冲突</strong>：使用冲突检测工具</li>
              <li><strong>性能问题</strong>：调整JVM参数</li>
            </ul>
            
            <h3>日志分析</h3>
            <p>日志文件位于<code>logs/</code>目录：</p>
            <ul>
              <li><code>app.log</code>：应用主日志</li>
              <li><code>error.log</code>：错误日志</li>
              <li><code>performance.log</code>：性能日志</li>
            </ul>
            
            <h2>开发路线图</h2>
            <ul>
              <li>[ ] 移动端应用</li>
              <li>[ ] Web界面</li>
              <li>[ ] AI助手功能</li>
              <li>[ ] 多人协作功能</li>
            </ul>
            
            <h2>贡献方式</h2>
            <p>我们欢迎各种形式的贡献：</p>
            <ul>
              <li>代码贡献</li>
              <li>功能建议</li>
              <li>bug报告</li>
              <li>文档改进</li>
            </ul>
          </div>
          
          <footer class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <a href="https://github.com/dongzheyu/minecraft-toos" target="_blank" class="btn btn-primary me-2">
                  <i class="bi bi-github"></i> 查看源码
                </a>
                <a href="https://github.com/dongzheyu/minecraft-toos/releases" target="_blank" class="btn btn-outline-primary">
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