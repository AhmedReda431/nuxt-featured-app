<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const favoritesStore = useFavoritesStore()

useAppSeo({
  title: t('favorites.title'),
  description: t('favorites.title'),
  noindex: true,
})
</script>

<template>
  <section class="section">
    <div class="container">
      <UiSectionTitle :title="t('favorites.title')" />

      <div v-if="favoritesStore.favoriteProducts.length === 0" class="empty-state">
        <p>{{ t('favorites.empty') }}</p>
        <NuxtLink :to="localePath('/shop')" class="btn btn--primary">
          {{ t('favorites.emptyCta') }}
        </NuxtLink>
      </div>

      <div v-else class="grid grid--3">
        <ShopProductCard
          v-for="product in favoritesStore.favoriteProducts"
          :key="product!.id"
          :product="product!"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
}
</style>
