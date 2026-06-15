<template>
  <div class="section-padding">
    <div class="container-custom max-w-4xl">
      <h1 class="text-3xl font-bold mb-8">{{ $t('shop.cart.title') }}</h1>
      <div v-if="cartStore.items.length === 0" class="text-center py-12">
        <p class="text-gray-500 mb-4">{{ $t('shop.cart.empty') }}</p>
        <NuxtLink :to="localePath('/shop')" class="btn-primary">{{ $t('shop.cart.continueShopping') }}</NuxtLink>
      </div>
      <div v-else>
        <div v-for="item in cartStore.items" :key="item.product.id" class="flex gap-4 p-4 border-b">
          <img :src="item.product.images[0]" class="w-24 h-24 object-cover rounded-lg" />
          <div class="flex-1">
            <h3>{{ item.product.name }}</h3>
            <p class="text-primary-600 font-bold">${{ item.product.price }}</p>
            <div class="flex items-center gap-2 mt-2">
              <button @click="updateQty(item.product.id, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQty(item.product.id, item.quantity + 1)">+</button>
              <button @click="remove(item.product.id)" class="text-red-500 ml-4">
                <Icon name="heroicons:trash" />
              </button>
            </div>
          </div>
        </div>
        <div class="mt-8 flex justify-between items-center">
          <span class="text-xl font-bold">Total: ${{ cartStore.totalPrice.toFixed(2) }}</span>
          <NuxtLink :to="localePath('/checkout')" class="btn-primary">Checkout</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cartStore = useCartStore()
const updateQty = (id, qty) => cartStore.updateQuantity(id, qty)
const remove = (id) => cartStore.removeFromCart(id)
</script>