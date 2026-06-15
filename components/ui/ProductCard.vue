<template>
  <NuxtLink :to="localePath(`/shop/${product.slug}`)" class="block overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:shadow-soft">
    <img :src="product.images[0]" alt="" class="h-52 w-full object-cover" />
    <div class="p-6">
      <h3 class="text-xl font-semibold text-slate-900">{{ product.name }}</h3>
      <p class="mt-3 text-slate-600">{{ product.description }}</p>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-lg font-bold text-primary-600">${{ product.price }}</span>
        <span class="text-sm text-slate-500">{{ product.category }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({ product: { type: Object, required: true } })
</script>
