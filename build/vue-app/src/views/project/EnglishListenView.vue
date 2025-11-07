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
              <span class="badge bg-info">Python</span>
            </div>
          </header>
          
          <div class="project-content">
            <h2>项目简介</h2>
            <p>English-Listen是一个专业的英语听力训练工具，旨在帮助用户提升英语听力水平。该工具提供了丰富的听力材料和科学的训练方法，适合不同英语水平的学习者使用。</p>
            
            <h2>核心功能</h2>
            <ul>
              <li><strong>听力材料库</strong>：包含新闻、演讲、对话等多种类型</li>
              <li><strong>智能难度调节</strong>：根据用户水平自动调整难度</li>
              <li><strong>实时字幕</strong>：支持英文字幕和中英文字幕</li>
              <li><strong>复读功能</strong>：句子复读和段落复读</li>
              <li><strong>速度调节</strong>：0.5x-2.0x播放速度调节</li>
              <li><strong>学习统计</strong>：详细的学习进度和成绩分析</li>
            </ul>
            
            <h2>技术架构</h2>
            <h3>技术栈</h3>
            <ul>
              <li><strong>Python 3.9+</strong>：后端开发</li>
              <li><strong>Django</strong>：Web框架</li>
              <li><strong>Vue.js</strong>：前端界面</li>
              <li><strong>SQLite</strong>：数据存储</li>
              <li><strong>FFmpeg</strong>：音频处理</li>
              <li><strong>Speech Recognition</strong>：语音识别</li>
            </ul>
            
            <h3>系统架构</h3>
            <pre><code>├── english-listen/
│   ├── backend/                    # 后端服务
│   │   ├── apps/
│   │   │   ├── audio/             # 音频处理
│   │   │   ├── user/              # 用户管理
│   │   │   ├── progress/          # 学习进度
│   │   │   └── materials/         # 听力材料
│   │   └── core/                  # 核心功能
│   ├── frontend/                   # 前端应用
│   │   ├── src/
│   │   │   ├── components/        # Vue组件
│   │   │   ├── views/             # 页面视图
│   │   │   └── utils/             # 工具函数
│   │   └── public/
│   └── media/                      # 媒体文件</code></pre>
            
            <h2>功能详解</h2>
            <h3>听力材料管理</h3>
            <ul>
              <li>分类管理：新闻、演讲、日常对话、学术讲座</li>
              <li>难度分级：初级、中级、高级、专业级</li>
              <li>标签系统：话题、口音、语速、时长</li>
              <li>智能推荐：基于学习历史推荐材料</li>
            </ul>
            
            <h3>播放器功能</h3>
            <ul>
              <li>A-B复读：设置起点和终点重复播放</li>
              <li>句子分割：自动识别句子边界</li>
              <li>跟读对比：录音对比标准发音</li>
              <li>重点标记：标记难点句子</li>
            </ul>
            
            <h3>学习系统</h3>
            <ul>
              <li>水平测试：初始能力评估</li>
              <li>学习计划：个性化学习路径</li>
              <li>进度跟踪：详细的学习统计</li>
              <li>成就系统：学习成就和徽章</li>
            </ul>
            
            <h2>使用指南</h2>
            <h3>快速开始</h3>
            <ol>
              <li>注册账号并登录</li>
              <li>完成英语水平测试</li>
              <li>选择适合的听力材料</li>
              <li>开始学习训练</li>
            </ol>
            
            <h3>学习模式</h3>
            <h4>精听模式</h4>
            <ul>
              <li>逐句精听，理解每个细节</li>
              <li>查看字幕和翻译</li>
              <li>重点词汇学习</li>
            </ul>
            
            <h4>泛听模式</h4>
            <ul>
              <li>大量输入，培养语感</li>
              <li>关注整体理解</li>
              <li>提高听力速度</li>
            </ul>
            
            <h4>考试模式</h4>
            <ul>
              <li>模拟考试环境</li>
              <li>限时听力练习</li>
              <li>答题和评分</li>
            </ul>
            
            <h2>API接口</h2>
            <h3>音频接口</h3>
            <pre><code># 获取音频列表
GET /api/audio/list?level=intermediate&category=news

# 获取音频详情
GET /api/audio/{id}/detail

# 获取音频文件
GET /api/audio/{id}/stream

# 提交学习记录
POST /api/progress/submit</code></pre>
            
            <h3>用户接口</h3>
            <pre><code># 用户注册
POST /api/user/register

# 用户登录
POST /api/user/login

# 获取学习统计
GET /api/user/stats

# 更新学习计划
PUT /api/user/plan</code></pre>
            
            <h2>数据模型</h2>
            <h3>用户模型</h3>
            <pre><code>class User:
    id: int
    username: str
    email: str
    level: str
    created_at: datetime
    last_login: datetime
    study_days: int
    total_minutes: int</code></pre>
            
            <h3>音频材料模型</h3>
            <pre><code>class AudioMaterial:
    id: int
    title: str
    category: str
    level: str
    duration: int
    transcript: str
    translation: str
    tags: List[str]
    difficulty_score: float</code></pre>
            
            <h2>部署说明</h2>
            <h3>环境要求</h3>
            <ul>
              <li>Python 3.9+</li>
              <li>Node.js 16+</li>
              <li>Redis 6.0+</li>
              <li>PostgreSQL 13+</li>
            </ul>
            
            <h3>部署步骤</h3>
            <pre><code># 1. 克隆项目
git clone https://github.com/dongzheyu/english-listen.git

# 2. 后端部署
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# 3. 前端部署
cd frontend
npm install
npm run build

# 4. 配置Nginx
# 配置反向代理和静态文件服务</code></pre>
            
            <h2>性能优化</h2>
            <h3>音频优化</h3>
            <ul>
              <li>音频压缩和格式转换</li>
              <li>CDN加速音频文件</li>
              <li>预加载和缓存策略</li>
              <li>自适应音频质量</li>
            </ul>
            
            <h3>系统优化</h3>
            <ul>
              <li>数据库索引优化</li>
              <li>Redis缓存热点数据</li>
              <li>异步处理提高并发</li>
              <li>负载均衡配置</li>
            </ul>
            
            <h2>数据分析</h2>
            <h3>学习效果分析</h3>
            <ul>
              <li>听力能力提升曲线</li>
              <li>学习时间分布分析</li>
              <li>薄弱环节识别</li>
              <li>学习效果预测</li>
            </ul>
            
            <h3>用户行为分析</h3>
            <ul>
              <li>学习习惯分析</li>
              <li>材料偏好统计</li>
              <li>活跃度分析</li>
              <li>留存率分析</li>
            </ul>
            
            <h2>开发计划</h2>
            <ul>
              <li>[ ] 移动端应用开发</li>
              <li>[ ] AI语音评测功能</li>
              <li>[ ] 多语言支持</li>
              <li>[ ] 社交学习功能</li>
              <li>[ ] 离线学习支持</li>
            </ul>
            
            <h2>贡献指南</h2>
            <p>欢迎参与项目开发：</p>
            <ul>
              <li>提交代码贡献</li>
              <li>添加新的听力材料</li>
              <li>报告和修复bug</li>
              <li>改进文档</li>
            </ul>
          </div>
          
          <footer class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <a href="https://github.com/dongzheyu/english-listen" target="_blank" class="btn btn-primary me-2">
                  <i class="bi bi-github"></i> 查看源码
                </a>
                <a href="https://demo.english-listen.com" target="_blank" class="btn btn-outline-primary">
                  <i class="bi bi-play-circle"></i> 在线演示
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