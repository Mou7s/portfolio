# mou7s/portfolio — 项目指南

## 项目概述

基于 **Nuxt 4** 的个人主页项目，使用 **Nuxt UI v4** 构建 UI，**Nuxt Content v3** 管理双语内容，部署到 **Cloudflare Workers**。

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Nuxt 4 + Vue 3 + TypeScript |
| UI | Nuxt UI v4（基于 Reka UI / Tailwind v4） |
| 内容 | Nuxt Content v3（支持 .md / .yml frontmatter） |
| 国际化 | @nuxtjs/i18n（策略：prefix_except_default） |
| 动画 | motion-v |
| OG 图片 | nuxt-og-image（zeroRuntime 模式） |
| 图标 | @iconify-json/lucide, @iconify-json/simple-icons |
| 部署 | Cloudflare Workers（nitro preset: cloudflare-module） |
| 包管理 | pnpm |

## 项目结构

```
.
├── AGENTS.md                # 本文件：AI 协作指南
├── app/                     # Nuxt 4 核心应用
│   ├── app.vue              # 根组件（注入 SEO meta、主题色、favicon）
│   ├── app.config.ts        # 全局 UI 配置（头像、邮箱、页脚、颜色主题）
│   ├── assets/css/main.css  # 全局样式
│   ├── components/          # 可复用 UI 组件（AppHeader, AppFooter, LangSwitcher, ColorModeButton 等）
│   ├── composables/         # 组合式函数（useNavLinks）
│   ├── layouts/default.vue  # 全局布局
│   ├── middleware/           # 路由中间件（zh-root.global.ts）
│   ├── pages/               # 路由页面（index, projects, experience, speaking, ppi, blog/*）
│   └── utils/               # 工具函数（clipboard, links）
├── content/                 # 双语内容
│   ├── en/                  # 英文（默认语言）
│   │   ├── index.yml        # 首页内容
│   │   ├── projects.yml     # 项目页元信息
│   │   ├── experience.yml   # 经历页
│   │   ├── speaking.yml     # 演讲页
│   │   ├── blog.yml         # 博客页元信息
│   │   ├── projects/        # 项目详情 .yml 文件
│   │   └── blog/            # 博客文章 .md 文件
│   └── zh/                  # 简体中文（与 en 结构镜像）
├── content.config.ts        # Content collections schema（6 个 collection）
├── i18n/locales/            # 国际化翻译文件（en.json, zh.json）
├── nuxt.config.ts           # Nuxt 全局配置
├── server/                  # 服务端路由
│   ├── routes/rss.xml.ts    # RSS 生成
│   └── utils/rss.ts         # RSS 工具函数
├── public/                  # 静态资源（原样暴露：favicon, hero 图片, robots.txt, _redirects）
└── tsconfig.json            # TypeScript 配置
```

## 常用命令

```bash
pnpm install      # 安装依赖（自动执行 nuxt prepare）
pnpm dev          # 启动本地开发服务器（默认 :3000）
pnpm build        # 构建生产产物（NODE_OPTIONS=--max-old-space-size=8192）
pnpm preview      # 本地预览生产构建
pnpm typecheck    # Nuxt + TypeScript 类型检查
```

## 内容管理

### 双语结构

- `content/en/` 存放英文内容（默认语言），`content/zh/` 存放简体中文。
- 两个目录结构完全镜像：同样的文件路径、同样的字段结构。
- 新增内容时**必须**同步添加两份文件。
- frontmatter 使用 YAML（`.yml` 文件）或 Markdown frontmatter（`.md` 文件）。

### Content Collections

定义在 `content.config.ts`，共 6 个 collection：

| Collection | 来源 | 用途 |
|---|---|---|
| `index` | `**/index.yml` | 首页：hero、about、skills、experience、testimonials、blog、faq |
| `projects` | `**/projects/*.yml` | 项目卡片：title、description、image、tags、url、sort |
| `blog` | `**/blog/*.md` | 博客文章：title、description、minRead、date、image、author |
| `pages` | `**/projects.yml`, `**/blog.yml` | 列表页元信息：links（按钮配置） |
| `experience` | `**/experience.yml` | 职业经历：company、role、period、highlights、stack |
| `speaking` | `**/speaking.yml` | 演讲活动：category、title、date、location、url |

### 内容开发规范

- slug 使用语义化命名，如 `copilot-markdown.md`、`Minesweeper Game.yml`。
- 双语内容的字段结构保持一致，仅翻译文本内容。
- 可用 schema 中定义的工具类型构建新字段（如 `createButtonSchema`、`createImageSchema`）。
- 图片资源放在 `public/` 下，通过 frontmatter 引用路径。

## 国际化（i18n）

- 策略：`prefix_except_default` — 英文不带前缀，中文以 `/zh` 开头。
- 默认语言：`en`，二级语言：`zh`。
- `detectBrowserLanguage` 已启用，通过 cookie `i18n_redirected` 记录用户选择。
- `i18n/locales/{en,zh}.json`：UI 文本翻译（导航、页脚等）。
- `content/en/` vs `content/zh/`：内容翻译（通过文件分离管理）。
- 新增页面路由时确认 `app/middleware/zh-root.global.ts` 是否需要同步更新。

## 构建与部署

### nuxt.config.ts 关键配置

- **Nitro preset**: `cloudflare-module`，部署到 Cloudflare Workers。
- **预渲染路由**: `/`、`/ppi`、`/rss.xml`、`/zh/rss.xml`（启用 `crawlLinks` 爬取更多路由）。
- **OG 图片**: `zeroRuntime: true`，减少构建产物体积。
- **DevTools**: 默认启用（快捷键 Shift + Option + D）。
- **构建内存**: `NODE_OPTIONS=--max-old-space-size=8192`（避免内存溢出）。

### 新增关键页面时

同步更新 `nuxt.config.ts` 中 `nitro.prerender.routes`。

## 代码规范

- **语言**: TypeScript（`<script setup lang="ts">`）。
- **组件命名**: PascalCase，放在 `app/components/`。
- **页面文件**: `app/pages/`，按 Nuxt 文件路由规则命名。
- **组合式函数**: `app/composables/`，以 `use` 开头。
- **工具函数**: `app/utils/`，纯函数，无副作用。
- **UI 组件**: 优先使用 Nuxt UI 内置组件（`UButton`、`UCard`、`UPage`、`UPageHero` 等）。
- **图标**: 统一使用 Iconify 标识符（如 `i-simple-icons-github`、`i-lucide-sun`），首选 `@iconify-json/lucide` 和 `@iconify-json/simple-icons`。
- **颜色模式**: 支持 dark/light，通过 `useColorMode()` 动态切换。
- **服务端路由**: 放在 `server/routes/`，与客户端代码分离。
