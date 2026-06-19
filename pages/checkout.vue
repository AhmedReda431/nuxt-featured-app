<script setup>
definePageMeta({ middleware: 'auth' })

const { t } = useI18n()
const localePath = useLocalePath()
const cartStore = useCartStore()
const authStore = useAuthStore()

useAppSeo({ title: t('checkout.title') })

const form = reactive({
  fullName: authStore.fullName || '',
  email: authStore.user?.email || '',
  address: '',
  city: '',
  zipCode: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
})

const errors = reactive({})
const promoInput = ref('')
const promoMessage = ref('')
const promoMessageType = ref('success')
const isPlacingOrder = ref(false)
const orderPlaced = ref(false)
const orderNumber = ref('')

const shippingCost = computed(() => (cartStore.subtotal > 100 ? 0 : 9.99))
const grandTotal = computed(() => cartStore.total + shippingCost.value)

function applyPromo() {
  if (!promoInput.value.trim()) return
  const result = cartStore.applyPromoCode(promoInput.value)
  if (result.success) {
    promoMessage.value = t('checkout.promoApplied')
    promoMessageType.value = 'success'
  }
  else {
    promoMessage.value = t('checkout.promoInvalid')
    promoMessageType.value = 'error'
  }
}

function validate() {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!form.fullName.trim()) errors.fullName = t('auth.fieldRequired')
  if (!form.email.trim()) errors.email = t('auth.fieldRequired')
  if (!form.address.trim()) errors.address = t('auth.fieldRequired')
  if (!form.city.trim()) errors.city = t('auth.fieldRequired')
  if (!form.zipCode.trim()) errors.zipCode = t('auth.fieldRequired')
  if (!/^\d{13,19}$/.test(form.cardNumber.replace(/\s/g, ''))) errors.cardNumber = t('auth.fieldRequired')
  if (!/^\d{2}\/\d{2}$/.test(form.expiry)) errors.expiry = t('auth.fieldRequired')
  if (!/^\d{3,4}$/.test(form.cvv)) errors.cvv = t('auth.fieldRequired')

  return Object.keys(errors).length === 0
}

async function placeOrder() {
  if (!validate()) return

  isPlacingOrder.value = true

  // Simulated order placement (no real order-processing API available for
  // free), but it behaves like a real submit: validates, "calls" a service,
  // then clears the cart on success - exactly the flow a real backend would
  // trigger.
  await new Promise(resolve => setTimeout(resolve, 1200))

  orderNumber.value = `ORD-${Date.now().toString().slice(-8)}`
  orderPlaced.value = true
  cartStore.clear()
  isPlacingOrder.value = false
}
</script>

