<template>
  <div class="section-padding">
    <div class="container-custom max-w-6xl">
      <div class="grid gap-10 lg:grid-cols-2">
        <div class="space-y-4">
          <img :src="product?.images[0]" :alt="product?.name" class="w-full rounded-3xl object-cover" />
        </div>
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ product?.name }}</h1>
          <p class="text-xl font-semibold text-primary-600 mb-4">${{ product?.price }}</p>
          <p class="text-slate-600 mb-6">{{ product?.description }}</p>
          <div class="flex items-center gap-3 mb-6">
            <button @click="qty = Math.max(1, qty - 1)" class="btn-outline">-</button>
            <span class="text-lg font-semibold">{{ qty }}</span>
            <button @click="qty++" class="btn-outline">+</button>
          </div>
          <div class="flex flex-wrap gap-3">
            <AppButton @click="addToCart" class="w-full sm:w-auto">Add to cart</AppButton>
            <AppButton variant="outline" @click="toggleFavorite" class="w-full sm:w-auto">Toggle favorite</AppButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
const products = [
  { id: 1, slug: 'modern-headphones', name: 'Modern Headphones', price: 199, images: ['https://images.unsplash.com/photo-1518447178272-5e58cf9e9df2?auto=format&fit=crop&w=900&q=80'], description: 'Premium sound with sleek design.', category: 'Audio' },
  { id: 2, slug: 'wireless-speaker', name: 'Wireless Speaker', price: 149, images: ['https://images.unsplash.com/photo-1518552789145-145d7d91d81e?auto=format&fit=crop&w=900&q=80'], description: 'Portable speaker with powerful bass.', category: 'Audio' },
  { id: 3, slug: 'smart-watch', name: 'Smart Watch', price: 249, images: ['https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80'], description: 'Track fitness, calls, and notifications.', category: 'Wearables' },
]
const product = computed(() => products.find((item) => item.slug === route.params.slug))
const qty = ref(1)
if (!product.value) {
  navigateTo('/shop')
}
const addToCart = () => {
  if (!product.value) return
  cartStore.addToCart(product.value, qty.value)
}
const toggleFavorite = () => {
  if (!product.value) return
  favoritesStore.toggleProduct(product.value)
}
</script>
