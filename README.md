# Mou7s Portfolio

基于 Nuxt 4 + Nuxt UI + Nuxt Content 的个人作品集网站，包含首页、经历、项目、博客、关于与工具页面。

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
  components/      通用组件与页面模块
  layouts/         布局
  pages/           页面路由
  assets/css/      全局样式入口（main.css）
  utils/           工具函数
content/           内容文件（yml / md）
public/            静态资源
nuxt.config.ts     Nuxt 配置
content.config.ts  内容 schema 配置
AGENTS.md          协作规范
```

## 本地开发

```bash
pnpm install
pnpm dev
```

## 构建与检查

```bash
pnpm build
pnpm preview
pnpm lint
pnpm lint:fix
pnpm typecheck
```

## 持续集成

已新增 GitHub Actions CI：`.github/workflows/ci.yml`。
该工作流在 `main` 分支的 push 和 pull_request 事件上运行，执行：

- `pnpm install`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

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

## 协作说明

- 开发前先阅读 `AGENTS.md`。
- 提交前至少执行 `pnpm lint` 与 `pnpm typecheck`。
- 请勿提交临时文件（例如 `#README.md#`、`.DS_Store`）。
