<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <UPageSection
    v-if="page.skills"
    :title="page.skills.title"
    :description="page.skills.description"
    :ui="{
      container: 'pt-8 border-t border-default',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm text-muted',
    }"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div
        v-for="category in page.skills.items"
        :key="category.name"
        class="flex flex-col gap-3 p-5 rounded-2xl border border-default bg-muted/20 backdrop-blur-sm"
      >
        <h4
          class="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider"
        >
          {{ category.name }}
        </h4>
        <div class="flex flex-wrap gap-1.5">
          <UBadge
            v-for="skill in category.items"
            :key="skill"
            variant="soft"
            color="neutral"
            size="sm"
            class="rounded-md font-normal"
          >
            {{ skill }}
          </UBadge>
        </div>
      </div>
    </div>
  </UPageSection>
</template>
