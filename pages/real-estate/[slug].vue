<template>
  <div class="section-padding">
    <div class="container-custom">
      <div class="grid gap-10 lg:grid-cols-2">
        <div>
          <img :src="building?.images[0]" alt="" class="w-full rounded-3xl object-cover" />
        </div>
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ building?.title }}</h1>
          <p class="text-2xl text-primary-600 font-bold mb-4">${{ building?.price.toLocaleString() }}</p>
          <p class="text-slate-600 mb-6">{{ building?.description }}</p>
          <div class="grid grid-cols-3 gap-4 mb-6 text-center text-slate-700">
            <div class="rounded-3xl border border-slate-200 p-6">{{ building?.bedrooms }} Beds</div>
            <div class="rounded-3xl border border-slate-200 p-6">{{ building?.bathrooms }} Baths</div>
            <div class="rounded-3xl border border-slate-200 p-6">{{ building?.area }} sqft</div>
          </div>
          <AppButton @click="toggleFavorite">Toggle Favorite</AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const favoritesStore = useFavoritesStore()
const properties = [
  { id: 1, slug: 'beachfront-villa', title: 'Beachfront Villa', price: 1299000, images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'], bedrooms: 4, bathrooms: 3, area: 4500, description: 'Luxury seaside villa with ocean views.' },
  { id: 2, slug: 'urban-loft', title: 'Urban Loft', price: 689000, images: ['https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'], bedrooms: 2, bathrooms: 2, area: 1800, description: 'Modern loft in the heart of the city.' },
  { id: 3, slug: 'country-estate', title: 'Country Estate', price: 945000, images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80'], bedrooms: 5, bathrooms: 4, area: 5200, description: 'Spacious estate with gardens and pool.' },
]
const building = computed(() => properties.find((item) => item.slug === route.params.slug))
if (!building.value) {
  navigateTo('/real-estate')
}
const toggleFavorite = () => {
  if (!building.value) return
  favoritesStore.toggleBuilding(building.value)
}
</script>
