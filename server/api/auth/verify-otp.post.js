export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { code } = body || {}
  const config = useRuntimeConfig(event)

  const raw = getCookie(event, 'pending_otp')
  if (!raw) {
    throw createError({ statusCode: 400, statusMessage: 'OTP request expired, please try again' })
  }

  const pending = decryptPayload(raw, config.authSecret)
  if (!pending || Date.now() > pending.expiresAt) {
    throw createError({ statusCode: 400, statusMessage: 'OTP expired, please request a new code' })
  }

  if (String(code) !== pending.otp) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid verification code' })
  }

  // Mark this email as "verified" briefly so reset-password can trust it.
  const verifiedToken = encryptPayload(
    { email: pending.email, verified: true, expiresAt: Date.now() + 5 * 60 * 1000 },
    config.authSecret,
  )

  setCookie(event, 'otp_verified', verifiedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 5 * 60,
  })

  deleteCookie(event, 'pending_otp', { path: '/' })

  return { success: true }
})
