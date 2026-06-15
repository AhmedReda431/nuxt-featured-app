<template>
  <NuxtLink :to="localePath(`/real-estate/${building.slug}`)" class="block overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:shadow-soft">
    <img :src="building.images[0]" alt="" class="h-52 w-full object-cover" />
    <div class="p-6">
      <h3 class="text-xl font-semibold text-slate-900">{{ building.title }}</h3>
      <p class="mt-3 text-slate-500">${{ building.price.toLocaleString() }}</p>
      <div class="mt-4 flex gap-4 text-sm text-slate-500">
        <span>{{ building.bedrooms }} beds</span>
        <span>{{ building.bathrooms }} baths</span>
        <span>{{ building.area }} sqft</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({ building: { type: Object, required: true } })
</script>
