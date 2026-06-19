/**
 * Thin wrapper around the real DummyJSON products API. Keeping all the
 * URL-building and response-shaping in one place means pages just call
 * a readable function like fetchProducts({ search, category, page })
 * instead of constructing query strings themselves.
 */
export function useProductsApi() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  async function fetchProducts({
    search = '',
    category = '',
    page = 1,
    limit = 12,
    sortBy = '',
    minPrice = null,
    maxPrice = null,
    minRating = null,
  } = {}) {
    const skip = (page - 1) * limit

    // DummyJSON supports search and category-filtering as separate
    // endpoints, and sorting via sortBy/order on the base endpoint.
    let url = `${apiBase}/products`
    const params = new URLSearchParams()

    if (search) {
      url = `${apiBase}/products/search`
      params.set('q', search)
    }
    else if (category) {
      url = `${apiBase}/products/category/${encodeURIComponent(category)}`
    }

    params.set('limit', String(limit))
    params.set('skip', String(skip))

    if (sortBy === 'price-asc') {
      params.set('sortBy', 'price')
      params.set('order', 'asc')
    }
    else if (sortBy === 'price-desc') {
      params.set('sortBy', 'price')
      params.set('order', 'desc')
    }
    else if (sortBy === 'rating') {
      params.set('sortBy', 'rating')
      params.set('order', 'desc')
    }
    else if (sortBy === 'newest') {
      params.set('sortBy', 'id')
      params.set('order', 'desc')
    }

    const data = await $fetch(`${url}?${params.toString()}`)
    let items = data.products || []

    // Price/rating filters aren't supported server-side by DummyJSON,
    // so we apply them client-of-this-composable-side on the page we
    // already fetched. For a real backend you'd push these into the
    // query string instead.
    if (minPrice !== null) items = items.filter(p => p.price >= minPrice)
    if (maxPrice !== null) items = items.filter(p => p.price <= maxPrice)
    if (minRating !== null) items = items.filter(p => p.rating >= minRating)

    return {
      products: items,
      total: data.total ?? items.length,
      skip: data.skip ?? skip,
      limit: data.limit ?? limit,
    }
  }

  async function fetchProductBySlug(slugOrId) {
    // --- ID-BASED STRATEGY (current, active) ---
    // DummyJSON has no real `slug` field on products, so this app never
    // actually trusts the slug for lookups - it only trusts the numeric
    // id that buildProductSlug() appends to the end of every slug
    // (e.g. "wireless-mouse-23" -> id 23). This is why routing still
    // works correctly even though the "slug" portion is just cosmetic.
    const id = String(slugOrId).split('-').pop()
    return await $fetch(`${apiBase}/products/${id}`)

    // --- REAL-SLUG STRATEGY (use this instead once your API has true slugs) ---
    // If you swap in a backend that returns a real, unique `slug` field
    // per product, replace the two lines above with a direct lookup by
    // slug instead of extracting an id:
    //
    //   return await $fetch(`${apiBase}/products/slug/${slugOrId}`)
    //
    // ...and update buildProductSlug() below to return `product.slug`
    // directly instead of generating one from the title + id.
  }

  async function fetchCategories() {
    return await $fetch(`${apiBase}/products/categories`)
  }

  async function fetchRelatedProducts(category, excludeId) {
    const data = await $fetch(`${apiBase}/products/category/${encodeURIComponent(category)}?limit=8`)
    return (data.products || []).filter(p => p.id !== excludeId).slice(0, 4)
  }

  return { fetchProducts, fetchProductBySlug, fetchCategories, fetchRelatedProducts }
}

/**
 * Builds a human-readable, SEO-friendly URL slug from a product's title
 * and id. The id is what's actually used for lookups (see
 * fetchProductBySlug above) - the title portion is purely cosmetic/SEO,
 * so two products can never collide even with similar titles.
 *
 * Swap this for `return product.slug` if your real backend provides a
 * genuine unique slug field instead.
 */
export function buildProductSlug(product) {
  const titlePart = product.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${titlePart}-${product.id}`
}
