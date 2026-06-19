/**
 * Calls our own /api/real-estate server routes (see server/api/real-estate).
 * Same shape as the shop/blog composables so pages stay consistent.
 */
export function useRealEstateApi() {
  async function fetchProperties(filters = {}) {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        params.set(key, String(value))
      }
    })
    return await $fetch(`/api/real-estate?${params.toString()}`)
  }

  async function fetchPropertyBySlug(slug) {
    return await $fetch(`/api/real-estate/${slug}`)
  }

  return { fetchProperties, fetchPropertyBySlug }
}
