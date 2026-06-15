<template>
  <div class="w-full">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold">{{ $t('auth.register.title') }}</h1>
    </div>
    <form @submit.prevent="handleRegister" class="space-y-4">
      <AppInput v-model="form.name" :label="$t('auth.register.name')" required />
      <AppInput v-model="form.email" :label="$t('auth.register.email')" type="email" required />
      <AppInput v-model="form.password" :label="$t('auth.register.password')" type="password" required />
      <AppInput v-model="form.confirmPassword" :label="$t('auth.register.confirmPassword')" type="password" required />
      <AppButton type="submit" variant="primary" class="w-full" :loading="loading">{{ $t('auth.register.submit') }}</AppButton>
    </form>
    <p class="text-center mt-6 text-sm">
      {{ $t('auth.register.haveAccount') }}
      <NuxtLink :to="localePath('/login')" class="text-primary-600">{{ $t('auth.register.login') }}</NuxtLink>
    </p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth', middleware: 'guest' })
const { register } = useAuth()
const form = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const loading = ref(false)

const handleRegister = async () => {
  loading.value = true
  const result = await register(form.name, form.email, form.password)
  if (result.success) navigateTo('/')
  loading.value = false
}
</script>