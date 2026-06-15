<template>
  <button
    @click="scrollToTop"
    class="fixed bottom-6 right-6 rounded-full bg-white p-3 shadow-soft border border-slate-200 text-slate-600 hover:bg-slate-50"
  >
    ↑
  </button>
</template>

<script setup>
const scrollToTop = () => {
  if (process.client) window.scrollTo({ top: 0, behavior: "smooth" })
}
</script>
