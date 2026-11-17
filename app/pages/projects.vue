<script setup lang="ts">
const { locale } = useI18n();
const { data: page } = await useAsyncData(`projects-page-${locale.value}`, () => {
  return queryCollection("pages").where("path", "=", `/${locale.value}/projects`).first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: projects } = await useAsyncData(`projects-${locale.value}`, () => {
  return queryCollection("projects")
    .where("path", "LIKE", `/${locale.value}/projects/%`)
    .order("sort", "ASC")
    .order("title", "ASC")
    .all();
});

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
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start',
      }"
    >
      <template #links>
        <div v-if="page.links" class="flex items-center gap-2">
          <UButton :to="`mailto:${global.email}`" v-bind="page.links[0]" />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0',
      }"
    >
      <Motion
        v-for="(project, index) in projects"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ duration: 0.35, delay: Math.min(index, 2) * 0.08 }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          orientation="horizontal"
          variant="naked"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last',
          }"
        >
          <template #leading />
          <template #footer>
            <div class="flex flex-col gap-3">
              <div v-if="project.tags?.length" class="flex flex-wrap gap-1.5">
                <UBadge
                  v-for="tag in project.tags"
                  :key="tag"
                  variant="soft"
                  color="neutral"
                  size="sm"
                  class="rounded-md font-normal"
                >
                  {{ tag }}
                </UBadge>
              </div>
              <div v-if="project.url || project.repo" class="flex flex-wrap items-center gap-4">
                <ULink
                  v-if="project.url"
                  :to="project.url"
                  target="_blank"
                  class="text-sm text-primary inline-flex items-center gap-1"
                >
                  {{ $t('projects.live_demo') }}
                  <UIcon
                    name="i-lucide-arrow-up-right"
                    class="size-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </ULink>
                <ULink
                  v-if="project.repo"
                  :to="project.repo"
                  target="_blank"
                  class="text-sm text-muted hover:text-highlighted inline-flex items-center gap-1.5 transition-colors"
                >
                  <UIcon name="i-simple-icons-github" class="size-4" />
                  {{ $t('projects.source_code') }}
                </ULink>
              </div>
            </div>
          </template>
          <div
            v-if="project.image"
            class="w-full overflow-hidden rounded-lg border border-default/60"
          >
            <UColorModeImage
              v-if="project.imageDark"
              :light="project.image"
              :dark="project.imageDark"
              :alt="project.title"
              class="w-full h-auto block"
            />
            <img
              v-else
              :src="project.image"
              :alt="project.title"
              class="w-full h-auto block"
            >
          </div>
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
