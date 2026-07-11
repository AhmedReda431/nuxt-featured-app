// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-06-15",
  devtools: { enabled: true },
  ssr: true,

  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
  ],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },

  css: ["~/assets/scss/main.scss"],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://images.unsplash.com" },
      ],
      script: [
        {
          // Runs synchronously before first paint, so the correct
          // theme is already applied by the time anything is visible -
          // without this, there'd be a flash of the light theme before
          // Vue mounts and the theme store/plugin catch up. Reads the
          // same localStorage key pinia-plugin-persistedstate writes
          // for the theme store ("theme", since persist: true defaults
          // to the store id with no transform).
          innerHTML: `
            (function () {
              try {
                var raw = localStorage.getItem('theme');
                var pref = raw ? JSON.parse(raw).preference : 'system';
                var isDark = pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
              } catch (e) {
                document.documentElement.setAttribute('data-theme', 'light');
              }
            })();
          `,
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  runtimeConfig: {
    // Server-only. Set NUXT_AUTH_SECRET in your .env for production.
    authSecret:
      process.env.NUXT_AUTH_SECRET || "dev-only-change-this-secret-please",
    public: {
      siteName: "Universal Starter",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "https://dummyjson.com",
      // Idle/session behaviour (ms) - tweak freely
      idleTimeoutMs: 5 * 60 * 1000, // 5 minutes of no mouse/keyboard => show "are you there" dialog
      idleDialogTimeoutMs: 10 * 1000, // 10s to answer the dialog before forced logout
      sessionMaxAgeMs: 2 * 60 * 60 * 1000, // 2 hours hard session expiry
    },
  },

  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
        language: "en-US",
        dir: "ltr",
      },
      {
        code: "ar",
        name: "العربية",
        file: "ar.json",
        language: "ar-SA",
        dir: "rtl",
      },
    ],
    lazy: true,
    langDir: "locales",
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  image: {
    quality: 80,
    format: ["webp"],
  },

  nitro: {
    compressPublicAssets: true,
  },

  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            pinia: ["pinia"],
            "crypto-js": ["crypto-js"],
          },
        },
      },
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
    "/shop/**": { swr: 3600 },
    "/blog/**": { swr: 3600 },
    "/real-estate/**": { swr: 3600 },
    "/auth/**": { ssr: false },
  },

  experimental: {
    payloadExtraction: true,
  },
  build: {
    transpile: ["vue-echarts", "echarts", "zrender"],
  },
});
