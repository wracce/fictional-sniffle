<template>
  <Page variant="flexible">  
    <!-- Левая часть с изображением и градиентом -->
    <div class="w-2/3 relative h-screen">
      <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-transparent to-gray-100"></div>
    </div>
    
    <!-- Правая часть с приветственным текстом и преимуществами -->
    <div class="w-2/3 flex flex-col items-center justify-center p-8">
      <div class="max-w-md space-y-6">
        <h1 class="text-4xl font-bold text-gray-900">Добро пожаловать!</h1>
        <p class="text-lg text-gray-700">
          Откройте для себя лучшие предложения по аренде самокатов.
        </p>
        <p class="text-xl font-semibold text-gray-800">
          "Аренда самокатов на любой вкус и бюджет!"
        </p>
        <div class="grid gap-6 mt-6">
          <div class="flex items-center p-4 bg-white rounded-md shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p class="ml-4 text-gray-700">Удобное и быстрое оформление аренды.</p>
          </div>
          <div class="flex items-center p-4 bg-white rounded-md shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p class="ml-4 text-gray-700">Широкий выбор современных самокатов.</p>
          </div>
          <div class="flex items-center p-4 bg-white rounded-md shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p class="ml-4 text-gray-700">Доступные цены и гибкие тарифы.</p>
          </div>

        </div>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/components/Page.vue';

const imageUrl = 'https://opis-cdn.tinkoffjournal.ru/mercury/in-kicksharing.kpau4blkn9zu..jpg?preset=image_1280w_2x'; // Замените на путь к вашему изображению
</script>
