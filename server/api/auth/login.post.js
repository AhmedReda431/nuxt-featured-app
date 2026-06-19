/**
 * POST /api/auth/login
 * Proxies to the real DummyJSON auth API, then stores the returned user
 * + tokens in our own encrypted, httpOnly cookie. The browser never sees
 * the raw access token or user object in a readable cookie - only this
 * server can decrypt it.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body || {}

  if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Username and password are required' })
  }

  const config = useRuntimeConfig(event)

  let result
  try {
    result = await $fetch(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      body: {
        username,
        password,
        expiresInMins: 60,
      },
    })
  }
  catch (error) {
    // Covers wrong credentials (DummyJSON returns 400/401), network
    // failures, and any unexpected non-JSON response from the upstream
    // API - all surfaced as a clean 401 instead of crashing the request.
    console.error('[auth/login] upstream request failed:', error?.message || error)
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid username or password',
    })
  }

  if (!result || typeof result !== 'object' || !result.id) {
    console.error('[auth/login] unexpected upstream response shape:', result)
    throw createError({ statusCode: 502, statusMessage: 'Authentication service returned an unexpected response' })
  }

  const { accessToken, refreshToken, ...user } = result

  setSessionCookie(event, { user, accessToken, refreshToken })

  // Only return the non-sensitive user profile to the client JS.
  // Tokens stay server-side inside the encrypted cookie.
  return { user }
})
