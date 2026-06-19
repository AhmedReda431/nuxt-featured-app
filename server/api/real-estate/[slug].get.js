export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const all = buildProperties(60)
  const property = all.find(p => p.slug === slug)

  if (!property) {
    throw createError({ statusCode: 404, statusMessage: 'Property not found' })
  }

  const related = all
    .filter(p => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 4)

  return { property, related }
})
