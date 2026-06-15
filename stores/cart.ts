import { defineStore } from 'pinia'
import { getProductById } from '~/data/products'
import type { CartItem } from '~/types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),

    subtotal: (state) => {
      return state.items.reduce((sum, item) => {
        const product = getProductById(item.productId)
        return sum + (product?.price ?? 0) * item.quantity
      }, 0)
    },

    cartProducts: (state) => {
      return state.items
        .map(item => ({
          ...item,
          product: getProductById(item.productId),
        }))
        .filter(item => item.product)
    },

    isInCart: (state) => (productId: string) => {
      return state.items.some(item => item.productId === productId)
    },

    getQuantity: (state) => (productId: string) => {
      return state.items.find(item => item.productId === productId)?.quantity ?? 0
    },
  },

  actions: {
    addItem(productId: string) {
      const product = getProductById(productId)
      if (!product || !product.inStock) return

      const existing = this.items.find(item => item.productId === productId)
      if (existing) {
        existing.quantity++
      }
      else {
        this.items.push({ productId, quantity: 1 })
      }
    },

    removeItem(productId: string) {
      this.items = this.items.filter(item => item.productId !== productId)
    },

    updateQuantity(productId: string, quantity: number) {
      if (quantity <= 0) {
        this.removeItem(productId)
        return
      }
      const item = this.items.find(i => i.productId === productId)
      if (item) {
        item.quantity = quantity
      }
    },

    increment(productId: string) {
      const item = this.items.find(i => i.productId === productId)
      if (item) item.quantity++
    },

    decrement(productId: string) {
      const item = this.items.find(i => i.productId === productId)
      if (item) {
        if (item.quantity <= 1) this.removeItem(productId)
        else item.quantity--
      }
    },

    clear() {
      this.items = []
    },
  },

  persist: true,
})
