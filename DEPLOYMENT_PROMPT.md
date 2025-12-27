# Web 项目公网部署经验 Prompt

> 本文档记录了将本地 Web 项目部署到公网的经验，适用于静态网站、Next.js、React 等前端项目的部署。

---

## 部署前准备清单

在开始部署前，确保项目满足以下条件：

### 1. 代码规范检查
- [ ] 移除所有占位符内容（TODO、示例邮箱、示例链接）
- [ ] 检查敏感信息（API密钥、密码等）不应暴露在前端代码
- [ ] 统一命名规范（GitHub 用户名大小写敏感）
- [ ] 移除无用的测试文件和冗余代码

### 2. 依赖和配置检查
```bash
# 检查 package.json 中的 scripts
npm run build    # 构建命令必须能正常执行
npm run start    # 验证构建产物能正常运行

# 检查环境变量文件
cat .env.example  # 应该有示例配置，不含真实密钥
```

### 3. Git 仓库准备
```bash
# 初始化 Git（如果还没有）
git init

# 创建 .gitignore（必须包含）
node_modules/
.next/
out/
dist/
.env.local
.DS_Store
```

---

## 部署流程

### 步骤 1：Git 初始化和首次提交

```bash
# 配置 Git 用户信息（首次需要）
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 添加所有文件
git add -A

# 创建首次提交
git commit -m "Initial commit

- Project: [项目名称]
- Tech: [技术栈]
- Author: [你的名字]

🤖 Generated with [Claude Code](https://claude.com/claude-code)
"

# 添加远程仓库
git remote add origin https://github.com/USERNAME/REPO.git

# 推送
git branch -M main
git push -u origin main
```

### 步骤 2：在 GitHub 创建仓库

**方法 A - 使用 GitHub CLI（推荐）**
```bash
gh repo create REPO-NAME --public --source=. --remote=origin --push
```

**方法 B - 网页操作**
1. 访问 https://github.com/new
2. 填写仓库名
3. 选择 Public（个人项目建议公开）
4. 不要勾选 "Add a README file"（本地已有）
5. 点击 "Create repository"
6. 按照提示推送现有代码

### 步骤 3：选择部署平台

| 平台 | 适用场景 | 免费额度 | 特点 |
|------|----------|----------|------|
| **Vercel** | Next.js、React、静态 | 100GB 带宽/月 | Next.js 官方，零配置 |
| **Netlify** | 静态网站、JAMstack | 100GB 带宽/月 | Forms 功能好 |
| **GitHub Pages** | 纯静态网站 | 1GB 存储 | 完全免费，简单 |
| **Cloudflare Pages** | 静态网站 | 无限带宽 | 全球 CDN 快 |

### 步骤 4：配置 Vercel 部署（推荐）

1. **访问** https://vercel.com/new
2. **导入 GitHub 仓库**
3. **确认配置**：
   - Framework Preset: 自动检测（如 Next.js）
   - Build Command: `npm run build` 或自定义
   - Output Directory: 自动检测或指定（如 `out`）
4. **点击 "Deploy"**

**部署完成后**：
- 获得 `.vercel.app` 域名
- 绑定自定义域名（可选）
- 每次推送到 main 分支自动重新部署

---

## Next.js 静态导出注意事项

如果使用 `output: 'export'` 模式，需要注意：

### 1. API Routes 不兼容

静态导出不支持 API Routes。解决方法：

**方案 A - 构建时临时移除**（`scripts/build.sh`）：
```bash
#!/bin/bash
# 构建前临时移动 admin 目录
if [ -d "app/admin" ]; then
  mv app/admin ../admin_temp_backup
fi

# 执行构建
npm run build:raw

# 构建后恢复
if [ -d "../admin_temp_backup" ]; then
  mv ../admin_temp_backup app/admin
fi
```

**方案 B - 使用 Vercel 的动态部署**：
```bash
# 放弃静态导出，使用 Vercel 的 Serverless
# 在 next.config.mjs 中移除 output: 'export'
```

### 2. package.json scripts 配置

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "./scripts/build.sh",    // 自定义构建脚本
    "build:raw": "next build",        // 原始构建命令
    "start": "next start"
  }
}
```

**关键**：`build.sh` 必须调用 `build:raw` 而非 `build`，否则会无限循环！

### 3. 动态路由需要 generateStaticParams

```typescript
// app/projects/[slug]/page.tsx
export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}
```

---

## 常见部署问题和解决

### 问题 1：构建超时

**原因**：免费账户有 45s-60s 构建时间限制

**解决**：
- 优化构建速度（减少依赖、使用缓存）
- 升级到 Pro 账户
- 分离构建步骤

### 问题 2：环境变量未生效

**解决**：
```bash
# Vercel 控制台设置
Settings > Environment Variables
# 添加对应变量，选择对应环境（Production/Preview/Development）
```

### 问题 3：构建成功但页面 404

**检查**：
- Output Directory 是否正确（`out` vs `.next`）
- 静态导出是否正确生成文件
- 路由配置是否正确

### 问题 4：安全漏洞警告

```bash
# 查看过时的包
npm outdated

