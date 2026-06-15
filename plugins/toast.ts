import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast: (message: string) => {
        if (process.client) {
          window.alert(message)
        }
      },
    },
  }
})
