# 管理员系统设置指南

## 快速开始

### 1. 创建管理员账户

#### 方法一：通过注册页面（推荐）

1. **访问登录页面**
   ```
   http://localhost:5175/#/auth
   ```

2. **注册管理员账户**
   - 邮箱
   - 密码
   - 点击"注册"按钮

3. **验证邮箱**
   - 检查邮箱收件箱
   - 点击验证链接
   - 或在 Supabase Dashboard 手动确认

#### 方法二：通过 Supabase Dashboard

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 进入 Authentication → Users
4. 点击 "Add user"
5. 填写信息：
   - Email:
   - Password
   - Auto Confirm User: 勾选
6. 点击 "Create user"

### 2. 配置环境变量

编辑 `.env.local` 文件：

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_EMAIL=
```

**重要**：修改后需要重启开发服务器

```bash
npm run dev
```

### 3. 访问管理员面板

1. **登录管理员账户**
   - 访问 http://localhost:5175/#/auth
   - 使用管理员邮箱和密码登录

2. **进入管理员面板**
   - 直接访问：http://localhost:5175/#/admin
   - 或从导航栏点击管理员入口（如果已添加）

---

## 🔐 安全建议

### 密码安全

**强烈建议首次登录后立即修改密码！**

1. 登录管理员账户
2. 访问账户设置页面
3. 修改为更安全的密码
4. 启用双因素认证（如果支持）

### 环境变量安全

- `.env.local` 已被 `.gitignore` 忽略
- 不要将 `.env.local` 提交到 Git
- 生产环境在部署平台设置环境变量
- 永远不要在代码中硬编码密钥

### 管理员权限

管理员拥有最高权限，请谨慎操作：
- 定期备份数据库
- 审查所有管理操作
- 限制管理员账户数量
- 不要共享管理员凭据

---

## 管理员功能

### 系统统计

- 总用户数
- 文章总数
- 评论总数

### 用户管理

- 查看所有注册用户
- 搜索特定用户（邮箱/昵称）
- 查看用户资料详情
- （可扩展：封禁/删除用户）

### 文章管理

- 查看所有文章（已发布 + 草稿）
- 按状态过滤：
  - 全部文章
  - 已发布
  - 草稿
- 搜索文章（标题）
- 编辑任何文章
- 删除不当文章

### 评论管理

- 查看所有评论
- 搜索评论内容
- 删除垃圾/不当评论

---

## 技术实现

### 管理员识别机制

```typescript
// src/composables/useAdmin.ts
const isAdmin = computed(() => {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
  return user.value?.email?.toLowerCase() === adminEmail?.toLowerCase()
})
```

### 权限控制

```typescript
// 检查是否有权限管理指定内容
const canManagePost = (postAuthorId: string) => {
  if (isAdmin.value) return true  // 管理员可以管理所有
  return user.value?.id === postAuthorId  // 作者只能管理自己的
}
```

### 路由保护

管理员页面会自动检查权限：
- 未登录：重定向到登录页
- 非管理员：显示"访问被拒绝"

---

## 常见问题

### Q: 为什么我看不到管理员面板？

A: 检查以下几点：
1. 是否已登录？
2. 登录的邮箱是否与 `VITE_ADMIN_EMAIL` 一致？
3. `.env.local` 是否正确配置？
4. 是否重启了开发服务器？

### Q: 如何添加多个管理员？

A: 修改 `useAdmin.ts`：

```typescript
const adminEmails = [
  'youmao2023@outlook.com',
  'another-admin@example.com',
]

const isAdmin = computed(() => {
  return adminEmails.includes(user.value?.email?.toLowerCase())
})
```

### Q: 管理员可以删除用户吗？

A: 当前版本仅支持查看用户资料。如需删除功能，需要：
1. 在 Supabase Dashboard 手动删除
2. 或扩展管理员面板添加删除功能

### Q: 如何撤销管理员权限？

A: 修改 `.env.local` 中的 `VITE_ADMIN_EMAIL` 为其他邮箱，或删除该配置。

---

## 下一步

- [x] 添加用户封禁功能
- [ ] 添加批量操作
- [ ] 添加操作日志
- [ ] 添加数据导出功能
- [ ] 添加更多统计图表

---

## 技术支持

如有问题，请检查：
1. Supabase 服务是否正常
2. 环境变量是否正确
3. 浏览器控制台是否有错误
4. 网络请求是否成功

祝管理愉快！
