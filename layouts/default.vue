<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <AppNavbar />
    <main>
      <slot />
    </main>
    <AppFooter />
    <CartDrawer />
    <BackToTop />
  </div>
</template>

<script setup>
// Default layout uses shared page chrome.
</script>
