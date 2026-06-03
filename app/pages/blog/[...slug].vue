<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";
import { mapContentNavigation } from "@nuxt/ui/utils/content";
import { findPageBreadcrumb } from "@nuxt/content/utils";

const route = useRoute();
const { locale } = useI18n();

const queryPath = computed(() => {
  const path = route.path;
  // 如果路径是以当前语言编码开头的，说明已经包含了前缀
  if (path.startsWith(`/${locale.value}/`) || path === `/${locale.value}`) {
    return path;
  }
  // 否则，说明为默认的无前缀路由，我们需要在前面补上前缀，以匹配物理的 content/en/blog/... 路径
  return `/${locale.value}${path}`;
});

const { data: page } = await useAsyncData(`blog-${queryPath.value}`, () =>
  queryCollection("blog").path(queryPath.value).first(),
);
if (!page.value)
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });

const { data: surround } = await useAsyncData(`blog-surround-${queryPath.value}`, () =>
  queryCollectionItemSurroundings("blog", queryPath.value, {
    fields: ["description"],
  }),
);

const localePath = useLocalePath();
const formattedSurround = computed(() => {
  if (!surround.value) return [];
  return surround.value.map(item => {
    if (!item) return null;
    return {
      ...item,
      to: localePath(item.path || item.to)
    }
  }).filter(Boolean);
});

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation", ref([]));
const blogNavigation = computed(
  () => navigation.value.find((item) => item.path === `/${locale.value}/blog`)?.children || [],
);

const breadcrumb = computed(() =>
  mapContentNavigation(
    findPageBreadcrumb(blogNavigation?.value, page.value?.path),
  ).map(({ icon, ...link }) => link),
);

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title,
  ogImage: page.value.image,
  twitterImage: page.value.image,
});

const articleLink = computed(() => {
  if (import.meta.client) {
    return window.location.href;
  }

  return route.fullPath;
});

const { t } = useI18n();
const copyArticleLink = () => {
  copyToClipboard(articleLink.value, t("blog.link_copied"));
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="page">
        <ULink :to="useLocalePath()('/blog')" class="text-sm flex items-center gap-1">
          <UIcon name="lucide:chevron-left" />
          {{ $t('blog.back_to_blog') }}
        </ULink>
        <div class="flex flex-col gap-3 mt-8">
          <div
            class="flex text-xs text-muted items-center justify-center gap-2"
          >
            <span v-if="page.date">
              {{ formatDate(page.date) }}
            </span>
            <span v-if="page.date && page.minRead"> - </span>
            <span v-if="page.minRead"> {{ $t('blog.min_read', { minutes: page.minRead }) }} </span>
          </div>
          <img
            :src="page.image"
            :alt="page.title"
            class="rounded-lg w-full h-[300px] object-cover object-center"
          />
          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ page.title }}
          </h1>
          <p class="text-muted text-center max-w-2xl mx-auto">
            {{ page.description }}
          </p>
          <div class="flex items-center justify-center gap-2 mt-2">
            <UUser
              orientation="vertical"
              color="neutral"
              variant="outline"
              class="justify-center items-center text-center"
              v-bind="page.author"
            />
          </div>
        </div>
        <UPageBody class="max-w-3xl mx-auto">
          <ContentRenderer v-if="page.body" :value="page" />

          <div class="flex items-center justify-end gap-2 text-sm text-muted">
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              :label="$t('blog.copy_link')"
              @click="copyArticleLink"
            />
          </div>
          <UContentSurround :surround="formattedSurround" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