<template>
  <section class="section checkout-page">
    <div class="container">
      <UiSectionTitle :title="t('checkout.title')" />

      <div v-if="orderPlaced" class="order-success card">
        <span class="order-success__icon" aria-hidden="true">✅</span>
        <h2>{{ t('checkout.success') }}</h2>
        <p>{{ t('checkout.successMessage') }}</p>
        <p class="order-success__number">{{ t('checkout.orderNumber') }}: <strong>{{ orderNumber }}</strong></p>
        <NuxtLink :to="localePath('/shop')" class="btn btn--primary">
          {{ t('checkout.continueShopping') }}
        </NuxtLink>
      </div>

      <UiEmptyState v-else-if="cartStore.items.length === 0" icon="🛒" :title="t('checkout.emptyCart')">
        <NuxtLink :to="localePath('/shop')" class="btn btn--primary">{{ t('cart.emptyCta') }}</NuxtLink>
      </UiEmptyState>

      <form v-else class="checkout-layout" @submit.prevent="placeOrder">
        <div class="checkout-forms">
          <fieldset class="checkout-section card">
            <legend>{{ t('checkout.shippingInfo') }}</legend>

            <div class="form-group">
              <label class="form-label" for="fullName">{{ t('checkout.fullName') }}</label>
              <input id="fullName" v-model="form.fullName" type="text" class="form-input" :aria-invalid="!!errors.fullName">
              <p v-if="errors.fullName" class="form-error">{{ errors.fullName }}</p>
            </div>

            <div class="form-group">
              <label class="form-label" for="email">{{ t('checkout.email') }}</label>
              <input id="email" v-model="form.email" type="email" class="form-input" :aria-invalid="!!errors.email">
              <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
            </div>

            <div class="form-group">
              <label class="form-label" for="address">{{ t('checkout.address') }}</label>
              <input id="address" v-model="form.address" type="text" class="form-input" :aria-invalid="!!errors.address">
              <p v-if="errors.address" class="form-error">{{ errors.address }}</p>
            </div>

            <div class="checkout-section__row">
              <div class="form-group">
                <label class="form-label" for="city">{{ t('checkout.city') }}</label>
                <input id="city" v-model="form.city" type="text" class="form-input" :aria-invalid="!!errors.city">
                <p v-if="errors.city" class="form-error">{{ errors.city }}</p>
              </div>
              <div class="form-group">
                <label class="form-label" for="zipCode">{{ t('checkout.zipCode') }}</label>
                <input id="zipCode" v-model="form.zipCode" type="text" class="form-input" :aria-invalid="!!errors.zipCode">
                <p v-if="errors.zipCode" class="form-error">{{ errors.zipCode }}</p>
              </div>
            </div>
          </fieldset>

          <fieldset class="checkout-section card">
            <legend>{{ t('checkout.paymentInfo') }}</legend>

            <div class="form-group">
              <label class="form-label" for="cardNumber">{{ t('checkout.cardNumber') }}</label>
              <input id="cardNumber" v-model="form.cardNumber" type="text" inputmode="numeric" placeholder="4242 4242 4242 4242" class="form-input" :aria-invalid="!!errors.cardNumber">
              <p v-if="errors.cardNumber" class="form-error">{{ errors.cardNumber }}</p>
            </div>

            <div class="checkout-section__row">
              <div class="form-group">
                <label class="form-label" for="expiry">{{ t('checkout.expiry') }}</label>
                <input id="expiry" v-model="form.expiry" type="text" placeholder="MM/YY" class="form-input" :aria-invalid="!!errors.expiry">
                <p v-if="errors.expiry" class="form-error">{{ errors.expiry }}</p>
              </div>
              <div class="form-group">
                <label class="form-label" for="cvv">{{ t('checkout.cvv') }}</label>
                <input id="cvv" v-model="form.cvv" type="text" inputmode="numeric" placeholder="123" class="form-input" :aria-invalid="!!errors.cvv">
                <p v-if="errors.cvv" class="form-error">{{ errors.cvv }}</p>
              </div>
            </div>
          </fieldset>
        </div>

        <aside class="checkout-summary card">
          <h2 class="checkout-summary__title">{{ t('checkout.orderSummary') }}</h2>

          <ul class="checkout-summary__items">
            <li v-for="item in cartStore.items" :key="item.key">
              <span>{{ item.snapshot.title }} × {{ item.quantity }}</span>
              <span>{{ useFormatPrice(item.snapshot.price * item.quantity) }}</span>
            </li>
          </ul>

          <div class="checkout-summary__promo">
            <label class="form-label" for="promo">{{ t('checkout.promoCode') }}</label>
            <div class="checkout-summary__promo-row">
              <input id="promo" v-model="promoInput" type="text" class="form-input" placeholder="SAVE10">
              <button type="button" class="btn btn--outline btn--sm" @click="applyPromo">{{ t('checkout.applyPromo') }}</button>
            </div>
            <p v-if="promoMessage" class="form-hint" :class="{ 'form-error': promoMessageType === 'error' }">{{ promoMessage }}</p>
            <p class="form-hint">{{ t('checkout.tryPromo') }}</p>
          </div>

          <dl class="checkout-summary__row">
            <dt>{{ t('cart.subtotal') }}</dt>
            <dd>{{ useFormatPrice(cartStore.subtotal) }}</dd>
          </dl>
          <dl v-if="cartStore.discountAmount > 0" class="checkout-summary__row checkout-summary__row--discount">
            <dt>{{ t('cart.discount') }}</dt>
            <dd>-{{ useFormatPrice(cartStore.discountAmount) }}</dd>
          </dl>
          <dl class="checkout-summary__row">
            <dt>{{ t('cart.shipping') }}</dt>
            <dd>{{ shippingCost === 0 ? t('cart.freeShipping') : useFormatPrice(shippingCost) }}</dd>
          </dl>
          <dl class="checkout-summary__row checkout-summary__row--total">
            <dt>{{ t('cart.total') }}</dt>
            <dd>{{ useFormatPrice(grandTotal) }}</dd>
          </dl>

          <button type="submit" class="btn btn--primary btn--block btn--lg" :disabled="isPlacingOrder">
            <span v-if="isPlacingOrder" class="spinner" aria-hidden="true" />
            {{ isPlacingOrder ? t('checkout.placingOrder') : t('checkout.placeOrder') }}
          </button>
        </aside>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.checkout-layout {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  align-items: start;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 360px;
  }
}

.checkout-forms {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.checkout-section {
  padding: 1.5rem;
  border: 1px solid var(--color-border);

  legend {
    font-weight: 700;
    font-size: 1.0625rem;
    margin-bottom: 1rem;
    padding: 0;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

.checkout-summary {
  padding: 1.5rem;

  button[type="submit"] {
    margin-top: 1rem;
  }

  &__title {
    margin: 0 0 1rem;
    font-size: 1.125rem;
  }

  &__items {
    list-style: none;
    margin: 0 0 1.25rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.9375rem;

    li {
      display: flex;
      justify-content: space-between;
      color: var(--color-text-muted);
    }
  }

  &__promo {
    padding: 1rem 0;
    border-top: 1px dashed var(--color-border);
    border-bottom: 1px dashed var(--color-border);
    margin-bottom: 1rem;

    &-row {
      display: flex;
      gap: 0.5rem;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    margin: 0 0 0.75rem;
    font-size: 0.9375rem;
    color: var(--color-text-muted);

    dt,
    dd {
      margin: 0;
    }

    &--discount {
      color: var(--color-success);
    }

    &--total {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--color-text);
      padding-top: 0.75rem;
      border-top: 1px solid var(--color-border);
    }
  }
}

.order-success {
  text-align: center;
  padding: 3rem 1.5rem;
  max-width: 480px;
  margin: 0 auto;

  &__icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
  }

  &__number {
    margin: 1rem 0 1.5rem;
    font-size: 1.0625rem;
  }
}
</style>
