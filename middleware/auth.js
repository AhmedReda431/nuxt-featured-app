/**
 * Apply with `definePageMeta({ middleware: 'auth' })` on any page that
 * should only be visible to logged-in users (e.g. checkout, profile).
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.isReady) {
    await authStore.fetchCurrentUser()
  }

  if (!authStore.isAuthenticated) {
    const localePath = useLocalePath()
    return navigateTo(`${localePath('/auth/login')}?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
