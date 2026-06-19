import CryptoJS from 'crypto-js'

/**
 * Small helper around CryptoJS so the rest of the server code can stay
 * readable: "encrypt this object" / "decrypt this string" instead of
 * juggling CryptoJS internals everywhere.
 */

export function encryptPayload(data, secret) {
  const json = JSON.stringify(data)
  return CryptoJS.AES.encrypt(json, secret).toString()
}

export function decryptPayload(cipherText, secret) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secret)
    const json = bytes.toString(CryptoJS.enc.Utf8)
    if (!json) return null
    return JSON.parse(json)
  }
  catch {
    // Tampered, expired-format, or garbage cookie value - treat as "not logged in"
    return null
  }
}
