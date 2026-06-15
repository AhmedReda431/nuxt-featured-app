<script setup lang="ts">
import { getBlogBySlug } from '~/data/blogs'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => route.params.slug as string)
const post = computed(() => getBlogBySlug(slug.value))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: t('blog.notFound') })
}

useAppSeo({
  title: post.value.title,
  description: post.value.excerpt,
  image: post.value.image,
  type: 'article',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.value.title,
      description: post.value.excerpt,
      image: post.value.image,
      author: { '@type': 'Person', name: post.value.author },
      datePublished: post.value.date,
      inLanguage: locale.value,
    }),
  }],
})

const formattedDate = computed(() =>
  new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(post.value!.date)),
)
</script>

<template>
  <article v-if="post" class="section">
    <div class="container blog-post">
      <NuxtLink :to="localePath('/blog')" class="blog-post__back">
        ← {{ t('blog.backToBlog') }}
      </NuxtLink>

      <header class="blog-post__header">
        <span class="blog-post__category">{{ post.category }}</span>
        <h1 class="blog-post__title">{{ post.title }}</h1>
        <div class="blog-post__meta">
          <span>{{ t('blog.by') }} {{ post.author }}</span>
          <time :datetime="post.date">{{ formattedDate }}</time>
          <span>{{ t('blog.readTime', { minutes: post.readTime }) }}</span>
        </div>
      </header>

      <div class="blog-post__hero">
        <UiLazyImage :src="post.image" :alt="post.title" :width="900" :height="500" loading="eager" />
      </div>

      <div class="blog-post__content" v-html="post.content" />
    </div>
  </article>
</template>

<style scoped>
.blog-post {
  max-width: 760px;
}

.blog-post__back {
  display: inline-block;
  margin-bottom: 1.5rem;
  font-size: 0.9375rem;
  text-decoration: none;
}

.blog-post__category {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
}

.blog-post__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin: 0.5rem 0 1rem;
  line-height: 1.2;
}

.blog-post__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin-bottom: 2rem;
}

.blog-post__hero {
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 2rem;
}

.blog-post__content :deep(h2) {
  margin: 2rem 0 0.75rem;
  font-size: 1.375rem;
}

.blog-post__content :deep(p) {
  line-height: 1.8;
  color: var(--color-text-muted);
  margin: 0 0 1rem;
}
</style>
