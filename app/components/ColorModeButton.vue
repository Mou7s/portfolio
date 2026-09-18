<script setup lang="ts">
const colorMode = useColorMode()

const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'))

const switchTheme = () => {
  colorMode.preference = nextTheme.value
}

const startViewTransition = (event: MouseEvent) => {
  if (!document.startViewTransition) {
    switchTheme()
    return
  }

  // 圆心固定取按钮自身中心：键盘触发（Enter/Space）时 MouseEvent 坐标为 (0, 0)，
  // 用点击坐标会让扩散圆从视口左上角开始
  const rect = (event.currentTarget as HTMLElement | null)?.getBoundingClientRect()
  const x = rect ? rect.left + rect.width / 2 : event.clientX
  const y = rect ? rect.top + rect.height / 2 : event.clientY

  // 圆心和半径都用百分比，不要用 px：
  // Chrome 在 devicePixelRatio ≠ 1（HiDPI / Windows 缩放 125%~200%）时，会把
  // ::view-transition-new(root) 上 clip-path 的 px 当成设备像素解释，圆心会被整体
  // 缩到 1/dpr 处，表现为圆从按钮左上方冒出来。百分比是相对伪元素盒子的比例，
  // 与坐标系单位无关，任何缩放比下都落在按钮上。
  const xPercent = (x / window.innerWidth) * 100
  const yPercent = (y / window.innerHeight) * 100

  const transition = document.startViewTransition(() => {
    switchTheme()
  })

  transition.ready.then(() => {
    const duration = 600
    const clipPath = [
      `circle(0% at ${xPercent}% ${yPercent}%)`,
      `circle(150% at ${xPercent}% ${yPercent}%)`
    ]
    document.documentElement.animate(
      { clipPath },
      {
        duration: duration,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}
</script>

<template>
  <ClientOnly>
    <UButton
      :aria-label="`Switch to ${nextTheme} mode`"
      :icon="`i-lucide-${nextTheme === 'dark' ? 'sun' : 'moon'}`"
      color="neutral"
      variant="ghost"
      size="sm"
      class="rounded-full"
      @click="startViewTransition"
    />
    <template #fallback>
      <div class="size-4" />
    </template>
  </ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}
::view-transition-old(root) {
  z-index: 1;
}
</style>
