import { defineStore } from 'pinia'

let nextId = 1

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [],
  }),

  actions: {
    show(message, type = 'success', durationMs = 2800) {
      const id = nextId++
      this.toasts.push({ id, message, type })
      setTimeout(() => this.dismiss(id), durationMs)
    },

    dismiss(id) {
      this.toasts = this.toasts.filter(toast => toast.id !== id)
    },
  },
})
