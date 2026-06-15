<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()

const isMenuOpen = ref(false)

const navLinks = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/about'), label: t('nav.about') },
  { to: localePath('/shop'), label: t('nav.shop') },
  { to: localePath('/blog'), label: t('nav.blog') },
  { to: localePath('/real-estate'), label: t('nav.realEstate') },
  { to: localePath('/contact'), label: t('nav.contact') },
  { to: localePath('/faq'), label: t('nav.faq') },
])

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function switchLocale(code: string) {
  setLocale(code as 'en' | 'ar')
}

function handleLogout() {
  authStore.logout()
  navigateTo(localePath('/'))
  closeMenu()
}

watch(() => route.fullPath, closeMenu)

// Body scroll lock
watch(isMenuOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="navbar" role="banner">
    <div class="navbar__inner container">
      <NuxtLink :to="localePath('/')" class="navbar__brand" aria-label="Home">
        Universal Starter
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="navbar__nav" :aria-label="t('nav.menu')">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="navbar__link"
          active-class="navbar__link--active"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="navbar__actions">
        <!-- Locale Switcher Desktop -->
        <div class="navbar__locale navbar__locale--desktop">
          <label for="locale-select" class="sr-only">{{ t('common.language') }}</label>
          <select
            id="locale-select"
            :value="locale"
            class="navbar__locale-select"
            @change="switchLocale(($event.target as HTMLSelectElement).value)"
          >
            <option v-for="loc in locales" :key="loc.code" :value="loc.code">
              {{ loc.name }}
            </option>
          </select>
        </div>

        <div class="navbar__tools">
          <NuxtLink
            :to="localePath('/favorites')"
            class="navbar__icon-btn"
            :aria-label="t('nav.favorites')"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <ClientOnly>
              <span v-if="favoritesStore.count" class="badge navbar__badge">{{ favoritesStore.count }}</span>
            </ClientOnly>
          </NuxtLink>

          <NuxtLink
            :to="localePath('/cart')"
            class="navbar__icon-btn"
            :aria-label="t('nav.cart')"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <ClientOnly>
              <span v-if="cartStore.itemCount" class="badge navbar__badge">{{ cartStore.itemCount }}</span>
            </ClientOnly>
          </NuxtLink>
        </div>

        <div class="navbar__auth navbar__auth--desktop">
          <template v-if="authStore.isAuthenticated">
            <span class="navbar__user">{{ authStore.userName }}</span>
            <button type="button" class="btn btn--ghost btn--sm" @click="handleLogout">
              {{ t('nav.logout') }}
            </button>
          </template>
          <NuxtLink v-else :to="localePath('/auth/login')" class="btn btn--primary btn--sm">
            {{ t('nav.login') }}
          </NuxtLink>
        </div>

        <button
          type="button"
          class="navbar__toggle"
          :class="{ 'navbar__toggle--active': isMenuOpen }"
          :aria-expanded="isMenuOpen"
          :aria-label="isMenuOpen ? t('nav.closeMenu') : t('nav.menu')"
          @click="toggleMenu"
        >
          <span class="navbar__toggle-bar" />
          <span class="navbar__toggle-bar" />
          <span class="navbar__toggle-bar" />
        </button>
      </div>
    </div>

    <!-- Mobile Sidemenu (Off-canvas) -->
    <Teleport to="body">
      <div
        class="sidemenu"
        :class="{ 'sidemenu--open': isMenuOpen }"
        aria-modal="true"
        role="dialog"
      >
        <div class="sidemenu__overlay" @click="closeMenu" />
        <div class="sidemenu__content">
          <div class="sidemenu__header">
            <NuxtLink :to="localePath('/')" class="navbar__brand" @click="closeMenu">
              Universal Starter
            </NuxtLink>
            <button type="button" class="sidemenu__close" @click="closeMenu" aria-label="Close menu">
              &times;
            </button>
          </div>

          <div class="sidemenu__body">
            <nav class="sidemenu__nav">
              <NuxtLink
                v-for="link in navLinks"
                :key="link.to"
                :to="link.to"
                class="sidemenu__link"
                active-class="sidemenu__link--active"
                @click="closeMenu"
              >
                {{ link.label }}
              </NuxtLink>
            </nav>

            <hr class="sidemenu__divider">

            <div class="sidemenu__extra">
              <div class="sidemenu__locale">
                <p class="sidemenu__label">{{ t('common.language') }}</p>
                <div class="sidemenu__locale-grid">
                  <button
                    v-for="loc in locales"
                    :key="loc.code"
                    type="button"
                    class="btn btn--sm"
                    :class="locale === loc.code ? 'btn--primary' : 'btn--ghost'"
                    @click="switchLocale(loc.code)"
                  >
                    {{ loc.name }}
                  </button>
                </div>
              </div>

              <div class="sidemenu__auth">
                <template v-if="authStore.isAuthenticated">
                  <div class="sidemenu__user-info">
                    <span class="sidemenu__user-name">{{ authStore.userName }}</span>
                    <span class="sidemenu__user-email">{{ authStore.user?.email }}</span>
                  </div>
                  <button type="button" class="btn btn--outline btn--block" @click="handleLogout">
                    {{ t('nav.logout') }}
                  </button>
                </template>
                <NuxtLink
                  v-else
                  :to="localePath('/auth/login')"
                  class="btn btn--primary btn--block"
                  @click="closeMenu"
                >
                  {{ t('nav.login') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  background: rgb(255 255 255 / 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: background var(--transition);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 1rem;
}

.navbar__brand {
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--color-secondary);
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: -0.02em;
}

.navbar__nav {
  display: none;
  gap: 0.25rem;
}

.navbar__link {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all var(--transition);
}

.navbar__link:hover {
  background: var(--color-bg-alt);
  color: var(--color-primary);
}

.navbar__link--active {
  color: var(--color-primary);
  background: rgba(var(--color-primary-rgb), 0.1);
  font-weight: 600;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar__tools {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.navbar__locale--desktop {
  display: none;
}

.navbar__locale-select {
  padding: 0.375rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  background: var(--color-bg);
  cursor: pointer;
}

.navbar__icon-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  color: var(--color-text);
  transition: all var(--transition);
}

.navbar__icon-btn:hover {
  background: var(--color-bg-alt);
  color: var(--color-primary);
  transform: translateY(-1px);
}

.navbar__badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 1.125rem;
  height: 1.125rem;
  padding: 0 4px;
  font-size: 0.6875rem;
  border: 2px solid #fff;
}

.navbar__auth--desktop {
  display: none;
}

.navbar__user {
  font-size: 0.875rem;
  font-weight: 600;
  margin-right: 0.5rem;
}

.navbar__toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background: var(--color-bg-alt);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition);
}

