import { defineStore } from "pinia"
import type { Product, Building } from "~/types"

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    products: [] as Product[],
    buildings: [] as Building[],
  }),
  getters: {
    totalFavorites: (state) => state.products.length + state.buildings.length,
  },
  actions: {
    toggleProduct(product: Product) {
      const exists = this.products.find((item) => item.id === product.id)
      if (exists) {
        this.products = this.products.filter((item) => item.id !== product.id)
      } else {
        this.products.push(product)
      }
    },
    toggleBuilding(building: Building) {
      const exists = this.buildings.find((item) => item.id === building.id)
      if (exists) {
        this.buildings = this.buildings.filter((item) => item.id !== building.id)
      } else {
        this.buildings.push(building)
      }
    },
  },
})
