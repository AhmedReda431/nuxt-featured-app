<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const { t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()

useAppSeo({
  title: t('auth.otpTitle'),
  noindex: true,
})

const otp = ref('')
const newPassword = ref('')
const error = ref('')
const isVerified = ref(false)
const isLoading = ref(false)

async function handleVerify() {
  error.value = ''
  isLoading.value = true
  try {
    authStore.verifyOtp(otp.value)
    isVerified.value = true
  }
  catch (e) {
    error.value = (e as Error).message
  }
  finally {
    isLoading.value = false
  }
}

async function handleReset() {
  authStore.resetPassword(newPassword.value)
  await navigateTo(localePath('/auth/login'))
}
</script>

<template>
  <div class="auth-card card">
    <h1 class="auth-card__title">{{ t('auth.otpTitle') }}</h1>
    <p v-if="authStore.pendingEmail" class="auth-card__email">
      {{ authStore.pendingEmail }}
    </p>
    <p class="auth-card__hint">Demo OTP: <strong>123456</strong></p>

    <form v-if="!isVerified" @submit.prevent="handleVerify">
      <div class="form-group">
        <label class="form-label" for="otp">{{ t('auth.otpCode') }}</label>
        <input
          id="otp"
          v-model="otp"
          type="text"
          class="form-input"
          required
          inputmode="numeric"
          maxlength="6"
          pattern="[0-9]{6}"
          autocomplete="one-time-code"
        />
      </div>

      <p v-if="error" class="auth-card__error" role="alert">{{ error }}</p>

      <button type="submit" class="btn btn--primary" style="width:100%" :disabled="isLoading">
        {{ isLoading ? t('common.loading') : t('auth.otpButton') }}
      </button>
    </form>

    <form v-else @submit.prevent="handleReset">
      <div class="form-group">
        <label class="form-label" for="newPassword">{{ t('auth.password') }}</label>
        <input id="newPassword" v-model="newPassword" type="password" class="form-input" required minlength="6" autocomplete="new-password" />
      </div>
      <button type="submit" class="btn btn--primary" style="width:100%">
        {{ t('auth.forgotButton') }}
      </button>
    </form>

    <div class="auth-card__links">
      <NuxtLink :to="localePath('/auth/login')">{{ t('auth.backToLogin') }}</NuxtLink>
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

.auth-card__email {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin: 0 0 0.5rem;
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
</style>
