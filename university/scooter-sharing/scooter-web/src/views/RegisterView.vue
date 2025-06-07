<template>
    <Page variant="flexible">
      <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
        <h2 class="text-2xl font-bold text-center">Регистрация</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">
              Имя <span class="text-red-500">*</span>
            </label>
            <input v-model="firstname" type="text" class="w-full p-2 mt-1 border rounded-md" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">
              Фамилия <span class="text-red-500">*</span>
            </label>
            <input v-model="lastname" type="text" class="w-full p-2 mt-1 border rounded-md" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Отчество</label>
            <input v-model="middlename" type="text" class="w-full p-2 mt-1 border rounded-md" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">
              Электронная почта <span class="text-red-500">*</span>
            </label>
            <input v-model="email" type="email" class="w-full p-2 mt-1 border rounded-md" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">
              Пароль <span class="text-red-500">*</span>
            </label>
            <input v-model="password" type="password" class="w-full p-2 mt-1 border rounded-md" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Телефон</label>
            <input v-model="phone" type="text" class="w-full p-2 mt-1 border rounded-md" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Дата рождения</label>
            <input v-model="birthday" type="date" class="w-full p-2 mt-1 border rounded-md" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Адрес</label>
            <input v-model="address" type="text" class="w-full p-2 mt-1 border rounded-md" />
          </div>
          <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700">
            Зарегистрироваться
          </button>
        </form>
        <div v-if="authStore.error" class="mt-4 text-center text-red-500">
          {{ authStore.error }}
        </div>
      </div>
    </Page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  import type { CreateUserDto } from '@/api/users';
  import { useAuthStore } from '@/store/authStore';
  import { useUiStore } from '@/store/uiStore';
import Page from '@/components/Page.vue';
  
  const authStore = useAuthStore();
  const uiStore = useUiStore();
  
  const email = ref('');
  const password = ref('');
  const firstname = ref('');
  const middlename = ref('');
  const lastname = ref('');
  const phone = ref('');
  const birthday = ref('');
  const address = ref('');
  
  const handleRegister = async () => {
    uiStore.showLoader();
    const userData: CreateUserDto = {
      email: email.value,
      password: password.value,
      firstname: firstname.value,
      middlename: middlename.value || undefined,
      lastname: lastname.value,
      phone: phone.value || undefined,
      birthday: birthday.value || undefined,
      address: address.value || undefined,
    };
    await authStore.register(userData);
    uiStore.hideLoader();
  };
  </script>