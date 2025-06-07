<template>
  <div class="container mx-auto p-4 pt-10">
    <div v-if="scootersStore.scooters" class="grid gap-4">
      <div v-for="scooter in scootersStore.scooters" :key="scooter.id"
        class="flex bg-white rounded-lg shadow-md overflow-hidden h-64 w-2/3 m-auto hover:border-blue-500 border-2">
        <img :src="scooter.imageUrl" alt="Image of Scooter" class="w-2/3 object-contain">
        <div class="w-1/3 p-4 flex flex-col justify-between">
          <div>
            <h2 class="text-lg font-bold mb-2">{{ scooter.model }}</h2>
            <p class="text-gray-600 mb-4">Цена аренды: {{ scooter.dailyRentalPrice }} ₽/день</p>
            <p :class="scooter.rented ? 'text-red-500' : 'text-green-500'">
            {{ scooter.rented ? 'Не доступен' : 'Доступен' }}
          </p>
          </div>
          <router-link :to="{ name: 'scooter', params: { id: scooter.id } }"
            class="text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Подробнее
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Загрузка данных...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Page from '@/components/Page.vue';
import { useScootersStore } from '@/store/scootersStore';
import { onMounted } from 'vue';

const scootersStore = useScootersStore();

onMounted(async () => {
  await scootersStore.fetchScooters();
});
</script>
