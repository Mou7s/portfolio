// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: "",
    },
  },

  // 使用的 Nuxt 模块
  modules: [
    "@nuxt/ui", // UI 组件库
    "@nuxt/content", // 内容管理系统
    "motion-v/nuxt", // 动画库
    "nuxt-og-image", // OG 图片生成
    "@nuxtjs/i18n", // 国际化模块
  ],

  i18n: {
    locales: [
      { code: "en", language: "en-US", name: "English", file: "en.json" },
      { code: "zh", language: "zh-CN", name: "简体中文", file: "zh.json" }
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
  },

  // 启用开发工具
  devtools: {
    enabled: true,
  },

  // 实验性功能配置
  experimental: {
    serverAppConfig: false, // 禁用服务器端 App 配置
  },

  // OG 图片配置
  ogImage: {
    zeroRuntime: true, // 零运行时模式，减少打包体积
  },

  content: {
    build: {
      markdown: {
        remarkPlugins: {
          "remark-math": { options: { singleDollarTextMath: false } },
        },
        rehypePlugins: {
          "rehype-katex": {},
        },
      },
    },
  },

  // 全局 CSS 文件
  css: ["katex/dist/katex.min.css", "~/assets/css/main.css"],

  // 兼容性日期，用于启用特定日期前的功能
  compatibilityDate: "2026-06-14",

  hooks: {
    "nitro:init"(nitro) {
      // Content 的本地 SQLite 仅用于开发与预渲染；Workers 使用 D1。
      // 避免 Bun 构建时把本地连接器的 bun:sqlite 导入带入 Workers。
      if (nitro.options.preset === "cloudflare-module") {
        nitro.options.alias["#content/local-adapter"] = "db0/connectors/cloudflare-d1";
      }
    },
  },

  // Nitro 服务器引擎配置
  nitro: {
    preset: "cloudflare-module",
    // Nuxt 4.6.0 在 Windows 上会因路径分隔符导致 renderer 被错误地
    // externalize，运行时只能读到空的 manifest/precomputed 占位模块。
    // 使用跨平台正则强制内联；上游修复：https://github.com/nuxt/nuxt/issues/36467
    externals: {
      inline: [/[\\/]node_modules[\\/]nuxt[\\/]dist[\\/]/],
    },
    serverAssets: [
      {
        baseName: "content",
        dir: "../content",
      },
    ],
    prerender: {
      routes: ["/", "/zh", "/ppi", "/rss.xml", "/zh/rss.xml"], // 预渲染的路由
      crawlLinks: true, // 爬取链接以发现更多路由
    },
  },

  // dev 使用 Node 兼容的输出，由 package.json 中的 Bun 命令运行；
  // cloudflare preset 的 dump 接口在 dev 下读不到数据，
  // 会导致客户端跳转内容页 404；线上构建仍用 cloudflare-module，不受影响
  $development: {
    nitro: {
      preset: "node",
    },
  },

});
