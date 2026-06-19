/**
 * POST /api/auth/logout
 * Clears the encrypted session cookie, both for manual logout and for
 * the idle-timeout auto-logout flow.
 */
export default defineEventHandler((event) => {
  clearSessionCookie(event)
  return { success: true }
})
