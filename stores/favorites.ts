import { defineStore } from 'pinia'
import { getProductById } from '~/data/products'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    ids: [] as string[],
  }),

  getters: {
    count: state => state.ids.length,

    isFavorite: state => (productId: string) => state.ids.includes(productId),

    favoriteProducts: (state) => {
      return state.ids
        .map(id => getProductById(id))
        .filter(Boolean)
    },
  },

  actions: {
    toggle(productId: string) {
      const index = this.ids.indexOf(productId)
      if (index === -1) {
        this.ids.push(productId)
      }
      else {
        this.ids.splice(index, 1)
      }
    },

    remove(productId: string) {
      this.ids = this.ids.filter(id => id !== productId)
    },

    clear() {
      this.ids = []
    },
  },

  persist: true,
})
