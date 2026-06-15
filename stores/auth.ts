import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | { id: number; name: string; email: string; role: string },
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    setUser(user: { id: number; name: string; email: string; role: string }) {
      this.user = user
    },
    logout() {
      this.user = null
    },
  },
})
