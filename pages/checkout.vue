<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { t } = useI18n()
const localePath = useLocalePath()
const cartStore = useCartStore()
const router = useRouter()

useAppSeo({
  title: t('checkout.title'),
  description: t('checkout.title'),
  noindex: true,
})

const form = reactive({
  fullName: '',
  email: '',
  address: '',
  city: '',
  zipCode: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
})

const isSubmitting = ref(false)
const orderPlaced = ref(false)

onMounted(() => {
  if (cartStore.itemCount === 0 && !orderPlaced.value) {
    router.replace(localePath('/cart'))
  }
})

const shipping = 9.99
const total = computed(() => cartStore.subtotal + shipping)

async function handleSubmit() {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  cartStore.clear()
  orderPlaced.value = true
  isSubmitting.value = false
}
</script>

<template>
  <section class="section">
    <div class="container">
      <UiSectionTitle :title="t('checkout.title')" />

      <div v-if="orderPlaced" class="success card" role="status">
        <p>{{ t('checkout.success') }}</p>
        <NuxtLink :to="localePath('/shop')" class="btn btn--primary">
          {{ t('cart.emptyCta') }}
        </NuxtLink>
      </div>

      <form v-else class="checkout-layout" @submit.prevent="handleSubmit">
        <div class="checkout-form">
          <fieldset class="card checkout-fieldset">
            <legend>{{ t('checkout.shippingInfo') }}</legend>
            <div class="form-group">
              <label class="form-label" for="fullName">{{ t('checkout.fullName') }}</label>
              <input id="fullName" v-model="form.fullName" type="text" class="form-input" required autocomplete="name" />
            </div>
            <div class="form-group">
              <label class="form-label" for="email">{{ t('checkout.email') }}</label>
              <input id="email" v-model="form.email" type="email" class="form-input" required autocomplete="email" />
            </div>
            <div class="form-group">
              <label class="form-label" for="address">{{ t('checkout.address') }}</label>
              <input id="address" v-model="form.address" type="text" class="form-input" required autocomplete="street-address" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="city">{{ t('checkout.city') }}</label>
                <input id="city" v-model="form.city" type="text" class="form-input" required autocomplete="address-level2" />
              </div>
              <div class="form-group">
                <label class="form-label" for="zipCode">{{ t('checkout.zipCode') }}</label>
                <input id="zipCode" v-model="form.zipCode" type="text" class="form-input" required autocomplete="postal-code" />
              </div>
            </div>
          </fieldset>

          <fieldset class="card checkout-fieldset">
            <legend>{{ t('checkout.paymentInfo') }}</legend>
            <div class="form-group">
              <label class="form-label" for="cardNumber">{{ t('checkout.cardNumber') }}</label>
              <input id="cardNumber" v-model="form.cardNumber" type="text" class="form-input" required inputmode="numeric" autocomplete="cc-number" placeholder="4242 4242 4242 4242" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="expiry">{{ t('checkout.expiry') }}</label>
                <input id="expiry" v-model="form.expiry" type="text" class="form-input" required placeholder="MM/YY" autocomplete="cc-exp" />
              </div>
              <div class="form-group">
                <label class="form-label" for="cvv">{{ t('checkout.cvv') }}</label>
                <input id="cvv" v-model="form.cvv" type="text" class="form-input" required inputmode="numeric" autocomplete="cc-csc" />
              </div>
            </div>
          </fieldset>
        </div>

        <aside class="checkout-summary card">
          <h2>{{ t('checkout.orderSummary') }}</h2>
          <ul class="checkout-items">
            <li v-for="item in cartStore.cartProducts" :key="item.productId">
              <span>{{ item.product!.name }} × {{ item.quantity }}</span>
              <span>{{ useFormatPrice(item.product!.price * item.quantity) }}</span>
            </li>
          </ul>
          <div class="checkout-total">
            <span>{{ t('cart.total') }}</span>
            <strong>{{ useFormatPrice(total) }}</strong>
          </div>
          <button type="submit" class="btn btn--primary" style="width:100%" :disabled="isSubmitting">
            {{ isSubmitting ? t('common.loading') : t('checkout.placeOrder') }}
          </button>
        </aside>
      </form>
    </div>
  </section>
</template>

<style scoped>
.success {
  text-align: center;
  padding: 3rem;
}

.checkout-layout {
  display: grid;
  gap: 2rem;
}

.checkout-fieldset {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: none;
}

.checkout-fieldset legend {
  font-weight: 700;
  font-size: 1.0625rem;
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.checkout-summary {
  padding: 1.5rem;
  height: fit-content;
}

.checkout-summary h2 {
  margin: 0 0 1rem;
  font-size: 1.125rem;
}

.checkout-items {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.checkout-items li {
  display: flex;
  justify-content: space-between;
  padding: 0.375rem 0;
  font-size: 0.9375rem;
  color: var(--color-text-muted);
}

.checkout-total {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 1px solid var(--color-border);
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

@media (min-width: 768px) {
  .checkout-layout {
    grid-template-columns: 1fr 340px;
  }
}
</style>
