<script setup>
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const { t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()

useAppSeo({ title: t('auth.registerTitle') })

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const isLoading = ref(false)

async function handleRegister() {
  error.value = ''

  if (password.value.length < 6) {
    error.value = t('auth.passwordTooShort')
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = t('auth.passwordsDontMatch')
    return
  }

  isLoading.value = true
  try {
    await authStore.register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    })
    await navigateTo(localePath('/'))
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
    <h1 class="auth-card__title">{{ t('auth.registerTitle') }}</h1>

    <form @submit.prevent="handleRegister">
      <div class="checkout-section__row">
        <div class="form-group">
          <label class="form-label" for="firstName">{{ t('auth.firstName') }}</label>
          <input id="firstName" v-model="firstName" type="text" class="form-input" required autocomplete="given-name">
        </div>
        <div class="form-group">
          <label class="form-label" for="lastName">{{ t('auth.lastName') }}</label>
          <input id="lastName" v-model="lastName" type="text" class="form-input" autocomplete="family-name">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="email">{{ t('auth.email') }}</label>
        <input id="email" v-model="email" type="email" class="form-input" required autocomplete="email">
      </div>
      <div class="form-group">
        <label class="form-label" for="password">{{ t('auth.password') }}</label>
        <input id="password" v-model="password" type="password" class="form-input" required autocomplete="new-password" minlength="6">
      </div>
      <div class="form-group">
        <label class="form-label" for="confirmPassword">{{ t('auth.confirmPassword') }}</label>
        <input id="confirmPassword" v-model="confirmPassword" type="password" class="form-input" required autocomplete="new-password" minlength="6">
      </div>

      <p v-if="error" class="auth-card__error" role="alert">{{ error }}</p>

      <button type="submit" class="btn btn--primary btn--block" :disabled="isLoading">
        <span v-if="isLoading" class="spinner" aria-hidden="true" />
        {{ isLoading ? t('auth.registering') : t('auth.registerButton') }}
      </button>
    </form>

    <div class="auth-card__links">
      <p>
        {{ t('auth.loginLink') }}
        <NuxtLink :to="localePath('/auth/login')">{{ t('nav.login') }}</NuxtLink>
      </p>
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

.checkout-section__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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
