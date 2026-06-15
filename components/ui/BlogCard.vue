<template>
  <NuxtLink :to="localePath(`/blog/${post.slug}`)" class="block overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:shadow-soft">
    <img :src="post.coverImage" alt="" class="h-48 w-full object-cover" />
    <div class="p-6">
      <p class="text-sm text-slate-500">{{ formatDate(post.publishedAt) }}</p>
      <h3 class="mt-3 text-xl font-semibold text-slate-900">{{ post.title }}</h3>
      <p class="mt-3 text-slate-600 line-clamp-3">{{ post.excerpt }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({ post: { type: Object, required: true } })
const formatDate = (value) => new Date(value).toLocaleDateString()
</script>
