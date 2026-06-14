# Mou7s Portfolio

基于 Nuxt 4、Nuxt UI 与 Nuxt Content 构建的个人作品集网站。项目以内容驱动为主，使用 YAML 管理页面配置与作品数据，使用 Markdown 管理博客文章，包含首页、经历、项目、博客、关于、演讲活动与 PPI 计算器页面。

## 功能概览

- 内容驱动：页面数据集中存放在 `content/`，字段由 `content.config.ts` 约束。
- 作品集展示：支持项目列表、工作经历、个人介绍、博客文章与演讲活动。
- SEO 友好：页面使用 `useSeoMeta` 管理标题、描述与 Open Graph 信息，`/ppi` 页面包含 canonical 与结构化数据。
- 响应式 UI：基于 Nuxt UI 和 Tailwind CSS，支持深浅色模式。
- 页面动效：使用 `motion-v` 为列表与内容区块添加进入视口动画。
- 静态资源管理：图片与图标资源放在 `public/`，可直接通过路径引用。

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

- `/` 首页，聚合 Hero、简介、经历、博客、评价与 FAQ
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
  app.vue              应用入口
  app.config.ts        Nuxt UI 与全局配置
  assets/css/          全局样式入口
  components/          通用组件与页面模块
  layouts/             布局
  pages/               页面路由
  utils/               工具函数
content/
  *.yml                页面配置与结构化内容
  blog/*.md            博客文章
  projects/*.yml       项目条目
public/                静态资源
content.config.ts      Nuxt Content collection schema
nuxt.config.ts         Nuxt 配置
```

## 本地开发

使用 pnpm 安装依赖并启动开发服务器：

```bash
pnpm install
pnpm dev
```

开发服务器默认由 Nuxt 输出本地访问地址。

## 环境变量

复制 `.env.example` 并按需填写：

```bash
cp .env.example .env
```

当前可配置项：

```bash
NUXT_PUBLIC_SITE_URL=
```

`NUXT_PUBLIC_SITE_URL` 用于生成站点相关的公开 URL，例如 OG Image 场景。

## 构建与检查

```bash
pnpm build
pnpm preview
pnpm lint
pnpm lint:fix
pnpm typecheck
```

常用流程：

- 开发时运行 `pnpm dev`
- 提交前运行 `pnpm lint` 与 `pnpm typecheck`
- 发布前运行 `pnpm build`，然后使用 `pnpm preview` 本地预览产物

## 内容维护

- 首页内容：`content/index.yml`
- 关于页内容：`content/about.yml`
- 经历页内容：`content/experience.yml`
- 项目页头部配置：`content/projects.yml`
- 项目条目：`content/projects/*.yml`
- 博客页头部配置：`content/blog.yml`
- 博客文章：`content/blog/*.md`
- 演讲/活动内容：`content/speaking.yml`

新增内容前请确认字段满足 `content.config.ts` 中的 schema 定义。

## 静态资源

- Hero 图片：`public/hero/`
- 项目与文章配图：`public/pics/`
- favicon 与 Apple touch icon：`public/`
- robots 配置：`public/robots.txt`

内容文件中引用图片时，优先使用 `public/` 下的公开路径。

## 部署说明

项目当前使用 Cloudflare Workers 部署，`nuxt.config.ts` 中的 Nitro preset 为 `cloudflare-module`。

典型流程：

1. `pnpm install`
2. `pnpm build`
3. `pnpm wrangler deploy`

本地预览 Worker 产物可运行：

```bash
pnpm wrangler dev
```

## 协作说明

- 开发前先阅读 `AGENTS.md`。
- 提交前至少执行 `pnpm lint` 与 `pnpm typecheck`。
- 请勿提交临时文件（例如 `#README.md#`、`.DS_Store`）。
