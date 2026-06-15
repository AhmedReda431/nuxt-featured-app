<template>
  <div>
    <section class="py-12 bg-gray-50">
      <div class="container-custom">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{{ t('shop.title') }}</h1>
        <p class="text-gray-600">{{ t('shop.subtitle') }}</p>
      </div>
    </section>
    <section class="section-padding">
      <div class="container-custom">
        <div class="flex flex-col lg:flex-row gap-8">
          <aside class="lg:w-64 flex-shrink-0">
            <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 class="font-semibold mb-4">{{ t('shop.filters.title') }}</h3>
              <ProductFilters />
            </div>
          </aside>
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

const products = [
  {
    id: 1,
    slug: 'modern-headphones',
    name: 'Modern Headphones',
    price: 199,
    originalPrice: 249,
    images: ['https://images.unsplash.com/photo-1518447178272-5e58cf9e9df2?auto=format&fit=crop&w=900&q=80'],
    description: 'Premium sound with sleek design.',
    category: 'Audio',
  },
  {
    id: 2,
    slug: 'wireless-speaker',
    name: 'Wireless Speaker',
    price: 149,
    images: ['https://images.unsplash.com/photo-1518552789145-145d7d91d81e?auto=format&fit=crop&w=900&q=80'],
    description: 'Portable speaker with powerful bass.',
    category: 'Audio',
  },
  {
    id: 3,
    slug: 'smart-watch',
    name: 'Smart Watch',
    price: 249,
    images: ['https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80'],
    description: 'Track fitness, calls, and notifications.',
    category: 'Wearables',
  },
]
</script>
