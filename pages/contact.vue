<script setup lang="ts">
const { t } = useI18n()

useAppSeo({
  title: t('contact.title'),
  description: t('contact.subtitle'),
})

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const isSuccess = ref(false)

async function handleSubmit() {
  isSubmitting.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  isSuccess.value = true
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  
  setTimeout(() => {
    isSuccess.value = false
  }, 5000)
}
</script>

<template>
  <div class="contact-page">
    <section class="section">
      <div class="container container--narrow">
        <UiSectionTitle :title="t('contact.title')" :subtitle="t('contact.subtitle')" centered />

        <div class="contact__grid">
          <div class="contact__info">
            <div class="info-card card">
              <h3 class="info-card__title">{{ t('contact.info') }}</h3>
              <div class="info-card__list">
                <div class="info-card__item">
                  <span class="info-card__icon">📍</span>
                  <div>
                    <p class="info-card__label">{{ t('contact.address') }}</p>
                  </div>
                </div>
                <div class="info-card__item">
                  <span class="info-card__icon">📧</span>
                  <div>
                    <p class="info-card__label">{{ t('footer.email') }}</p>
                  </div>
                </div>
                <div class="info-card__item">
                  <span class="info-card__icon">📞</span>
                  <div>
                    <p class="info-card__label">{{ t('footer.phone') }}</p>
                  </div>
                </div>
                <div class="info-card__item">
                  <span class="info-card__icon">🕒</span>
                  <div>
                    <p class="info-card__label">{{ t('contact.workingHours') }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="contact__map card">
              <div class="map-placeholder">
                <p>Interactive Map Integration</p>
              </div>
            </div>
          </div>

          <div class="contact__form-container card">
            <form v-if="!isSuccess" class="form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name" class="form-label">{{ t('contact.name') }}</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  required
                  :placeholder="t('contact.name')"
                >
              </div>
              <div class="form-group">
                <label for="email" class="form-label">{{ t('contact.email') }}</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  required
                  :placeholder="t('contact.email')"
                >
              </div>
              <div class="form-group">
                <label for="subject" class="form-label">{{ t('contact.subject') }}</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  class="form-input"
                  required
                  :placeholder="t('contact.subject')"
                >
              </div>
              <div class="form-group">
                <label for="message" class="form-label">{{ t('contact.message') }}</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  class="form-input"
                  required
                  :placeholder="t('contact.message')"
                ></textarea>
              </div>
              <button
                type="submit"
                class="btn btn--primary btn--block"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? t('common.loading') : t('contact.send') }}
              </button>
            </form>
            
            <div v-else class="contact__success">
              <div class="success-icon">✓</div>
              <h3>{{ t('contact.success') }}</h3>
              <p>We'll get back to you shortly.</p>
              <button type="button" class="btn btn--outline" @click="isSuccess = false">
                Send another message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact__grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  margin-top: 2rem;
}

.contact__info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  padding: 1.5rem;
}

.info-card__title {
  margin: 0 0 1.5rem;
  font-size: 1.25rem;
}

.info-card__list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-card__item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.info-card__icon {
  font-size: 1.25rem;
}

.info-card__label {
  margin: 0;
  font-weight: 500;
}

.contact__map {
  height: 300px;
  overflow: hidden;
  padding: 0;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-weight: 500;
}

.contact__form-container {
  padding: 2rem;
}

.contact__success {
  text-align: center;
  padding: 2rem 0;
}

.success-icon {
  width: 3rem;
  height: 3rem;
  background: #22c55e;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
}

@media (min-width: 992px) {
  .contact__grid {
    grid-template-columns: 1fr 1.5fr;
  }
}
</style>
