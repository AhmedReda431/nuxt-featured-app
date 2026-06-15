<template>
  <article class="section-padding">
    <div class="container-custom max-w-4xl">
      <img :src="post.coverImage" :alt="post.title" class="w-full rounded-2xl mb-8" />
      <div class="flex items-center gap-4 mb-6">
        <img :src="post.author.avatar" class="w-12 h-12 rounded-full" />
        <div>
          <span class="font-medium">{{ post.author.name }}</span>
          <span class="text-gray-500 text-sm">{{ formatDate(post.publishedAt) }}</span>
        </div>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold mb-6">{{ post.title }}</h1>
      <div class="prose prose-lg max-w-none" v-html="post.content" />
    </div>
  </article>
</template>