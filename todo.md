# 项目改进 TODO

## P0 先做（阻塞后续开发）

- [ ] 清理 ESLint 错误并统一代码风格
  - 目标：`pnpm lint` 通过（当前约 320 个问题）
  - 执行：先跑 `pnpm lint:fix`，再手工修剩余规则
  - 重点文件：
    - `app/app.vue`
    - `app/app.config.ts`
    - `nuxt.config.ts`
    - `app/pages/**`
    - `app/components/landing/**`

- [ ] 建立基础 CI 门禁（GitHub Actions）
  - 目标：每次 PR 自动执行 `lint + typecheck + build`
  - 执行：新增 `.github/workflows/ci.yml`
  - 验收：PR 中能看到 CI 结果，失败可阻止合并

## P1 高优先级（线上质量与可维护性）

- [ ] 修复 content schema 与数据不一致
  - 问题 1：`projects` schema 中 `url` 必填，但部分项目缺失
  - 问题 2：`speaking` schema 中 `links` 必填，但 `speaking.yml` 未提供
  - 执行方案（二选一）：
    - A. 按现状放宽 schema（将 `url`、`links` 改为可选）
    - B. 补齐数据（给每个项目补 `url`，给 speaking 补 `links`）
  - 关联文件：
    - `content.config.ts`
    - `content/projects/*.yml`
    - `content/speaking.yml`

- [ ] 修复 SEO 基线配置（脱离模板默认值）
  - 目标：站点元信息与个人品牌一致
  - 执行：
    - 把默认 `ogImage/twitterImage` 换成个人站点图
    - 根据站点语言策略调整 `html lang`（如 `zh-CN` 或多语言方案）
    - 补全 `public/robots.txt`，并增加 sitemap 指引
  - 关联文件：
    - `app/app.vue`
    - `app/error.vue`
    - `public/robots.txt`

- [ ] 更新 README（去模板化）
  - 目标：让仓库首页能准确说明项目定位、运行方式、部署方式
  - 建议结构：项目介绍、技术栈、开发命令、内容维护、部署说明
  - 关联文件：`README.md`

## P2 中优先级（性能与体验）

- [ ] 图片资源优化（体积与格式）
  - 现状：多张图片体积较大（含 >1MB 资源，且存在 `.heic`）
  - 执行：
    - 压缩/替换超大图
    - 优先统一为 web 友好格式（如 avif/webp）
    - 使用 `NuxtImg` / `@nuxt/image` 进行响应式输出
  - 重点文件：
    - `public/pics/*`
    - `app/components/landing/Hero.vue`
    - `app/pages/projects.vue`
    - `app/pages/blog/[...slug].vue`

- [ ] 处理不稳定外链资源（含 http）
  - 目标：避免 mixed content 与第三方不可控风险
  - 执行：将关键封面图迁移到本地 `public/` 或可信 https 源
  - 重点文件：
    - `content/projects/Annual Gala IT Technical Support & Live Operations.yml`

## P3 可持续改进

- [ ] 国际化与文案一致性
  - 目标：统一中英文策略（页面文案、meta、按钮文案、内容集合）

- [ ] 内容质量巡检机制
  - 目标：发文/项目更新时自动校验必填字段、链接可用性、图片可访问性
  - 可选：增加脚本或 CI job 做内容校验

## 完成定义（DoD）

- [ ] `pnpm lint` 通过
- [ ] `pnpm typecheck` 通过
- [ ] `pnpm build` 通过
- [ ] 关键页面手动验收：`/`、`/projects`、`/blog`、`/about`、`/experience`、`/ppi`
- [ ] Lighthouse 核心指标较当前有可量化提升（至少记录一次基线与优化后对比）
