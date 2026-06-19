<script setup>
const { t } = useI18n()
const { fetchProperties } = useRealEstateApi()

useAppSeo({ title: t('realEstate.title'), description: t('realEstate.subtitle') })

const PAGE_SIZE = 9

const filters = reactive({
  search: '',
  status: '',
  type: '',
  city: '',
  bedrooms: null,
  minPrice: null,
  maxPrice: null,
  sortBy: '',
})

const currentPage = ref(1)
const properties = ref([])
const total = ref(0)
const cities = ref([])
const types = ref([])
const isLoading = ref(false)

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / PAGE_SIZE)))
const debouncedSearch = useDebouncedRef(computed(() => filters.search), 400)

async function loadProperties() {
  isLoading.value = true
  try {
    const result = await fetchProperties({ ...filters, page: currentPage.value, limit: PAGE_SIZE })
    properties.value = result.properties
    total.value = result.total
    cities.value = result.cities
    types.value = result.types
  }
  catch {
    properties.value = []
  }
  finally {
    isLoading.value = false
  }
}

function goToPage(page) {
  currentPage.value = page
  loadProperties()
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

function clearFilters() {
  filters.search = ''
  filters.status = ''
  filters.type = ''
  filters.city = ''
  filters.bedrooms = null
  filters.minPrice = null
  filters.maxPrice = null
  filters.sortBy = ''
  currentPage.value = 1
  loadProperties()
}

watch(
  () => [filters.status, filters.type, filters.city, filters.bedrooms, filters.minPrice, filters.maxPrice, filters.sortBy],
  () => {
    currentPage.value = 1
    loadProperties()
  },
)

watch(debouncedSearch, () => {
  currentPage.value = 1
  loadProperties()
})

onMounted(loadProperties)
</script>

<template>
  <section class="section">
    <div class="container">
      <UiSectionTitle :title="t('realEstate.title')" :subtitle="t('realEstate.subtitle')" />

      <div class="shop-layout">
        <aside class="shop-layout__sidebar" aria-label="Property filters">
          <RealestatePropertyFilters
            :filters="filters"
            :cities="cities"
            :types="types"
            @update:filters="(val) => Object.assign(filters, val)"
            @clear="clearFilters"
          />
        </aside>

        <div class="shop-layout__content">
          <p class="results-count" aria-live="polite">{{ t('realEstate.resultsCount', { count: total }) }}</p>

          <ShopProductCardSkeleton v-if="isLoading && properties.length === 0" :count="6" />

          <UiEmptyState v-else-if="properties.length === 0" icon="🏠" :title="t('realEstate.noResults')">
            <button type="button" class="btn btn--primary" @click="clearFilters">{{ t('realEstate.clearFilters') }}</button>
          </UiEmptyState>

          <template v-else>
            <div class="grid grid--3">
              <RealestateBuildingCard v-for="property in properties" :key="property.id" :property="property" />
            </div>

            <UiPagination :current-page="currentPage" :total-pages="totalPages" @change="goToPage" />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.shop-layout {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  align-items: start;
}

.shop-layout__sidebar {
  background: var(--color-bg-alt);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
}

.results-count {
  color: var(--color-text-muted);
  margin: 0 0 1.5rem;
}

@media (min-width: 900px) {
  .shop-layout {
    grid-template-columns: 260px 1fr;
  }

  .shop-layout__sidebar {
    position: sticky;
    top: calc(var(--header-height) + 1.5rem);
  }
}
</style>
