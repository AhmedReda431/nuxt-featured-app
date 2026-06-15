<script setup lang="ts">
const { t } = useI18n()

const slides = [
  { id: 1, image: 'https://picsum.photos/seed/slide1/900/500', title: 'E-Commerce Ready' },
  { id: 2, image: 'https://picsum.photos/seed/slide2/900/500', title: 'Real Estate Module' },
  { id: 3, image: 'https://picsum.photos/seed/slide3/900/500', title: 'Healthcare Compatible' },
  { id: 4, image: 'https://picsum.photos/seed/slide4/900/500', title: 'Blog & Content' },
]

const currentIndex = ref(0)
const sliderTrack = ref<HTMLElement | null>(null)
let intervalId: ReturnType<typeof setInterval> | null = null

function next() {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
}

function goTo(index: number) {
  currentIndex.value = index
}

// Touch support
const { direction, isSwiping } = useSwipe(sliderTrack, {
  onSwipeEnd: (e, dir) => {
    if (dir === 'left') next()
    else if (dir === 'right') prev()
  },
})

onMounted(() => {
  intervalId = setInterval(next, 5000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <section class="slider section section--alt" aria-labelledby="slider-title">
    <div class="container">
      <UiSectionTitle id="slider-title" :title="t('home.sliderTitle')" centered />

      <div class="slider__wrapper" role="region" aria-roledescription="carousel" :aria-label="t('home.sliderTitle')">
        <div ref="sliderTrack" class="slider__track">
          <TransitionGroup name="slide">
            <div
              v-for="(slide, index) in slides"
              v-show="index === currentIndex"
              :key="slide.id"
              class="slider__slide"
            >
              <UiLazyImage :src="slide.image" :alt="slide.title" :width="900" :height="500" />
              <div class="slider__caption">
                <h3>{{ slide.title }}</h3>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <button type="button" class="slider__btn slider__btn--prev" aria-label="Previous slide" @click="prev">
          &#8249;
        </button>
        <button type="button" class="slider__btn slider__btn--next" aria-label="Next slide" @click="next">
          &#8250;
        </button>

        <div class="slider__dots" role="tablist">
          <button
            v-for="(slide, index) in slides"
            :key="slide.id"
            type="button"
            role="tab"
            class="slider__dot"
            :class="{ 'slider__dot--active': index === currentIndex }"
            :aria-selected="index === currentIndex"
            :aria-label="`Slide ${index + 1}`"
            @click="goTo(index)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slider__wrapper {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.slider__track {
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--color-bg-alt);
}

.slider__slide {
  position: absolute;
  inset: 0;
}

.slider__caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 2rem;
  background: linear-gradient(transparent, rgb(0 0 0 / 0.7));
  color: #fff;
}

.slider__caption h3 {
  margin: 0;
  font-size: 1.5rem;
}

.slider__btn {
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
  transition: background var(--transition);
}

.slider__btn:hover {
  background: #fff;
}

.slider__btn--prev { left: 1rem; }
.slider__btn--next { right: 1rem; }

.slider__dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.slider__dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  border: none;
  background: rgb(255 255 255 / 0.5);
  cursor: pointer;
  padding: 0;
}

.slider__dot--active {
  background: #fff;
  transform: scale(1.2);
}
</style>
