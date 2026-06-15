import { defineStore } from "pinia"
import type { CartItem, Product } from "~/types"

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalPrice: (state) => state.items.reduce((total, item) => total + item.product.price * item.quantity, 0),
  },
  actions: {
    addToCart(product: Product, quantity = 1) {
      const existing = this.items.find((item) => item.product.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find((item) => item.product.id === productId)
      if (item) {
        item.quantity = Math.max(1, quantity)
      }
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter((item) => item.product.id !== productId)
    },
    clearCart() {
      this.items = []
    },
  },
})
