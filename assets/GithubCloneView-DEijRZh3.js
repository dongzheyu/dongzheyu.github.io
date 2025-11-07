import{_ as o,c as l,a,i as n,f as d,g as e,w as i,h as s,o as u}from"./index-C3VXxQ9W.js";const r={},v={class:"container py-5"},h={class:"row"},p={class:"col-lg-8 mx-auto"},g={class:"project-detail"},b={class:"mt-5"},_={class:"d-flex justify-content-between align-items-center"};function y(m,t){const c=s("router-link");return u(),l("div",v,[a("div",h,[a("div",p,[a("article",g,[t[2]||(t[2]=n(`<header class="mb-4" data-v-1e3843ca><h1 class="fw-bold" data-v-1e3843ca>Github-Clone</h1><div class="text-muted mb-3" data-v-1e3843ca><span class="badge bg-primary me-2" data-v-1e3843ca>工具</span><span class="badge bg-success me-2" data-v-1e3843ca>开源</span><span class="badge bg-info" data-v-1e3843ca>Python</span></div></header><div class="project-content" data-v-1e3843ca><h2 data-v-1e3843ca>项目简介</h2><p data-v-1e3843ca>Github-Clone是一个强大的GitHub仓库批量克隆工具，支持批量下载和管理GitHub项目。该工具特别适合开发者需要同时管理多个开源项目或进行代码分析的场景。</p><h2 data-v-1e3843ca>主要功能</h2><ul data-v-1e3843ca><li data-v-1e3843ca><strong data-v-1e3843ca>批量克隆</strong>：支持一次性克隆多个GitHub仓库</li><li data-v-1e3843ca><strong data-v-1e3843ca>智能过滤</strong>：可以根据语言、星标数、更新时间等条件筛选仓库</li><li data-v-1e3843ca><strong data-v-1e3843ca>进度显示</strong>：实时显示克隆进度和状态</li><li data-v-1e3843ca><strong data-v-1e3843ca>断点续传</strong>：支持中断后继续克隆</li><li data-v-1e3843ca><strong data-v-1e3843ca>组织管理</strong>：按用户或组织自动分类存储</li></ul><h2 data-v-1e3843ca>技术特点</h2><h3 data-v-1e3843ca>核心技术栈</h3><ul data-v-1e3843ca><li data-v-1e3843ca><strong data-v-1e3843ca>Python 3.8+</strong>：主要开发语言</li><li data-v-1e3843ca><strong data-v-1e3843ca>GitHub API</strong>：获取仓库信息</li><li data-v-1e3843ca><strong data-v-1e3843ca>Git命令</strong>：执行克隆操作</li><li data-v-1e3843ca><strong data-v-1e3843ca>多线程</strong>：提高克隆效率</li></ul><h3 data-v-1e3843ca>架构设计</h3><pre data-v-1e3843ca><code data-v-1e3843ca>├── github_clone/
│   ├── __init__.py
│   ├── api.py          # GitHub API交互
│   ├── git_handler.py  # Git操作封装
│   ├── filter.py       # 仓库过滤逻辑
│   ├── progress.py     # 进度显示
│   └── main.py         # 主程序入口</code></pre><h2 data-v-1e3843ca>使用方法</h2><h3 data-v-1e3843ca>安装依赖</h3><pre data-v-1e3843ca><code data-v-1e3843ca>pip install requests gitpython tqdm</code></pre><h3 data-v-1e3843ca>基本用法</h3><pre data-v-1e3843ca><code data-v-1e3843ca># 克隆单个用户的所有仓库
python github_clone.py --user dongzheyu

# 克隆组织的仓库
python github_clone.py --org jetcpp

# 按语言筛选
python github_clone.py --user dongzheyu --language python

# 限制克隆数量
python github_clone.py --user dongzheyu --limit 10</code></pre><h3 data-v-1e3843ca>高级选项</h3><pre data-v-1e3843ca><code data-v-1e3843ca># 只克隆有特定星标的仓库
python github_clone.py --user dongzheyu --min-stars 100

# 排除fork仓库
python github_clone.py --user dongzheyu --no-forks

# 指定保存目录
python github_clone.py --user dongzheyu --output ./repos</code></pre><h2 data-v-1e3843ca>配置文件</h2><p data-v-1e3843ca>支持通过配置文件自定义设置：</p><pre data-v-1e3843ca><code data-v-1e3843ca>{
    &quot;github_token&quot;: &quot;your_token_here&quot;,
    &quot;default_output&quot;: &quot;./github_repos&quot;,
    &quot;max_concurrent&quot;: 5,
    &quot;timeout&quot;: 30,
    &quot;exclude_patterns&quot;: [&quot;*.exe&quot;, &quot;*.dll&quot;]
}</code></pre><h2 data-v-1e3843ca>性能优化</h2><h3 data-v-1e3843ca>并发控制</h3><ul data-v-1e3843ca><li data-v-1e3843ca>使用线程池控制并发数量</li><li data-v-1e3843ca>智能限速避免API限制</li><li data-v-1e3843ca>缓存API响应减少请求</li></ul><h3 data-v-1e3843ca>内存优化</h3><ul data-v-1e3843ca><li data-v-1e3843ca>流式处理大仓库</li><li data-v-1e3843ca>及时释放不需要的资源</li><li data-v-1e3843ca>使用生成器减少内存占用</li></ul><h2 data-v-1e3843ca>常见问题</h2><h3 data-v-1e3843ca>API限制</h3><p data-v-1e3843ca>GitHub API有访问频率限制，建议：</p><ul data-v-1e3843ca><li data-v-1e3843ca>使用Personal Access Token提高限制</li><li data-v-1e3843ca>合理设置并发数量</li><li data-v-1e3843ca>实现指数退避重试机制</li></ul><h3 data-v-1e3843ca>网络问题</h3><ul data-v-1e3843ca><li data-v-1e3843ca>支持代理配置</li><li data-v-1e3843ca>自动重试失败的请求</li><li data-v-1e3843ca>超时设置和错误处理</li></ul><h2 data-v-1e3843ca>开发计划</h2><ul data-v-1e3843ca><li data-v-1e3843ca>[ ] 支持GitLab等其他平台</li><li data-v-1e3843ca>[ ] 添加图形界面</li><li data-v-1e3843ca>[ ] 实现仓库更新功能</li><li data-v-1e3843ca>[ ] 添加仓库分析功能</li></ul><h2 data-v-1e3843ca>贡献指南</h2><p data-v-1e3843ca>欢迎提交Issue和Pull Request！</p><ul data-v-1e3843ca><li data-v-1e3843ca>Fork项目</li><li data-v-1e3843ca>创建功能分支</li><li data-v-1e3843ca>提交更改</li><li data-v-1e3843ca>发起Pull Request</li></ul></div>`,2)),a("footer",b,[a("div",_,[t[1]||(t[1]=a("div",null,[a("a",{href:"https://github.com/dongzheyu/github-clone",target:"_blank",class:"btn btn-primary me-2"},[a("i",{class:"bi bi-github"}),e(" 查看源码 ")]),a("a",{href:"https://github.com/dongzheyu/github-clone/releases",target:"_blank",class:"btn btn-outline-primary"},[a("i",{class:"bi bi-download"}),e(" 下载 ")])],-1)),d(c,{to:"/projects",class:"btn btn-outline-secondary"},{default:i(()=>[...t[0]||(t[0]=[a("i",{class:"bi bi-arrow-left"},null,-1),e(" 返回项目列表 ",-1)])]),_:1})])])])])])])}const f=o(r,[["render",y],["__scopeId","data-v-1e3843ca"]]);export{f as default};
