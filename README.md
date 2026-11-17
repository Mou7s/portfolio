# Mou7s Portfolio

基于 Nuxt 4、Nuxt UI v4 与 Nuxt Content v3 构建的中英双语个人主页与作品集，部署于 Cloudflare Workers。内容完全由 YAML 驱动，集中展现企业数字化系统、边缘原生 Web 产品与开源基础实践。

## 功能概览

- **内容驱动**：中英双语页面与项目数据存放在 `content/`，由 `content.config.ts` 进行 schema 校验。
- **双语路由**：通过 `@nuxtjs/i18n`（`prefix_except_default`）提供英文 `/` 与简体中文 `/zh` 镜像体验，并在根路径根据偏好或浏览器语言自动分流。
- **作品与开源矩阵**：集中展示开源项目截图（支持深浅色主题自动切换）、技术栈标签、线上访问与 GitHub 源码仓库链接，以及开源工具与底层学习记录。
- **SEO 与安全**：页面使用 `useSeoMeta` 管理标题、描述与 Open Graph 信息；边缘中间件 `scanner-guard.ts` 在 SSR 前拦截常见漏洞扫描路径与扫描器 UA。
- **动效与主题**：结合 `motion-v` 进场动画与 View Transitions API 圆形扩散切换深浅色模式。

## 技术栈

- Nuxt 4 · Vue 3 · TypeScript
- `@nuxt/ui` v4（Tailwind CSS v4）
- `@nuxt/content` v3
- `@nuxtjs/i18n`
- `nuxt-og-image` v7 + `@takumi-rs/core`
- `motion-v`
- Bun + Cloudflare Workers（Wrangler）

## 页面与路由

- `/` · `/zh`：首页（Hero、关于、技术栈矩阵、开源与底层探索、FAQ）
- `/projects` · `/zh/projects`：项目展示（企业平台、边缘应用、交互作品）

## 目录结构

```text
app/
  app.vue                 应用入口与基础 Meta
  app.config.ts           Nuxt UI 主题色与全局配置
  assets/css/             全局样式入口
  components/             通用组件与首页区块（Hero/About/Skills/Foundations/FAQ）
  composables/            导航组合式函数
  layouts/                页面布局
  middleware/             客户端路由规范化中间件
  plugins/                语言自动重定向插件
  pages/                  页面路由（index, projects）
content/
  en/                     英文内容（index.yml, projects.yml, projects/*.yml）
  zh/                     简体中文内容（结构镜像）
public/
  pics/                   项目浅/暗双色截图
  robots.txt              爬虫规则
server/
  middleware/             scanner-guard 边缘探测拦截
scripts/
  bun-find-package-json.ts  Bun 对 nuxt-og-image v7 node:module API 的兼容垫片
content.config.ts         Nuxt Content collection schema
nuxt.config.ts            Nuxt 与 Cloudflare Workers 配置
```

## 本地开发

使用 Bun 安装依赖并运行开发服务器：

```bash
bun install
bun run dev
```

`bunfig.toml` 预加载 `scripts/bun-find-package-json.ts` 以兼容 `nuxt-og-image` v7 在 Bun 下调用的 `node:module.findPackageJSON`。

## 环境变量

复制 `.env.example` 并按需填写：

```bash
cp .env.example .env
```

当前可配置项：

```bash
NUXT_PUBLIC_SITE_URL=
```

## 构建与检查

```bash
bun run lint
bun run typecheck
bun run build
bun run preview
```

## 部署说明

项目面向 Cloudflare Workers 部署，`nuxt.config.ts` 中生产 Nitro preset 为 `cloudflare-module`（开发模式通过 `$development` 覆写为 `node`），配置声明在 `wrangler.jsonc`。

```bash
bun install
bun run build
bunx wrangler deploy
```

本地预览 Worker 产物可运行：

```bash
bunx wrangler dev
```

## 协作说明

- 开发前先阅读 `AGENTS.md`。
- 提交前执行 `bun run lint` 与 `bun run typecheck`。
- 新增内容文件时需同步维护 `content/en/` 与 `content/zh/` 两份镜像文件。
