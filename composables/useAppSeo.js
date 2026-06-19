/**
 * useAppSeo - one call per page to wire up everything search engines and
 * social previews care about: title, description, canonical URL, Open
 * Graph, Twitter card, and optional JSON-LD structured data.
 */
export function useAppSeo(options = {}) {
  const {
    title,
    description,
    image,
    type = 'website',
    structuredData = null,
  } = options

  const config = useRuntimeConfig()
  const route = useRoute()

  const siteName = config.public.siteName
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const canonicalUrl = `${config.public.siteUrl}${route.fullPath}`
  const ogImage = image || `${config.public.siteUrl}/og-default.jpg`

  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage,
    ogType: type,
    ogUrl: canonicalUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: ogImage,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
    script: structuredData
      ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(structuredData) }]
      : [],
  })
}
