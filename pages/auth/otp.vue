<script setup>
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

useAppSeo({ title: t('auth.otpTitle') })

const demoOtp = computed(() => route.query.demoOtp || '')

const otp = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const isVerified = ref(false)
const isLoading = ref(false)

async function handleVerify() {
  error.value = ''
  isLoading.value = true
  try {
    await $fetch('/api/auth/verify-otp', {
      method: 'POST',
      body: { code: otp.value },
    })
    isVerified.value = true
  }
  catch (e) {
    error.value = e?.data?.statusMessage || t('common.error')
  }
  finally {
    isLoading.value = false
  }
}

async function handleReset() {
  error.value = ''
  if (newPassword.value !== confirmPassword.value) {
    error.value = t('auth.passwordsDontMatch')
    return
  }
  isLoading.value = true
  try {
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: { password: newPassword.value },
    })
    await navigateTo(localePath('/auth/login'))
  }
  catch (e) {
    error.value = e?.data?.statusMessage || t('common.error')
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-card card">
    <h1 class="auth-card__title">{{ t('auth.otpTitle') }}</h1>
    <p v-if="demoOtp" class="auth-card__hint">{{ t('auth.demoOtpHint') }} <strong>{{ demoOtp }}</strong></p>

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
        >
      </div>

      <p v-if="error" class="auth-card__error" role="alert">{{ error }}</p>

      <button type="submit" class="btn btn--primary btn--block" :disabled="isLoading">
        <span v-if="isLoading" class="spinner" aria-hidden="true" />
        {{ isLoading ? t('common.loading') : t('auth.otpButton') }}
      </button>
    </form>

    <form v-else @submit.prevent="handleReset">
      <div class="form-group">
        <label class="form-label" for="newPassword">{{ t('auth.newPassword') }}</label>
        <input id="newPassword" v-model="newPassword" type="password" class="form-input" required minlength="6" autocomplete="new-password">
      </div>
      <div class="form-group">
        <label class="form-label" for="confirmPassword">{{ t('auth.confirmPassword') }}</label>
        <input id="confirmPassword" v-model="confirmPassword" type="password" class="form-input" required minlength="6" autocomplete="new-password">
      </div>

      <p v-if="error" class="auth-card__error" role="alert">{{ error }}</p>

      <button type="submit" class="btn btn--primary btn--block" :disabled="isLoading">
        <span v-if="isLoading" class="spinner" aria-hidden="true" />
        {{ t('auth.resetButton') }}
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
</style>
