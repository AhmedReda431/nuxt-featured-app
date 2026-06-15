<script setup lang="ts">
interface Props {
  animation?: 'fade-in' | 'slide-in-left' | 'slide-in-right'
}

const props = withDefaults(defineProps<Props>(), {
  animation: 'fade-in',
})

const sectionRef = ref<HTMLElement | null>(null)
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
