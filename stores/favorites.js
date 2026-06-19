import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [], // { productId, snapshot: { title, price, thumbnail, slug } }
  }),

  getters: {
    count: state => state.items.length,
    isFavorite: state => productId => state.items.some(item => item.productId === productId),
  },

  actions: {
    toggle(product) {
      const existingIndex = this.items.findIndex(item => item.productId === product.id)
      if (existingIndex > -1) {
        this.items.splice(existingIndex, 1)
        return
      }
      this.items.push({
        productId: product.id,
        snapshot: {
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail || product.images?.[0],
          slug: product.slug,
        },
      })
    },

    remove(productId) {
      this.items = this.items.filter(item => item.productId !== productId)
    },

    clear() {
      this.items = []
    },
  },

  persist: true,
})
