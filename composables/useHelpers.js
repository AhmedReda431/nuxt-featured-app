/**
 * Small, human-readable helper functions shared across pages/components.
 * Kept framework-light on purpose: plain functions, easy to read and test.
 */

/**
 * A single shared IntersectionObserver for all scroll-reveal sections,
 * instead of one observer per component instance. Creating an observer
 * has real setup cost (it's a fairly heavy browser primitive), so on a
 * page with several animated sections, sharing one is measurably
 * cheaper during hydration than letting each section spin up its own.
 */
let sharedObserver = null
const callbackRegistry = new WeakMap()

function getSharedObserver() {
  if (sharedObserver) return sharedObserver
  if (!import.meta.client) return null

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const onVisible = callbackRegistry.get(entry.target)
          if (onVisible) onVisible()
          sharedObserver.unobserve(entry.target)
          callbackRegistry.delete(entry.target)
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  )

  return sharedObserver
}

/** IntersectionObserver-based reveal animation for scroll-triggered sections. */
export function useScrollAnimation() {
  const observeElement = (el, className = 'is-visible') => {
    if (!el || !import.meta.client) return

    const observer = getSharedObserver()
    if (!observer) return

    callbackRegistry.set(el, () => el.classList.add(className))
    observer.observe(el)
  }

  return { observeElement }
}

export function useFormatPrice(amount, currency = 'USD') {
  if (typeof amount !== 'number') return ''
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount)
  }
  catch {
    return `${currency} ${amount.toFixed(2)}`
  }
}

export function useFormatDate(dateInput) {
  if (!dateInput) return ''
  const date = new Date(dateInput)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function useDebouncedRef(value, delayMs = 300) {
  const debounced = ref(value)
  let timeoutId = null

  watch(value, (newValue) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      debounced.value = newValue
    }, delayMs)
  })

  return debounced
}

/** Builds a short, readable star rating label for screen readers. */
export function useRatingLabel(rating, max = 5) {
  return `${rating} out of ${max} stars`
}
