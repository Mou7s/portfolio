# Repository Guidelines

## 语言约定

- 默认使用简体中文沟通与文档描述。

## Project Structure & Module Organization

- 核心 Nuxt 4 应用位于 `app/`：`pages/` 定义路由，`components/` 存放可复用 UI，`layouts/` 提供全局布局，`assets/` 管理样式与媒体资源，`utils/` 放小型工具函数。
- 内容文件位于 `content/`，推荐使用 frontmatter 管理元信息。
- 需要原样对外暴露的静态资源放在 `public/`。
- 全局配置位于 `nuxt.config.ts`、`content.config.ts`、`eslint.config.mjs`。

## Build, Test, and Development Commands

- `pnpm install`：安装依赖（包含 `nuxt prepare`）。
- `pnpm dev`：启动本地开发服务器。
- `pnpm build`：构建生产产物。
- `pnpm preview`：本地预览生产构建。
- `pnpm lint` / `pnpm lint:fix`：运行 ESLint 与自动修复。
- `pnpm typecheck`：执行 Nuxt/TypeScript 类型检查。

## Coding Style & Naming Conventions

- TypeScript-first，Vue SFC 使用 `<script setup lang="ts">`。
- 使用两个空格缩进。
- 保持 import 顺序：builtin -> external -> internal。
- 组件与 composable 文件使用 PascalCase（如 `HeroBanner.vue`、`useScroll.ts`）。
- 页面与布局文件使用 kebab-case（如 `about.vue`、`default.vue`）。

## Content, Assets, and SEO

- 内容放在 `content/`，slug 使用语义化命名。
- frontmatter 建议包含 `title`、`description`、`date`。
- 图片优先通过 `@nuxt/image` 使用，原图放在 `public/` 或 `assets/`。
- 新增关键页面时，按需同步更新 `nuxt.config.ts` 的 prerender 配置。

## Testing Guidelines

- 当前没有自动化测试套件，默认通过 `pnpm dev` 手动验证。
- 若新增测试，建议与功能同目录放置 `*.spec.ts`，或放在 `tests/`。
- 提交前确保 `pnpm typecheck` 无报错。

## Commit & Pull Request Guidelines

- Commit message 使用简短祈使句，如 `Add hero animation`、`Fix nav focus trap`。
- PR 前至少执行：`pnpm lint`、`pnpm typecheck`。
- UI 变更需附截图或录屏；内容 schema 变更需说明迁移步骤。

## Git Hygiene

- 不提交临时/备份文件：`#*#`、`*.swp`、`.DS_Store`。
- 遇到与本次任务无关的本地改动，不要回滚，避免误伤。
- 仅在必要范围内修改文件，保持变更聚焦。
