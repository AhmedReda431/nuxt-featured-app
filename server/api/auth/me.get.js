/**
 * GET /api/auth/me
 * Returns the currently logged-in user (decrypted server-side from the
 * httpOnly cookie) or null. Used on app start to silently restore the
 * session.
 */
export default defineEventHandler((event) => {
  const session = getSessionFromCookie(event)
  if (!session) return { user: null }
  return { user: session.user }
})
