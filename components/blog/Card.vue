<script setup>
const props = defineProps({
  post: { type: Object, required: true },
})

const localePath = useLocalePath()
const { t } = useI18n()

const slug = computed(() => buildBlogSlug(props.post))
const cover = computed(() => buildBlogCover(props.post))
const readTime = computed(() => Math.max(1, Math.round((props.post.body?.length || 200) / 800)))
</script>

<template>
  <article class="blog-card card">
    <NuxtLink :to="localePath(`/blog/${slug}`)" class="blog-card__image">
      <UiLazyImage :src="cover" :alt="post.title" :width="400" :height="240" />
    </NuxtLink>
    <div class="blog-card__body">
      <NuxtLink :to="localePath(`/blog/${slug}`)" class="blog-card__title">
        <h3>{{ post.title }}</h3>
      </NuxtLink>
      <p class="blog-card__excerpt">{{ post.body?.slice(0, 120) }}…</p>
      <div class="blog-card__meta">
        <span>{{ t('blog.readTime', { minutes: readTime }) }}</span>
        <NuxtLink :to="localePath(`/blog/${slug}`)" class="blog-card__readmore">
          <span class="sr-only">{{ post.title }}: </span>{{ t('blog.readMore') }} →
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.blog-card__image {
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.blog-card__body {
  padding: 1.25rem;
}

.blog-card__title {
  text-decoration: none;
  color: inherit;
}

.blog-card__title h3 {
  margin: 0 0 0.5rem;
  font-size: 1.0625rem;
  line-height: 1.4;
}

.blog-card__title:hover h3 {
  color: var(--color-primary);
}

.blog-card__excerpt {
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  margin: 0 0 1rem;
}

.blog-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.blog-card__readmore {
  font-weight: 600;
}
</style>
