<script setup lang="ts">
const { locale } = useI18n()
const language = computed(() => locale.value === 'zh' ? 'zh' : 'en')
const alt = computed(() => language.value === 'zh'
  ? '南极洲地图，标出南极点附近的 IceCube 所在区域'
  : 'Map of Antarctica showing the IceCube vicinity near the South Pole')
</script>

<template>
  <div class="not-prose my-6">
    <img :src="`/blog/icecube-location-${language}.svg`" :alt="alt" width="1100" height="720" loading="lazy" class="block w-full rounded-xl dark:hidden">
    <img :src="`/blog/icecube-location-${language}-dark.svg`" :alt="alt" width="1100" height="720" loading="lazy" class="hidden w-full rounded-xl dark:block">
  </div>
</template>
