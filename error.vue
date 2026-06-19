<script setup>
const props = defineProps({
  error: { type: Object, required: true },
})

const { t } = useI18n()
const localePath = useLocalePath()

function handleRetry() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <div class="error-page">
    <div class="error-page__content">
      <h1 class="error-page__code">{{ error.statusCode }}</h1>
      <p class="error-page__message">{{ error.statusMessage || t('common.error') }}</p>
      <button type="button" class="btn btn--primary" @click="handleRetry">
        {{ t('common.back') }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.error-page__code {
  font-size: 5rem;
  font-weight: 800;
  color: var(--color-primary);
  margin: 0;
}

.error-page__message {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  margin: 0.5rem 0 1.5rem;
}
</style>
