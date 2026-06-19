<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  width: { type: [Number, String], default: 600 },
  height: { type: [Number, String], default: 400 },
  loading: { type: String, default: 'lazy' }, // 'lazy' | 'eager'
})
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    format="webp"
    class="lazy-image"
  />
</template>

<style scoped lang="scss">
.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
