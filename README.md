# 🚀 Universal Nuxt Starter Kit

A production-style **Nuxt 3** starter (plain JavaScript, no TypeScript) built to be reused across industries — e-commerce, real estate, blogs, or anything else. Pick the pages you need and ship.

## ✨ What's inside

- **Shop** — real product data from [DummyJSON](https://dummyjson.com), search + category/price/rating filters, sort, **both** paged and infinite-scroll pagination, product detail page with touch-swipeable image gallery, color variants, reviews, related products.
- **Cart & Favorites** — persisted in localStorage via Pinia, keyed by product id (color is shown but doesn't create separate cart lines, since the demo API has no real per-color stock/SKU — see "Swapping in your own backend" below if yours does).
- **Checkout** — auth-protected, promo codes (`SAVE10`, `SAVE20`, `WELCOME5`), order summary, simulated order placement.
- **Auth** — Login / Register / Forgot Password / OTP verification / Reset, backed by real DummyJSON auth. User data + tokens are stored in an **encrypted, httpOnly, secure cookie** (2-hour hard expiry) — never exposed to client JS.
- **Profile page** — view and edit your account details (name, email, phone, address, gender). Saved into the encrypted session cookie via `/api/auth/update-profile` (clearly commented as the swap point for a real backend).
- **Idle session watcher** — after 5 minutes with no mouse/keyboard activity, an "Are you still there?" dialog appears; no response within 10s logs the user out and redirects home.
- **Dark / light mode** — toggle in the navbar and on the profile page, persisted to localStorage, with a blocking inline script that applies the right theme before first paint (no flash of the wrong theme on reload).
- **Blog** — real articles from DummyJSON `/posts`, with comments, search, pagination.
- **Real Estate** — listings + detail pages with filters (type, status, city, bedrooms, price, sort), served from a built-in Nitro server API (`/server/api/real-estate`) — swap for a real provider later without touching any page code.
- **Charts** — 12 reusable, data-agnostic chart components powered by **ECharts** + `vue-echarts`: Area, Bar, Candlestick, Donut, Funnel, Gauge, Heatmap, Line, Pie, Radar, Scatter, and Treemap. Each accepts a unified `options` prop (or individual `series` / `categories` bindings) and auto-resizes with its container. Great for admin dashboards, analytics panels, or product-stat pages.
- **i18n** — English & Arabic, full RTL layout switching.
- **SEO** — per-page meta, Open Graph, Twitter cards, canonical URLs, JSON-LD structured data, dynamic `robots.txt`, and an auto-generated, locale-aware `sitemap.xml` (via `@nuxtjs/sitemap`).
- **Performance** — lazy-loaded images (`@nuxt/image`), route-level code splitting, a single shared `IntersectionObserver` for scroll-reveal sections, deferred non-critical timers, SWR caching on dynamic routes, prerendering for static pages.
- **Accessibility** — semantic landmarks, skip-to-content link, ARIA labels/roles on interactive widgets, focus-visible styles, `prefers-reduced-motion` support.

Verified with a real Lighthouse run (mobile profile, 4× CPU throttle) at the time of writing: **Performance 85, Accessibility 97, Best Practices 100, SEO 100.** Numbers will shift slightly as you add content/images — re-run Lighthouse against your own build to check.

## 🛠️ Tech Stack

- Nuxt 3 (Vue 3, Vite, Nitro) — **plain JavaScript**, no TypeScript
- **SCSS** (`sass-embedded`) — organized into partials under `assets/scss/` (`_variables`, `_mixins`, `_tokens`, `_base`, `_layout`, `_buttons`, `_forms`, `_card`, `_accessibility`, `_animations`), pulled together by `main.scss`. Design tokens (colors, spacing, radii) stay as CSS custom properties in `_tokens.scss` rather than SCSS variables, specifically so they can be swapped at runtime — that's what powers dark mode and RTL overrides without a rebuild.
- **ECharts** + `vue-echarts` — charting library with Vue wrapper; tree-shaken imports so only the used chart types and renderers are bundled.
- Pinia + `pinia-plugin-persistedstate`
- `@nuxtjs/i18n`, `@nuxt/image`, `@nuxtjs/sitemap`, `@vueuse/core`
- `crypto-js` for cookie encryption

## 🚀 Getting Started

```bash
npm install
cp .env.example .env   # then edit NUXT_AUTH_SECRET for production
npm run dev
```

Visit `http://localhost:3000`.

**Demo login:** username `emilys`, password `emilyspass` (pre-filled on the login page).

## 📁 Where things live

```
components/charts/*      → reusable ECharts wrappers (Area, Bar, Candlestick, Donut, Funnel, Gauge, Heatmap, Line, Pie, Radar, Scatter, Treemap)
server/api/auth/*        → login, register, OTP flow, profile update, session refresh/logout (all read/write the encrypted cookie)
server/api/real-estate/* → property listings + detail (Nitro-served demo data)
server/routes/robots.txt.js → dynamic robots.txt, always points at the real configured site URL
composables/             → API wrappers (useProductsApi, useBlogApi, useRealEstateApi), SEO, idle session, helpers
stores/                  → Pinia: auth, cart, favorites, theme, toast
middleware/auth.js       → protects routes (used on /checkout and /profile)
middleware/guest.js      → keeps logged-in users off /auth/* pages
assets/scss/             → SCSS partials + main.scss entry point
i18n/locales/            → en.json, ar.json
```

## 🔁 Swapping in your own backend

- **Products/Blog**: edit `composables/useProductsApi.js` / `useBlogApi.js` — same function signatures, point at your API. Both files have a commented-out "real slug" code path ready to uncomment if your API returns true unique slugs (the demo currently only trusts the numeric id embedded at the end of each generated slug, since DummyJSON has no real slug field).
- **Real Estate**: replace the body of `server/utils/realEstateData.js` with a real fetch to RentCast/Zillow/your DB; the route shape in `server/api/real-estate/*` stays the same.
- **Auth**: point `NUXT_PUBLIC_API_BASE` at your own auth API; adjust the field names in `server/api/auth/login.post.js` if your response shape differs. The same applies to `server/api/auth/update-profile.patch.js` — it currently just rewrites the session cookie since DummyJSON has no real persistent profile-update endpoint.
- **Cart variants**: if your real product catalog treats each color as a distinct purchasable SKU (its own id/stock), open `stores/cart.js` and change `lineKey(productId)` back to `lineKey(productId, variant)` — the comment at the top of that file explains exactly what to change and why it's not done by default.

## ⚙️ Environment variables

See `.env.example`. `NUXT_AUTH_SECRET` **must** be changed before production — it encrypts the session cookie.

### Developed By Ahmed Reda | +201200994894 | live demo : https://nuxt-featured-app.vercel.app/
