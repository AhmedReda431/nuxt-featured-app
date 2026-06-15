<template>
  <div class="section-padding">
    <div class="container-custom max-w-2xl">
      <h1 class="text-3xl font-bold mb-8">{{ $t('shop.checkout.title') }}</h1>
      <form @submit.prevent="submitOrder" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AppInput v-model="form.firstName" label="First Name" required />
          <AppInput v-model="form.lastName" label="Last Name" required />
        </div>
        <AppInput v-model="form.email" label="Email" type="email" required />
        <AppInput v-model="form.address" label="Address" required />
        <AppInput v-model="form.city" label="City" required />
        <AppInput v-model="form.phone" label="Phone" required />
        
        <div class="border-t pt-6">
          <h3 class="font-semibold mb-4">Order Summary</h3>
          <div v-for="item in cartStore.items" :key="item.product.id" class="flex justify-between py-2">
            <span>{{ item.product.name }} x {{ item.quantity }}</span>
            <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="border-t pt-4 font-bold text-xl flex justify-between">
            <span>Total</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
        </div>
        
        <AppButton type="submit" variant="primary" size="lg" class="w-full" :loading="loading">
          {{ $t('shop.checkout.placeOrder') }}
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })
const cartStore = useCartStore()
const form = reactive({ firstName: '', lastName: '', email: '', address: '', city: '', phone: '' })
const loading = ref(false)

const submitOrder = async () => {
  loading.value = true
  // API call to place order
  await new Promise(r => setTimeout(r, 1500))
  cartStore.clearCart()
  navigateTo('/shop?order=success')
  loading.value = false
}
</script>