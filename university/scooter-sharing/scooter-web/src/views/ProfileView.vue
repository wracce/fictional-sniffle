<script setup lang="ts">
import Page from '@/components/Page.vue';
import { useUserStore } from '@/store/userStore';
import { useScootersStore } from '@/store/scootersStore';
import { computed, onMounted, ref } from 'vue';
import type { ScooterDto } from '@/api/scooters';

const userStore = useUserStore();
const scootersStore = useScootersStore();

const user = computed(() => userStore.user);
const currentRent = ref<ScooterDto | null>(null);
const isCancelling = ref(false);

onMounted(async () => {
  await userStore.fetchUser();
  currentRent.value = await scootersStore.getMyRent();
});

async function cancelRent() {
  try {
    isCancelling.value = true;
    await scootersStore.cancelRent();
    currentRent.value = null; // Обновляем локальное состояние после отмены
  } catch (error) {
    console.error('Ошибка при отмене ренты:', error);
  } finally {
    isCancelling.value = false;
  }
}
</script>

<template>
  <Page variant="flexible" class="p-4">
    <div class="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-4">Профиль пользователя</h1>
      <div>
        <p class="mb-2"><strong>Имя:</strong> {{ user?.firstname }} {{ user?.lastname }} {{ user?.middlename }}</p>
        <p class="mb-2"><strong>Email:</strong> {{ user?.email }}</p>
        <p class="mb-2"><strong>Телефон:</strong> {{ user?.phone }}</p>
        <p class="mb-2"><strong>Дата рождения:</strong> {{ user?.birthday.split('T')[0] }}</p>
        <p class="mb-2"><strong>Адрес:</strong> {{ user?.address }}</p>
        <p class="mb-2"><strong>Баланс:</strong> {{ user?.money }}</p>
      </div>

      <!-- Блок для отображения ренты -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-4">Текущая рента</h2>
        <template v-if="currentRent">
          <div class="border rounded p-4 shadow">
            <p><strong>Модель:</strong> {{ currentRent.model }}</p>
            <p><strong>Цена за день:</strong> {{ currentRent.dailyRentalPrice }} ₽</p>
            <p><strong>Цвет:</strong> {{ currentRent.color }}</p>
            <img :src="currentRent.imageUrl" alt="Изображение скутера" class="mt-4 w-full rounded shadow" />
          </div>
          <button 
            class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed" 
            @click="cancelRent" 
            :disabled="isCancelling"
          >
            {{ isCancelling ? 'Отмена...' : 'Отменить ренту' }}
          </button>
        </template>
        <template v-else>
          <p class="text-gray-500">У вас нет текущей ренты.</p>
        </template>
      </div>
    </div>
  </Page>
</template>
