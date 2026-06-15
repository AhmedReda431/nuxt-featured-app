<script setup lang="ts">
const LazyAppFooter = defineAsyncComponent(() => import('~/components/layout/AppFooter.vue'))
</script>

<template>
  <div class="layout">
    <LayoutAppNavbar />
    <main id="main-content" class="layout__main" tabindex="-1">
      <slot />
    </main>
    <LazyAppFooter />
  </div>
</template>

<style scoped>
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
