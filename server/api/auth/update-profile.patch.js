/**
 * PATCH /api/auth/update-profile
 *
 * DummyJSON has no real authenticated "update my profile" endpoint that
 * persists changes server-side, so this updates the user data stored in
 * our own encrypted session cookie - the change is real and immediately
 * visible everywhere the app reads the logged-in user (navbar, profile
 * page, checkout pre-fill), and survives page reloads within the
 * session's normal 2-hour expiry, but doesn't persist past logout since
 * there's no real backend record to write it to.
 *
 * Swap the body of this handler for a real PATCH/PUT call to your own
 * user-management API once you have one - the cookie-update logic at
 * the bottom stays the same either way.
 */
export default defineEventHandler(async (event) => {
  const session = getSessionFromCookie(event)
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'No active session' })
  }

  const body = await readBody(event)
  const { firstName, lastName, email, phone, address, gender } = body || {}

  if (!firstName || !email) {
    throw createError({ statusCode: 400, statusMessage: 'First name and email are required' })
  }

  const updatedUser = {
    ...session.user,
    firstName,
    lastName: lastName ?? session.user.lastName,
    email,
    phone: phone ?? session.user.phone,
    address: address ?? session.user.address,
    gender: gender ?? session.user.gender,
  }

  setSessionCookie(event, {
    user: updatedUser,
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
  })

  return { user: updatedUser }
})
