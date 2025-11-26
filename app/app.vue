<script setup lang="ts">
// 获取当前的颜色模式（亮色或暗色）
const colorMode = useColorMode();

// 根据颜色模式动态设置主题色
const color = computed(() =>
  colorMode.value === "dark" ? "#020618" : "white",
);

// 注入基础 meta 与 favicon，保证浏览器主题色正确
useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

// 配置 SEO 与社交分享卡片
useSeoMeta({
  titleTemplate: "%s - Nuxt Portfolio Template",
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png",
  twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png",
  twitterCard: "summary_large_image",
});

// 并行获取博客导航和搜索文件，提高首屏速度
const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(
    "navigation",
    () => {
      // 获取博客内容集合的导航结构
      return Promise.all([queryCollectionNavigation("blog")]);
    },
    {
      transform: (data) => data.flat(),
    },
  ),
  useLazyAsyncData(
    "search",
    () => {
      // 获取博客集合的可搜索内容
      return Promise.all([queryCollectionSearchSections("blog")]);
    },
    {
      server: false,
      transform: (data) => data.flat(),
    },
  ),
]);
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
