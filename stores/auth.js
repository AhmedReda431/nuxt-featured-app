import { defineStore } from "pinia";

/**
 * Auth store deliberately holds only the public-safe user profile.
 * Access/refresh tokens never reach the browser as JS-readable values -
 * they live only inside the encrypted httpOnly cookie that our own
 * server/api/auth/* routes manage. This store just talks to those
 * routes and mirrors whether someone is logged in.
 */
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isReady: false, // becomes true once we've checked /api/auth/me at least once
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    fullName: (state) => {
      if (!state.user) return "";
      return (
        [state.user.firstName, state.user.lastName].filter(Boolean).join(" ") ||
        state.user.username
      );
    },
  },

  actions: {
    async fetchCurrentUser() {
      try {
        const requestFetch = useRequestFetch(); // forwards SSR request headers/cookies
        const { user } = await requestFetch("/api/auth/me");
        this.user = user;
      } catch {
        this.user = null;
      } finally {
        this.isReady = true;
      }
    },

    async login(username, password) {
      const { user } = await $fetch("/api/auth/login", {
        method: "POST",
        body: { username, password },
      });
      this.user = user;
      return user;
    },

    async register(payload) {
      const { user } = await $fetch("/api/auth/register", {
        method: "POST",
        body: payload,
      });
      this.user = user;
      return user;
    },

    async refreshSession() {
      if (!this.isAuthenticated) return;
      await $fetch("/api/auth/refresh", { method: "POST" }).catch(() => {});
    },

    async updateProfile(payload) {
      const { user } = await $fetch("/api/auth/update-profile", {
        method: "PATCH",
        body: payload,
      });
      this.user = user;
      return user;
    },

    async logout() {
      await $fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
      this.user = null;
    },
  },
});
