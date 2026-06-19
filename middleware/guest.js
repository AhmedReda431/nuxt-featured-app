/**
 * Apply with `definePageMeta({ middleware: 'guest' })` on auth pages
 * (login, register) so an already-logged-in user gets redirected home
 * instead of seeing the login form again.
 */
export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()

  if (!authStore.isReady) {
    await authStore.fetchCurrentUser()
  }

  if (authStore.isAuthenticated) {
    const localePath = useLocalePath()
    return navigateTo(localePath('/'))
  }
})
