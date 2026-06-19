<script setup>
const { t } = useI18n()
const { fetchProducts, fetchCategories } = useProductsApi()

useAppSeo({
  title: t('shop.title'),
  description: t('shop.subtitle'),
})

const PAGE_SIZE = 12

const filters = reactive({
  search: '',
  category: '',
  minPrice: null,
  maxPrice: null,
  minRating: null,
  sortBy: '',
})

const viewMode = ref('paged') // 'paged' | 'scroll'
const currentPage = ref(1)
const products = ref([])
const total = ref(0)
const isLoading = ref(false)
const categories = ref([])

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / PAGE_SIZE)))

const debouncedSearch = useDebouncedRef(computed(() => filters.search), 400)

async function loadCategories() {
  try {
    categories.value = await fetchCategories()
  }
  catch {
    categories.value = []
  }
}

async function loadProducts({ append = false } = {}) {
  isLoading.value = true
  try {
    const result = await fetchProducts({
      search: filters.search,
      category: filters.category,
      page: currentPage.value,
      limit: PAGE_SIZE,
      sortBy: filters.sortBy,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
    })

    products.value = append ? [...products.value, ...result.products] : result.products
    total.value = result.total
  }
  catch {
    if (!append) products.value = []
  }
  finally {
    isLoading.value = false
  }
}

function goToPage(page) {
  currentPage.value = page
  loadProducts()
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function loadMore() {
  currentPage.value++
  loadProducts({ append: true })
}

function clearFilters() {
  filters.search = ''
  filters.category = ''
  filters.minPrice = null
  filters.maxPrice = null
  filters.minRating = null
  filters.sortBy = ''
  currentPage.value = 1
  loadProducts()
}

function switchViewMode(mode) {
  viewMode.value = mode
  currentPage.value = 1
  loadProducts()
}

// Re-fetch when filters (other than free-text search, which is debounced) change.
watch(
  () => [filters.category, filters.minPrice, filters.maxPrice, filters.minRating, filters.sortBy],
  () => {
    currentPage.value = 1
    loadProducts()
  },
)

watch(debouncedSearch, () => {
  currentPage.value = 1
  loadProducts()
})

const hasMore = computed(() => products.value.length < total.value)

onMounted(() => {
  loadCategories()
  loadProducts()
})
</script>

<template>
  <section class="section shop-page">
    <div class="container">
      <UiSectionTitle :title="t('shop.title')" :subtitle="t('shop.subtitle')" />

      <div class="shop-layout">
        <aside class="shop-layout__sidebar" aria-label="Product filters">
          <ShopProductFilters
            :filters="filters"
            :categories="categories"
            @update:filters="(val) => Object.assign(filters, val)"
            @clear="clearFilters"
          />
        </aside>

        <div class="shop-layout__content">
          <div class="shop-toolbar">
            <p class="shop-toolbar__count" aria-live="polite">
              {{ t('shop.resultsCount', { count: total }) }}
            </p>

            <div class="shop-toolbar__view" role="group" :aria-label="t('shop.viewMode')">
              <button
                type="button"
                class="btn btn--sm"
                :class="viewMode === 'paged' ? 'btn--primary' : 'btn--ghost'"
                @click="switchViewMode('paged')"
              >
                {{ t('shop.pagedView') }}
              </button>
              <button
                type="button"
                class="btn btn--sm"
                :class="viewMode === 'scroll' ? 'btn--primary' : 'btn--ghost'"
                @click="switchViewMode('scroll')"
              >
                {{ t('shop.scrollView') }}
              </button>
            </div>
          </div>

          <ShopProductCardSkeleton v-if="isLoading && products.length === 0" :count="6" />

          <UiEmptyState
            v-else-if="products.length === 0"
            icon="🔍"
            :title="t('shop.noResults')"
          >
            <button type="button" class="btn btn--primary" @click="clearFilters">
              {{ t('shop.clearFilters') }}
            </button>
          </UiEmptyState>

          <template v-else>
            <div class="grid grid--3">
              <ShopProductCard v-for="product in products" :key="product.id" :product="product" />
            </div>

            <UiPagination
              v-if="viewMode === 'paged'"
              :current-page="currentPage"
              :total-pages="totalPages"
              @change="goToPage"
            />

            <UiScrollSentinel
              v-else
              :loading="isLoading"
              :has-more="hasMore"
              @reached="loadMore"
            />
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

.shop-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.shop-toolbar__count {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
}

.shop-toolbar__view {
  display: flex;
  gap: 0.5rem;
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
