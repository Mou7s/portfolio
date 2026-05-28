// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/content",
    "motion-v/nuxt",
    "nuxt-og-image",
  ],

  devtools: {
    enabled: true,
  },

  experimental: {
    serverAppConfig: false,
  },

  ogImage: {
    zeroRuntime: true,
  },

  css: ["~/assets/css/main.css"],

  compatibilityDate: "2024-11-01",

  nitro: {
    prerender: {
      routes: ["/", "/ppi"],
      crawlLinks: true,
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
