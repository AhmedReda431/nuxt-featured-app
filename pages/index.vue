<script setup>
const { t } = useI18n()
const localePath = useLocalePath()

useAppSeo({
  title: t('nav.home'),
  description: t('home.heroSubtitle'),
})

const LazyFeatureSlider = defineAsyncComponent(() => import('~/components/home/FeatureSlider.vue'))

const features = [
  { icon: '🛒', title: 'E-Commerce', desc: 'Cart, checkout, favorites, variants — all persisted' },
  { icon: '🏠', title: 'Real Estate', desc: 'Filterable property listings with detail pages' },
  { icon: '📝', title: 'Blog', desc: 'Real article data with comments and search' },
  { icon: '🔐', title: 'Secure Auth', desc: 'Encrypted session cookie, idle auto-logout' },
  { icon: '🌍', title: 'i18n', desc: 'English & Arabic with full RTL support' },
  { icon: '⚡', title: 'Performance', desc: 'Lazy loading, code splitting, real SEO' },
]

const stats = [
  { value: '13+', label: 'Pages' },
  { value: '4', label: 'Pinia Stores' },
  { value: '2', label: 'Languages' },
  { value: '100%', label: 'Responsive' },
]
</script>

<template>
  <div>
    <HomeHeroSection />

    <HomeAnimatedSection animation="fade-in">
      <section class="section">
        <div class="container">
          <UiSectionTitle
            :title="t('home.featuresTitle')"
            :subtitle="t('home.featuresSubtitle')"
            centered
          />
          <div class="grid grid--3">
            <div v-for="feature in features" :key="feature.title" class="feature-card card">
              <span class="feature-card__icon" aria-hidden="true">{{ feature.icon }}</span>
              <h3 class="feature-card__title">{{ feature.title }}</h3>
              <p class="feature-card__desc">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </HomeAnimatedSection>

    <LazyFeatureSlider />

    <HomeAnimatedSection animation="slide-in-left">
      <section class="section section--alt">
        <div class="container">
          <UiSectionTitle :title="t('home.statsTitle')" centered />
          <div class="stats">
            <div v-for="stat in stats" :key="stat.label" class="stats__item">
              <span class="stats__value">{{ stat.value }}</span>
              <span class="stats__label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>
    </HomeAnimatedSection>

    <HomeAnimatedSection animation="fade-in">
      <section class="section cta">
        <div class="container cta__inner">
          <h2 class="cta__title">{{ t('home.ctaTitle') }}</h2>
          <p class="cta__subtitle">{{ t('home.ctaSubtitle') }}</p>
          <NuxtLink :to="localePath('/shop')" class="btn btn--primary btn--lg">
            {{ t('home.ctaButton') }}
          </NuxtLink>
        </div>
      </section>
    </HomeAnimatedSection>
  </div>
</template>

<style scoped lang="scss">
.feature-card {
  padding: 1.5rem;
  text-align: center;
}

.feature-card__icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.75rem;
}

.feature-card__title {
  margin: 0 0 0.5rem;
  font-size: 1.0625rem;
}

.feature-card__desc {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  text-align: center;
}

.stats__value {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-primary);
}

.stats__label {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
}

.cta {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: #fff;
}

.cta__inner {
  text-align: center;
}

.cta__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin: 0 0 0.75rem;
}

.cta__subtitle {
  margin: 0 0 1.5rem;
  opacity: 0.9;
}

.cta .btn--primary {
  background: #fff;
  color: var(--color-primary);
}

.cta .btn--primary:hover {
  background: #f1f5f9;
}
</style>
