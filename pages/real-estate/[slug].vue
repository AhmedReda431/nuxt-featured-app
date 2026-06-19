<script setup>
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { fetchPropertyBySlug } = useRealEstateApi()
const toastStore = useToastStore()

const { data, error } = await useAsyncData(
  `property-${route.params.slug}`,
  () => fetchPropertyBySlug(route.params.slug),
)

if (error.value || !data.value?.property) {
  throw createError({ statusCode: 404, statusMessage: t('realEstate.notFound') })
}

const property = computed(() => data.value.property)
const related = computed(() => data.value.related)

const formattedPrice = computed(() => useFormatPrice(property.value.price, property.value.currency))

useAppSeo({
  title: property.value.title,
  description: property.value.description,
  image: property.value.coverImage,
  type: 'website',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.value.title,
    description: property.value.description,
    image: property.value.images,
    address: { '@type': 'PostalAddress', addressLocality: property.value.city, addressCountry: property.value.country },
  },
})

const inquiryForm = reactive({ name: '', email: '', message: '' })
const inquirySent = ref(false)

function sendInquiry() {
  // No real lead-submission backend available for free, so this confirms
  // locally - the same UX shape a real "contact agent" form would have.
  inquirySent.value = true
  toastStore.show(t('realEstate.inquirySent'))
}
</script>

<template>
  <section class="section property-page">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <NuxtLink :to="localePath('/real-estate')">{{ t('realEstate.title') }}</NuxtLink>
        <span aria-hidden="true">/</span>
        <span>{{ property.title }}</span>
      </nav>

      <div class="property-detail">
        <ShopProductSlider :images="property.images" :alt="property.title" />

        <div class="property-detail__info">
          <span class="property-detail__status" :class="`property-detail__status--${property.status}`">
            {{ property.status === 'for-rent' ? t('realEstate.forRent') : t('realEstate.forSale') }}
          </span>
          <h1 class="property-detail__title">{{ property.title }}</h1>
          <p class="property-detail__location">📍 {{ property.address }}</p>

          <div class="property-detail__rating-row">
            <UiStarRating :rating="property.rating" />
            <span class="property-detail__reviews">({{ property.reviewCount }})</span>
          </div>

          <p class="property-detail__price">
            {{ formattedPrice }}<span v-if="property.status === 'for-rent'">/mo</span>
          </p>

          <div class="property-detail__specs">
            <div v-if="property.bedrooms"><strong>{{ property.bedrooms }}</strong><span>{{ t('realEstate.bedrooms') }}</span></div>
            <div><strong>{{ property.bathrooms }}</strong><span>{{ t('realEstate.bathrooms') }}</span></div>
            <div><strong>{{ property.area }}</strong><span>{{ t('realEstate.area') }} ({{ t('realEstate.sqft') }})</span></div>
            <div><strong>{{ property.yearBuilt }}</strong><span>{{ t('realEstate.yearBuilt') }}</span></div>
          </div>

          <p class="property-detail__description">{{ property.description }}</p>

          <div class="property-detail__amenities">
            <h3>{{ t('realEstate.amenities') }}</h3>
            <ul>
              <li v-for="amenity in property.amenities" :key="amenity">✓ {{ amenity }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="property-contact">
        <div class="agent-card card">
          <h3>{{ t('realEstate.agentInfo') }}</h3>
          <p class="agent-card__name">{{ property.agent.name }}</p>
          <p class="agent-card__contact">{{ property.agent.phone }}</p>
          <p class="agent-card__contact">{{ property.agent.email }}</p>
        </div>

        <div class="inquiry-card card">
          <h3>{{ t('realEstate.sendInquiry') }}</h3>

          <p v-if="inquirySent" class="inquiry-card__success">{{ t('realEstate.inquirySent') }}</p>

          <form v-else @submit.prevent="sendInquiry">
            <div class="form-group">
              <label class="form-label" for="inquiry-name">{{ t('contact.name') }}</label>
              <input id="inquiry-name" v-model="inquiryForm.name" type="text" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="inquiry-email">{{ t('contact.email') }}</label>
              <input id="inquiry-email" v-model="inquiryForm.email" type="email" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="inquiry-message">{{ t('contact.message') }}</label>
              <textarea id="inquiry-message" v-model="inquiryForm.message" class="form-input" rows="3" required />
            </div>
            <button type="submit" class="btn btn--primary btn--block">{{ t('realEstate.sendInquiry') }}</button>
          </form>
        </div>
      </div>

      <div v-if="related?.length" class="related-properties">
        <h2 class="section__title">{{ t('realEstate.similarProperties') }}</h2>
        <div class="grid grid--4">
          <RealestateBuildingCard v-for="item in related" :key="item.id" :property="item" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.breadcrumb {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.property-detail {
  display: grid;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
}

.property-detail__status {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: #fff;
  margin-bottom: 0.75rem;
}

.property-detail__status--for-rent {
  background: var(--color-accent);
}

.property-detail__title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  margin: 0 0 0.5rem;
}

.property-detail__location {
  color: var(--color-text-muted);
  margin: 0 0 0.75rem;
}

.property-detail__rating-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.property-detail__reviews {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.property-detail__price {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 0 1.5rem;
}

.property-detail__specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  padding: 1.25rem;
  background: var(--color-bg-alt);
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  text-align: center;
}

.property-detail__specs strong {
  display: block;
  font-size: 1.25rem;
}

.property-detail__specs span {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.property-detail__description {
  color: var(--color-text-muted);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.property-detail__amenities h3 {
  margin: 0 0 0.75rem;
  font-size: 1.0625rem;
}

.property-detail__amenities ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
  color: var(--color-text-muted);
}

.property-contact {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.agent-card,
.inquiry-card {
  padding: 1.5rem;
}

.agent-card h3,
.inquiry-card h3 {
  margin: 0 0 0.75rem;
  font-size: 1.0625rem;
}

.agent-card__name {
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.agent-card__contact {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
}

.inquiry-card__success {
  color: var(--color-success);
  font-weight: 600;
}

.related-properties {
  margin-top: 2.5rem;
}

@media (min-width: 900px) {
  .property-detail {
    grid-template-columns: 1fr 1fr;
  }

  .property-contact {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
