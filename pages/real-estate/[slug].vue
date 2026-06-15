<script setup lang="ts">
import { getBuildingBySlug } from '~/data/buildings'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => route.params.slug as string)
const building = computed(() => getBuildingBySlug(slug.value))

if (!building.value) {
  throw createError({ statusCode: 404, statusMessage: t('realEstate.notFound') })
}

useAppSeo({
  title: building.value.title,
  description: building.value.description,
  image: building.value.image,
  type: 'website',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: building.value.title,
      description: building.value.description,
      address: building.value.location,
      numberOfRooms: building.value.bedrooms,
      floorSize: { '@type': 'QuantitativeValue', value: building.value.area, unitCode: 'FTK' },
    }),
  }],
})

const formattedPrice = computed(() => useFormatPrice(building.value!.price, building.value!.currency))
const currentImage = ref(0)
</script>

<template>
  <section v-if="building" class="section">
    <div class="container">
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <NuxtLink :to="localePath('/real-estate')">{{ t('realEstate.title') }}</NuxtLink>
        <span aria-hidden="true"> / </span>
        <span>{{ building.title }}</span>
      </nav>

      <div class="building-detail">
        <div class="building-detail__gallery">
          <div class="building-detail__main">
            <UiLazyImage
              :src="building.images[currentImage]"
              :alt="building.title"
              :width="900"
              :height="600"
              loading="eager"
            />
          </div>
          <div v-if="building.images.length > 1" class="building-detail__thumbs">
            <button
              v-for="(img, index) in building.images"
              :key="index"
              type="button"
              class="building-detail__thumb"
              :class="{ 'building-detail__thumb--active': index === currentImage }"
              :aria-label="`Image ${index + 1}`"
              @click="currentImage = index"
            >
              <UiLazyImage :src="img" :alt="`${building.title} ${index + 1}`" :width="100" :height="75" />
            </button>
          </div>
        </div>

        <div class="building-detail__info">
          <span class="building-detail__type">{{ building.type }}</span>
          <h1 class="building-detail__title">{{ building.title }}</h1>
          <p class="building-detail__price">{{ formattedPrice }}</p>
          <p class="building-detail__location">{{ building.location }}</p>

          <dl class="building-detail__specs">
            <div>
              <dt>{{ t('realEstate.bedrooms') }}</dt>
              <dd>{{ building.bedrooms }}</dd>
            </div>
            <div>
              <dt>{{ t('realEstate.bathrooms') }}</dt>
              <dd>{{ building.bathrooms }}</dd>
            </div>
            <div>
              <dt>{{ t('realEstate.area') }}</dt>
              <dd>{{ building.area }} {{ t('realEstate.sqft') }}</dd>
            </div>
          </dl>

          <p class="building-detail__desc">{{ building.description }}</p>

          <div class="building-detail__features">
            <h2>{{ t('realEstate.features') }}</h2>
            <ul>
              <li v-for="feature in building.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>

          <button type="button" class="btn btn--primary btn--lg">
            {{ t('realEstate.contactAgent') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.breadcrumb {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.breadcrumb a {
  color: var(--color-primary);
  text-decoration: none;
}

.building-detail {
  display: grid;
  gap: 2.5rem;
}

.building-detail__main {
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 3 / 2;
}

.building-detail__thumbs {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  overflow-x: auto;
}

.building-detail__thumb {
  flex-shrink: 0;
  width: 5rem;
  height: 3.75rem;
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  background: none;
}

.building-detail__thumb--active {
  border-color: var(--color-primary);
}

.building-detail__type {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
}

.building-detail__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin: 0.375rem 0 0.5rem;
}

.building-detail__price {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.building-detail__location {
  color: var(--color-text-muted);
  margin: 0 0 1.25rem;
}

.building-detail__specs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 0 0 1.5rem;
  padding: 1rem;
  background: var(--color-bg-alt);
  border-radius: var(--radius-md);
}

.building-detail__specs dt {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.building-detail__specs dd {
  margin: 0.25rem 0 0;
  font-weight: 700;
  font-size: 1.125rem;
}

.building-detail__desc {
  color: var(--color-text-muted);
  line-height: 1.8;
  margin: 0 0 1.5rem;
}

.building-detail__features h2 {
  font-size: 1.0625rem;
  margin: 0 0 0.75rem;
}

.building-detail__features ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.building-detail__features li {
  padding: 0.375rem 0.75rem;
  background: var(--color-bg-alt);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .building-detail {
    grid-template-columns: 1.2fr 1fr;
  }
}
</style>
