<template>
  <section class="section-padding">
    <div class="container-custom">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p class="text-sm uppercase tracking-[0.3em] text-primary-600">Build faster with Nuxt</p>
          <h1 class="mt-6 text-5xl font-bold text-slate-900">{{ t("home.hero.title") }}</h1>
          <p class="mt-6 text-lg text-slate-600">{{ t("home.hero.subtitle") }}</p>
          <div class="mt-10 flex flex-col gap-4 sm:flex-row">
            <NuxtLink :to="localePath('/shop')" class="btn-primary">{{ t('home.hero.shop') }}</NuxtLink>
            <NuxtLink :to="localePath('/real-estate')" class="btn-outline">{{ t('home.hero.realEstate') }}</NuxtLink>
          </div>
        </div>
        <div class="rounded-[2rem] bg-white p-10 shadow-soft">
          <SectionTitle title="Featured Launch" subtitle="A minimal, multilingual Nuxt storefront." />
          <div class="mt-8 grid gap-4">
            <div class="rounded-3xl border border-slate-200 p-6">Modern layouts and page structure.</div>
            <div class="rounded-3xl border border-slate-200 p-6">Simple auth, cart, and favorites support.</div>
            <div class="rounded-3xl border border-slate-200 p-6">Automatic locale routing with @nuxtjs/i18n.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n()
useSeo({ title: t("home.hero.title"), description: t("home.hero.subtitle"), type: "website" })
</script>
