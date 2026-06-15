export function useScrollAnimation() {
  const observeElement = (el: HTMLElement | null, className = 'is-visible') => {
    if (!el || !import.meta.client) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(className)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
  }

  return { observeElement }
}

export function useFormatPrice(price: number, currency = 'USD', locale?: string) {
  const { locale: i18nLocale } = useI18n()
  return new Intl.NumberFormat(locale ?? i18nLocale.value, {
    style: 'currency',
    currency,
  }).format(price)
}
