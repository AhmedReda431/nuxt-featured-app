<script setup>
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const isMenuOpen = ref(false)

const navLinks = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/about'), label: t('nav.about') },
  { to: localePath('/shop'), label: t('nav.shop') },
  { to: localePath('/blog'), label: t('nav.blog') },
  { to: localePath('/real-estate'), label: t('nav.realEstate') },
  { to: localePath('/charts'), label: t('nav.charts') },
  { to: localePath('/contact'), label: t('nav.contact') },
  { to: localePath('/faq'), label: t('nav.faq') },
])

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function switchLocale(code) {
  setLocale(code)
}

function toggleTheme() {
  themeStore.setPreference(themeStore.isDark ? 'light' : 'dark')
}

async function handleLogout() {
  await authStore.logout()
  navigateTo(localePath('/'))
  closeMenu()
}

watch(() => route.fullPath, closeMenu)

watch(isMenuOpen, (val) => {
  if (val) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
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
        <div class="navbar__locale navbar__locale--desktop">
          <label for="locale-select" class="sr-only">{{ t('common.language') }}</label>
          <select
            id="locale-select"
            :value="locale"
            class="navbar__locale-select"
            @change="switchLocale($event.target.value)"
          >
            <option v-for="loc in locales" :key="loc.code" :value="loc.code">
              {{ loc.name }}
            </option>
          </select>
        </div>

        <div class="navbar__tools">
          <ClientOnly>
            <button
              type="button"
              class="navbar__icon-btn"
              :aria-label="themeStore.isDark ? t('profile.themeLight') : t('profile.themeDark')"
              @click="toggleTheme"
            >
              <svg v-if="themeStore.isDark" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
            <template #fallback>
              <span class="navbar__icon-btn" aria-hidden="true" />
            </template>
          </ClientOnly>

          <NuxtLink :to="localePath('/favorites')" class="navbar__icon-btn" :aria-label="t('nav.favorites')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <ClientOnly>
              <span v-if="favoritesStore.count" class="badge navbar__badge">{{ favoritesStore.count }}</span>
            </ClientOnly>
          </NuxtLink>

          <NuxtLink :to="localePath('/cart')" class="navbar__icon-btn" :aria-label="t('nav.cart')">
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
            <NuxtLink :to="localePath('/profile')" class="navbar__user">{{ authStore.fullName }}</NuxtLink>
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

    <Teleport to="body">
      <div class="sidemenu" :class="{ 'sidemenu--open': isMenuOpen }" aria-modal="true" role="dialog">
        <div class="sidemenu__overlay" @click="closeMenu" />
        <div class="sidemenu__content">
          <div class="sidemenu__header">
            <NuxtLink :to="localePath('/')" class="navbar__brand" @click="closeMenu">
              Universal Starter
            </NuxtLink>
            <button type="button" class="sidemenu__close" aria-label="Close menu" @click="closeMenu">
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

              <div class="sidemenu__theme">
                <p class="sidemenu__label">{{ t('profile.theme') }}</p>
                <ClientOnly>
                  <button type="button" class="btn btn--ghost btn--block" @click="toggleTheme">
                    {{ themeStore.isDark ? t('profile.themeLight') : t('profile.themeDark') }}
                  </button>
                </ClientOnly>
              </div>

              <div class="sidemenu__auth">
                <template v-if="authStore.isAuthenticated">
                  <div class="sidemenu__user-info">
                    <span class="sidemenu__user-name">{{ authStore.fullName }}</span>
                    <span class="sidemenu__user-email">{{ authStore.user?.email }}</span>
                  </div>
                  <NuxtLink :to="localePath('/profile')" class="btn btn--ghost btn--block mb-2" @click="closeMenu">
                    {{ t('nav.profile') }}
                  </NuxtLink>
                  <button type="button" class="btn btn--outline btn--block" @click="handleLogout">
                    {{ t('nav.logout') }}
                  </button>
                </template>
                <NuxtLink v-else :to="localePath('/auth/login')" class="btn btn--primary btn--block" @click="closeMenu">
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

<style scoped lang="scss">
@use '~/assets/scss/mixins' as m;

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  background: var(--color-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: background var(--transition);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    gap: 1rem;
  }

  &__brand {
    font-weight: 800;
    font-size: 1.25rem;
    color: var(--color-secondary);
    text-decoration: none;
    white-space: nowrap;
    letter-spacing: -0.02em;

    @include m.respond-up(xl) {
      font-size: 1.5rem;
    }
  }

  &__nav {
    display: none;
    gap: 0.25rem;

    @include m.respond-up(xl) {
      display: flex;
    }
  }

  &__link {
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    color: var(--color-text);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9375rem;
    transition: all var(--transition);

    &:hover {
      background: var(--color-bg-alt);
      color: var(--color-primary);
    }

    &--active {
      color: var(--color-primary);
      background: rgba(var(--color-primary-rgb), 0.1);
      font-weight: 600;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__tools {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__locale--desktop {
    display: none;

    @include m.respond-up(xl) {
      display: block;
    }
  }

  &__locale-select {
    padding: 0.375rem 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    font-size: 0.8125rem;
    background: var(--color-bg);
    cursor: pointer;
  }

  &__icon-btn {
    position: relative;
    @include m.flex-center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-full);
    color: var(--color-text);
    transition: all var(--transition);

    &:hover {
      background: var(--color-bg-alt);
      color: var(--color-primary);
      transform: translateY(-1px);
    }
    &.navbar__icon-btn{
      background: rgba(var(--color-primary-rgb), 0.1)
    }
  }

  &__badge {
    position: absolute;
    top: 2px;
    right: 2px;
    min-width: 1.125rem;
    height: 1.125rem;
    padding: 0 4px;
    font-size: 0.6875rem;
    border: 2px solid #fff;
  }

  &__auth--desktop {
    display: none;

    @include m.respond-up(xl) {
      display: flex;
      align-items: center;
    }
  }

  &__user {
    font-size: 0.875rem;
    font-weight: 600;
    margin-right: 0.5rem;
    color: var(--color-text);
    text-decoration: none;

    &:hover {
      color: var(--color-primary);
      text-decoration: none;
    }
  }

  &__toggle {
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

    &:hover {
      background: var(--color-border);
    }

    @include m.respond-up(xl) {
      display: none;
    }

    &--active &-bar {
      &:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }

    &-bar {
      display: block;
      width: 20px;
      height: 2px;
      background: var(--color-secondary);
      border-radius: 1px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      @include m.reduced-motion {
        transition: none !important;
      }
    }
  }
}

.sidemenu {
  position: fixed;
  inset: 0;
  z-index: 1000;
  visibility: hidden;
  pointer-events: none;
  transition: visibility 0.4s;

  &--open {
    visibility: visible;
    pointer-events: auto;

    .sidemenu__overlay {
      opacity: 1;
    }

    .sidemenu__content {
      transform: translateX(0);
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.4s;

    @include m.reduced-motion {
      transition: none !important;
    }
  }

  &__content {
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

    [dir="rtl"] & {
      right: auto;
      left: 0;
      transform: translateX(-100%);
    }

    [dir="rtl"] .sidemenu--open & {
      transform: translateX(0);
    }

    @include m.reduced-motion {
      transition: none !important;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem;
    border-bottom: 1px solid var(--color-border);
  }

  &__close {
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    background: var(--color-bg-alt);
    border-radius: var(--radius-full);
    font-size: 1.5rem;
    @include m.flex-center;
    cursor: pointer;
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__link {
    padding: 0.875rem 1rem;
    border-radius: var(--radius-md);
    color: var(--color-text);
    text-decoration: none;
    font-weight: 500;
    transition: background var(--transition);

    &:hover,
    &--active {
      background: var(--color-bg-alt);
      color: var(--color-primary);
    }
  }

  &__divider {
    margin: 1.5rem 0;
    border: 0;
    border-top: 1px solid var(--color-border);
  }

  &__extra {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }

  &__locale-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  &__user-info {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  &__user-name {
    font-weight: 600;
    color: var(--color-text);
  }

  &__user-email {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }
}
.navbar__actions{
  .navbar__locale-select{
    color: var(--color-text);
  }
}
</style>
