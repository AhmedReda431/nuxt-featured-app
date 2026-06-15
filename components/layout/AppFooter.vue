<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="footer" role="contentinfo">
    <div class="footer__inner container">
      <div class="footer__grid">
        <div class="footer__brand">
          <h2 class="footer__title">Universal Starter</h2>
          <p class="footer__desc">{{ t('footer.description') }}</p>
        </div>

        <nav class="footer__nav" :aria-label="t('footer.quickLinks')">
          <h3 class="footer__heading">{{ t('footer.quickLinks') }}</h3>
          <ul class="footer__list">
            <li><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/about')">{{ t('nav.about') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/shop')">{{ t('nav.shop') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/blog')">{{ t('nav.blog') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/real-estate')">{{ t('nav.realEstate') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/contact')">{{ t('nav.contact') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/faq')">{{ t('nav.faq') }}</NuxtLink></li>
          </ul>
        </nav>

        <div class="footer__contact">
          <h3 class="footer__heading">{{ t('footer.contact') }}</h3>
          <p><a href="mailto:hello@example.com">{{ t('footer.email') }}</a></p>
          <p><a href="tel:+15551234567">{{ t('footer.phone') }}</a></p>
        </div>
      </div>

      <div class="footer__bottom">
        <p>&copy; {{ new Date().getFullYear() }} Universal Starter. {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-secondary);
  color: #cbd5e1;
  padding-block: 3rem 1.5rem;
  margin-top: auto;
}

.footer__grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  margin-bottom: 2rem;
}

.footer__title {
  color: #fff;
  font-size: 1.25rem;
  margin: 0 0 0.75rem;
}

.footer__desc {
  margin: 0;
  line-height: 1.7;
  max-width: 320px;
}

.footer__heading {
  color: #fff;
  font-size: 0.9375rem;
  margin: 0 0 1rem;
}

.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__list a,
.footer__contact a {
  color: #94a3b8;
  text-decoration: none;
}

.footer__list a:hover,
.footer__contact a:hover {
  color: #fff;
}

.footer__contact p {
  margin: 0 0 0.5rem;
}

.footer__bottom {
  padding-top: 1.5rem;
  border-top: 1px solid #334155;
  text-align: center;
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: 2fr 1fr 1fr;
  }
}
</style>
