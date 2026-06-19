<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  centered: { type: Boolean, default: false },
})
</script>

<template>
  <header class="section-header" :class="{ 'section-header--centered': centered }">
    <h2 class="section__title">{{ title }}</h2>
    <p v-if="subtitle" class="section__subtitle">{{ subtitle }}</p>
  </header>
</template>

<style scoped lang="scss">
.section-header--centered {
  text-align: center;
}

.section-header--centered .section__subtitle {
  margin-inline: auto;
}
</style>
