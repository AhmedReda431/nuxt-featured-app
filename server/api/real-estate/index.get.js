/**
 * GET /api/real-estate
 * Query params: page, limit, search, type, status, city, minPrice,
 * maxPrice, bedrooms, sortBy (price-asc|price-desc|rating|newest)
 */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const all = buildProperties(60)

  let results = all

  if (query.search) {
    const term = String(query.search).toLowerCase()
    results = results.filter(p =>
      p.title.toLowerCase().includes(term)
      || p.city.toLowerCase().includes(term)
      || p.address.toLowerCase().includes(term),
    )
  }

  if (query.type) {
    results = results.filter(p => p.type === query.type)
  }

  if (query.status) {
    results = results.filter(p => p.status === query.status)
  }

  if (query.city) {
    results = results.filter(p => p.city === query.city)
  }

  if (query.bedrooms) {
    results = results.filter(p => p.bedrooms >= Number(query.bedrooms))
  }

  if (query.minPrice) {
    results = results.filter(p => p.price >= Number(query.minPrice))
  }

  if (query.maxPrice) {
    results = results.filter(p => p.price <= Number(query.maxPrice))
  }

  switch (query.sortBy) {
    case 'price-asc':
      results = [...results].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      results = [...results].sort((a, b) => b.price - a.price)
      break
    case 'rating':
      results = [...results].sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      results = [...results].sort((a, b) => b.yearBuilt - a.yearBuilt)
      break
  }

  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.max(1, Number(query.limit) || 9)
  const start = (page - 1) * limit
  const paged = results.slice(start, start + limit)

  return {
    properties: paged,
    total: results.length,
    page,
    limit,
    totalPages: Math.ceil(results.length / limit),
    cities: [...new Set(all.map(p => p.city))],
    types: [...new Set(all.map(p => p.type))],
  }
})
