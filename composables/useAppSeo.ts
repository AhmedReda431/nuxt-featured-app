import type { SeoMeta } from '~/types'

export function useAppSeo(meta: SeoMeta = {}) {
  const { t } = useI18n()
  const config = useRuntimeConfig()
  const route = useRoute()

  const siteName = config.public.siteName as string
  const siteUrl = config.public.siteUrl as string

  const title = meta.title ? `${meta.title} | ${siteName}` : siteName
  const description = meta.description ?? t('footer.description')
  const image = meta.image ?? `${siteUrl}/og-default.jpg`
  const url = `${siteUrl}${route.fullPath}`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    ogType: meta.type ?? 'website',
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    robots: meta.noindex ? 'noindex, nofollow' : 'index, follow',
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
  })
}
