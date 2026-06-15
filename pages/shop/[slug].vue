<template>
  <div class="section-padding">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Image Slider -->
        <div>
          <Swiper :modules="[SwiperThumbs]" :thumbs="{ swiper: thumbsSwiper }">
            <SwiperSlide v-for="img in product.images" :key="img">
              <img :src="img" :alt="product.name" class="rounded-2xl" />
            </SwiperSlide>
          </Swiper>
        </div>

        <!-- Product Info -->
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-2xl font-bold text-primary-600">${{ product.price }}</span>
            <span v-if="product.originalPrice" class="text-lg text-gray-400 line-through">${{ product.originalPrice }}</span>
          </div>
          <p class="text-gray-600 mb-6">{{ product.description }}</p>

          <!-- Actions -->
          <div class="flex items-center gap-4 mb-6">
            <div class="flex items-center border rounded-lg">
              <button @click="qty > 1 && qty--" class="px-4 py-2">-</button>
              <span class="px-4 py-2">{{ qty }}</span>
              <button @click="qty++" class="px-4 py-2">+</button>
            </div>
            <button @click="addToCart" class="btn-primary flex-1">
              {{ isInCart ? 'Update Cart' : 'Add to Cart' }}
            </button>
            <button @click="toggleFavorite" class="p-3 border rounded-lg" :class="isFavorite ? 'text-red-500' : 'text-gray-400'">
              <Icon :name="isFavorite ? 'heroicons:heart-solid' : 'heroicons:heart'" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
// Fetch product by slug, implement cart/favorite logic
</script>