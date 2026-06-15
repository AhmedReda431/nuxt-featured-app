<template>
  <div>
    <section class="py-12 bg-gray-50">
      <div class="container-custom">
        <h1 class="text-3xl md:text-4xl font-bold">{{ $t('blog.title') }}</h1>
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