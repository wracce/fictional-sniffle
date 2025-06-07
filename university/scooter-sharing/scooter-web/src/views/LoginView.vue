<template>
  <Page variant="flexible">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
      <h2 class="text-2xl font-bold text-center">Вход</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Имя пользователя</label>
          <input v-model="username" type="email" class="w-full p-2 mt-1 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Пароль</label>
          <input v-model="password" type="password" class="w-full p-2 mt-1 border rounded-md" required />
        </div>
        <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700">
          Войти
        </button>
      </form>
      <div v-if="authStore.error" class="mt-4 text-center text-red-500">
        {{ authStore.error }}
      </div>
      <div class="mt-4 text-center">
        <router-link to="/register" class="text-blue-500 hover:underline">Зарегистрироваться</router-link>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/components/Page.vue';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const uiStore = useUiStore();

const username = ref('');
const password = ref('');

const handleLogin = async () => {
  uiStore.showLoader();
  await authStore.login(username.value, password.value);
  uiStore.hideLoader();
  console.log(authStore.isLoggedIn);

  if (authStore.isLoggedIn)
    router.push({ name: 'home' });
};
</script>
