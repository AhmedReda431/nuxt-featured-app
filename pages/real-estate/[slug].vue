<template>
  <div class="section-padding">
    <div class="container-custom">
      <!-- Image Gallery -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Swiper>
          <SwiperSlide v-for="img in building.images" :key="img">
            <img :src="img" class="rounded-2xl" />
          </SwiperSlide>
        </Swiper>
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ building.title }}</h1>
          <p class="text-2xl text-primary-600 font-bold mb-4">${{ building.price.toLocaleString() }}</p>
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <Icon name="heroicons:bed" class="w-6 h-6 mb-2" />
              <span>{{ building.bedrooms }} Beds</span>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <Icon name="heroicons:bathtub" class="w-6 h-6 mb-2" />
              <span>{{ building.bathrooms }} Baths</span>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <Icon name="heroicons:square-3-stack-3d" class="w-6 h-6 mb-2" />
              <span>{{ building.area }} sqft</span>
            </div>
          </div>
          <button @click="toggleFavorite" class="btn-outline w-full">
            {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>