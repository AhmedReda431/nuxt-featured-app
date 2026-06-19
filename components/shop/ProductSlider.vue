<script setup>
const props = defineProps({
  images: { type: Array, required: true },
  alt: { type: String, required: true },
})

const currentIndex = ref(0)
const trackRef = ref(null)

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

function goTo(index) {
  currentIndex.value = index
}

useSwipe(trackRef, {
  onSwipeEnd: (_event, dir) => {
    if (dir === 'left') next()
    else if (dir === 'right') prev()
  },
})
</script>

<template>
  <div class="product-slider">
    <div ref="trackRef" class="product-slider__main">
      <TransitionGroup name="fade-slide">
        <UiLazyImage
          v-for="(image, index) in images"
          v-show="index === currentIndex"
          :key="image"
          :src="image"
          :alt="`${alt} - image ${index + 1}`"
          :width="600"
          :height="600"
          :loading="index === 0 ? 'eager' : 'lazy'"
          class="product-slider__image"
        />
      </TransitionGroup>

      <button v-if="images.length > 1" type="button" class="product-slider__btn product-slider__btn--prev" aria-label="Previous image" @click="prev">
        &#8249;
      </button>
      <button v-if="images.length > 1" type="button" class="product-slider__btn product-slider__btn--next" aria-label="Next image" @click="next">
        &#8250;
      </button>
    </div>

    <div v-if="images.length > 1" class="product-slider__thumbs" role="tablist" aria-label="Product images">
      <button
        v-for="(image, index) in images"
        :key="image"
        type="button"
        role="tab"
        class="product-slider__thumb"
        :class="{ 'product-slider__thumb--active': index === currentIndex }"
        :aria-selected="index === currentIndex"
        :aria-label="`View image ${index + 1}`"
        @click="goTo(index)"
      >
        <UiLazyImage :src="image" :alt="''" :width="80" :height="80" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-slider__main {
  position: relative;
  aspect-ratio: 1;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg-alt);
  touch-action: pan-y;
}

.product-slider__image {
  position: absolute;
  inset: 0;
}

.product-slider__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.9);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  z-index: 2;
}

.product-slider__btn--prev { left: 1rem; }
.product-slider__btn--next { right: 1rem; }

.product-slider__thumbs {
  display: flex;
  gap: 0.625rem;
  margin-top: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.product-slider__thumb {
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid transparent;
  padding: 0;
  cursor: pointer;
  background: var(--color-bg-alt);
}

.product-slider__thumb--active {
  border-color: var(--color-primary);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
}
</style>
