<script setup lang="ts">
const props = defineProps<{
  images: string[]
  alt: string
}>()

const currentIndex = ref(0)
const sliderMain = ref<HTMLElement | null>(null)

function select(index: number) {
  currentIndex.value = index
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

// Touch support
const { direction, isSwiping } = useSwipe(sliderMain, {
  onSwipeEnd: (e, dir) => {
    if (dir === 'left') next()
    else if (dir === 'right') prev()
  },
})
</script>

<template>
  <div class="product-slider" role="region" aria-label="Product images">
    <div ref="sliderMain" class="product-slider__main">
      <UiLazyImage
        :src="images[currentIndex]"
        :alt="`${alt} - image ${currentIndex + 1}`"
        :width="800"
        :height="600"
        loading="eager"
      />
      <button v-if="images.length > 1" type="button" class="product-slider__nav product-slider__nav--prev" aria-label="Previous image" @click="prev">&#8249;</button>
      <button v-if="images.length > 1" type="button" class="product-slider__nav product-slider__nav--next" aria-label="Next image" @click="next">&#8250;</button>
    </div>
    <div v-if="images.length > 1" class="product-slider__thumbs" role="tablist">
      <button
        v-for="(img, index) in images"
        :key="index"
        type="button"
        role="tab"
        class="product-slider__thumb"
        :class="{ 'product-slider__thumb--active': index === currentIndex }"
        :aria-selected="index === currentIndex"
        :aria-label="`Image ${index + 1}`"
        @click="select(index)"
      >
        <UiLazyImage :src="img" :alt="`${alt} thumbnail ${index + 1}`" :width="80" :height="80" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-slider__main {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--color-bg-alt);
}

.product-slider__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.9);
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: var(--shadow-md);
}

.product-slider__nav--prev { left: 0.75rem; }
.product-slider__nav--next { right: 0.75rem; }

.product-slider__thumbs {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  overflow-x: auto;
}

.product-slider__thumb {
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: none;
}

.product-slider__thumb--active {
  border-color: var(--color-primary);
}
</style>
