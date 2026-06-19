<script setup>
defineProps({
  icon: { type: String, default: '📭' },
  title: { type: String, required: true },
  message: { type: String, default: '' },
})
</script>

<template>
  <div class="empty-state">
    <span class="empty-state__icon" aria-hidden="true">{{ icon }}</span>
    <h3 class="empty-state__title">{{ title }}</h3>
    <p v-if="message" class="empty-state__message">{{ message }}</p>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.empty-state {
  text-align: center;
  padding: 3.5rem 1.5rem;
}

.empty-state__icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.empty-state__title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}

.empty-state__message {
  color: var(--color-text-muted);
  margin: 0 0 1.5rem;
}
</style>
