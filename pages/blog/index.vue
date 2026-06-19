<script setup>
const { t } = useI18n()
const { fetchPosts } = useBlogApi()

useAppSeo({ title: t('blog.title'), description: t('blog.subtitle') })

const PAGE_SIZE = 9
const search = ref('')
const currentPage = ref(1)
const posts = ref([])
const total = ref(0)
const isLoading = ref(false)

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / PAGE_SIZE)))
const debouncedSearch = useDebouncedRef(search, 400)

async function loadPosts() {
  isLoading.value = true
  try {
    const result = await fetchPosts({ search: search.value, page: currentPage.value, limit: PAGE_SIZE })
    posts.value = result.posts
    total.value = result.total
  }
  catch {
    posts.value = []
  }
  finally {
    isLoading.value = false
  }
}

function goToPage(page) {
  currentPage.value = page
  loadPosts()
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(debouncedSearch, () => {
  currentPage.value = 1
  loadPosts()
})

onMounted(loadPosts)
</script>

<template>
  <section class="section">
    <div class="container">
      <UiSectionTitle :title="t('blog.title')" :subtitle="t('blog.subtitle')" />

      <div class="blog-search">
        <input v-model="search" type="search" class="form-input" :placeholder="t('blog.search')" :aria-label="t('blog.search')">
      </div>

      <ShopProductCardSkeleton v-if="isLoading && posts.length === 0" :count="6" />

      <UiEmptyState v-else-if="posts.length === 0" icon="📝" :title="t('blog.noResults')" />

      <template v-else>
        <div class="grid grid--3">
          <BlogCard v-for="post in posts" :key="post.id" :post="post" />
        </div>

        <UiPagination :current-page="currentPage" :total-pages="totalPages" @change="goToPage" />
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
.blog-search {
  max-width: 360px;
  margin-bottom: 2rem;
}
</style>
