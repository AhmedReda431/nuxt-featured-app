import { computed } from "vue"
import { useAuthStore } from "~/stores/auth"

export const useAuth = () => {
  const store = useAuthStore()

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    store.setUser({ id: 1, name: "John Doe", email, role: "admin" })
    return { success: true }
  }

  const register = async (name: string, email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    store.setUser({ id: 2, name, email, role: "user" })
    return { success: true }
  }

  const forgotPassword = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true }
  }

  const verifyOtp = async (code: string, otp: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true }
  }

  return {
    user: computed(() => store.user),
    isAuthenticated: computed(() => store.isAuthenticated),
    login,
    register,
    forgotPassword,
    verifyOtp,
  }
}
