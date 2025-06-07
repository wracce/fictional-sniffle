<template>
  <Page variant="flexible" class="p-8">
    <div class="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-4">Анонимный донос</h1>
      <span class="text mb-4">Выпусти пар, расскажи всё что думаешь о нашей компании!</span>
      <form @submit.prevent="submitReport">
        <textarea 
          v-model="reportText" 
          class="w-full p-2 mt-1 border rounded-md"
          rows="6"
          placeholder="Введите текст вашего доноса"
          required
        ></textarea>
        <button
          type="submit"
          class="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
        >
          Отправить
        </button>
      </form>
      <div v-if="message" class="mt-4 text-center text-green-500">
        {{ message }}
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/components/Page.vue';
import { useUserStore } from '@/store/userStore';
import { ref } from 'vue';

const userStore = useUserStore();
const reportText = ref('');
const message = ref('');

const submitReport = async () => {
  try {
    await userStore.makeRequest(reportText.value);
    message.value = 'Ваш донос был успешно отправлен.';
    reportText.value = '';
  } catch (error) {
    message.value = 'Произошла ошибка при отправке доноса.';
  }
};
</script>

<style scoped>
/* Добавьте стили, если необходимо */
</style>