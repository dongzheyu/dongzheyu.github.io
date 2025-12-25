# 📝 自动页面生成脚本

## 🚀 简介

这是一个 PowerShell 脚本，用于自动生成博客或项目页面框架，并自动添加到 Vue 路由配置中。

## ✨ 功能特性

- 🎯 **自动生成页面框架**：根据模板创建博客或项目页面
- 🔗 **自动添加路由**：自动更新 `src/router/index.ts` 文件
- 🎨 **美化界面**：使用 emoji 和彩色输出
- 📝 **用户友好**：交互式命令行界面
- 🛡️ **错误处理**：完善的错误检查和恢复机制

## 📁 文件结构

```
scripts/
├── add-page.ps1          # 主脚本文件
├── README.md            # 使用说明
├── config/              # 配置文件目录
│   ├── blogs.json      # 博客配置
│   └── projects.json   # 项目配置
└── templates/          # 模板文件目录
```

## 🚀 使用方法

### 1. 运行脚本

在项目根目录下运行：

```powershell
# 方法1：直接运行
.\scripts\add-page.ps1

# 方法2：使用 PowerShell
cd scripts
.\add-page.ps1
```

### 2. 交互式操作

脚本会引导您完成以下步骤：

1. **选择页面类型**：博客（📚）或项目（🚀）
2. **输入页面标题**：例如 "Vue 3 最佳实践"
3. **输入页面描述**（可选）
4. **确认信息**：查看生成的文件名和路由名
5. **自动创建**：生成页面文件并添加路由

### 3. 生成的文件

#### 博客页面示例
- **文件位置**：`src/views/blog/Vue3BestPracticesView.vue`
- **访问路径**：`/blog/vue-3-best-practices`
- **路由名称**：`blog-vue-3-best-practices`

#### 项目页面示例
- **文件位置**：`src/views/project/Vue3BestPractices.vue`
- **访问路径**：`/project/vue-3-best-practices`
- **路由名称**：`project-vue-3-best-practices`

## 🎨 页面模板

### 博客页面模板包含：
- 📖 标题、日期、作者信息
- 🎯 引言、主要内容、技术细节
- 🚀 实践步骤、总结
- 🏷️ 标签区域
- 🔙 返回博客列表按钮

### 项目页面模板包含：
- 📋 项目简介、核心功能
- 🔧 技术栈（前端/后端）
- 🚀 项目亮点、项目成果
- 🔗 GitHub 和演示链接
- 🔙 返回项目列表按钮

## ⚙️ 配置说明

### 路由命名规则
- **文件名**：驼峰命名法（如 `Vue3BestPracticesView.vue`）
- **路由路径**：短横线连接（如 `/blog/vue-3-best-practices`）
- **路由名称**：类型前缀 + 短横线连接（如 `blog-vue-3-best-practices`）

### 自定义模板
如需自定义页面模板，可修改脚本中的以下函数：
- `Generate-BlogTemplate`：博客页面模板
- `Generate-ProjectTemplate`：项目页面模板

## 🛠️ 故障排除

### 常见问题

1. **脚本无法运行**
   ```
   # 设置执行策略（管理员权限）
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **路由添加失败**
   - 检查 `src/router/index.ts` 文件权限
   - 确保文件格式正确（UTF-8 编码）

3. **文件已存在**
   - 脚本会提示是否覆盖
   - 可选择不覆盖，手动修改文件名

### 错误信息

- ❌ **目录不存在**：请确保在项目根目录运行脚本
- ❌ **文件权限错误**：检查文件读写权限
- ⚠️ **路由添加失败**：页面文件已创建，请手动添加路由

## 📋 示例

### 创建博客页面
```
📝 请选择要创建的页面类型：
  1. 📚 博客页面 (Blog)
  2. 🚀 项目页面 (Project)

请输入选择 (1/2) ➤ 1

📚 创建 blog 页面

📝 请输入页面标题 ➤ Vue 3 组合式 API 详解
📋 请输入页面描述（可选） ➤ 深入理解 Vue 3 组合式 API 的使用

📋 生成的信息：
  📝 页面标题: Vue 3 组合式 API 详解
  📁 文件名: Vue3CompositionApiView.vue
  🔗 路由名: vue-3-composition-api

✅ 确认创建？(y/n) ➤ y
```

### 创建项目页面
```
📝 请选择要创建的页面类型：
  1. 📚 博客页面 (Blog)
  2. 🚀 项目页面 (Project)

请输入选择 (1/2) ➤ 2

🚀 创建 project 页面

📝 请输入页面标题 ➤ 在线代码编辑器
📋 请输入页面描述（可选） ➤ 基于 Monaco Editor 的在线代码编辑器

📋 生成的信息：
  📝 页面标题: 在线代码编辑器
  📁 文件名: OnlineCodeEditor.vue
  🔗 路由名: online-code-editor

✅ 确认创建？(y/n) ➤ y
```

## 🔧 开发说明

### 脚本结构
```powershell
Main()                          # 主函数
├── Show-Header()              # 显示标题
├── Get-UserInput()           # 获取用户输入
├── Generate-BlogTemplate()   # 生成博客模板
├── Generate-ProjectTemplate() # 生成项目模板
├── ConvertTo-RouteName()     # 转换路由名
├── ConvertTo-FileName()      # 转换文件名
├── Add-RouteConfiguration()  # 添加路由配置
├── Create-PageFile()         # 创建页面文件
└── Show-SuccessInfo()        # 显示成功信息
```

### 扩展功能
如需添加新功能，可修改以下部分：
- 添加新的页面类型
- 自定义模板样式
- 添加更多配置选项
- 集成数据库或 API

## 📄 许可证

MIT License

## 👥 贡献者

JetCPP Team

## 📞 支持

如有问题或建议，请提交 Issue 或联系开发团队。

---

**✨ 祝您使用愉快！** 🚀