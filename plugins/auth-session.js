/**
 * Runs once when the app starts. On the server, this must block so the
 * rendered HTML reflects the real login state (decrypted from the
 * httpOnly cookie). On the client, Nuxt's payload already carries that
 * same Pinia state across from SSR, so re-fetching here would just be
 * a redundant network round-trip competing with hydration.
 */
export default defineNuxtPlugin(async () => {
  if (import.meta.server) {
    const authStore = useAuthStore();
    await authStore.fetchCurrentUser();
  }
});
