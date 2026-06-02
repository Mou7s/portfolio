<script setup lang="ts">
const { locale, setLocale } = useI18n()

const isZh = computed(() => locale.value === 'zh')

const handleToggle = (lang: 'en' | 'zh') => {
  if (locale.value !== lang) {
    setLocale(lang)
  }
}
</script>

<template>
  <ClientOnly>
    <div 
      class="relative flex items-center bg-muted/70 dark:bg-neutral-900/80 border border-default/50 rounded-full p-[2px] select-none w-20 h-7.5"
    >
      <!-- 果冻感背景动画滑块 -->
      <div 
        class="absolute top-[2px] bottom-[2px] rounded-full bg-background dark:bg-neutral-800 shadow-sm border border-default/30 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        :class="isZh ? 'left-[calc(50%+1px)] w-[calc(50%-3px)]' : 'left-[2px] w-[calc(50%-3px)]'"
      />
      
      <!-- 选项：EN -->
      <button 
        type="button"
        class="flex-1 text-center text-[10px] font-bold tracking-wider z-10 transition-colors duration-300 outline-none cursor-pointer"
        :class="!isZh ? 'text-highlighted' : 'text-muted hover:text-toned'"
        @click="handleToggle('en')"
      >
        EN
      </button>
      
      <!-- 选项：中 -->
      <button 
        type="button"
        class="flex-1 text-center text-[10px] font-bold tracking-wider z-10 transition-colors duration-300 outline-none cursor-pointer"
        :class="isZh ? 'text-highlighted' : 'text-muted hover:text-toned'"
        @click="handleToggle('zh')"
      >
        中
      </button>
    </div>
    
    <template #fallback>
      <!-- 完美占位框架，防止 SSR 水合闪烁 -->
      <div class="w-20 h-7.5 rounded-full bg-muted/40 border border-default/50" />
    </template>
  </ClientOnly>
</template>
