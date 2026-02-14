<script setup lang="ts">
const route = useRoute()
const requestURL = useRequestURL()

const pageTitle = 'PPI Calculator'
const pageDescription = 'Free online PPI calculator. Enter your screen resolution and display size to instantly calculate pixel density (pixels per inch).'
const canonicalUrl = computed(() =>
  new URL(route.path, requestURL.origin).toString()
)

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: canonicalUrl,
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterCard: 'summary_large_image',
  robots: 'index, follow, max-image-preview:large'
})

const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': pageTitle,
  'description': pageDescription,
  'applicationCategory': 'UtilitiesApplication',
  'operatingSystem': 'Any',
  'url': canonicalUrl.value,
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'USD'
  }
}))

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value
    }
  ],
  script: [
    {
      key: 'ppi-ld-json',
      type: 'application/ld+json',
      children: JSON.stringify(structuredData.value)
    }
  ]
}))

const screenWidth = ref<number | null>(null)
const screenHeight = ref<number | null>(null)
const displaySize = ref<number | null>(null)

onMounted(() => {
  const dpr = window.devicePixelRatio || 1
  screenWidth.value = window.screen.width * dpr
  screenHeight.value = window.screen.height * dpr
})

const diagonalPixels = computed(() => {
  if (!screenWidth.value || !screenHeight.value) return null
  return Math.hypot(screenWidth.value, screenHeight.value)
})

const ppi = computed(() => {
  if (!displaySize.value || displaySize.value <= 0) return null
  if (!diagonalPixels.value) return null
  return diagonalPixels.value / displaySize.value
})

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
})

const resolutionText = computed(() => {
  if (!screenWidth.value || !screenHeight.value) return '-'
  return `${numberFormatter.format(screenWidth.value)} x ${numberFormatter.format(screenHeight.value)}`
})
</script>

<template>
  <UPage>
    <UPageSection
      :title="pageTitle"
      :description="pageDescription"
      :ui="{
        container: 'max-w-3xl'
      }"
    >
      <div
        class="rounded-2xl border border-default bg-gradient-to-b from-elevated/70 to-elevated/30 p-5 sm:p-6 shadow-sm"
      >
        <div class="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <label class="block">
            <span class="mb-2 block text-sm font-medium text-toned">Width (px)</span>
            <input
              v-model.number="screenWidth"
              type="number"
              min="1"
              step="1"
              class="h-11 w-full rounded-xl border border-default bg-default px-3 text-base outline-none transition focus:border-primary"
            >
          </label>

          <div class="pb-2 text-center text-lg font-semibold text-toned">
            ×
          </div>

          <label class="block">
            <span class="mb-2 block text-sm font-medium text-toned">Height (px)</span>
            <input
              v-model.number="screenHeight"
              type="number"
              min="1"
              step="1"
              class="h-11 w-full rounded-xl border border-default bg-default px-3 text-base outline-none transition focus:border-primary"
            >
          </label>
        </div>

        <label class="mt-4 block">
          <span class="mb-2 block text-sm font-medium text-toned">Screen Size (inches)</span>
          <input
            v-model.number="displaySize"
            type="number"
            min="0"
            step="0.1"
            placeholder="For example: 6.7, 13.3, 27"
            class="h-11 w-full rounded-xl border border-default bg-default px-3 text-base outline-none transition focus:border-primary"
          >
        </label>

        <div class="mt-5 grid gap-3 sm:grid-cols-3">
          <div class="rounded-xl border border-default/70 bg-default/60 p-4">
            <p class="text-xs uppercase tracking-wide text-toned">
              Current Resolution
            </p>
            <p class="mt-2 text-lg font-semibold">
              {{ resolutionText }}
            </p>
          </div>

          <div class="rounded-xl border border-default/70 bg-default/60 p-4">
            <p class="text-xs uppercase tracking-wide text-toned">
              Diagonal Pixels
            </p>
            <p class="mt-2 text-lg font-semibold">
              {{ diagonalPixels ? numberFormatter.format(diagonalPixels) : '-' }}
            </p>
          </div>

          <div class="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p class="text-xs uppercase tracking-wide text-toned">
              Display PPI
            </p>
            <p class="mt-2 text-2xl font-semibold text-primary">
              {{ ppi ? ppi.toFixed(2) : '-' }}
            </p>
          </div>
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>
