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
});

// 配置 SEO 与社交分享卡片
useSeoMeta({
  titleTemplate: "%s",
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png",
  twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png",
  twitterCard: "summary_large_image",
});

</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
  </UApp>
</template>
