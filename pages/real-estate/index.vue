<template>
  <div>
    <section class="py-12 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
      <div class="container-custom">
        <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ $t('realEstate.title') }}</h1>
        <p>{{ $t('realEstate.subtitle') }}</p>
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