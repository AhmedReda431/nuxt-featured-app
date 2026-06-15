<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  centered?: boolean
}

withDefaults(defineProps<Props>(), {
  centered: false,
})
</script>

<template>
  <header class="section-header" :class="{ 'section-header--centered': centered }">
    <h2 class="section__title">{{ title }}</h2>
    <p v-if="subtitle" class="section__subtitle">{{ subtitle }}</p>
  </header>
</template>

<style scoped>
.section-header--centered {
  text-align: center;
}

.section-header--centered .section__subtitle {
  margin-inline: auto;
}
</style>
