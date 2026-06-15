<template>
  <div>
    <section class="py-12 bg-gray-50">
      <div class="container-custom">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{{ $t('shop.title') }}</h1>
        <p class="text-gray-600">{{ $t('shop.subtitle') }}</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container-custom">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Filters Sidebar -->
          <aside class="lg:w-64 flex-shrink-0">
            <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 class="font-semibold mb-4">{{ $t('shop.filters.title') }}</h3>
              <!-- Category, Price, Rating filters -->
            </div>
          </aside>

          <!-- Products Grid -->
          <div class="flex-1">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard v-for="product in products" :key="product.id" :product="product" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()
useSeo({ title: t('shop.title'), description: t('shop.subtitle'), type: 'website' })
</script>