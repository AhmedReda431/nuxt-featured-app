<script setup lang="ts">
import type { Product } from '~/types'

const props = defineProps<{ product: Product }>()

const { t } = useI18n()
const localePath = useLocalePath()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const inCart = computed(() => cartStore.isInCart(props.product.id))
const quantity = computed(() => cartStore.getQuantity(props.product.id))
const isFavorite = computed(() => favoritesStore.isFavorite(props.product.id))

const formattedPrice = computed(() => useFormatPrice(props.product.price, props.product.currency))

function toggleFavorite() {
  favoritesStore.toggle(props.product.id)
}
</script>

<template>
  <article class="product-card card">
    <div class="product-card__image-wrap">
      <button
        type="button"
        class="product-card__favorite"
        :aria-label="isFavorite ? t('shop.removeFavorite') : t('shop.addFavorite')"
        :aria-pressed="isFavorite"
        @click.stop="toggleFavorite"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          :fill="isFavorite ? 'currentColor' : 'none'"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <NuxtLink :to="localePath(`/shop/${product.slug}`)" class="product-card__link">
        <UiLazyImage
          :src="product.image"
          :alt="product.name"
          :width="400"
          :height="400"
        />
      </NuxtLink>
    </div>

    <div class="product-card__body">
      <span class="product-card__category">{{ product.category }}</span>
      <NuxtLink :to="localePath(`/shop/${product.slug}`)" class="product-card__title">
        <h3>{{ product.name }}</h3>
      </NuxtLink>
      <p class="product-card__price">{{ formattedPrice }}</p>

      <div class="product-card__actions">
        <template v-if="!inCart">
          <button
            type="button"
            class="btn btn--primary btn--sm product-card__add"
            :disabled="!product.inStock"
            @click="cartStore.addItem(product.id)"
          >
            {{ product.inStock ? t('shop.addToCart') : t('shop.outOfStock') }}
          </button>
        </template>

        <template v-else>
          <div class="product-card__qty" role="group" :aria-label="t('shop.quantity')">
            <button
              type="button"
              class="product-card__qty-btn"
              :aria-label="t('cart.decreaseQty')"
              @click="cartStore.decrement(product.id)"
            >
              −
            </button>
            <span class="product-card__qty-value" aria-live="polite">{{ quantity }}</span>
            <button
              type="button"
              class="product-card__qty-btn"
              :aria-label="t('cart.increaseQty')"
              @click="cartStore.increment(product.id)"
            >
              +
            </button>
          </div>
          <button
            type="button"
            class="product-card__remove"
            :aria-label="t('shop.remove')"
            @click="cartStore.removeItem(product.id)"
          >
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

<style scoped>
.product-card__image-wrap {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.product-card__favorite {
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
}

.product-card__favorite:hover {
  transform: scale(1.1);
}

.product-card__link {
  display: block;
  height: 100%;
}

.product-card__body {
  padding: 1rem 1.25rem 1.25rem;
}

.product-card__category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary);
}

.product-card__title {
  text-decoration: none;
  color: inherit;
}

.product-card__title h3 {
  margin: 0.25rem 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.product-card__title:hover h3 {
  color: var(--color-primary);
}

.product-card__price {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 1rem;
  color: var(--color-secondary);
}

.product-card__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.product-card__add {
  flex: 1;
}

.product-card__qty {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  flex: 1;
}

.product-card__qty-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  background: var(--color-bg-alt);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
}

.product-card__qty-btn:hover {
  background: var(--color-border);
}

.product-card__qty-value {
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 0.9375rem;
}

.product-card__remove {
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
}

.product-card__remove:hover {
  background: #fee2e2;
}
</style>
