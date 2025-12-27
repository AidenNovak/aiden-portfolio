# 网站修改与部署指南

本文档说明如何修改个人网站内容并部署到生产环境。

---

## 项目结构

```
aiden-portfolio/
├── app/                    # 页面组件
│   ├── page.tsx           # 首页
│   ├── projects/          # 项目展示页
│   ├── writing/           # 文章页
│   ├── contact/           # 联系页
│   └── resume/            # 简历页
├── content/
│   ├── projects/          # 项目内容（MDX文件）
│   └── writing/           # 文章内容（MDX文件）
├── components/            # 公共组件
├── lib/                   # 工具函数
└── public/                # 静态资源
```

---

## 修改内容的方式

### 方式一：Admin 管理界面（推荐）

适用于：修改项目内容、添加新项目

```bash
# 1. 进入项目目录
cd /Users/lijixiang/aiden-portfolio

# 2. 启动开发服务器
npm run dev

# 3. 浏览器访问
open http://localhost:3000/admin
```

登录密码：`V3ryStr0ng_ChangeMe_2025!`（或查看 .env 文件）

**功能**：
- 新建/编辑/删除项目
- 实时预览项目页面
- 查看 Git 历史并回滚
- 自动提交修改到 Git

### 方式二：本地编辑 MDX 文件

适用于：熟悉 Markdown 的用户

```bash
# 1. 编辑项目内容
vim content/projects/your-project.mdx

# 2. 本地预览（可选）
npm run dev

# 3. 提交并部署
git add -A
git commit -m "更新项目内容"
git push
```

**MDX 文件格式**：

```yaml
---
title: "项目标题"
description: "简短描述"
metric: "87× faster than baseline"  # 核心指标
tags: ["Python", "React"]
summary: "一句话总结"
background: "项目背景..."
solution: "解决方案..."
decisions:
  - "技术决策理由1"
  - "技术决策理由2"
highlights:
  - "亮点1"
  - "亮点2"
results: "成果和量化指标..."
retrospective:
  - "可以改进的地方"
codeUrl: "https://github.com/AidenNovak/xxx"
demoUrl: "https://xxx"
---

## 正文内容（可选）

这里可以写更详细的项目说明，支持 Markdown 语法。
```

### 方式三：GitHub 网页编辑

适用于：小改动、没有本地环境

1. 访问 https://github.com/AidenNovak/aiden-portfolio
2. 进入 `content/projects/` 或 `content/writing/`
3. 点击文件，然后点击铅笔图标编辑
4. 填写 commit 信息，点击 "Commit changes"

---

## 修改其他内容

### 修改个人信息

| 文件 | 内容 |
|------|------|
| `app/page.tsx` | 首页姓名、简介 |
| `app/resume/page.tsx` | 简历页教育信息 |
| `app/contact/page.tsx` | 联系邮箱 |
| `components/Footer.tsx` | 页脚链接 |
| `lib/sitemap.ts` | 网站域名 |

### 修改联系方式

```bash
# 编辑联系页
vim app/contact/page.tsx

# 编辑页脚
vim components/Footer.tsx

# 编辑简历页
vim app/resume/page.tsx
```

查找并替换：
- 邮箱：`2453204059@qq.com`
- GitHub：`AidenNovak`

---

## 部署流程

### 自动部署（推荐）

代码推送到 `main` 分支后，Vercel 会自动部署：

```bash
git add -A
git commit -m "更新内容"
git push
```

等待约 1-2 分钟，访问 https://aiden-portfolio.vercel.app 查看更新。

### 查看部署状态

访问 Vercel 控制台：https://vercel.com/dashboard

---

## 常见操作

### 添加新项目

**方法 A - 使用 Admin**：
1. 访问 `http://localhost:3000/admin`
2. 点击 "New Project"
3. 填写表单并保存

**方法 B - 手动创建**：
```bash
# 创建新的 MDX 文件
vim content/projects/my-new-project.mdx

# 提交
git add -A
git commit -m "添加新项目"
git push
```

### 添加新文章

```bash
# 创建 MDX 文件
vim content/writing/my-article.mdx

# 提交
git add -A
git commit -m "添加新文章"
git push
```

### 修改网站样式

```bash
# 全局样式
vim app/globals.css

# Tailwind 配置
vim tailwind.config.ts

# 测试修改
npm run dev

# 部署
git add -A && git commit -m "更新样式" && git push
```

### 更新依赖

```bash
# 查看过时的包
npm outdated

# 更新 Next.js
npm install next@latest

# 更新所有依赖
npm update

# 测试构建
npm run build

# 提交
git add -A && git commit -m "更新依赖" && git push
```

---

## 常见问题

### Q: 本地预览报错怎么办？

```bash
# 清理缓存重新安装
rm -rf node_modules .next
npm install
npm run dev
```

### Q: 构建失败怎么办？

检查 Vercel 构建日志，常见原因：
- MDX 文件格式错误（YAML 语法）
- 缺少必填字段
- 代码语法错误

### Q: 如何回滚到之前的版本？

**方法 A - Git 回滚**：
```bash
# 查看历史
git log --oneline

# 回滚到指定版本
git revert <commit-hash>
git push
```

**方法 B - Vercel 控制台**：
1. 进入项目部署历史
2. 选择之前的部署
3. 点击 "Promote to Production"

### Q: Admin 界面打不开？

Admin 界面只在**开发模式**下可用：

```bash
npm run dev  # ✅ Admin 可用
npm run build && npm start  # ❌ 静态导出不包含 Admin
```

---

## 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS
- **内容**: MDX
- **部署**: Vercel (静态导出)
- **版本控制**: Git + GitHub

---

## 快速命令参考

```bash
# 开发
npm run dev              # 启动开发服务器

# 构建
npm run build            # 构建生产版本
npm run build:raw        # 直接运行 next build

# Git
git status               # 查看修改
git add -A               # 添加所有修改
git commit -m "xxx"      # 提交
git push                 # 推送到 GitHub

# 清理
rm -rf .next out         # 清理构建缓存
rm -rf node_modules      # 清理依赖
npm install              # 重新安装依赖
```

---

## 联系

如有问题，查看：
- Next.js 文档: https://nextjs.org/docs
- MDX 文档: https://mdxjs.com
- Tailwind 文档: https://tailwindcss.com
