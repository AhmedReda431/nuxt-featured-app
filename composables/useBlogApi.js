/**
 * Blog data comes from DummyJSON's real /posts endpoint. Posts there
 * don't ship a hero image or slug, so we derive both deterministically
 * here in one place rather than scattering that logic across pages.
 */

const COVER_SEEDS = [
  'photo-1499750310107-5fef28a66643',
  'photo-1486312338219-ce68d2c6f44d',
  'photo-1498050108023-c5249f4df085',
  'photo-1432888622747-4eb9a8efeb07',
  'photo-1517694712202-14dd9538aa97',
  'photo-1519389950473-47ba0277781c',
  'photo-1461749280684-dccba630e2f6',
  'photo-1504384308090-c894fdcc538d',
]

export function buildBlogSlug(post) {
  const titlePart = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${titlePart}-${post.id}`
}

export function buildBlogCover(post) {
  const seed = COVER_SEEDS[post.id % COVER_SEEDS.length]
  return `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`
}

export function useBlogApi() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  async function fetchPosts({ search = '', page = 1, limit = 9 } = {}) {
    const skip = (page - 1) * limit
    const url = search
      ? `${apiBase}/posts/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
      : `${apiBase}/posts?limit=${limit}&skip=${skip}`

    const data = await $fetch(url)
    return {
      posts: data.posts || [],
      total: data.total ?? 0,
    }
  }

  async function fetchPostBySlug(slug) {
    // Same strategy as products: DummyJSON has no real `slug` field on
    // posts, so we only ever trust the numeric id appended to the end
    // of the slug by buildBlogSlug() below. If your real backend has
    // true slugs, replace the two lines below with:
    //   return await $fetch(`${apiBase}/posts/slug/${slug}`)
    const id = String(slug).split('-').pop()
    const [post, comments] = await Promise.all([
      $fetch(`${apiBase}/posts/${id}`),
      $fetch(`${apiBase}/posts/${id}/comments`).catch(() => ({ comments: [] })),
    ])
    return { post, comments: comments.comments || [] }
  }

  return { fetchPosts, fetchPostBySlug }
}
