<template>
  <header class="bg-white border-b border-slate-200">
    <div class="container-custom flex flex-wrap items-center justify-between gap-4 py-4">
      <NuxtLink to="/" class="text-xl font-bold tracking-tight">Featured App</NuxtLink>
      <nav class="flex flex-wrap items-center gap-4 text-sm text-slate-700">
        <NuxtLink to="/" class="hover:text-primary-600">Home</NuxtLink>
        <NuxtLink to="/shop" class="hover:text-primary-600">Shop</NuxtLink>
        <NuxtLink to="/real-estate" class="hover:text-primary-600">Properties</NuxtLink>
        <NuxtLink to="/blog" class="hover:text-primary-600">Blog</NuxtLink>
        <NuxtLink to="/about" class="hover:text-primary-600">About</NuxtLink>
      </nav>
      <div class="flex items-center gap-3">
        <button @click="toggleLocale" class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">{{ localeCode }}</button>
        <NuxtLink v-if="!authStore.isAuthenticated" to="/login" class="btn-outline">Login</NuxtLink>
        <button v-else @click="authStore.logout" class="btn-outline">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup>
const authStore = useAuthStore()
const { locale, availableLocales } = useI18n()
const localeCode = computed(() => locale.value.toUpperCase())
const toggleLocale = () => {
  const next = availableLocales.find((item) => item.code !== locale.value)
  locale.value = next?.code || "en"
}
</script>
