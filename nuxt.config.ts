// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 使用的 Nuxt 模块
  modules: [
    "@nuxt/ui", // UI 组件库
    "@nuxt/content", // 内容管理系统
    "motion-v/nuxt", // 动画库
    "nuxt-og-image", // OG 图片生成
  ],

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
    prerender: {
      routes: ["/", "/ppi"], // 预渲染的路由
      crawlLinks: true, // 爬取链接以发现更多路由
    },
  },

});
