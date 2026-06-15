<template>
  <div class="w-full">
    <h1 class="text-2xl font-bold text-center mb-8">{{ $t('auth.forgotPassword.title') }}</h1>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <AppInput v-model="email" :label="$t('auth.forgotPassword.email')" type="email" required />
      <AppButton type="submit" variant="primary" class="w-full" :loading="loading">{{ $t('auth.forgotPassword.submit') }}</AppButton>
    </form>
    <NuxtLink :to="localePath('/login')" class="block text-center mt-6 text-sm text-primary-600">{{ $t('auth.forgotPassword.backToLogin') }}</NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth', middleware: 'guest' })
const { forgotPassword } = useAuth()
const email = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  await forgotPassword(email.value)
  loading.value = false
}
</script>