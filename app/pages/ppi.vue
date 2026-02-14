<script setup lang="ts">
const screenWidth = ref<number | null>(null)
const screenHeight = ref<number | null>(null)
const displaySize = ref<number | null>(null)

onMounted(() => {
  const dpr = window.devicePixelRatio || 1
  screenWidth.value = window.screen.width * dpr
  screenHeight.value = window.screen.height * dpr
})

const ppi = computed(() => {
  if (!displaySize.value || displaySize.value <= 0) return null
  if (!screenWidth.value || !screenHeight.value) return null

  const diagonalPixels = Math.hypot(screenWidth.value, screenHeight.value)
  return diagonalPixels / displaySize.value
})
</script>

<template>
  <UPage>
    <UPageSection>
      <p>
        Display Resolution:
        <input
          v-model.number="screenWidth"
          type="number"
          min="1"
          step="1"
        >
        x
        <input
          v-model.number="screenHeight"
          type="number"
          min="1"
          step="1"
        >
      </p>

      <p>
        Display Size (inches):
        <input
          v-model.number="displaySize"
          type="number"
          min="0"
          step="0.1"
          placeholder="Enter display size in inches"
        >
      </p>

      <p>Display PPI: {{ ppi ? ppi.toFixed(2) : '-' }}</p>
    </UPageSection>
  </UPage>
</template>
