<script setup>
const route = useRoute()
const { t } = useI18n()
const { fetchProductBySlug, fetchRelatedProducts } = useProductsApi()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
const toastStore = useToastStore()

const { data: product, error } = await useAsyncData(
  `product-${route.params.slug}`,
  () => fetchProductBySlug(route.params.slug),
)

if (error.value || !product.value) {
  throw createError({ statusCode: 404, statusMessage: t('shop.notFound') })
}

const slug = computed(() => route.params.slug)

// DummyJSON has no color variants, so we derive a believable, deterministic
// set from the product id - same product always shows the same options.
const colorPalette = ['Black', 'White', 'Blue', 'Red', 'Gray']
const variants = computed(() => {
  const count = (product.value.id % 3) + 2
  return colorPalette.slice(0, count)
})
const selectedVariant = ref(null)
watchEffect(() => {
  if (variants.value.length && !selectedVariant.value) {
    selectedVariant.value = variants.value[0]
  }
})

const selectQuantity = ref(1) // quantity chosen before adding to cart
const inStock = computed(() => (product.value.stock ?? 1) > 0)
const inCart = computed(() => cartStore.isInCart(product.value.id))
const cartQuantity = computed(() => cartStore.getQuantity(product.value.id))
const isFavorite = computed(() => favoritesStore.isFavorite(product.value.id))

const formattedPrice = computed(() => useFormatPrice(product.value.price))
const hasDiscount = computed(() => (product.value.discountPercentage ?? 0) > 0)
const originalPrice = computed(() => {
  if (!hasDiscount.value) return null
  return product.value.price / (1 - product.value.discountPercentage / 100)
})

const { data: relatedProducts } = await useAsyncData(
  `related-${route.params.slug}`,
  () => fetchRelatedProducts(product.value.category, product.value.id),
)

useAppSeo({
  title: product.value.title,
  description: product.value.description,
  image: product.value.thumbnail || product.value.images?.[0],
  type: 'product',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.value.title,
    image: product.value.images,
    description: product.value.description,
    sku: String(product.value.sku || product.value.id),
    brand: { '@type': 'Brand', name: product.value.brand || 'Generic' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.value.price,
      availability: inStock.value ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    aggregateRating: product.value.rating
      ? { '@type': 'AggregateRating', ratingValue: product.value.rating, reviewCount: product.value.reviews?.length || 10 }
      : undefined,
  },
})

function addToCart() {
  cartStore.addItem({ ...product.value, slug: slug.value }, selectedVariant.value, selectQuantity.value)
  toastStore.show(t('shop.addedToCart'))
}

function removeFromCart() {
  cartStore.removeItem(product.value.id)
}

function toggleFavorite() {
  const wasFavorite = isFavorite.value
  favoritesStore.toggle({ ...product.value, slug: slug.value })
  toastStore.show(wasFavorite ? t('shop.removedFromFavorites') : t('shop.addedToFavorites'))
}

function incrementSelect() {
  selectQuantity.value++
}

function decrementSelect() {
  if (selectQuantity.value > 1) selectQuantity.value--
}

function incrementCart() {
  cartStore.increment(product.value.id)
}

function decrementCart() {
  cartStore.decrement(product.value.id)
}
</script>

