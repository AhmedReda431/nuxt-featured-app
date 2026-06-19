export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { password } = body || {}
  const config = useRuntimeConfig(event)

  if (!password || password.length < 6) {
    throw createError({ statusCode: 400, statusMessage: 'Password must be at least 6 characters' })
  }

  const raw = getCookie(event, 'otp_verified')
  if (!raw) {
    throw createError({ statusCode: 400, statusMessage: 'Verification expired, please start again' })
  }

  const verified = decryptPayload(raw, config.authSecret)
  if (!verified || !verified.verified || Date.now() > verified.expiresAt) {
    throw createError({ statusCode: 400, statusMessage: 'Verification expired, please start again' })
  }

  // No real backend to persist the new password against (DummyJSON is
  // read-only/simulated), so we just confirm success and clear state.
  deleteCookie(event, 'otp_verified', { path: '/' })

  return { success: true }
})
