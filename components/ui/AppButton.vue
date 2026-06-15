<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="mr-2">Loading...</span>
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  type: { type: String, default: "button" },
  variant: { type: String, default: "primary" },
  size: { type: String, default: "md" },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const buttonClasses = computed(() => {
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  }
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-4 text-base"
  }

  return [
    "inline-flex items-center justify-center rounded-full font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary-100",
    variants[props.variant] || variants.primary,
    sizes[props.size] || sizes.md,
    props.disabled ? "opacity-60 cursor-not-allowed" : ""
  ].join(" ")
})
</script>
