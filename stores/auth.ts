import { defineStore } from 'pinia'
import type { User } from '~/types'

interface AuthState {
  user: User | null
  token: string | null
  pendingEmail: string | null
  pendingOtp: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    pendingEmail: null,
    pendingOtp: null,
  }),

  getters: {
    isAuthenticated: state => !!state.token && !!state.user,
    userName: state => state.user?.name ?? '',
  },

  actions: {
    login(email: string, password: string) {
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      this.user = {
        id: '1',
        name: email.split('@')[0],
        email,
      }
      this.token = `demo-token-${Date.now()}`
    },

    register(name: string, email: string, password: string) {
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      this.user = { id: '1', name, email }
      this.token = `demo-token-${Date.now()}`
    },

    requestPasswordReset(email: string) {
      this.pendingEmail = email
      this.pendingOtp = '123456'
    },

    verifyOtp(code: string) {
      if (code !== this.pendingOtp) {
        throw new Error('Invalid OTP code')
      }
      return true
    },

    resetPassword(_newPassword: string) {
      this.pendingEmail = null
      this.pendingOtp = null
    },

    logout() {
      this.user = null
      this.token = null
      this.pendingEmail = null
      this.pendingOtp = null
    },
  },

  persist: {
    pick: ['user', 'token'],
  },
})
