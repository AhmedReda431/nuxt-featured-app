<script setup>
const props = defineProps({
  filters: { type: Object, required: true },
  categories: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:filters', 'apply', 'clear'])

const { t } = useI18n()

const local = reactive({ ...props.filters })

watch(() => props.filters, (val) => {
  Object.assign(local, val)
}, { deep: true })

function emitUpdate() {
  emit('update:filters', { ...local })
}

const sortOptions = computed(() => [
  { value: '', label: t('shop.sortRelevance') },
  { value: 'price-asc', label: t('shop.sortPriceAsc') },
  { value: 'price-desc', label: t('shop.sortPriceDesc') },
  { value: 'rating', label: t('shop.sortRating') },
  { value: 'newest', label: t('shop.sortNewest') },
])

const ratingOptions = [4, 3, 2, 1]
</script>

<template>
  <div class="filters">
    <div class="form-group">
      <label class="form-label" for="filter-search">{{ t('common.search') }}</label>
      <input
        id="filter-search"
        v-model="local.search"
        type="search"
        class="form-input"
        :placeholder="t('shop.search')"
        @input="emitUpdate"
      >
    </div>

    <div class="form-group">
      <label class="form-label" for="filter-category">{{ t('shop.category') }}</label>
      <select id="filter-category" v-model="local.category" class="form-select" @change="emitUpdate">
        <option value="">{{ t('shop.allCategories') }}</option>
        <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
      </select>
    </div>

    <div class="form-group">
      <span class="form-label">{{ t('shop.priceRange') }}</span>
      <div class="filters__price-inputs">
        <input
          v-model.number="local.minPrice"
          type="number"
          min="0"
          class="form-input"
          placeholder="Min"
          aria-label="Minimum price"
          @change="emitUpdate"
        >
        <span class="filters__price-sep">–</span>
        <input
          v-model.number="local.maxPrice"
          type="number"
          min="0"
          class="form-input"
          placeholder="Max"
          aria-label="Maximum price"
          @change="emitUpdate"
        >
      </div>
      <input
        v-model.number="local.maxPrice"
        type="range"
        min="0"
        max="3000"
        step="10"
        class="filters__range"
        :aria-label="t('shop.priceRange')"
        @input="emitUpdate"
      >
    </div>

    <div class="form-group">
      <label class="form-label" for="filter-rating">{{ t('shop.minRating') }}</label>
      <select id="filter-rating" v-model.number="local.minRating" class="form-select" @change="emitUpdate">
        <option :value="null">{{ t('shop.anyRating') }}</option>
        <option v-for="r in ratingOptions" :key="r" :value="r">{{ r }}+ ★</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label" for="filter-sort">{{ t('shop.sortBy') }}</label>
      <select id="filter-sort" v-model="local.sortBy" class="form-select" @change="emitUpdate">
        <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
    </div>

    <button type="button" class="btn btn--ghost btn--block" @click="emit('clear')">
      {{ t('shop.clearFilters') }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filters__price-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filters__price-sep {
  color: var(--color-text-muted);
}

.filters__range {
  width: 100%;
  margin-top: 0.75rem;
  accent-color: var(--color-primary);
}
</style>
