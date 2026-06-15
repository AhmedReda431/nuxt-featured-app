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

<script setup>
const route = useRoute()
const posts = [
  {
    id: 1,
    slug: 'launch-day',
    title: 'Launch day tips for your new product',
    coverImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Prepare your launch with strong design, fast performance, and a clear message.',
    publishedAt: '2026-03-12',
    content: '<p>This post shows how to bring your product to market with stability and style.</p>',
    author: { name: 'Sarah Jacobs', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80' },
  },
  {
    id: 2,
    slug: 'building-homes',
    title: 'How to design compelling property listings',
    coverImage: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Use strong imagery and concise details to build trust with buyers.',
    publishedAt: '2026-04-20',
    content: '<p>Smart property pages convert better when they clearly describe amenities and layout.</p>',
    author: { name: 'Noah Kim', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80' },
  },
]
const post = computed(() => posts.find((item) => item.slug === route.params.slug))
if (!post.value) {
  navigateTo('/blog')
}
const formatDate = (value: string) => new Date(value).toLocaleDateString()
</script>
