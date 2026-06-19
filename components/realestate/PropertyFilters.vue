<script setup>
const props = defineProps({
  filters: { type: Object, required: true },
  cities: { type: Array, default: () => [] },
  types: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:filters', 'clear'])

const { t } = useI18n()
const local = reactive({ ...props.filters })

watch(() => props.filters, (val) => Object.assign(local, val), { deep: true })

function emitUpdate() {
  emit('update:filters', { ...local })
}
</script>

<template>
  <div class="filters">
    <div class="form-group">
      <label class="form-label" for="re-search">{{ t('common.search') }}</label>
      <input id="re-search" v-model="local.search" type="search" class="form-input" @input="emitUpdate">
    </div>

    <div class="form-group">
      <label class="form-label" for="re-status">{{ t('realEstate.status') }}</label>
      <select id="re-status" v-model="local.status" class="form-select" @change="emitUpdate">
        <option value="">{{ t('shop.allCategories') }}</option>
        <option value="for-sale">{{ t('realEstate.forSale') }}</option>
        <option value="for-rent">{{ t('realEstate.forRent') }}</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label" for="re-type">{{ t('realEstate.type') }}</label>
      <select id="re-type" v-model="local.type" class="form-select" @change="emitUpdate">
        <option value="">{{ t('realEstate.anyType') }}</option>
        <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label" for="re-city">{{ t('realEstate.location') }}</label>
      <select id="re-city" v-model="local.city" class="form-select" @change="emitUpdate">
        <option value="">{{ t('realEstate.anyCity') }}</option>
        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label" for="re-bedrooms">{{ t('realEstate.bedrooms') }}</label>
      <select id="re-bedrooms" v-model.number="local.bedrooms" class="form-select" @change="emitUpdate">
        <option :value="null">{{ t('realEstate.anyBedrooms') }}</option>
        <option v-for="n in [1, 2, 3, 4, 5]" :key="n" :value="n">{{ n }}+</option>
      </select>
    </div>

    <div class="form-group">
      <span class="form-label">{{ t('realEstate.priceRange') }}</span>
      <div class="filters__price-inputs">
        <input v-model.number="local.minPrice" type="number" min="0" class="form-input" placeholder="Min" @change="emitUpdate">
        <span class="filters__price-sep">–</span>
        <input v-model.number="local.maxPrice" type="number" min="0" class="form-input" placeholder="Max" @change="emitUpdate">
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="re-sort">{{ t('realEstate.sortBy') }}</label>
      <select id="re-sort" v-model="local.sortBy" class="form-select" @change="emitUpdate">
        <option value="">{{ t('shop.sortRelevance') }}</option>
        <option value="price-asc">{{ t('shop.sortPriceAsc') }}</option>
        <option value="price-desc">{{ t('shop.sortPriceDesc') }}</option>
        <option value="rating">{{ t('shop.sortRating') }}</option>
        <option value="newest">{{ t('shop.sortNewest') }}</option>
      </select>
    </div>

    <button type="button" class="btn btn--ghost btn--block" @click="emit('clear')">
      {{ t('realEstate.clearFilters') }}
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
</style>
