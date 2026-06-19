/**
 * POST /api/auth/forgot-password
 * There is no free real API for sending real OTP emails, so this issues
 * a short-lived OTP and stores its (hashed-ish, encrypted) value in a
 * cookie the same way the session is stored. In production you'd swap
 * this for a real email/SMS provider call - the rest of the flow
 * (verify, reset) stays identical.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body || {}

  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Email is required' })
  }

  const config = useRuntimeConfig(event)
  const otp = String(Math.floor(100000 + Math.random() * 900000))

  const encrypted = encryptPayload(
    { email, otp, expiresAt: Date.now() + 10 * 60 * 1000 },
    config.authSecret,
  )

  setCookie(event, 'pending_otp', encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 10 * 60,
  })

  // Demo-only: surface the OTP in the response so the flow is testable
  // without a real email provider wired up.
  return { success: true, demoOtp: otp }
})
