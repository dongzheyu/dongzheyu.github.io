<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="project-detail">
          <header class="mb-4">
            <h1 class="fw-bold">GoodMinecraftWiki</h1>
            <div class="text-muted mb-3">
              <span class="badge bg-primary me-2">知识库</span>
              <span class="badge bg-success me-2">开源</span>
              <span class="badge bg-info">Python</span>
            </div>
          </header>
          
          <div class="project-content">
            <h2>项目简介</h2>
            <p>GoodMinecraftWiki是一个全面的Minecraft知识库和攻略集合，为Minecraft玩家提供详尽的游戏指南、教程和资源。该平台涵盖了从新手入门到高级技巧的全方位内容，是Minecraft爱好者的必备资源。</p>
            
            <h2>主要功能</h2>
            <ul>
              <li><strong>全面的知识库</strong>：涵盖游戏机制、物品、生物等所有内容</li>
              <li><strong>详细教程</strong>：从基础到高级的完整教程体系</li>
              <li><strong>攻略指南</strong>：各种游戏模式和挑战的攻略</li>
              <li><strong>红石电路</strong>：红石机械和自动化装置设计</li>
              <li><strong>建筑指南</strong>：建筑技巧和设计灵感</li>
              <li><strong>社区贡献</strong>：支持用户贡献和内容编辑</li>
            </ul>
            
            <h2>技术架构</h2>
            <h3>技术栈</h3>
            <ul>
              <li><strong>Python 3.9</strong>：后端开发</li>
              <li><strong>Django</strong>：Web框架</li>
              <li><strong>PostgreSQL</strong>：数据库</li>
              <li><strong>Elasticsearch</strong>：搜索引擎</li>
              <li><strong>Redis</strong>：缓存服务</li>
              <li><strong>Docker</strong>：容器化部署</li>
            </ul>
            
            <h3>系统架构</h3>
            <pre><code>├── goodminecraft-wiki/
│   ├── backend/                    # 后端服务
│   │   ├── apps/
│   │   │   ├── wiki/               # 维基核心功能
│   │   │   ├── search/             # 搜索引擎
│   │   │   ├── user/               # 用户管理
│   │   │   ├── tutorial/           # 教程系统
│   │   │   └── community/          # 社区功能
│   │   └── core/                   # 核心组件
│   ├── frontend/                   # 前端应用
│   │   ├── src/
│   │   │   ├── components/         # Vue组件
│   │   │   ├── pages/              # 页面
│   │   │   └── assets/             # 静态资源
│   ├── search/                     # 搜索服务
│   └── data/                       # 数据文件</code></pre>
            
            <h2>内容体系</h2>
            <h3>基础内容</h3>
            <ul>
              <li>游戏介绍和历史</li>
              <li>基本操作和界面</li>
              <li>游戏模式和难度</li>
              <li>世界生成和地形</li>
              <li>基础生存指南</li>
            </ul>
            
            <h3>进阶内容</h3>
            <ul>
              <li>附魔和药水制作</li>
              <li>探索和遗迹</li>
              <li>农业和畜牧</li>
              <li>交易系统</li>
              <li>战斗技巧</li>
            </ul>
            
            <h3>专业内容</h3>
            <ul>
              <li>红石电路设计</li>
              <li>命令方块编程</li>
              <li>服务器管理</li>
              <li>模组开发</li>
              <li>资源包制作</li>
            </ul>
            
            <h2>特色功能</h2>
            <h3>智能搜索</h3>
            <ul>
              <li>全文搜索和关键词高亮</li>
              <li>智能推荐相关内容</li>
              <li>搜索历史和热门搜索</li>
              <li>多语言搜索支持</li>
            </ul>
            
            <h3>交互式教程</h3>
            <ul>
              <li>步骤化指导</li>
              <li>进度跟踪</li>
              <li>互动练习</li>
              <li>成就系统</li>
            </ul>
            
            <h3>可视化工具</h3>
            <ul>
              <li>3D物品展示</li>
              <li>合成计算器</li>
              <li>红石模拟器</li>
              <li>地图生成器</li>
            </ul>
            
            <h2>数据结构</h2>
            <h3>文章模型</h3>
            <pre><code>class Article:
    id: int
    title: str
    content: str
    category: str
    tags: List[str]
    difficulty: str
    author: str
    created_at: datetime
    updated_at: datetime
    views: int
    likes: int</code></pre>
            
            <h3>教程模型</h3>
            <pre><code>class Tutorial:
    id: int
    title: str
    description: str
    steps: List[TutorialStep]
    prerequisites: List[str]
    estimated_time: int
    difficulty_level: str
    category: str</code></pre>
            
            <h2>API接口</h2>
            <h3>内容API</h3>
            <pre><code># 获取文章列表
