# PowerShell脚本：自动化添加博客或项目页面
# 作者：心流 CLI
# 功能：自动生成Vue页面组件和路由配置

Clear-Host
Write-Host "欢迎使用 JetCPP 网站页面自动化添加工具！" -ForegroundColor Green
Write-Host "`n此工具将帮助您快速添加博客或项目页面 `n" -ForegroundColor Cyan

# 询问用户要添加的页面类型
Write-Host "请选择要添加的页面类型：" -ForegroundColor Yellow
Write-Host "1) 博客页面" 
Write-Host "2) 项目页面"
Write-Host ""

$choice = Read-Host "请输入选择 (1 或 2)"

if ($choice -eq "1") {
    $type = "blog"
    $typeName = "博客"
    $folder = "blog"
    $routePrefix = "/blog"
    $componentPath = "../views/blog/"
    $pagePath = "../views/blog/"
} 
elseif ($choice -eq "2") {
    $type = "project"
    $typeName = "项目"
    $folder = "project"
    $routePrefix = "/project"
    $componentPath = "../views/project/"
    $pagePath = "../views/project/"
}
else {
    Write-Host "❌ 无效选择，程序退出。" -ForegroundColor Red
    exit
}

# 获取页面标题
Write-Host "`n请输入$typeName页面的标题：" -ForegroundColor Yellow
$title = Read-Host "标题"

# 验证标题不为空
if ([string]::IsNullOrWhiteSpace($title)) {
    Write-Host "❌ 标题不能为空，程序退出。" -ForegroundColor Red
    exit
}

# 生成组件名称和路由路径
$componentName = ($title -replace '[^a-zA-Z0-9\u4e00-\u9fa5]', '') + "View"
if ($type -eq "project") {
    $componentName = ($title -replace '[^a-zA-Z0-9\u4e00-\u9fa5]', '') + "View"
    # 对于项目页面，移除"View"后缀以符合现有命名规范
    $componentName = ($title -replace '[^a-zA-Z0-9\u4e00-\u9fa5]', '')
}

$routePath = $routePrefix + "/" + ($title -replace '[^a-zA-Z0-9\u4e00-\u9fa5]', '').ToLower()

# 获取项目根目录并构建完整路径
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$fullPath = Join-Path $projectRoot "src/views/$folder/$componentName.vue"

# 检查文件是否已存在
if (Test-Path $fullPath) {
    Write-Host "⚠️  文件 $fullPath 已存在，是否覆盖？(y/N)" -ForegroundColor Yellow
    $overwrite = Read-Host
    if ($overwrite -ne 'y' -and $overwrite -ne 'Y') {
        Write-Host "操作已取消。" -ForegroundColor Yellow
        exit
    }
}

Write-Host "`n正在生成 $typeName 页面..." -ForegroundColor Cyan

# 生成Vue组件内容
if ($type -eq "blog") {
    # 博客页面模板
    $vueContent = @"
<script setup lang="ts">
// $title 博客页面组件
// 作者：自动创建
// 创建时间：$(Get-Date -Format "yyyy-MM-dd")
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="blog-post">
          <header class="mb-4">
            <h1 class="fw-bold">$title</h1>
            <div class="text-muted mb-3">
              <time datetime="$(Get-Date -Format "yyyy-MM-dd")">$(Get-Date -Format "yyyy-MM-dd")</time> · 作者：JetCPP Team
            </div>
          </header>
          
          <div class="blog-content">
            <h2>引言</h2>
            <p>在这里添加你的博客内容...</p>
            
            <h2>详细内容</h2>
            <p>继续添加更多内容...</p>
            
            <h2>总结</h2>
            <p>总结你的博客内容...</p>
          </div>
          
          <footer class="mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div class="tags">
                <span class="badge bg-primary me-1">标签1</span>
                <span class="badge bg-secondary me-1">标签2</span>
                <span class="badge bg-info">标签3</span>
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
"@
} else {
    # 项目页面模板
    $vueContent = @"
<script setup lang="ts">
// $title 项目页面组件
// 作者：自动创建
// 创建时间：$(Get-Date -Format "yyyy-MM-dd")
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article class="project-detail">
          <header class="mb-4">
            <h1 class="fw-bold">$title</h1>
            <div class="text-muted mb-3">
              <span class="badge bg-primary me-2">标签1</span>
              <span class="badge bg-success me-2">标签2</span>
              <span class="badge bg-info">标签3</span>
            </div>
          </header>
          <div class="project-content">
            <h2>项目简介</h2>
            <p>在这里添加你的项目介绍...</p>
            <h2>核心功能</h2>
            <ul>
              <li><strong>功能1</strong></li>
              <li><strong>功能2</strong></li>
              <li><strong>功能3</strong></li>
            </ul>
          </div>
          <footer class="mb-5">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <a href="#" target="_blank" class="btn btn-primary me-2">
                  <i class="bi bi-github"></i> GitHub
                </a>
                <a href="#" target="_blank" class="btn btn-success">
                  <i class="bi bi-box-arrow-up-right"></i> 访问项目
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
"@
}

# 创建文件
$directory = Join-Path $projectRoot "src/views/$folder"
if (!(Test-Path $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
}

Set-Content -Path $fullPath -Value $vueContent -Encoding UTF8
Write-Host "✅ $typeName 页面已创建：$fullPath" -ForegroundColor Green

# 获取脚本所在目录并计算正确的路径
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$routerPath = Join-Path $projectRoot "src/router/index.ts"

# 检查路由文件是否存在
if (!(Test-Path $routerPath)) {
    Write-Host "⚠️  路由文件不存在: $routerPath" -ForegroundColor Yellow
    Write-Host "正在跳过路由配置更新..." -ForegroundColor Yellow
} else {
    $routerContent = Get-Content -Path $routerPath -Raw

    # 生成新的路由配置
    $routeName = "project-" + ($title -replace '[^a-zA-Z0-9\u4e00-\u9fa5]', '').ToLower()
    if ($type -eq "blog") {
        $routeName = "blog-" + ($title -replace '[^a-zA-Z0-9\u4e00-\u9fa5]', '').ToLower()
    }

    $newRoute = "`n    {`n      path: '$routePath',`n      name: '$routeName',`n      component: () => import('$componentPath$componentName.vue'),`n    },"

    # 找到最后一个路由配置项的位置并插入新路由
    $lastRouteIndex = $routerContent.LastIndexOf("},")
    if ($lastRouteIndex -ne -1) {
        $insertPosition = $lastRouteIndex + 2  # 跳过 "},"
        $newRouterContent = $routerContent.Insert($insertPosition, $newRoute)
        
        # 写回路由配置文件
        Set-Content -Path $routerPath -Value $newRouterContent -Encoding UTF8
        Write-Host "✅ 路由配置已更新：$routerPath" -ForegroundColor Green
    } else {
        Write-Host "⚠️  未能找到路由配置插入位置" -ForegroundColor Yellow
    }
}

Write-Host "`n恭喜！$typeName 页面已成功创建！" -ForegroundColor Green
Write-Host "页面文件：$fullPath" -ForegroundColor Cyan
Write-Host "访问地址：$routePath" -ForegroundColor Cyan
Write-Host "`n提示：现在你可以编辑页面内容了！" -ForegroundColor Yellow