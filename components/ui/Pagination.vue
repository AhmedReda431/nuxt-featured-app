<script setup>
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

const emit = defineEmits(['change'])

const pagesToShow = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const delta = 1
  const range = []

  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }

  if (range[0] > 1) {
    if (range[0] > 2) range.unshift('…')
    range.unshift(1)
  }

  if (range[range.length - 1] < total) {
    if (range[range.length - 1] < total - 1) range.push('…')
    range.push(total)
  }

  return range
})

function goTo(page) {
  if (page === '…' || page === props.currentPage) return
  emit('change', page)
}
</script>

<template>
  <nav v-if="totalPages > 1" class="pagination" aria-label="Pagination">
    <button
      type="button"
      class="pagination__btn pagination__btn--nav"
      :disabled="currentPage === 1"
      aria-label="Previous page"
      @click="goTo(currentPage - 1)"
    >
      &#8249;
    </button>

    <button
      v-for="(page, index) in pagesToShow"
      :key="`${page}-${index}`"
      type="button"
      class="pagination__btn"
      :class="{ 'pagination__btn--active': page === currentPage, 'pagination__btn--ellipsis': page === '…' }"
      :aria-current="page === currentPage ? 'page' : undefined"
      :aria-label="page === '…' ? undefined : `Go to page ${page}`"
      :disabled="page === '…'"
      @click="goTo(page)"
    >
      {{ page }}
    </button>

    <button
      type="button"
      class="pagination__btn pagination__btn--nav"
      :disabled="currentPage === totalPages"
      aria-label="Next page"
      @click="goTo(currentPage + 1)"
    >
      &#8250;
    </button>
  </nav>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}

.pagination__btn {
  min-width: 2.25rem;
  height: 2.25rem;
  padding: 0 0.5rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition);
}

.pagination__btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.pagination__btn--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.pagination__btn--ellipsis {
  border: none;
  cursor: default;
  background: transparent;
}

.pagination__btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
