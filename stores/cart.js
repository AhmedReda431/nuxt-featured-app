import { defineStore } from 'pinia'

/**
 * Cart items are keyed by productId alone. The demo product API
 * (DummyJSON) has no real per-color SKU/stock data, so "color" here is
 * decorative metadata rather than a distinct purchasable variant - if
 * your real backend treats each color as its own SKU with its own
 * stock/id, switch `lineKey` back to `${productId}::${variant}` so two
 * colors of the same product become two separate cart lines.
 */
function lineKey(productId) {
  return String(productId)
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // { key, productId, variant, quantity, snapshot: { title, price, thumbnail, slug } }
    promoCode: '',
    promoDiscountPercent: 0,
  }),

  getters: {
    itemCount: state => state.items.reduce((sum, item) => sum + item.quantity, 0),

    subtotal: (state) => {
      return state.items.reduce((sum, item) => sum + item.snapshot.price * item.quantity, 0)
    },

    discountAmount: (state) => {
      return Math.round((state.subtotal * (state.promoDiscountPercent / 100)) * 100) / 100
    },

    total: (state) => {
      return Math.max(0, state.subtotal - state.discountAmount)
    },

    isInCart: state => productId => state.items.some(item => item.key === lineKey(productId)),

    getQuantity: state => (productId) => {
      const item = state.items.find(i => i.key === lineKey(productId))
      return item?.quantity ?? 0
    },

    getVariant: state => (productId) => {
      const item = state.items.find(i => i.key === lineKey(productId))
      return item?.variant ?? null
    },
  },

  actions: {
    addItem(product, variant = null, quantity = 1) {
      const key = lineKey(product.id)
      const existing = this.items.find(item => item.key === key)

      if (existing) {
        existing.quantity += quantity
        // Selecting a different color on the detail page after the item
        // is already in the cart updates the line's displayed variant,
        // rather than silently keeping the original choice.
        if (variant) existing.variant = variant
        return
      }

      this.items.push({
        key,
        productId: product.id,
        variant,
        quantity,
        snapshot: {
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail || product.images?.[0],
          slug: product.slug,
        },
      })
    },

    removeItem(productId) {
      const key = lineKey(productId)
      this.items = this.items.filter(item => item.key !== key)
    },

    updateQuantity(productId, quantity) {
      if (quantity <= 0) {
        this.removeItem(productId)
        return
      }
      const key = lineKey(productId)
      const item = this.items.find(i => i.key === key)
      if (item) item.quantity = quantity
    },

    increment(productId) {
      const key = lineKey(productId)
      const item = this.items.find(i => i.key === key)
      if (item) item.quantity++
    },

    decrement(productId) {
      const key = lineKey(productId)
      const item = this.items.find(i => i.key === key)
      if (!item) return
      if (item.quantity <= 1) this.removeItem(productId)
      else item.quantity--
    },

    applyPromoCode(code) {
      // Simple human-readable demo promo rules. Swap for a real promo
      // API when one is available.
      const normalized = code.trim().toUpperCase()
      const knownCodes = {
        SAVE10: 10,
        SAVE20: 20,
        WELCOME5: 5,
      }

      if (knownCodes[normalized]) {
        this.promoCode = normalized
        this.promoDiscountPercent = knownCodes[normalized]
        return { success: true, discount: knownCodes[normalized] }
      }

      this.promoCode = ''
      this.promoDiscountPercent = 0
      return { success: false }
    },

    clearPromoCode() {
      this.promoCode = ''
      this.promoDiscountPercent = 0
    },

    clear() {
      this.items = []
      this.clearPromoCode()
    },
  },

  persist: true,
})
