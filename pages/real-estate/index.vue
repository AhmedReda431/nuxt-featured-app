<script setup lang="ts">
import { buildings } from '~/data/buildings'

const { t } = useI18n()

useAppSeo({
  title: t('realEstate.title'),
  description: t('realEstate.subtitle'),
})
</script>

<template>
  <section class="section">
    <div class="container">
      <UiSectionTitle :title="t('realEstate.title')" :subtitle="t('realEstate.subtitle')" />
      <div class="grid grid--2">
        <RealestateBuildingCard
          v-for="building in buildings"
          :key="building.id"
          :building="building"
        />
      </div>
    </div>
  </section>
</template>
