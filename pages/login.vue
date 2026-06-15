<template>
  <div class="w-full">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold">{{ $t('auth.login.title') }}</h1>
      <p class="text-gray-600">{{ $t('auth.login.subtitle') }}</p>
    </div>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <AppInput v-model="form.email" :label="$t('auth.login.email')" type="email" required icon="heroicons:envelope" />
      <AppInput v-model="form.password" :label="$t('auth.login.password')" type="password" required icon="heroicons:lock-closed" />
      <div class="flex items-center justify-between">
        <label class="flex items-center gap-2">
          <input v-model="form.remember" type="checkbox" class="rounded" />
          <span class="text-sm">{{ $t('auth.login.remember') }}</span>
        </label>
        <NuxtLink :to="localePath('/forgot-password')" class="text-sm text-primary-600">{{ $t('auth.login.forgotPassword') }}</NuxtLink>
      </div>
      <AppButton type="submit" variant="primary" class="w-full" :loading="loading">{{ $t('auth.login.submit') }}</AppButton>
    </form>
    <p class="text-center mt-6 text-sm">
      {{ $t('auth.login.noAccount') }}
      <NuxtLink :to="localePath('/register')" class="text-primary-600 font-medium">{{ $t('auth.login.register') }}</NuxtLink>
    </p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth', middleware: 'guest' })
const { login } = useAuth()
const form = reactive({ email: '', password: '', remember: false })
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  const result = await login(form.email, form.password)
  if (result.success) navigateTo('/')
  loading.value = false
}
</script>