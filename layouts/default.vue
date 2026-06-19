<script setup>
const LazyAppFooter = defineAsyncComponent(() => import('~/components/layout/AppFooter.vue'))
const { t } = useI18n()
</script>

<template>
  <div class="layout">
    <a href="#main-content" class="skip-link">{{ t('common.skipToContent') }}</a>
    <LayoutAppNavbar />
    <main id="main-content" class="layout__main" tabindex="-1">
      <slot />
    </main>
    <LazyAppFooter />
    <UiToastContainer />
    <ClientOnly>
      <UiIdleSessionDialog />
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__main {
  flex: 1;
  padding-top: var(--header-height);
}
</style>
