<template>
  <Page class="container mx-auto p-4">
    <div v-if="scooter" class="flex">
      <div class="w-1/2 pr-4">
        <img :src="scooter.imageUrl" alt="Image of Scooter"
          class="w-full h-1/2 object-scale-down bg-white rounded-lg shadow-md mb-4">
      </div>
      <div class="w-1/2 h-1/2 pl-4 flex flex-col justify-between">
        <div>
          <h1 class="text-2xl font-bold mb-4">{{ scooter.model }}</h1>
          <p class="text-gray-600 mb-2">Цена аренды: {{ scooter.dailyRentalPrice }} ₽/день</p>
          <p class="text-gray-600 mb-2">Дата начала аренды: {{ startDate }}</p>
          <p :class="scooter.rented ? 'text-red-500' : 'text-green-500'">
            {{ scooter.rented ? 'Не доступен' : 'Доступен' }}
          </p>
          <div class="mt-4">
            <label class="block text-gray-700">Выберите дату окончания аренды:</label>
            <input type="date" v-model="endDate" class="w-full mt-2 p-2 border rounded" />
          </div>
          <p class="text-gray-600 mt-2">Итоговая сумма: {{ totalPrice }} ₽</p>
        </div>
        <button @click="rentScooter" :disabled="scooter.rented || !isValidEndDate"
          class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50">
          Арендовать
        </button>
      </div>
    </div>
    <div v-else>
      <p>Скутер не найден</p>
    </div>

    <!-- Модальное окно -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Результат аренды</h2>
        <p>{{ modalMessage }}</p>
        <button @click="closeModal" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Закрыть
        </button>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useScootersStore } from '@/store/scootersStore';
import { useUserStore } from '@/store/userStore';
import type { Scooter } from '@/api/scooters';
import Page from '@/components/Page.vue';

const route = useRoute();
const scootersStore = useScootersStore();
const userStore = useUserStore();
const scooter = ref<Scooter | null>(null);
const endDate = ref<string | null>(null);
const showModal = ref(false);
const modalMessage = ref("");

const startDate = ref(new Date().toISOString().split('T')[0]);
const totalPrice = computed(() => {
  try {
    if (!isValidEndDate.value) 
      throw "err"

    const start = new Date(startDate.value);
    const end = new Date(endDate.value!);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days * scooter.value?.dailyRentalPrice!;

    return '' + (scooter.value?.dailyRentalPrice! * (new Date(endDate.value!).getD() - new Date(startDate.value!).getTime()))
  } catch (err) {
    return '-'
  }

})

 const isValidEndDate = computed(() => {
   try {
    if (!endDate.value ) 
      throw "err"
    
    if (endDate.value <= startDate.value) 
      throw "err"
    return true;
   } catch (error) {
    return false
   }
 })

onMounted(async () => {
  await scootersStore.fetchScooters();
  const id = Number(route.params.id);
  scooter.value = scootersStore.getScooterById(id);
});

const rentScooter = async () => {
  if (scooter.value && endDate.value) {
    try {
      const result = await userStore.rentScooter(scooter.value.id!.toString(), endDate.value);
      scooter.value.rented = true;
      modalMessage.value = result;
    } catch (error) {
      modalMessage.value = 'Вы уже арендовали скутер, больше нельзя!';
    } finally {
      showModal.value = true;
    }
  }
};

const closeModal = () => {
  showModal.value = false;
};
</script>