GET /api/wiki/articles?category=basics&difficulty=beginner

# 获取文章详情
GET /api/wiki/articles/{id}

# 搜索内容
GET /api/search?q=redstone&category=tutorials

# 获取教程列表
GET /api/tutorials?category=redstone</code></pre>
            
            <h3>用户API</h3>
            <pre><code># 用户注册
POST /api/user/register

# 提交内容
POST /api/wiki/contribute

# 收藏内容
POST /api/user/favorites

# 学习进度
GET /api/user/progress</code></pre>
            
            <h2>内容管理</h2>
            <h3>编辑系统</h3>
            <ul>
              <li>Markdown编辑器</li>
              <li>实时预览</li>
              <li>版本控制</li>
              <li>协作编辑</li>
            </ul>
            
            <h3>审核流程</h3>
            <ul>
              <li>自动审核规则</li>
              <li>人工审核</li>
              <li>社区投票</li>
              <li>反馈机制</li>
            </ul>
            
            <h2>搜索优化</h2>
            <h3>索引策略</h3>
            <ul>
              <li>全文索引构建</li>
              <li>同义词扩展</li>
              <li>相关性评分</li>
              <li>缓存热门查询</li>
            </ul>
            
            <h3>搜索算法</h3>
            <ul>
              <li>Tf-Idf权重计算</li>
              <li>语义搜索</li>
              <li>个性化推荐</li>
              <li>错误纠正</li>
            </ul>
            
            <h2>性能优化</h2>
            <h3>缓存策略</h3>
            <ul>
              <li>Redis缓存热门内容</li>
              <li>CDN加速静态资源</li>
              <li>数据库查询优化</li>
              <li>页面缓存</li>
            </ul>
            
            <h3>数据库优化</h3>
            <ul>
              <li>索引优化</li>
              <li>查询优化</li>
              <li>分表分库</li>
              <li>读写分离</li>
            </ul>
            
            <h2>用户体验</h2>
            <h3>界面设计</h3>
            <ul>
              <li>响应式设计</li>
              <li>暗色主题支持</li>
              <li>无障碍访问</li>
              <li>多语言界面</li>
            </ul>
            
            <h3>个性化功能</h3>
            <ul>
              <li>个人收藏夹</li>
              <li>阅读历史</li>
              <li>学习计划</li>
              <li>个性化推荐</li>
            </ul>
            
            <h2>社区功能</h2>
            <h3>贡献系统</h3>
            <ul>
              <li>内容贡献</li>
              <li>错误报告</li>
              <li>改进建议</li>
              <li>翻译贡献</li>
            </ul>
            
            <h3>互动功能</h3>
            <ul>
              <li>评论系统</li>
              <li>评分系统</li>
              <li>讨论区</li>
              <li>问答平台</li>
            </ul>
            
            <h2>部署运维</h2>
            <h3>容器化部署</h3>
            <pre><code># Docker Compose配置
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8000:8000"
  db:
    image: postgres:13
  redis:
    image: redis:6-alpine
  elasticsearch:
    image: elasticsearch:7.14.0</code></pre>
            
            <h3>监控和日志</h3>
            <ul>
              <li>应用性能监控</li>
              <li>错误日志收集</li>
              <li>用户行为分析</li>
              <li>系统资源监控</li>
            </ul>
            
            <h2>开发计划</h2>
            <ul>
              <li>[ ] 移动端应用</li>
              <li>[ ] AI助手功能</li>
              <li>[ ] 视频教程集成</li>
              <li>[ ] 实时协作编辑</li>
              <li>[ ] 多语言支持扩展</li>
            </ul>
            
            <h2>贡献指南</h2>
            <p>欢迎参与知识库建设：</p>
            <ul>
              <li>内容贡献和编辑</li>
              <li>错误修正和改进</li>
              <li>翻译和本地化</li>
              <li>功能开发和优化</li>
            </ul>
          </div>
          
          <footer class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <a href="https://github.com/dongzheyu/goodminecraft-wiki" target="_blank" class="btn btn-primary me-2">
                  <i class="bi bi-github"></i> 查看源码
                </a>
                <a href="https://wiki.goodminecraft.com" target="_blank" class="btn btn-outline-primary">
                  <i class="bi bi-globe"></i> 访问网站
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

[data-bs-theme="dark"] .project-content pre {
  background-color: #2d3748;
  border-color: #4a5568;
}

[data-bs-theme="dark"] .project-content code {
  background-color: #4a5568;
  color: #e2e8f0;
}
</style>