<script setup lang="ts">
import { blogPosts } from '~/data/blogs'

const { t } = useI18n()

useAppSeo({
  title: t('blog.title'),
  description: t('blog.subtitle'),
})
</script>

<template>
  <section class="section">
    <div class="container">
      <UiSectionTitle :title="t('blog.title')" :subtitle="t('blog.subtitle')" />
      <div class="grid grid--2">
        <BlogCard v-for="post in blogPosts" :key="post.id" :post="post" />
      </div>
    </div>
  </section>
</template>
