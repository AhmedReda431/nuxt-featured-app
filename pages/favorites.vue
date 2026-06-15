<template>
  <div class="section-padding">
    <div class="container-custom">
      <h1 class="text-3xl font-bold mb-8">Favorites</h1>
      
      <div v-if="favoritesStore.totalFavorites === 0" class="text-center py-12">
        <p class="text-gray-500">No favorites yet</p>
      </div>
      
      <div v-if="favoritesStore.products.length" class="mb-12">
        <h2 class="text-xl font-semibold mb-4">Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="product in favoritesStore.products" :key="product.id" :product="product" />
        </div>
      </div>
      
      <div v-if="favoritesStore.buildings.length">
        <h2 class="text-xl font-semibold mb-4">Properties</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BuildingCard v-for="building in favoritesStore.buildings" :key="building.id" :building="building" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const favoritesStore = useFavoritesStore()
</script>