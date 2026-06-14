# Repository Guidelines
## Project Structure & Module Organization

- 核心 Nuxt 4 应用位于 `app/`：`pages/` 定义路由，`components/` 存放可复用 UI，`layouts/` 提供全局布局，`assets/` 管理样式与媒体资源，`utils/` 放小型工具函数。
- 内容文件位于 `content/`，推荐使用 frontmatter 管理元信息。
- 需要原样对外暴露的静态资源放在 `public/`。
- 全局配置位于 `nuxt.config.ts`、`content.config.ts`。

## Build, Test, and Development Commands

- `pnpm install`：安装依赖（包含 `nuxt prepare`）。
- `pnpm dev`：启动本地开发服务器。
- `pnpm build`：构建生产产物。
- `pnpm preview`：本地预览生产构建。
- `pnpm typecheck`：执行 Nuxt/TypeScript 类型检查。

## Content, Assets, and SEO

- 内容放在 `content/`，slug 使用语义化命名。
- frontmatter 建议包含 `title`、`description`、`date`。
- 图片原图放在 `public/` 或 `assets/`，需要原样公开访问的资源放在 `public/`。
- 新增关键页面时，按需同步更新 `nuxt.config.ts` 的 prerender 配置。
