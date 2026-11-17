<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <UPageSection
    v-if="page.foundations"
    :title="page.foundations.title"
    :description="page.foundations.description"
    :ui="{
      container: 'py-10 sm:py-12 border-t border-default',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm text-muted',
    }"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <ULink
        v-for="item in page.foundations.items"
        :key="item.repo"
        :to="item.to"
        target="_blank"
        class="group flex flex-col justify-between gap-4 p-5 rounded-2xl border border-default bg-muted/20 transition hover:border-primary/40 hover:bg-muted/35"
      >
        <div class="flex flex-col gap-2.5">
          <div class="flex items-center justify-between gap-2">
            <span class="inline-flex items-center gap-1.5 text-xs font-mono text-toned">
              <UIcon name="i-simple-icons-github" class="size-3.5" />
              {{ item.repo }}
            </span>
            <UBadge variant="soft" color="neutral" size="xs">
              {{ item.tag }}
            </UBadge>
          </div>
          <h3 class="text-base font-semibold text-highlighted flex items-center gap-1">
            {{ item.name }}
            <UIcon
              name="i-lucide-arrow-up-right"
              class="size-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
            />
          </h3>
          <p class="text-sm text-muted leading-relaxed">
            {{ item.summary }}
          </p>
        </div>
        <ul class="space-y-1 pt-2 border-t border-default/60 text-xs text-toned">
          <li
            v-for="highlight in item.highlights"
            :key="highlight"
            class="flex items-start gap-1.5"
          >
            <span class="mt-1.5 size-1 shrink-0 rounded-full bg-primary/70" />
            <span>{{ highlight }}</span>
          </li>
        </ul>
      </ULink>
    </div>
  </UPageSection>
</template>
