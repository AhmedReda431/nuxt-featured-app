<script setup>
const props = defineProps({
  product: { type: Object, required: true },
})

const { t } = useI18n()
const localePath = useLocalePath()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
const toastStore = useToastStore()

const slug = computed(() => props.product.slug || buildProductSlug(props.product))
const inCart = computed(() => cartStore.isInCart(props.product.id))
const quantity = computed(() => cartStore.getQuantity(props.product.id))
const isFavorite = computed(() => favoritesStore.isFavorite(props.product.id))
const inStock = computed(() => (props.product.stock ?? 1) > 0)

const formattedPrice = computed(() => useFormatPrice(props.product.price))
const hasDiscount = computed(() => (props.product.discountPercentage ?? 0) > 0)
const originalPrice = computed(() => {
  if (!hasDiscount.value) return null
  return props.product.price / (1 - props.product.discountPercentage / 100)
})

function addToCart() {
  cartStore.addItem({ ...props.product, slug: slug.value })
  toastStore.show(t('shop.addedToCart'))
}

function toggleFavorite() {
  const wasFavorite = isFavorite.value
  favoritesStore.toggle({ ...props.product, slug: slug.value })
  toastStore.show(wasFavorite ? t('shop.removedFromFavorites') : t('shop.addedToFavorites'))
}
</script>

<template>
  <article class="product-card card">
    <div class="product-card__image-wrap">
      <span v-if="hasDiscount" class="product-card__discount-badge">-{{ Math.round(product.discountPercentage) }}%</span>

      <button
        type="button"
        class="product-card__favorite"
        :aria-label="isFavorite ? t('shop.removeFavorite') : t('shop.addFavorite')"
        :aria-pressed="isFavorite"
        @click.stop="toggleFavorite"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <NuxtLink :to="localePath(`/shop/${slug}`)" class="product-card__link">
        <UiLazyImage :src="product.thumbnail || product.images?.[0]" :alt="product.title" :width="400" :height="400" />
      </NuxtLink>
    </div>

    <div class="product-card__body">
      <span class="product-card__category">{{ product.category }}</span>
      <NuxtLink :to="localePath(`/shop/${slug}`)" class="product-card__title">
        <h3>{{ product.title }}</h3>
      </NuxtLink>

      <UiStarRating v-if="product.rating" :rating="product.rating" :show-value="false" class="product-card__rating" />

      <p class="product-card__price">
        {{ formattedPrice }}
        <span v-if="originalPrice" class="product-card__price-original">{{ useFormatPrice(originalPrice) }}</span>
      </p>

      <div class="product-card__actions">
        <template v-if="!inCart">
          <button
            type="button"
            class="btn btn--primary btn--sm product-card__add"
            :disabled="!inStock"
            @click="addToCart"
          >
            {{ inStock ? t('shop.addToCart') : t('shop.outOfStock') }}
          </button>
        </template>

        <template v-else>
          <div class="product-card__qty" role="group" :aria-label="t('shop.quantity')">
            <button type="button" class="product-card__qty-btn" :aria-label="t('cart.decreaseQty')" @click="cartStore.decrement(product.id)">
              −
            </button>
            <span class="product-card__qty-value" aria-live="polite">{{ quantity }}</span>
            <button type="button" class="product-card__qty-btn" :aria-label="t('cart.increaseQty')" @click="cartStore.increment(product.id)">
              +
            </button>
          </div>
          <button type="button" class="product-card__remove" :aria-label="t('shop.remove')" @click="cartStore.removeItem(product.id)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </template>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.product-card {
  &__image-wrap {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--color-bg-alt);
  }

  &__discount-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 2;
    background: var(--color-danger);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);

    [dir="rtl"] & {
      right: auto;
      left: 0.75rem;
    }
  }

  &__favorite {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 2;
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background: rgb(255 255 255 / 0.95);
    color: var(--color-danger);
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition);

    &:hover {
      transform: scale(1.1);
    }

    [dir="rtl"] & {
      left: auto;
      right: 0.75rem;
    }
  }

  &__link {
    display: block;
    height: 100%;
  }

  &__body {
    padding: 1rem 1.25rem 1.25rem;
  }

  &__category {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-primary);
  }

  &__title {
    text-decoration: none;
    color: inherit;

    h3 {
      margin: 0.25rem 0 0.375rem;
      font-size: 1rem;
      font-weight: 600;
    }

    &:hover h3 {
      color: var(--color-primary);
    }
  }

  &__rating {
    margin-bottom: 0.5rem;
  }

  &__price {
    font-size: 1.125rem;
    font-weight: 700;
    margin: 0 0 1rem;
    color: var(--color-secondary);
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  &__price-original {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-muted);
    text-decoration: line-through;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__add {
    flex: 1;
  }

  &__qty {
    display: flex;
    align-items: center;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
    flex: 1;

    &-btn {
      width: 2rem;
      height: 2rem;
      border: none;
      background: var(--color-bg-alt);
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;

      &:hover {
        background: var(--color-border);
      }
    }

    &-value {
      flex: 1;
      text-align: center;
      font-weight: 600;
      font-size: 0.9375rem;
    }
  }

  &__remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: var(--radius-md);
    background: #fef2f2;
    color: var(--color-danger);
    cursor: pointer;

    &:hover {
      background: #fee2e2;
    }
  }
}
</style>
