# mou7s/portfolio — 项目指南

## 项目概述

基于 **Nuxt 4** 的个人主页项目，使用 **Nuxt UI v4** 构建 UI，**Nuxt Content v3** 管理双语内容，部署到 **Cloudflare Workers**。

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Nuxt 4 + Vue 3 + TypeScript |
| UI | Nuxt UI v4（基于 Reka UI / Tailwind v4） |
| 内容 | Nuxt Content v3（支持 .yml / .md frontmatter） |
| 国际化 | @nuxtjs/i18n（策略：prefix_except_default） |
| 动画 | motion-v |
| OG 图片 | nuxt-og-image v7（zeroRuntime 模式，takumi 渲染） |
| 图标 | @iconify-json/lucide, @iconify-json/simple-icons |
| 部署 | Cloudflare Workers（nitro preset: cloudflare-module） |
| 包管理 | bun |

## 项目结构

```
.
├── AGENTS.md                # 本文件：AI 协作指南
├── app/                     # Nuxt 4 核心应用
│   ├── app.vue              # 根组件（注入 SEO meta、主题色、favicon）
│   ├── app.config.ts        # 全局 UI 配置（头像、邮箱、页脚、颜色主题）
│   ├── assets/css/main.css  # 全局样式
│   ├── components/          # 可复用 UI 组件（AppHeader, AppFooter, LangSwitcher, ColorModeButton, landing/*）
│   ├── composables/         # 组合式函数（useNavLinks）
│   ├── layouts/default.vue  # 全局布局
│   ├── middleware/          # 路由中间件（zh-root.global.ts）
│   ├── plugins/             # 客户端插件（i18n-redirect.client.ts）
│   └── pages/               # 路由页面（index, projects）
├── content/                 # 双语内容
│   ├── en/                  # 英文（默认语言）
│   │   ├── index.yml        # 首页内容
│   │   ├── projects.yml     # 项目页元信息
│   │   └── projects/        # 项目详情 .yml 文件
│   └── zh/                  # 简体中文（与 en 结构镜像）
├── content.config.ts        # Content collections schema（3 个 collection）
├── i18n/locales/            # 国际化翻译文件（en.json, zh.json）
├── nuxt.config.ts           # Nuxt 全局配置
├── server/                  # 服务端中间件与路由（scanner-guard.ts）
├── public/                  # 静态资源（favicon, pics/, robots.txt, _redirects）
└── tsconfig.json            # TypeScript 配置
```

## 常用命令

```bash
bun install      # 安装依赖（自动执行 nuxt prepare）
bun dev          # 启动本地开发服务器（默认 :3000）
bun run build    # 构建生产产物
bun run preview  # 本地预览生产构建
bun run lint     # ESLint + Tailwind CSS 正确性检查
bun run typecheck # Nuxt + TypeScript 类型检查
```

## 内容管理

### 双语结构

- `content/en/` 存放英文内容（默认语言），`content/zh/` 存放简体中文。
- 两个目录结构完全镜像：同样的文件路径、同样的字段结构。
- 新增内容时**必须**同步添加两份文件。
- 结构化页面与项目数据使用 YAML（`.yml` 文件）。

### Content Collections

定义在 `content.config.ts`，共 3 个 collection：

| Collection | 来源 | 用途 |
|---|---|---|
| `index` | `**/index.yml` | 首页：seo、hero、about、skills、foundations、faq |
| `projects` | `**/projects/*.yml` | 项目卡片：title、description、image、imageDark、tags、url、repo、sort |
| `pages` | `**/projects.yml` | 列表页元信息：seo、links（按钮配置） |

### 内容开发规范

- slug 使用语义化 kebab-case 命名，如 `ctk-system.yml`、`calendar-hub.yml`。
- 双语内容的字段结构保持一致，仅翻译文本内容。
- 可用 schema 中定义的工具类型构建新字段（如 `createButtonSchema`、`createBaseSchema`、`createSeoSchema`）。
- 项目截图放在 `public/pics/` 下，建议同步提供浅色 `image` 与深色 `imageDark`。

## 国际化（i18n）

- 策略：`prefix_except_default` — 英文不带前缀，中文以 `/zh` 开头。
- 默认语言：`en`，二级语言：`zh`。
- 模块自带 `detectBrowserLanguage` 设为 `false`，改由 `app/plugins/i18n-redirect.client.ts` 在根路径 `/` 根据 cookie `i18n_redirected` 或浏览器语言自动切换 `/zh`。
- `i18n/locales/{en,zh}.json`：UI 文本翻译（导航、Hero 状态徽章、项目按钮、页脚等）。
- `content/en/` vs `content/zh/`：内容翻译（通过文件分离管理）。
- 新增页面路由时确认 `app/middleware/zh-root.global.ts` 是否需要同步更新。

## 构建与部署

### nuxt.config.ts 关键配置

- **Nitro preset**: `cloudflare-module`，部署到 Cloudflare Workers（`$development` 下覆写为 `node` 以确保开发态内容路由正常）。
- **预渲染路由**: `/`、`/zh`（启用 `crawlLinks` 爬取 `/projects` 等关联路由）。
- **OG 图片**: `zeroRuntime: true`，减少构建产物体积；渲染器使用 takumi（`@takumi-rs/core`）。
- **Bun 兼容垫片**: `bunfig.toml` 顶层 `preload` 注入 `scripts/bun-find-package-json.ts`。nuxt-og-image v7 在 setup 阶段调用 `node:module` 的 `findPackageJSON()`（Node 22.14+ 新增 API），而 Bun 尚未实现该 API；缺少垫片时 `bun install` / `bun dev` / `bun run build` 会在启动阶段报 `findPackageJSON is not a function`。Bun 实现该 API 后可删除垫片。
- **DevTools**: 默认启用（快捷键 Shift + Option + D）。

### 新增关键页面时

同步更新 `nuxt.config.ts` 中顶层 `prerender.routes`。

## 代码规范

- **语言**: TypeScript（`<script setup lang="ts">`）。
- **组件命名**: PascalCase，放在 `app/components/`。
- **页面文件**: `app/pages/`，按 Nuxt 文件路由规则命名。
- **组合式函数**: `app/composables/`，以 `use` 开头。
- **UI 组件**: 优先使用 Nuxt UI 内置组件（`UButton`、`UCard`、`UPage`、`UPageHero` 等）。
- **图标**: 统一使用 Iconify 标识符（如 `i-simple-icons-github`、`i-lucide-sun`），首选 `@iconify-json/lucide` 和 `@iconify-json/simple-icons`。
- **颜色模式**: 支持 dark/light，通过 `useColorMode()` 动态切换，项目卡片优先展示对应的明暗截图。
- **服务端路由/中间件**: 放在 `server/`，与客户端代码分离。
