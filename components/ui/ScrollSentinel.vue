<script setup>
/**
 * Drop this at the bottom of a list. It fires `reached` once it scrolls
 * into view, which the parent uses to load the next page - the classic
 * "infinite scroll" pattern, as an alternative to numbered pagination.
 */
const props = defineProps({
  loading: { type: Boolean, default: false },
  hasMore: { type: Boolean, default: true },
})

const emit = defineEmits(['reached'])

const sentinel = ref(null)
let observer = null

onMounted(() => {
  if (!import.meta.client || !sentinel.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && props.hasMore && !props.loading) {
        emit('reached')
      }
    },
    { rootMargin: '200px' },
  )

  observer.observe(sentinel.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div ref="sentinel" class="scroll-sentinel">
    <div v-if="loading" class="scroll-sentinel__loading">
      <span class="spinner spinner--dark" aria-hidden="true" />
      <span>Loading more…</span>
    </div>
    <p v-else-if="!hasMore" class="scroll-sentinel__end">You've reached the end</p>
  </div>
</template>

<style scoped lang="scss">
.scroll-sentinel {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  min-height: 1px;
}

.scroll-sentinel__loading {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
}

.scroll-sentinel__end {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin: 0;
}
</style>
