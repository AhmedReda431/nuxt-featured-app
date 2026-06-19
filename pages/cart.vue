<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const cartStore = useCartStore()

useAppSeo({ title: t('cart.title') })

const shippingCost = computed(() => (cartStore.subtotal > 100 || cartStore.items.length === 0 ? 0 : 9.99))
const grandTotal = computed(() => cartStore.total + shippingCost.value)
</script>

<template>
  <section class="section cart-page">
    <div class="container">
      <UiSectionTitle :title="t('cart.title')" />

      <UiEmptyState v-if="cartStore.items.length === 0" icon="🛒" :title="t('cart.empty')">
        <NuxtLink :to="localePath('/shop')" class="btn btn--primary">
          {{ t('cart.emptyCta') }}
        </NuxtLink>
      </UiEmptyState>

      <div v-else class="cart-layout">
        <ul class="cart-list">
          <li v-for="item in cartStore.items" :key="item.key" class="cart-item">
            <NuxtLink :to="localePath(`/shop/${item.snapshot.slug}`)" class="cart-item__image">
              <UiLazyImage :src="item.snapshot.thumbnail" :alt="item.snapshot.title" :width="100" :height="100" />
            </NuxtLink>

            <div class="cart-item__info">
              <NuxtLink :to="localePath(`/shop/${item.snapshot.slug}`)" class="cart-item__title">
                {{ item.snapshot.title }}
              </NuxtLink>
              <span v-if="item.variant" class="cart-item__variant">{{ t('shop.selectColor') }}: {{ item.variant }}</span>
              <span class="cart-item__price">{{ useFormatPrice(item.snapshot.price) }}</span>
            </div>

            <div class="cart-item__qty" role="group" :aria-label="t('shop.quantity')">
              <button type="button" class="cart-item__qty-btn" :aria-label="t('cart.decreaseQty')" @click="cartStore.decrement(item.productId)">−</button>
              <span aria-live="polite">{{ item.quantity }}</span>
              <button type="button" class="cart-item__qty-btn" :aria-label="t('cart.increaseQty')" @click="cartStore.increment(item.productId)">+</button>
            </div>

            <span class="cart-item__line-total">{{ useFormatPrice(item.snapshot.price * item.quantity) }}</span>

            <button type="button" class="cart-item__remove" :aria-label="t('cart.removeItem')" @click="cartStore.removeItem(item.productId)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </li>
        </ul>

        <aside class="cart-summary card">
          <h2 class="cart-summary__title">{{ t('checkout.orderSummary') }}</h2>
          <dl class="cart-summary__row">
            <dt>{{ t('cart.subtotal') }}</dt>
            <dd>{{ useFormatPrice(cartStore.subtotal) }}</dd>
          </dl>
          <dl v-if="cartStore.discountAmount > 0" class="cart-summary__row cart-summary__row--discount">
            <dt>{{ t('cart.discount') }} ({{ cartStore.promoCode }})</dt>
            <dd>-{{ useFormatPrice(cartStore.discountAmount) }}</dd>
          </dl>
          <dl class="cart-summary__row">
            <dt>{{ t('cart.shipping') }}</dt>
            <dd>{{ shippingCost === 0 ? t('cart.freeShipping') : useFormatPrice(shippingCost) }}</dd>
          </dl>
          <dl class="cart-summary__row cart-summary__row--total">
            <dt>{{ t('cart.total') }}</dt>
            <dd>{{ useFormatPrice(grandTotal) }}</dd>
          </dl>

          <NuxtLink :to="localePath('/checkout')" class="btn btn--primary btn--block btn--lg">
            {{ t('cart.checkout') }}
          </NuxtLink>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cart-layout {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  align-items: start;
}

.cart-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.cart-item__image {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: var(--radius-md);
  overflow: hidden;
  flex-shrink: 0;
}

.cart-item__info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.cart-item__title {
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
}

.cart-item__title:hover {
  color: var(--color-primary);
}

.cart-item__variant {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.cart-item__price {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.cart-item__qty {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.25rem;
}

.cart-item__qty-btn {
  width: 1.75rem;
  height: 1.75rem;
  border: none;
  background: var(--color-bg-alt);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
}

.cart-item__line-total {
  font-weight: 700;
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
}

.cart-summary {
  padding: 1.5rem;
}

.cart-summary__title {
  margin: 0 0 1.25rem;
  font-size: 1.125rem;
}

.cart-summary__row {
  display: flex;
  justify-content: space-between;
  margin: 0 0 0.75rem;
  font-size: 0.9375rem;
  color: var(--color-text-muted);
}

.cart-summary__row dt,
.cart-summary__row dd {
  margin: 0;
}

.cart-summary__row--discount {
  color: var(--color-success);
}

.cart-summary__row--total {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.cart-summary .btn {
  margin-top: 1rem;
}

@media (max-width: 700px) {
  .cart-item {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
  }

  .cart-item__qty,
  .cart-item__line-total,
  .cart-item__remove {
    grid-column: 2;
  }
}

@media (min-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr 320px;
  }
}
</style>
