<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const cartStore = useCartStore()

useAppSeo({
  title: t('cart.title'),
  description: t('cart.title'),
})

const shipping = computed(() => cartStore.subtotal > 0 ? 9.99 : 0)
const total = computed(() => cartStore.subtotal + shipping.value)
</script>

<template>
  <section class="section">
    <div class="container">
      <UiSectionTitle :title="t('cart.title')" />

      <div v-if="cartStore.cartProducts.length === 0" class="empty-state">
        <p>{{ t('cart.empty') }}</p>
        <NuxtLink :to="localePath('/shop')" class="btn btn--primary">
          {{ t('cart.emptyCta') }}
        </NuxtLink>
      </div>

      <div v-else class="cart-layout">
        <ul class="cart-list" role="list">
          <li v-for="item in cartStore.cartProducts" :key="item.productId" class="cart-item card">
            <NuxtLink :to="localePath(`/shop/${item.product!.slug}`)" class="cart-item__image">
              <UiLazyImage :src="item.product!.image" :alt="item.product!.name" :width="100" :height="100" />
            </NuxtLink>
            <div class="cart-item__info">
              <NuxtLink :to="localePath(`/shop/${item.product!.slug}`)" class="cart-item__name">
                {{ item.product!.name }}
              </NuxtLink>
              <p class="cart-item__price">{{ useFormatPrice(item.product!.price, item.product!.currency) }}</p>
            </div>
            <div class="cart-item__qty" role="group" :aria-label="t('shop.quantity')">
              <button type="button" :aria-label="t('cart.decreaseQty')" @click="cartStore.decrement(item.productId)">−</button>
              <span aria-live="polite">{{ item.quantity }}</span>
              <button type="button" :aria-label="t('cart.increaseQty')" @click="cartStore.increment(item.productId)">+</button>
            </div>
            <p class="cart-item__subtotal">
              {{ useFormatPrice(item.product!.price * item.quantity, item.product!.currency) }}
            </p>
            <button
              type="button"
              class="cart-item__remove"
              :aria-label="t('cart.removeItem')"
              @click="cartStore.removeItem(item.productId)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </li>
        </ul>

        <aside class="cart-summary card" aria-labelledby="summary-title">
          <h2 id="summary-title" class="cart-summary__title">{{ t('checkout.orderSummary') }}</h2>
          <dl class="cart-summary__rows">
            <div class="cart-summary__row">
              <dt>{{ t('cart.subtotal') }}</dt>
              <dd>{{ useFormatPrice(cartStore.subtotal) }}</dd>
            </div>
            <div class="cart-summary__row">
              <dt>{{ t('cart.shipping') }}</dt>
              <dd>{{ useFormatPrice(shipping) }}</dd>
            </div>
            <div class="cart-summary__row cart-summary__row--total">
              <dt>{{ t('cart.total') }}</dt>
              <dd>{{ useFormatPrice(total) }}</dd>
            </div>
          </dl>
          <NuxtLink :to="localePath('/checkout')" class="btn btn--primary" style="width:100%">
            {{ t('cart.checkout') }}
          </NuxtLink>
        </aside>
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

.cart-layout {
  display: grid;
  gap: 2rem;
}

.cart-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
}

.cart-item__image {
  width: 5rem;
  height: 5rem;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.cart-item__name {
  font-weight: 600;
  color: inherit;
  text-decoration: none;
}

.cart-item__name:hover {
  color: var(--color-primary);
}

.cart-item__price {
  margin: 0.25rem 0 0;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.cart-item__qty {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.25rem;
}

.cart-item__qty button {
  width: 1.75rem;
  height: 1.75rem;
  border: none;
  background: var(--color-bg-alt);
  cursor: pointer;
  border-radius: var(--radius-sm);
}

.cart-item__subtotal {
  font-weight: 700;
  margin: 0;
  white-space: nowrap;
}

.cart-item__remove {
  border: none;
  background: #fef2f2;
  color: var(--color-danger);
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-summary {
  padding: 1.5rem;
  height: fit-content;
}

.cart-summary__title {
  margin: 0 0 1rem;
  font-size: 1.125rem;
}

.cart-summary__rows {
  margin: 0 0 1.25rem;
}

.cart-summary__row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.cart-summary__row dt,
.cart-summary__row dd {
  margin: 0;
}

.cart-summary__row--total {
  font-weight: 700;
  font-size: 1.125rem;
  border-bottom: none;
  padding-top: 0.75rem;
}

@media (min-width: 768px) {
  .cart-layout {
    grid-template-columns: 1fr 320px;
  }
}

@media (max-width: 640px) {
  .cart-item {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
  }

  .cart-item__qty,
  .cart-item__subtotal,
  .cart-item__remove {
    grid-column: 2;
  }
}
</style>
