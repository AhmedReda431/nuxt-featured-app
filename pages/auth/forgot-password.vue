<script setup>
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const { t } = useI18n()
const localePath = useLocalePath()

useAppSeo({ title: t('auth.forgotTitle') })

const email = ref('')
const isLoading = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  isLoading.value = true
  try {
    const result = await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value },
    })
    await navigateTo(localePath(`/auth/otp?demoOtp=${result.demoOtp}`))
  }
  catch {
    error.value = t('common.error')
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-card card">
    <h1 class="auth-card__title">{{ t('auth.forgotTitle') }}</h1>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label" for="email">{{ t('auth.email') }}</label>
        <input id="email" v-model="email" type="email" class="form-input" required autocomplete="email">
      </div>

      <p v-if="error" class="auth-card__error" role="alert">{{ error }}</p>

      <button type="submit" class="btn btn--primary btn--block" :disabled="isLoading">
        <span v-if="isLoading" class="spinner" aria-hidden="true" />
        {{ isLoading ? t('common.loading') : t('auth.forgotButton') }}
      </button>
    </form>

    <div class="auth-card__links">
      <NuxtLink :to="localePath('/auth/login')">{{ t('auth.backToLogin') }}</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-card {
  padding: 2rem;
}

.auth-card__title {
  margin: 0 0 1.5rem;
  text-align: center;
  font-size: 1.5rem;
}

.auth-card__error {
  color: var(--color-danger);
  font-size: 0.875rem;
  margin: 0 0 1rem;
}

.auth-card__links {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
}
</style>
