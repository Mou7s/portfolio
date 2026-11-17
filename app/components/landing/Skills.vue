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
      container: 'py-10 sm:py-12 border-t border-default',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm text-muted',
    }"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <div
        v-for="category in page.skills.items"
        :key="category.name"
        class="flex flex-col gap-3 p-5 rounded-2xl border border-default bg-muted/20 backdrop-blur-sm"
      >
        <h3
          class="text-xs font-semibold text-toned uppercase tracking-wider"
        >
          {{ category.name }}
        </h3>
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
