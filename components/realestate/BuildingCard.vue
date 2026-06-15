<script setup lang="ts">
import type { Building } from '~/types'

const props = defineProps<{ building: Building }>()

const { t } = useI18n()
const localePath = useLocalePath()

const formattedPrice = computed(() => useFormatPrice(props.building.price, props.building.currency))
</script>

<template>
  <article class="building-card card">
    <NuxtLink :to="localePath(`/real-estate/${building.slug}`)" class="building-card__image">
      <UiLazyImage :src="building.image" :alt="building.title" :width="400" :height="280" />
      <span class="building-card__type">{{ building.type }}</span>
    </NuxtLink>
    <div class="building-card__body">
      <h3 class="building-card__title">
        <NuxtLink :to="localePath(`/real-estate/${building.slug}`)">{{ building.title }}</NuxtLink>
      </h3>
      <p class="building-card__location">{{ building.location }}</p>
      <p class="building-card__price">{{ formattedPrice }}</p>
      <div class="building-card__specs">
        <span>{{ building.bedrooms }} {{ t('realEstate.bedrooms') }}</span>
        <span>{{ building.bathrooms }} {{ t('realEstate.bathrooms') }}</span>
        <span>{{ building.area }} {{ t('realEstate.sqft') }}</span>
      </div>
      <NuxtLink :to="localePath(`/real-estate/${building.slug}`)" class="btn btn--outline btn--sm">
        {{ t('realEstate.viewDetails') }}
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.building-card__image {
  position: relative;
  display: block;
  aspect-ratio: 10 / 7;
  overflow: hidden;
}

.building-card__type {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem 0.625rem;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
}

.building-card__body {
  padding: 1.25rem;
}

.building-card__title {
  margin: 0 0 0.375rem;
  font-size: 1.0625rem;
}

.building-card__title a {
  color: inherit;
  text-decoration: none;
}

.building-card__title a:hover {
  color: var(--color-primary);
}

.building-card__location {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin: 0 0 0.5rem;
}

.building-card__price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin: 0 0 0.75rem;
}

.building-card__specs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}
</style>
