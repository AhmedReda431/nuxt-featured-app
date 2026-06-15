<script setup lang="ts">
import { products } from '~/data/products'

const { t } = useI18n()

useAppSeo({
  title: t('shop.title'),
  description: t('shop.subtitle'),
})
</script>

<template>
  <section class="section">
    <div class="container">
      <UiSectionTitle :title="t('shop.title')" :subtitle="t('shop.subtitle')" />
      <div class="grid grid--3">
        <ShopProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>
