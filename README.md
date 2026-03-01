# Mou7s Portfolio

基于 Nuxt 4 + Nuxt UI + Nuxt Content 的个人作品集网站，包含首页、经历、项目、博客、关于页，以及一个独立的 PPI 计算工具页。

## 技术栈

- Nuxt 4
- @nuxt/ui
- @nuxt/content
- @vueuse/nuxt
- nuxt-og-image
- motion-v
- TypeScript
- pnpm

## 页面与路由

- `/` 首页
- `/experience` 工作经历
- `/projects` 项目展示
- `/blog` 博客列表
- `/blog/[...slug]` 博客详情
- `/about` 关于页
- `/speaking` 演讲/活动页
- `/ppi` PPI 计算器

## 目录结构

```text
app/
  components/      通用组件与 landing 模块
  layouts/         布局
  pages/           页面路由
  assets/css/      全局样式入口（main.css）
  utils/           工具函数
content/           内容文件（yml / md）
public/            静态资源
nuxt.config.ts     Nuxt 配置
content.config.ts  内容 schema 配置
```

## 本地开发

安装依赖：

```bash
pnpm install
```

启动开发环境：

```bash
pnpm dev
```

生产构建：

```bash
pnpm build
```

本地预览生产构建：

```bash
pnpm preview
```

## 质量检查

执行 ESLint：

```bash
pnpm lint
```

自动修复可修复问题：

```bash
pnpm lint:fix
```

执行类型检查：

```bash
pnpm typecheck
```

## 内容维护

- 首页内容：`content/index.yml`
- 关于页内容：`content/about.yml`
- 经历页内容：`content/experience.yml`
- 项目页头部配置：`content/projects.yml`
- 项目条目：`content/projects/*.yml`
- 博客页头部配置：`content/blog.yml`
- 博客文章：`content/blog/*.md`

新增内容前请确认字段满足 `content.config.ts` 中的 schema 定义。

## 部署说明

项目包含 PM2 配置文件：`ecosystem.config.cjs`。

典型流程：

1. `pnpm install`
2. `pnpm build`
3. `pm2 start ecosystem.config.cjs`

默认配置下服务监听 `0.0.0.0:4000`，可在反向代理（如 Caddy / Nginx）后提供 HTTPS 与域名访问。

## 说明

当前仓库包含 `AGENTS.md`（协作与工程约束说明），贡献或协作开发时建议先阅读。
