/**
 * POST /api/auth/refresh
 * Re-issues the encrypted cookie with a fresh 2-hour expiry. Called
 * whenever the user proves they're still present (e.g. answers the idle
 * "are you still there?" dialog), so legitimate active sessions aren't
 * cut off mid-use.
 */
export default defineEventHandler((event) => {
  const session = getSessionFromCookie(event)
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'No active session' })
  }

  setSessionCookie(event, {
    user: session.user,
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
  })

  return { success: true }
})
