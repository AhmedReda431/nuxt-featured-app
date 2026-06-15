<script setup lang="ts">
const { t, tm, rt } = useI18n()

useAppSeo({
  title: t('faq.title'),
  description: t('faq.subtitle'),
})

const questions = tm('faq.questions') as any[]
const openIndex = ref<number | null>(0)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="faq-page">
    <section class="section">
      <div class="container container--narrow">
        <UiSectionTitle :title="t('faq.title')" :subtitle="t('faq.subtitle')" centered />

        <div class="faq__list">
          <div
            v-for="(item, index) in questions"
            :key="index"
            class="faq__item card"
            :class="{ 'faq__item--open': openIndex === index }"
          >
            <button
              type="button"
              class="faq__question"
              :aria-expanded="openIndex === index"
              @click="toggle(index)"
            >
              <span class="faq__q-text">{{ rt(item.q) }}</span>
              <span class="faq__icon" :class="{ 'faq__icon--rotated': openIndex === index }">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>
            
            <div v-show="openIndex === index" class="faq__answer">
              <div class="faq__answer-content">
                <p>{{ rt(item.a) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="faq__cta card">
          <p>Don't see your question here?</p>
          <NuxtLink :to="useLocalePath()('/contact')" class="btn btn--primary">
            Contact Support
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.faq__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.faq__item {
  padding: 0;
  overflow: hidden;
  transition: all var(--transition);
}

.faq__item--open {
  border-color: var(--color-primary);
}

.faq__question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-weight: 600;
  color: var(--color-text);
}

[dir="rtl"] .faq__question {
  text-align: right;
}

.faq__q-text {
  font-size: 1.0625rem;
}

.faq__icon {
  transition: transform 0.3s ease;
  color: var(--color-text-muted);
}

.faq__icon--rotated {
  transform: rotate(180deg);
  color: var(--color-primary);
}

.faq__answer {
  border-top: 1px solid var(--color-border);
}

.faq__answer-content {
  padding: 1.25rem 1.5rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.faq__answer-content p {
  margin: 0;
}

.faq__cta {
  margin-top: 3rem;
  text-align: center;
  padding: 2rem;
}

.faq__cta p {
  margin: 0 0 1rem;
  font-weight: 500;
}
</style>
