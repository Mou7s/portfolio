<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { locale } = useI18n()

const resolveBlogLink = (path: string) => {
  const slug = path.replace(/^\/(en|zh)\/blog\//, '').replace(/^blog\//, '')
  return locale.value === 'zh' ? `/zh/blog/${slug}` : `/blog/${slug}`
}

const { data: posts } = await useAsyncData('index-blogs-' + locale.value, () =>
  queryCollection('blog').where('path', 'LIKE', `/${locale.value}/blog/%`).order('date', 'DESC').limit(3).all()
)
if (!posts.value) {
  throw createError({ statusCode: 404, statusMessage: 'blogs posts not found', fatal: true })
}

const formatDate = (dateStr?: string | Date) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <UPageSection
    :title="page.blog.title"
    :description="page.blog.description"
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
      <Motion
        v-for="(post, index) in posts"
        :key="index"
        :initial="{ opacity: 0, transform: 'translateY(24px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 * index, duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
        :in-view-options="{ once: true }"
        class="flex"
      >
        <ULink
          :to="resolveBlogLink(post.path)"
          class="group flex flex-col w-full h-full bg-neutral-50/50 dark:bg-neutral-900/30 backdrop-blur-md rounded-2xl border border-neutral-200/80 dark:border-neutral-800/50 hover:border-primary/40 transition-all duration-300 overflow-hidden relative shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1"
        >
          <!-- 封面图 -->
          <div class="aspect-video w-full overflow-hidden relative bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200/30 dark:border-neutral-800/50">
            <img
              v-if="post.image"
              :src="post.image"
              :alt="post.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <!-- 无图时的艺术化渐变 fallback -->
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-primary/10 via-neutral-100 dark:via-neutral-900 to-neutral-200 dark:to-neutral-950 flex items-center justify-center p-6 relative"
            >
              <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]"></div>
              <UIcon name="i-lucide-scroll-text" class="size-8 text-neutral-400 dark:text-neutral-700 group-hover:text-primary transition-colors duration-300" />
            </div>
          </div>

          <!-- 卡片内容 -->
          <div class="p-5 flex flex-col flex-1">
            <!-- 元数据 -->
            <div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium mb-3">
              <span class="inline-flex items-center bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold text-neutral-600 dark:text-neutral-300">
                {{ locale === 'zh' ? '专栏' : 'Blog' }}
              </span>
              <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              <span v-if="post.minRead" class="text-neutral-300 dark:text-neutral-700">•</span>
              <span v-if="post.minRead">{{ post.minRead }} {{ locale === 'zh' ? '分钟阅读' : 'min read' }}</span>
            </div>

            <!-- 标题 -->
            <h3 class="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug mb-2">
              {{ post.title }}
            </h3>

            <!-- 描述 -->
            <p class="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed flex-1">
              {{ post.description }}
            </p>

            <!-- 卡片页脚 -->
            <div class="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/40 flex items-center justify-between text-xs font-semibold text-primary transition-colors">
              <span>{{ locale === 'zh' ? '阅读全文' : 'Read Article' }}</span>
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </ULink>
      </Motion>
    </div>
  </UPageSection>
</template>