# 更新有漏洞的包
npm install PACKAGE@latest

# 检查漏洞
npm audit
npm audit fix
```

**注意**：不要盲目大版本升级（如 Next.js 15 → 16），可能有破坏性变更。

---

## 域名配置（可选）

### 绑定自定义域名

1. **在 Vercel 添加域名**：
   - Settings > Domains > Add Domain
   - 输入你的域名（如 `example.com`）

2. **配置 DNS**：
   - 如果域名在其他注册商，添加 CNAME 记录：
   ```
   Type: CNAME
   Name: @ 或 www
   Value: cname.vercel-dns.com
   ```

3. **等待 DNS 生效**：通常 5 分钟 - 24 小时

### 免费 SSL 证书

Vercel 自动为所有域名提供 Let's Encrypt SSL 证书，无需额外配置。

---

## 部署后的维护

### 日常更新流程

```bash
# 1. 本地修改
vim file.tsx

# 2. 测试
npm run build
npm run start  # 或 npm run dev

# 3. 提交
git add -A
git commit -m "描述修改内容"
git push

# 4. Vercel 自动部署，等待 1-2 分钟
```

### 查看部署状态

- Vercel Dashboard: https://vercel.com/dashboard
- GitHub 仓库的 Checks 标签页
- 部署日志中的错误信息

### 回滚部署

**方法 A - Vercel 控制台**：
1. 进入项目
2. 选择之前的部署
3. 点击 "Promote to Production"

**方法 B - Git 回滚**：
```bash
git log --oneline  # 找到要回滚的 commit
git revert <commit-hash>
git push
```

---

## 部署清单（复制使用）

完成部署前，确认以下各项：

### 代码质量
- [ ] 所有 TODO 和占位符已替换
- [ ] 邮箱、链接等个人信息正确
- [ ] 无硬编码的测试数据
- [ ] 代码无 console.log 或调试代码

### 功能测试
- [ ] 本地 `npm run build` 成功
- [ ] 本地 `npm run start` 能正常运行
- [ ] 所有页面链接正常
- [ ] 图片和资源加载正常

### Git 仓库
- [ ] .gitignore 配置正确
- [ ] README.md 有项目说明
- [ ] LICENSE 文件（如需要）
- [ ] 代码已推送到 GitHub main 分支

### 部署配置
- [ ] Vercel 项目已创建
- [ ] 构建命令配置正确
- [ ] 环境变量已设置（如需要）
- [ ] 自定义域名已配置（如需要）

### 部署后验证
- [ ] 访问生产地址，页面正常
- [ ] 检查控制台无错误
- [ ] 移动端显示正常
- [ ] SEO 元数据正确（title、description、sitemap）

---

## 有用的命令速查

```bash
# Git
git status               # 查看修改状态
git log --oneline -10    # 查看最近 10 条提交
git diff                 # 查看具体改动

# npm
npm run build            # 构建项目
npm outdated             # 查看过期的包
npm audit                # 检查安全漏洞

# Vercel CLI
vercel login             # 登录 Vercel
vercel --prod            # 部署到生产环境
vercel ls                # 列出部署列表

# 清理
rm -rf node_modules .next out
npm install
```

---

## 经验总结

1. **先本地验证，再推送部署**
   - 确保 `npm run build` 能成功
   - 测试构建产物能正常运行

2. **小步提交，频繁部署**
   - 每个功能点单独提交
   - 出问题容易定位和回滚

3. **善用 Git 分支**
   - main 分支对应生产环境
   - 开发新功能用 feature 分支
   - 测试通过后再合并到 main

4. **关注安全更新**
   - 定期运行 `npm audit`
   - 及时更新有漏洞的依赖
   - 但要谨慎大版本升级

5. **保持配置简洁**
   - 静态网站优先使用 `output: 'export'`
   - 避免不必要的复杂配置
   - 能用免费方案就不用付费

---

## 下一步学习

- [ ] 学习 CI/CD（GitHub Actions）
- [ ] 学习 Docker 容器化部署
- [ ] 学习服务器部署（VPS + Nginx）
- [ ] 学习 CDN 加速原理
