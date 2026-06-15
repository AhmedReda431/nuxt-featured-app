<template>
  <div>
    <section class="py-12 bg-gray-50">
      <div class="container-custom">
        <h1 class="text-3xl md:text-4xl font-bold">{{ t('blog.title') }}</h1>
      </div>
    </section>
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()
useSeo({ title: t('blog.title'), description: t('blog.title') })

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
</script>
