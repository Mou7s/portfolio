<script setup lang="ts">
import type { ExperienceCollectionItem } from "@nuxt/content";

const { data: page } = await useAsyncData<ExperienceCollectionItem | null>(
  "experience",
  () => {
    return queryCollection("experience").first();
  }
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { global } = useAppConfig();

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start',
      }"
    >
      <template #links>
        <UButton
          v-if="page.links"
          :to="`mailto:${global.email}`"
          v-bind="page.links[0]"
        />
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: '!pt-0',
      }"
    >
      <div class="space-y-10">
        <Motion
          v-for="(experience, index) in page.experiences"
          :key="experience.company"
          :initial="{ opacity: 0, transform: 'translateY(18px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <div class="border border-default rounded-2xl p-6 bg-muted/20">
            <div
              class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <p
                  class="text-xs font-medium uppercase tracking-[0.3em] text-muted"
                >
                  {{ experience.period }}
                </p>
                <h2 class="mt-1 text-xl font-semibold text-highlighted">
                  {{ experience.role }} · {{ experience.company }}
                </h2>
                <p class="text-sm text-muted">{{ experience.location }}</p>
              </div>

              <div class="flex flex-wrap gap-2 text-xs text-muted">
                <span
                  v-for="(tag, tagIndex) in experience.stack"
                  :key="`${experience.company}-tag-${tagIndex}`"
                  class="rounded-full border border-default px-3 py-1"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <p class="mt-4 text-base text-default-700">
              {{ experience.summary }}
            </p>

            <div class="mt-6 grid gap-4 lg:grid-cols-3">
              <Motion
                v-for="(highlight, highlightIndex) in experience.highlights"
                :key="`${experience.company}-${highlight.title}`"
                :initial="{ opacity: 0, transform: 'translateY(12px)' }"
                :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
                :transition="{ delay: 0.3 + 0.1 * highlightIndex }"
                :in-view-options="{ once: true }"
                class="rounded-xl border border-default/70 bg-default-50/50 p-4"
              >
                <p class="text-sm font-semibold text-highlighted">
                  {{ highlight.title }}
                </p>
                <p class="mt-2 text-sm leading-relaxed text-default-700">
                  {{ highlight.detail }}
                </p>
              </Motion>
            </div>
          </div>
        </Motion>
      </div>
    </UPageSection>
  </UPage>
</template>
