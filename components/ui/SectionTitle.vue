<template>
  <div class="text-center mb-12">
    <p class="text-sm uppercase tracking-[0.2em] text-primary-600">{{ title }}</p>
    <h2 class="mt-3 text-3xl font-bold text-slate-900">{{ subtitle }}</h2>
  </div>
</template>

<script setup>
const props = defineProps({ title: String, subtitle: String })
</script>
