<script setup>
const props = defineProps({
  variants: { type: Array, required: true }, // [{ name, hex }]
  modelValue: { type: String, default: null },
})

const emit = defineEmits(['update:modelValue'])

const COLOR_HEX = {
  black: '#1f2937',
  white: '#f8fafc',
  red: '#ef4444',
  blue: '#2563eb',
  green: '#16a34a',
  yellow: '#facc15',
  pink: '#ec4899',
  gray: '#9ca3af',
  grey: '#9ca3af',
  brown: '#92400e',
  beige: '#e7d8c3',
  navy: '#1e3a8a',
  silver: '#cbd5e1',
  gold: '#d4af37',
  purple: '#7c3aed',
  orange: '#f97316',
}

function hexFor(name) {
  return COLOR_HEX[name.toLowerCase()] || '#94a3b8'
}
</script>

<template>
  <div class="variant-selector" role="radiogroup" aria-label="Color">
    <button
      v-for="variant in variants"
      :key="variant"
      type="button"
      role="radio"
      class="variant-swatch"
      :class="{ 'variant-swatch--active': modelValue === variant }"
      :aria-checked="modelValue === variant"
      :aria-label="variant"
      :style="{ '--swatch-color': hexFor(variant) }"
      :title="variant"
      @click="emit('update:modelValue', variant)"
    />
  </div>
</template>

<style scoped lang="scss">
.variant-selector {
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
}

.variant-swatch {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--swatch-color);
  border: 2px solid var(--color-border);
  cursor: pointer;
  position: relative;
  transition: transform var(--transition);
}

.variant-swatch:hover {
  transform: scale(1.08);
}

.variant-swatch--active {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.variant-swatch--active::after {
  content: '✓';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-shadow: 0 1px 2px rgb(0 0 0 / 0.4);
  font-size: 0.875rem;
}
</style>
