<script setup>
const { t } = useI18n()

useAppSeo({
  title: t('about.title'),
  description: t('about.subtitle'),
})

const values = [
  { title: 'Quality', desc: 'Clean, maintainable code following best practices.' },
  { title: 'Flexibility', desc: 'Modular pages you can enable or disable per project.' },
  { title: 'Performance', desc: 'Optimized for Core Web Vitals and accessibility.' },
  { title: 'Developer Experience', desc: 'Plain JavaScript, Pinia, i18n — all configured.' },
]

const team = [
  { name: 'Alex Rivera', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { name: 'Jordan Lee', role: 'UI/UX Designer', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sam Taylor', role: 'Product Manager', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
]
</script>

<template>
  <div>
    <section class="about-hero section">
      <div class="container">
        <HomeAnimatedSection animation="fade-in">
          <UiSectionTitle :title="t('about.title')" :subtitle="t('about.subtitle')" />
        </HomeAnimatedSection>
      </div>
    </section>

    <HomeAnimatedSection animation="slide-in-left">
      <section class="section section--alt">
        <div class="container about-grid">
          <div class="about-grid__text">
            <h2 class="section__title">{{ t('about.missionTitle') }}</h2>
            <p>{{ t('about.missionText') }}</p>
          </div>
          <div class="about-grid__image">
            <UiLazyImage
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="Our team collaborating at work"
              :width="600"
              :height="400"
            />
          </div>
        </div>
      </section>
    </HomeAnimatedSection>

    <HomeAnimatedSection animation="slide-in-right">
      <section class="section">
        <div class="container about-grid about-grid--reverse">
          <div class="about-grid__text">
            <h2 class="section__title">{{ t('about.visionTitle') }}</h2>
            <p>{{ t('about.visionText') }}</p>
          </div>
          <div class="about-grid__image">
            <UiLazyImage
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
              alt="Our vision for the future"
              :width="600"
              :height="400"
            />
          </div>
        </div>
      </section>
    </HomeAnimatedSection>

    <HomeAnimatedSection animation="fade-in">
      <section class="section section--alt">
        <div class="container">
          <UiSectionTitle :title="t('about.valuesTitle')" centered />
          <div class="grid grid--2">
            <div v-for="value in values" :key="value.title" class="value-card card">
              <h3>{{ value.title }}</h3>
              <p>{{ value.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </HomeAnimatedSection>

    <HomeAnimatedSection animation="fade-in">
      <section class="section">
        <div class="container">
          <UiSectionTitle :title="t('about.teamTitle')" centered />
          <div class="grid grid--3">
            <div v-for="member in team" :key="member.name" class="team-card card">
              <UiLazyImage :src="member.image" :alt="member.name" :width="200" :height="200" class="team-card__avatar" />
              <h3>{{ member.name }}</h3>
              <p>{{ member.role }}</p>
            </div>
          </div>
        </div>
      </section>
    </HomeAnimatedSection>
  </div>
</template>

<style scoped lang="scss">
.about-grid {
  display: grid;
  gap: 2rem;
  align-items: center;
}

.about-grid__text p {
  color: var(--color-text-muted);
  line-height: 1.8;
  margin: 0;
}

.about-grid__image {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.value-card {
  padding: 1.5rem;
}

.value-card h3 {
  margin: 0 0 0.5rem;
  color: var(--color-primary);
}

.value-card p {
  margin: 0;
  color: var(--color-text-muted);
}

.team-card {
  padding: 1.5rem;
  text-align: center;
}

.team-card__avatar {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin: 0 auto 1rem;
  object-fit: cover;
}

.team-card h3 {
  margin: 0 0 0.25rem;
}

.team-card p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
}

@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
  }

  .about-grid--reverse .about-grid__text {
    order: 2;
  }

  .about-grid--reverse .about-grid__image {
    order: 1;
  }
}
</style>
