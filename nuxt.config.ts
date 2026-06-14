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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root"
    }
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

  // 全局 CSS 文件
  css: ["~/assets/css/main.css"],

  // 兼容性日期，用于启用特定日期前的功能
  compatibilityDate: "2024-11-01",

  // Nitro 服务器引擎配置
  nitro: {
    preset: 'cloudflare-pages',
    serverAssets: [
      {
        baseName: "content",
        dir: "../content",
      },
    ],
    prerender: {
      routes: ["/", "/ppi", "/rss.xml", "/zh/rss.xml"], // 预渲染的路由
      crawlLinks: true, // 爬取链接以发现更多路由
    },
  },

});
