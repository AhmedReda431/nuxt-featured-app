<script setup>
const { t } = useI18n();
const localePath = useLocalePath();
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();
const toastStore = useToastStore();

useAppSeo({ title: t("favorites.title") });

function addToCart(item) {
  cartStore.addItem({ id: item.productId, ...item.snapshot });
  toastStore.show(t("shop.addedToCart"));
}
console.log("cartStore", cartStore.items);

const productQuantityInCart = (itemId) => {
  return cartStore.items.find(item => item.productId === itemId)?.quantity || null
};
</script>

<template>
  <section class="section">
    <div class="container">
      <UiSectionTitle :title="t('favorites.title')" />

      <UiEmptyState
        v-if="favoritesStore.items.length === 0"
        icon="💔"
        :title="t('favorites.empty')"
      >
        <NuxtLink :to="localePath('/shop')" class="btn btn--primary">
          {{ t("favorites.emptyCta") }}
        </NuxtLink>
      </UiEmptyState>

      <div v-else class="grid grid--3">
        <article
          v-for="item in favoritesStore.items"
          :key="item.productId"
          class="card favorite-card"
        >
          <NuxtLink
            :to="localePath(`/shop/${item.snapshot.slug}`)"
            class="favorite-card__image"
          >
            <UiLazyImage
              :src="item.snapshot.thumbnail"
              :alt="item.snapshot.title"
              :width="300"
              :height="300"
            />
          </NuxtLink>
          <div class="favorite-card__body">
            <NuxtLink
              :to="localePath(`/shop/${item.snapshot.slug}`)"
              class="favorite-card__title"
            >
              {{ item.snapshot.title }}
            </NuxtLink>
            <p class="favorite-card__price">
              {{ useFormatPrice(item.snapshot.price) }}
            </p>
            <div class="favorite-card__actions">
              <button
                type="button"
                class="btn btn--primary btn--sm"
                @click="addToCart(item)"
              >
                {{ t("shop.addToCart") }}
              </button>
              <button
                type="button"
                class="btn btn--ghost btn--sm"
                @click="favoritesStore.remove(item.productId)"
              >
                {{ t("shop.remove") }}
              </button>
            </div>
            <!-- <span v-if="productQuantityInCart?.(item?.productId)" class="mt-2"
              >({{ productQuantityInCart(item?.productId) }})
              {{ t("shop.inCart") }}</span
            > -->
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.favorite-card__image {
  display: block;
  aspect-ratio: 1;
  overflow: hidden;
}

.favorite-card__body {
  padding: 1rem 1.25rem 1.25rem;
}

.favorite-card__title {
  display: block;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  margin-bottom: 0.375rem;
}

.favorite-card__title:hover {
  color: var(--color-primary);
}

.favorite-card__price {
  font-weight: 700;
  margin: 0 0 1rem;
}

.favorite-card__actions {
  display: flex;
  gap: 0.5rem;
}
.card.favorite-card {
  max-inline-size: 270px;
}
</style>
