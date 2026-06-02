<script setup lang="ts">
const { locale, setLocale } = useI18n()

const handleLocaleChange = (code: 'en' | 'zh') => {
  setLocale(code)
}

const items = computed(() => [
  [
    {
      label: 'English',
      icon: 'i-lucide-globe',
      disabled: locale.value === 'en',
      onSelect: () => handleLocaleChange('en')
    },
    {
      label: '简体中文',
      icon: 'i-lucide-languages',
      disabled: locale.value === 'zh',
      onSelect: () => handleLocaleChange('zh')
    }
  ]
])
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{
      content: 'w-32 bg-elevated/90 backdrop-blur-md border border-default shadow-lg rounded-xl',
      item: 'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed text-xs py-1.5'
    }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-languages"
      class="rounded-full w-8 h-8 flex items-center justify-center p-0"
      :aria-label="locale === 'zh' ? '切换语言' : 'Switch Language'"
    />
  </UDropdown>
</template>
