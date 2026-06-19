/**
 * Applies the persisted theme preference as soon as the app starts on
 * the client, and keeps it in sync if the person changes their OS
 * light/dark setting while "system" is selected. The actual *first
 * paint* flash-prevention happens earlier, via the blocking inline
 * script registered in nuxt.config.js (app.head.script) - this plugin
 * just keeps things correct after Vue takes over.
 */
export default defineNuxtPlugin(() => {
  const themeStore = useThemeStore()

  // pinia-plugin-persistedstate has already restored `preference` from
  // localStorage by the time this runs, so this just (re)applies it -
  // cheap and idempotent if the inline script already got it right.
  themeStore.applyToDocument()

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', () => {
    if (themeStore.preference === 'system') {
      themeStore.applyToDocument()
    }
  })
})
