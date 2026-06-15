// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  runtimeConfig: {
    public: {
      siteName: 'Universal Starter',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },

  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      { code: 'en', name: 'English', file: 'en.json', language: 'en-US', dir: 'ltr' },
      { code: 'ar', name: 'العربية', file: 'ar.json', language: 'ar-SA', dir: 'rtl' },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  image: {
    quality: 80,
    format: ['webp'],
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
            pinia: ['pinia'],
          },
        },
      },
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/shop/**': { swr: 3600 },
    '/blog/**': { swr: 3600 },
    '/real-estate/**': { swr: 3600 },
    '/auth/**': { ssr: false },
  },

  experimental: {
    payloadExtraction: true,
  },
})
