<script setup>
const props = defineProps({
  rating: { type: Number, required: true },
  max: { type: Number, default: 5 },
  showValue: { type: Boolean, default: true },
})

const fullStars = computed(() => Math.round(props.rating))
const label = computed(() => useRatingLabel(props.rating, props.max))
</script>

<template>
  <div class="star-rating" role="img" :aria-label="label">
    <span v-for="i in max" :key="i" class="star-rating__star" :class="{ 'star-rating__star--filled': i <= fullStars }" aria-hidden="true">
      ★
    </span>
    <span v-if="showValue" class="star-rating__value">{{ rating.toFixed(1) }}</span>
  </div>
</template>

<style scoped lang="scss">
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
}

.star-rating__star {
  color: var(--color-border);
  font-size: 0.9375rem;
}

.star-rating__star--filled {
  color: var(--color-accent);
}

.star-rating__value {
  margin-left: 0.375rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  font-weight: 600;
}
</style>
