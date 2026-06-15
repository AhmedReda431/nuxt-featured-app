# 🚀 Universal Nuxt Starter Kit

A professional, high-performance **Nuxt 3** starter kit designed for rapid development of diverse web applications. Whether you're building an **E-Commerce** platform, a **Real Estate** marketplace, a **Healthcare** portal, or a content-rich **Blog**, this starter provides a rock-solid foundation with curated modules and best practices.

---

## ✨ Key Features

- **🛍️ E-Commerce Ready**: Full shopping flow including product listings, detail pages, persistent cart, favorites, and checkout.
- **🏠 Real Estate Module**: Property listings with advanced details and interactive layouts.
- **📝 Blog Integration**: Modern blog listing and reading experience with SEO optimization.
- **📱 Ultra-Responsive Navbar**: Custom off-canvas sidemenu for mobile, glassmorphism effects, and highly adaptive layout for all devices.
- **👆 Touch-Enabled Sliders**: Native-feeling swipe support for feature and product sliders on mobile devices.
- **🌍 Full i18n & RTL**: Seamless English and Arabic support with automatic RTL (Right-to-Left) layout switching.
- **🔐 Robust Auth Flow**: Complete authentication system with Login, Register, Password Reset, and OTP verification.
- **⚡ Performance Optimized**: Lazy-loading images, code splitting, SWR (Stale-While-Revalidate) route rules, and optimized assets.
- **🔍 SEO & Meta**: Comprehensive SEO management with Meta tags, Open Graph, Twitter cards, and JSON-LD schema.

---

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) (Vue 3, Vite, Nitro)
- **State Management**: [Pinia](https://pinia.vuejs.org/) with Persistence
- **Styling**: Vanilla CSS with modern variables & Flex/Grid layout
- **Images**: [@nuxt/image](https://image.nuxt.com/) for efficient optimization
- **Internationalization**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **Utilities**: [@vueuse/core](https://vueuse.org/) for reactive compositions
- **Icons**: Optimized SVG icons

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Explore the app at [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```text
├── components/       # Component-based architecture (layout, ui, feature-specific)
├── composables/      # Shared logic (SEO, helpers)
├── i18n/             # Translations (en, ar) & configuration
├── middleware/       # Route guards (auth, guest)
├── pages/            # Modern file-based routing
├── stores/           # Modular Pinia state management
├── assets/css/       # Global styles and design tokens
└── data/             # Mock datasets for rapid prototyping
```

---

## 🎨 Customization

### Modular Approach
Easily remove unwanted modules. For example, to strip Real Estate, simply delete `pages/real-estate/` and update `navLinks` in `AppNavbar.vue`.

### Visual Branding
Customize the entire look and feel by adjusting the CSS variables in `assets/css/main.css`:
```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #0f172a;
  --radius-lg: 0.75rem;
  /* ... accessibility & design tokens ... */
}
```

---

## 📋 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Spins up the development server |
| `npm run build` | Builds the application for production |
| `npm run preview` | Previews the production build locally |
| `npm run generate` | Generates a static version of the site |

---

## 📄 License
Balanced under the **MIT License**.

---

*Made with ❤️ for the Nuxt Community.*
