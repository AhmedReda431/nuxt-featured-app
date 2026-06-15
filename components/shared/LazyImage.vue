<template>
  <img :src="src" :alt="alt" class="w-full h-full object-cover" loading="lazy" />
</template>

<script setup>
const props = defineProps({ src: String, alt: { type: String, default: "" } })
</script>
