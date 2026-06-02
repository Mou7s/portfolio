<script setup lang="ts">
const { locale, setLocale } = useI18n()

const toggleLocale = () => {
  const nextLocale = locale.value === 'zh' ? 'en' : 'zh'
  setLocale(nextLocale as 'en' | 'zh')
}
</script>

<template>
  <ClientOnly>
    <UButton
      color="neutral"
      variant="ghost"
      size="sm"
      class="rounded-full font-medium text-xs px-2.5 h-8 flex items-center justify-center transition-all hover:bg-muted"
      @click="toggleLocale"
      :aria-label="locale === 'zh' ? 'Switch to English' : '切换为中文'"
    >
      <!-- 如果当前是中文，按钮显示 EN，提示切换到英文；反之亦然 -->
      {{ locale === 'zh' ? 'EN' : '中文' }}
    </UButton>
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>
