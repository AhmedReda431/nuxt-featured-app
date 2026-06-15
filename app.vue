<script setup lang="ts">
const { locale, locales } = useI18n()
const localeDir = computed(() => {
  const current = locales.value.find(l => l.code === locale.value)
  return current?.dir || 'ltr'
})

useHead({
  htmlAttrs: {
    lang: locale,
    dir: localeDir,
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
