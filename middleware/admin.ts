import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated || authStore.user?.role !== 'admin') {
    return navigateTo('/')
  }
})
