<template>
  <div class="fixed bottom-6 left-6 w-80 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-semibold">Cart</h2>
      <button @click="clearCart" class="text-sm text-primary-600">Clear</button>
    </div>
    <div v-if="cartStore.items.length === 0" class="text-sm text-slate-500">No items in cart.</div>
    <div v-else class="space-y-3">
      <div v-for="item in cartStore.items" :key="item.product.id" class="rounded-2xl border border-slate-100 p-3">
        <div class="text-sm font-semibold">{{ item.product.name }}</div>
        <div class="text-slate-500">Qty: {{ item.quantity }}</div>
      </div>
      <div class="pt-3 border-t border-slate-200 text-sm font-semibold flex justify-between">
        <span>Total</span>
        <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const cartStore = useCartStore()
const clearCart = () => cartStore.clearCart()
</script>
