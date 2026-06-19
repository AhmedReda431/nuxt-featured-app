import { defineStore } from 'pinia'

/**
 * Theme preference: 'light', 'dark', or 'system' (follow the OS setting).
 * The actual `data-theme` attribute applied to <html> is resolved from
 * this preference - see plugins/theme.client.js for how that resolution
 * and the localStorage persistence are wired up, and nuxt.config.js's
 * head script for how the *first paint* avoids a flash of the wrong
 * theme before Vue even mounts.
 */
export const useThemeStore = defineStore('theme', {
  state: () => ({
    preference: 'system', // 'light' | 'dark' | 'system'
  }),

  getters: {
    isDark: (state) => {
      if (!import.meta.client) return false
      if (state.preference === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return state.preference === 'dark'
    },
  },

  actions: {
    setPreference(preference) {
      this.preference = preference
      this.applyToDocument()
    },

    applyToDocument() {
      if (!import.meta.client) return
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light')
    },
  },

  persist: true,
})
