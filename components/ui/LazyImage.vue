<script setup lang="ts">
interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
}

withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  width: 600,
  height: 400,
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

<style scoped>
.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