.navbar__toggle:hover {
  background: var(--color-border);
}

.navbar__toggle-bar {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--color-secondary);
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar__toggle--active .navbar__toggle-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar__toggle--active .navbar__toggle-bar:nth-child(2) {
  opacity: 0;
}

.navbar__toggle--active .navbar__toggle-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Sidemenu Styles */
.sidemenu {
  position: fixed;
  inset: 0;
  z-index: 1000;
  visibility: hidden;
  pointer-events: none;
  transition: visibility 0.4s;
}

.sidemenu--open {
  visibility: visible;
  pointer-events: auto;
}

.sidemenu__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.4s;
}

.sidemenu--open .sidemenu__overlay {
  opacity: 1;
}

.sidemenu__content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 320px;
  background: var(--color-bg);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.sidemenu--open .sidemenu__content {
  transform: translateX(0);
}

[dir="rtl"] .sidemenu__content {
  right: auto;
  left: 0;
  transform: translateX(-100%);
}

[dir="rtl"] .sidemenu--open .sidemenu__content {
  transform: translateX(0);
}

.sidemenu__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  border-bottom: 1px solid var(--color-border);
}

.sidemenu__close {
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  background: var(--color-bg-alt);
  border-radius: var(--radius-full);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.sidemenu__body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.sidemenu__nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidemenu__link {
  padding: 0.875rem 1rem;
  border-radius: var(--radius-md);
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: background var(--transition);
}

.sidemenu__link:hover,
.sidemenu__link--active {
  background: var(--color-bg-alt);
  color: var(--color-primary);
}

.sidemenu__divider {
  margin: 1.5rem 0;
  border: 0;
  border-top: 1px solid var(--color-border);
}

.sidemenu__extra {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidemenu__label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.sidemenu__locale-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.sidemenu__user-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.sidemenu__user-name {
  font-weight: 600;
  color: var(--color-text);
}

.sidemenu__user-email {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

@media (min-width: 1024px) {
  .navbar__nav {
    display: flex;
  }

  .navbar__auth--desktop {
    display: flex;
    align-items: center;
  }

  .navbar__toggle {
    display: none;
  }
}

@media (min-width: 1024px) {
  .navbar__locale--desktop {
    display: block;
  }

  .navbar__brand {
    font-size: 1.5rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .sidemenu__content,
  .sidemenu__overlay,
  .navbar__toggle-bar {
    transition: none !important;
  }
}
</style>
