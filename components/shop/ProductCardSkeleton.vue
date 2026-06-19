<script setup>
defineProps({
  count: { type: Number, default: 6 },
})
</script>

<template>
  <div class="grid grid--3">
    <div v-for="i in count" :key="i" class="product-skeleton card" aria-hidden="true">
      <div class="skeleton product-skeleton__image" />
      <div class="product-skeleton__body">
        <div class="skeleton product-skeleton__line product-skeleton__line--short" />
        <div class="skeleton product-skeleton__line" />
        <div class="skeleton product-skeleton__line product-skeleton__line--price" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-skeleton__image {
  aspect-ratio: 1;
  border-radius: 0;
}

.product-skeleton__body {
  padding: 1rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.product-skeleton__line {
  height: 0.875rem;
}

.product-skeleton__line--short {
  width: 40%;
}

.product-skeleton__line--price {
  width: 30%;
  height: 1.25rem;
  margin-top: 0.25rem;
}
</style>
