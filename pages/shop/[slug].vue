<script setup lang="ts">
import { getProductBySlug, products } from '~/data/products'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => route.params.slug as string)
const product = computed(() => getProductBySlug(slug.value))

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: t('shop.notFound') })
}

useAppSeo({
  title: product.value.name,
  description: product.value.description,
  image: product.value.image,
  type: 'product',
})

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const inCart = computed(() => cartStore.isInCart(product.value!.id))
const quantity = computed(() => cartStore.getQuantity(product.value!.id))
const isFavorite = computed(() => favoritesStore.isFavorite(product.value!.id))
const formattedPrice = computed(() => useFormatPrice(product.value!.price, product.value!.currency))

const relatedProducts = computed(() =>
  products.filter(p => p.category === product.value!.category && p.id !== product.value!.id).slice(0, 3),
)
</script>

<template>
  <section v-if="product" class="section">
    <div class="container">
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <NuxtLink :to="localePath('/shop')">{{ t('shop.title') }}</NuxtLink>
        <span aria-hidden="true"> / </span>
        <span>{{ product.name }}</span>
      </nav>

      <div class="product-detail">
        <div class="product-detail__gallery">
          <ShopProductSlider :images="product.images" :alt="product.name" />
        </div>

        <div class="product-detail__info">
          <span class="product-detail__category">{{ product.category }}</span>
          <h1 class="product-detail__title">{{ product.name }}</h1>
          <p class="product-detail__price">{{ formattedPrice }}</p>
          <p class="product-detail__rating" aria-label="Rating">
            ★ {{ product.rating }} / 5
          </p>
          <p class="product-detail__desc">{{ product.description }}</p>

          <div class="product-detail__actions">
            <button
              type="button"
              class="product-detail__fav"
              :aria-label="isFavorite ? t('shop.removeFavorite') : t('shop.addFavorite')"
              :aria-pressed="isFavorite"
              @click="favoritesStore.toggle(product.id)"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <template v-if="!inCart">
              <button
                type="button"
                class="btn btn--primary btn--lg"
                :disabled="!product.inStock"
                @click="cartStore.addItem(product.id)"
              >
                {{ product.inStock ? t('shop.addToCart') : t('shop.outOfStock') }}
              </button>
            </template>
            <template v-else>
              <div class="product-detail__qty" role="group" :aria-label="t('shop.quantity')">
                <button type="button" class="product-detail__qty-btn" :aria-label="t('cart.decreaseQty')" @click="cartStore.decrement(product.id)">−</button>
                <span aria-live="polite">{{ quantity }}</span>
                <button type="button" class="product-detail__qty-btn" :aria-label="t('cart.increaseQty')" @click="cartStore.increment(product.id)">+</button>
              </div>
              <button type="button" class="btn btn--danger" :aria-label="t('shop.remove')" @click="cartStore.removeItem(product.id)">
                {{ t('shop.remove') }}
              </button>
            </template>
          </div>
        </div>
      </div>

      <section v-if="relatedProducts.length" class="related" aria-labelledby="related-title">
        <h2 id="related-title" class="section__title">{{ t('shop.relatedProducts') }}</h2>
        <div class="grid grid--3">
          <ShopProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.breadcrumb {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.breadcrumb a {
  color: var(--color-primary);
  text-decoration: none;
}

.product-detail {
  display: grid;
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.product-detail__category {
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-primary);
}

.product-detail__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin: 0.375rem 0 0.75rem;
}

.product-detail__price {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.product-detail__rating {
  color: var(--color-accent);
  font-weight: 600;
  margin: 0 0 1rem;
}

.product-detail__desc {
  color: var(--color-text-muted);
  line-height: 1.8;
  margin: 0 0 1.5rem;
}

.product-detail__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.product-detail__fav {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  color: var(--color-danger);
  cursor: pointer;
}

.product-detail__qty {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1.125rem;
}

.product-detail__qty-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  background: var(--color-bg-alt);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 1.125rem;
}

.related {
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
