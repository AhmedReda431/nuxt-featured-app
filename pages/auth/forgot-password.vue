<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const { t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()

useAppSeo({
  title: t('auth.forgotTitle'),
  noindex: true,
})

const email = ref('')
const isSent = ref(false)
const isLoading = ref(false)

async function handleSubmit() {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  authStore.requestPasswordReset(email.value)
  isSent.value = true
  isLoading.value = false
  await navigateTo(localePath('/auth/otp'))
}
</script>

<template>
  <div class="auth-card card">
    <h1 class="auth-card__title">{{ t('auth.forgotTitle') }}</h1>

    <form v-if="!isSent" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label" for="email">{{ t('auth.email') }}</label>
        <input id="email" v-model="email" type="email" class="form-input" required autocomplete="email" />
      </div>
      <button type="submit" class="btn btn--primary" style="width:100%" :disabled="isLoading">
        {{ isLoading ? t('common.loading') : t('auth.forgotButton') }}
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
  margin: 0 0 1.5rem;
  text-align: center;
  font-size: 1.5rem;
}

.auth-card__links {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
}
</style>