<template>
  <section class="section product-page">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <NuxtLink :to="useLocalePath()('/shop')">{{ t('shop.title') }}</NuxtLink>
        <span aria-hidden="true">/</span>
        <span>{{ product.title }}</span>
      </nav>

      <div class="product-detail">
        <ShopProductSlider :images="product.images || [product.thumbnail]" :alt="product.title" />

        <div class="product-detail__info">
          <span class="product-detail__category">{{ product.category }}</span>
          <h1 class="product-detail__title">{{ product.title }}</h1>

          <div class="product-detail__rating-row">
            <UiStarRating v-if="product.rating" :rating="product.rating" />
            <span v-if="product.brand" class="product-detail__brand">{{ t('shop.brand') }}: {{ product.brand }}</span>
          </div>

          <p class="product-detail__price">
            {{ formattedPrice }}
            <span v-if="originalPrice" class="product-detail__price-original">{{ useFormatPrice(originalPrice) }}</span>
            <span v-if="hasDiscount" class="badge">-{{ Math.round(product.discountPercentage) }}%</span>
          </p>

          <p class="product-detail__description">{{ product.description }}</p>

          <div v-if="variants.length" class="product-detail__section">
            <span class="form-label">{{ t('shop.selectColor') }}: <strong>{{ selectedVariant }}</strong></span>
            <ShopVariantSelector v-model="selectedVariant" :variants="variants" />
          </div>

          <div class="product-detail__section product-detail__purchase">
            <template v-if="!inCart">
              <div class="product-detail__qty" role="group" :aria-label="t('shop.quantity')">
                <button type="button" class="product-detail__qty-btn" aria-label="Decrease quantity" @click="decrementSelect">−</button>
                <span class="product-detail__qty-value" aria-live="polite">{{ selectQuantity }}</span>
                <button type="button" class="product-detail__qty-btn" aria-label="Increase quantity" @click="incrementSelect">+</button>
              </div>

              <button type="button" class="btn btn--primary btn--lg product-detail__add" :disabled="!inStock" @click="addToCart">
                {{ inStock ? t('shop.addToCart') : t('shop.outOfStock') }}
              </button>
            </template>

            <template v-else>
              <div class="product-detail__qty" role="group" :aria-label="t('shop.quantity')">
                <button type="button" class="product-detail__qty-btn" :aria-label="t('cart.decreaseQty')" @click="decrementCart">−</button>
                <span class="product-detail__qty-value" aria-live="polite">{{ cartQuantity }}</span>
                <button type="button" class="product-detail__qty-btn" :aria-label="t('cart.increaseQty')" @click="incrementCart">+</button>
              </div>

              <button type="button" class="btn btn--danger btn--lg product-detail__add" @click="removeFromCart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                {{ t('shop.remove') }}
              </button>
            </template>

            <button
              type="button"
              class="product-detail__favorite"
              :class="{ 'product-detail__favorite--active': isFavorite }"
              :aria-label="isFavorite ? t('shop.removeFavorite') : t('shop.addFavorite')"
              :aria-pressed="isFavorite"
              @click="toggleFavorite"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <p v-if="inCart" class="product-detail__in-cart-note">{{ t('shop.inCart') }} ✓</p>

          <dl class="product-detail__meta">
            <div v-if="product.sku">
              <dt>{{ t('shop.sku') }}</dt>
              <dd>{{ product.sku }}</dd>
            </div>
            <div v-if="product.stock !== undefined">
              <dt>{{ t('shop.stock') }}</dt>
              <dd>{{ product.stock }}</dd>
            </div>
            <div v-if="product.warrantyInformation">
              <dt>{{ t('shop.warranty') }}</dt>
              <dd>{{ product.warrantyInformation }}</dd>
            </div>
            <div v-if="product.shippingInformation">
              <dt>{{ t('shop.shippingInfo') }}</dt>
              <dd>{{ product.shippingInformation }}</dd>
            </div>
            <div v-if="product.returnPolicy">
              <dt>{{ t('shop.returnPolicy') }}</dt>
              <dd>{{ product.returnPolicy }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div v-if="product.reviews?.length" class="product-reviews">
        <h2 class="section__title">{{ t('shop.reviews') }}</h2>
        <div class="product-reviews__list">
          <article v-for="(review, index) in product.reviews" :key="index" class="review-card card">
            <div class="review-card__header">
              <strong>{{ review.reviewerName }}</strong>
              <UiStarRating :rating="review.rating" :show-value="false" />
            </div>
            <p>{{ review.comment }}</p>
            <time class="review-card__date">{{ useFormatDate(review.date) }}</time>
          </article>
        </div>
      </div>

      <div v-if="relatedProducts?.length" class="related-products">
        <h2 class="section__title">{{ t('shop.relatedProducts') }}</h2>
        <div class="grid grid--4">
          <ShopProductCard v-for="related in relatedProducts" :key="related.id" :product="related" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.breadcrumb {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
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
  letter-spacing: 0.05em;
}

.product-detail__title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  margin: 0.375rem 0 0.75rem;
}

.product-detail__rating-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.product-detail__brand {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.product-detail__price {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 0 1.25rem;
}

.product-detail__price-original {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.product-detail__description {
  color: var(--color-text-muted);
  line-height: 1.8;
  margin: 0 0 1.5rem;
}

.product-detail__section {
  margin-bottom: 1.5rem;
}

.product-detail__purchase {
  display: flex;
  align-items: stretch;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.product-detail__qty {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.product-detail__qty-btn {
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  background: var(--color-bg-alt);
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
}

.product-detail__qty-value {
  width: 2.5rem;
  text-align: center;
  font-weight: 600;
}

.product-detail__add {
  flex: 1;
  min-width: 160px;
}

.product-detail__favorite {
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-danger);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-detail__favorite--active {
  background: #fef2f2;
  border-color: var(--color-danger);
}

.product-detail__in-cart-note {
  color: var(--color-success);
  font-weight: 600;
  font-size: 0.9375rem;
}

.product-detail__meta {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
}

.product-detail__meta dt {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.product-detail__meta dd {
  margin: 0.125rem 0 0;
  font-weight: 600;
}

.product-reviews,
.related-products {
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--color-border);
}

.product-reviews__list {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.review-card {
  padding: 1.25rem;
}

.review-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.review-card p {
  margin: 0 0 0.5rem;
  color: var(--color-text-muted);
}

.review-card__date {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

@media (min-width: 900px) {
  .product-detail {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
