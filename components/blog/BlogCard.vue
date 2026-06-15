<script setup lang="ts">
import type { BlogPost } from '~/types'

defineProps<{ post: BlogPost }>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <article class="blog-card card">
    <NuxtLink :to="localePath(`/blog/${post.slug}`)" class="blog-card__image">
      <UiLazyImage :src="post.image" :alt="post.title" :width="400" :height="225" />
    </NuxtLink>
    <div class="blog-card__body">
      <span class="blog-card__category">{{ post.category }}</span>
      <NuxtLink :to="localePath(`/blog/${post.slug}`)" class="blog-card__title">
        <h3>{{ post.title }}</h3>
      </NuxtLink>
      <p class="blog-card__excerpt">{{ post.excerpt }}</p>
      <div class="blog-card__meta">
        <span>{{ t('blog.by') }} {{ post.author }}</span>
        <span>{{ t('blog.readTime', { minutes: post.readTime }) }}</span>
      </div>
      <NuxtLink :to="localePath(`/blog/${post.slug}`)" class="blog-card__link">
        {{ t('blog.readMore') }} →
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.blog-card__image {
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.blog-card__body {
  padding: 1.25rem;
}

.blog-card__category {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
}

.blog-card__title {
  text-decoration: none;
  color: inherit;
}

.blog-card__title h3 {
  margin: 0.375rem 0 0.5rem;
  font-size: 1.125rem;
}

.blog-card__excerpt {
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  margin: 0 0 1rem;
  line-height: 1.6;
}

.blog-card__meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}

.blog-card__link {
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
}
</style>
