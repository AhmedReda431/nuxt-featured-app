<template>
  <div>
    <section class="py-12 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
      <div class="container-custom">
        <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ t('realEstate.title') }}</h1>
        <p>{{ t('realEstate.subtitle') }}</p>
      </div>
    </section>
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BuildingCard v-for="building in buildings" :key="building.id" :building="building" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()
useSeo({ title: t('realEstate.title'), description: t('realEstate.subtitle') })

const buildings = [
  { id: 1, slug: 'beachfront-villa', title: 'Beachfront Villa', price: 1299000, images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'], bedrooms: 4, bathrooms: 3, area: 4500, description: 'Luxury seaside villa with ocean views.' },
  { id: 2, slug: 'urban-loft', title: 'Urban Loft', price: 689000, images: ['https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'], bedrooms: 2, bathrooms: 2, area: 1800, description: 'Modern loft in the heart of the city.' },
  { id: 3, slug: 'country-estate', title: 'Country Estate', price: 945000, images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80'], bedrooms: 5, bathrooms: 4, area: 5200, description: 'Spacious estate with gardens and pool.' },
]
</script>
