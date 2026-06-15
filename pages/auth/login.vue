<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const { t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()

useAppSeo({
  title: t('auth.loginTitle'),
  noindex: true,
})

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

async function handleLogin() {
  error.value = ''
  isLoading.value = true
  try {
    authStore.login(email.value, password.value)
    await navigateTo(localePath('/'))
  }
  catch (e) {
    error.value = (e as Error).message
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-card card">
    <h1 class="auth-card__title">{{ t('auth.loginTitle') }}</h1>
    <p class="auth-card__hint">{{ t('auth.demoHint') }}</p>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label class="form-label" for="email">{{ t('auth.email') }}</label>
        <input id="email" v-model="email" type="email" class="form-input" required autocomplete="email" />
      </div>
      <div class="form-group">
        <label class="form-label" for="password">{{ t('auth.password') }}</label>
        <input id="password" v-model="password" type="password" class="form-input" required autocomplete="current-password" minlength="6" />
      </div>

      <p v-if="error" class="auth-card__error" role="alert">{{ error }}</p>

      <button type="submit" class="btn btn--primary" style="width:100%" :disabled="isLoading">
        {{ isLoading ? t('common.loading') : t('auth.loginButton') }}
      </button>
    </form>

    <div class="auth-card__links">
      <NuxtLink :to="localePath('/auth/forgot-password')">{{ t('auth.forgotLink') }}</NuxtLink>
      <p>
        {{ t('auth.registerLink') }}
        <NuxtLink :to="localePath('/auth/register')">{{ t('nav.register') }}</NuxtLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-card {
  padding: 2rem;
}

.auth-card__title {
  margin: 0 0 0.5rem;
  text-align: center;
  font-size: 1.5rem;
}

.auth-card__hint {
  text-align: center;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin: 0 0 1.5rem;
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

.auth-card__links p {
  margin: 0.75rem 0 0;
}
</style>
