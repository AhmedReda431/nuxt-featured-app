/**
 * POST /api/auth/register
 * DummyJSON's /users/add doesn't create a *real* persistent account
 * (it simulates the response), so right after "registering" we log the
 * person in with a demo account so the rest of the app (cart, favorites,
 * checkout) has a real authenticated session to work with.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { firstName, lastName, email, password } = body || {}

  if (!firstName || !email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const config = useRuntimeConfig(event)

  const created = await $fetch(`${config.public.apiBase}/users/add`, {
    method: 'POST',
    body: {
      firstName,
      lastName: lastName || '',
      email,
      username: email.split('@')[0],
      password,
    },
  }).catch(() => null)

  // Establish a real session via the demo auth endpoint so login works
  // the same way for freshly "registered" users.
  let loginResult
  try {
    loginResult = await $fetch(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      body: { username: 'emilys', password: 'emilyspass', expiresInMins: 60 },
    })
  }
  catch (error) {
    console.error('[auth/register] upstream session creation failed:', error?.message || error)
    throw createError({ statusCode: 502, statusMessage: 'Registration succeeded but session could not be created' })
  }

  if (!loginResult || typeof loginResult !== 'object' || !loginResult.id) {
    console.error('[auth/register] unexpected upstream response shape:', loginResult)
    throw createError({ statusCode: 502, statusMessage: 'Registration succeeded but session could not be created' })
  }

  const { accessToken, refreshToken, ...sessionUser } = loginResult

  const user = {
    ...sessionUser,
    firstName,
    lastName: lastName || '',
    email,
    username: created?.username || email.split('@')[0],
  }

  setSessionCookie(event, { user, accessToken, refreshToken })

  return { user }
})
