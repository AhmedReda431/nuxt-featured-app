<script setup>
const props = defineProps({
  property: { type: Object, required: true },
})

const { t } = useI18n()
const localePath = useLocalePath()

const formattedPrice = computed(() => useFormatPrice(props.property.price, props.property.currency))
</script>

<template>
  <article class="building-card card">
    <NuxtLink :to="localePath(`/real-estate/${property.slug}`)" class="building-card__image">
      <span class="building-card__status" :class="`building-card__status--${property.status}`">
        {{ property.status === 'for-rent' ? t('realEstate.forRent') : t('realEstate.forSale') }}
      </span>
      <UiLazyImage :src="property.coverImage" :alt="property.title" :width="400" :height="280" />
    </NuxtLink>

    <div class="building-card__body">
      <span class="building-card__location">{{ property.city }}, {{ property.country }}</span>
      <NuxtLink :to="localePath(`/real-estate/${property.slug}`)" class="building-card__title">
        <h3>{{ property.title }}</h3>
      </NuxtLink>

      <div class="building-card__specs">
        <span v-if="property.bedrooms">🛏 {{ property.bedrooms }}</span>
        <span>🛁 {{ property.bathrooms }}</span>
        <span>📐 {{ property.area }} {{ t('realEstate.sqft') }}</span>
      </div>

      <div class="building-card__footer">
        <span class="building-card__price">{{ formattedPrice }}{{ property.status === 'for-rent' ? '/mo' : '' }}</span>
        <UiStarRating :rating="property.rating" :show-value="false" />
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.building-card__image {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.building-card__status {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 2;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: #fff;
}

[dir="rtl"] .building-card__status {
  left: auto;
  right: 0.75rem;
}

.building-card__status--for-rent {
  background: var(--color-accent);
}

.building-card__body {
  padding: 1.25rem;
}

.building-card__location {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.building-card__title {
  text-decoration: none;
  color: inherit;
}

.building-card__title h3 {
  margin: 0.25rem 0 0.75rem;
  font-size: 1.0625rem;
}

.building-card__title:hover h3 {
  color: var(--color-primary);
}

.building-card__specs {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.building-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.building-card__price {
  font-weight: 700;
  font-size: 1.0625rem;
}
</style>
