<script setup>
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { fetchPostBySlug } = useBlogApi()

const { data, error } = await useAsyncData(
  `post-${route.params.slug}`,
  () => fetchPostBySlug(route.params.slug),
)

if (error.value || !data.value?.post) {
  throw createError({ statusCode: 404, statusMessage: t('blog.notFound') })
}

const post = computed(() => data.value.post)
const comments = computed(() => data.value.comments)
const cover = computed(() => buildBlogCover(post.value))
const readTime = computed(() => Math.max(1, Math.round((post.value.body?.length || 200) / 800)))

useAppSeo({
  title: post.value.title,
  description: post.value.body?.slice(0, 160),
  image: cover.value,
  type: 'article',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.value.title,
    image: cover.value,
    articleBody: post.value.body,
  },
})
</script>

<template>
  <article class="section blog-post">
    <div class="container blog-post__container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <NuxtLink :to="localePath('/blog')">{{ t('blog.title') }}</NuxtLink>
        <span aria-hidden="true">/</span>
        <span>{{ post.title }}</span>
      </nav>

      <h1 class="blog-post__title">{{ post.title }}</h1>
      <p class="blog-post__meta">{{ t('blog.readTime', { minutes: readTime }) }}</p>

      <div class="blog-post__cover">
        <UiLazyImage :src="cover" :alt="post.title" :width="900" :height="500" loading="eager" />
      </div>

      <div class="blog-post__body">
        <p>{{ post.body }}</p>
      </div>

      <div v-if="post.tags?.length" class="blog-post__tags">
        <span class="form-label">{{ t('blog.tags') }}</span>
        <div class="blog-post__tags-list">
          <span v-for="tag in post.tags" :key="tag" class="badge badge--muted">{{ tag }}</span>
        </div>
      </div>

      <section class="blog-post__comments">
        <h2 class="section__title">{{ t('blog.comments') }} ({{ comments.length }})</h2>

        <UiEmptyState v-if="comments.length === 0" icon="💬" :title="t('blog.noComments')" />

        <ul v-else class="comment-list">
          <li v-for="comment in comments" :key="comment.id" class="comment-card card">
            <strong>{{ comment.user?.username }}</strong>
            <p>{{ comment.body }}</p>
          </li>
        </ul>
      </section>

      <NuxtLink :to="localePath('/blog')" class="btn btn--ghost">
        ← {{ t('blog.backToBlog') }}
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped lang="scss">
.blog-post__container {
  max-width: 760px;
}

.breadcrumb {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.blog-post__title {
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  margin: 0 0 0.5rem;
}

.blog-post__meta {
  color: var(--color-text-muted);
  margin: 0 0 1.5rem;
}

.blog-post__cover {
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
}

.blog-post__body {
  font-size: 1.0625rem;
  line-height: 1.9;
  color: var(--color-text);
  margin-bottom: 2rem;
}

.blog-post__tags {
  margin-bottom: 2.5rem;
}

.blog-post__tags-list {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.blog-post__comments {
  margin-bottom: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.comment-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.comment-card {
  padding: 1rem 1.25rem;
}

.comment-card p {
  margin: 0.375rem 0 0;
  color: var(--color-text-muted);
}
</style>
