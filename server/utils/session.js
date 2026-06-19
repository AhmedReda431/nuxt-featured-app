import { decryptPayload, encryptPayload } from './crypto'

export const SESSION_COOKIE_NAME = 'app_session'

/**
 * Writes the logged-in user's data into a single httpOnly, secure,
 * encrypted cookie. httpOnly means client-side JS (and any injected
 * script) can never read or steal it - only this server can.
 */
export function setSessionCookie(event, sessionData) {
  const { authSecret, public: { sessionMaxAgeMs } } = useRuntimeConfig(event)

  const payload = {
    ...sessionData,
    issuedAt: Date.now(),
    expiresAt: Date.now() + sessionMaxAgeMs,
  }

  const encrypted = encryptPayload(payload, authSecret)

  setCookie(event, SESSION_COOKIE_NAME, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: Math.floor(sessionMaxAgeMs / 1000),
  })

  return payload
}

/**
 * Reads + decrypts the session cookie. Returns null if missing, tampered,
 * or past its hard 2-hour expiry.
 */
export function getSessionFromCookie(event) {
  const { authSecret } = useRuntimeConfig(event)
  const raw = getCookie(event, SESSION_COOKIE_NAME)
  if (!raw) return null

  const session = decryptPayload(raw, authSecret)
  if (!session) return null

  if (session.expiresAt && Date.now() > session.expiresAt) {
    return null
  }

  return session
}

export function clearSessionCookie(event) {
  deleteCookie(event, SESSION_COOKIE_NAME, { path: '/' })
}
