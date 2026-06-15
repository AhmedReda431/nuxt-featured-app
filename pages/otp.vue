<template>
  <div class="w-full">
    <h1 class="text-2xl font-bold text-center mb-8">{{ $t('auth.otp.title') }}</h1>
    <form @submit.prevent="handleVerify" class="space-y-4">
      <AppInput v-model="otp" :label="$t('auth.otp.code')" maxlength="6" required class="text-center text-2xl tracking-widest" />
      <AppButton type="submit" variant="primary" class="w-full" :loading="loading">{{ $t('auth.otp.submit') }}</AppButton>
    </form>
    <button @click="resend" :disabled="timer > 0" class="block text-center mt-6 text-sm text-primary-600 w-full">
      {{ timer > 0 ? $t('auth.otp.timer', { seconds: timer }) : $t('auth.otp.resend') }}
    </button>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth', middleware: 'guest' })
const { verifyOtp } = useAuth()
const otp = ref('')
const loading = ref(false)
const timer = ref(60)

onMounted(() => {
  const interval = setInterval(() => { if (timer.value > 0) timer.value-- }, 1000)
  onUnmounted(() => clearInterval(interval))
})

const handleVerify = async () => {
  loading.value = true
  await verifyOtp('', otp.value)
  loading.value = false
}
const resend = () => { timer.value = 60 }
</script>