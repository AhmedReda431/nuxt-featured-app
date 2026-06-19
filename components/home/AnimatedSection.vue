<script setup>
const props = defineProps({
  animation: {
    type: String,
    default: 'fade-in', // 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'zoom-in'
  },
})

const sectionRef = ref(null)
const { observeElement } = useScrollAnimation()

onMounted(() => {
  if (sectionRef.value) {
    sectionRef.value.classList.add(props.animation)
    observeElement(sectionRef.value)
  }
})
</script>

<template>
  <section ref="sectionRef" class="animated-section">
    <slot />
  </section>
</template>
