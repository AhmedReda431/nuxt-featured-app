<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__bg" aria-hidden="true" />
    <div class="hero__content container">
      <h1 id="hero-title" class="hero__title fade-in">
        {{ t('home.heroTitle') }}
      </h1>
      <p class="hero__subtitle fade-in">
        {{ t('home.heroSubtitle') }}
      </p>
      <div class="hero__actions fade-in">
        <NuxtLink :to="localePath('/shop')" class="btn btn--primary btn--lg">
          {{ t('home.heroCta') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/about')" class="btn btn--outline btn--lg">
          {{ t('home.heroSecondary') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%);
  z-index: 0;
}

.hero__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 30%, rgb(37 99 235 / 0.08) 0%, transparent 60%);
}

.hero__content {
  position: relative;
  z-index: 1;
  padding-block: 4rem;
  max-width: 720px;
}

.hero__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 1.25rem;
  color: var(--color-secondary);
}

.hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-text-muted);
  margin: 0 0 2rem;
  line-height: 1.7;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero :deep(.fade-in) {
  opacity: 1;
  transform: none;
  animation: heroFadeIn 0.8s ease forwards;
}

.hero :deep(.fade-in:nth-child(2)) { animation-delay: 0.15s; opacity: 0; }
.hero :deep(.fade-in:nth-child(3)) { animation-delay: 0.3s; opacity: 0; }
.hero :deep(.fade-in:nth-child(4)) { animation-delay: 0.45s; opacity: 0; }

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
