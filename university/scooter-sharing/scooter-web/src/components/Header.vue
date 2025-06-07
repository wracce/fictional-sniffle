<template>
    <header class="bg-white py-4 shadow-md px-6 border-b-2 border-b-gray-700-100">
        <nav class="container mx-auto flex justify-between items-center">
            <div class="flex items-center gap-4">
                <RouterLink to="/home" class="text-blue-500 hover:underline" active-class="font-bold text-blue-700">Главная</RouterLink>
                <RouterLink to="/scooters" v-if="authStore.isLoggedIn" class="ml-4 text-blue-500 hover:underline" active-class="font-bold text-blue-700">Скутеры</RouterLink>
                <RouterLink to="/contact" v-if="authStore.isLoggedIn" class="ml-4 text-blue-500 hover:underline" active-class="font-bold text-blue-700">Анонимный донос</RouterLink>
            </div>
            <div class="flex items-center space-x-4">
                <RouterLink v-if="!authStore.isLoggedIn" to="/login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Войти
                </RouterLink>
                <RouterLink v-if="authStore.isLoggedIn" to="/profile" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Личный кабинет
                </RouterLink>
                <button v-if="authStore.isLoggedIn" class="text-red-500 hover:text-red-700" @click="logout" title="Выйти">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/authStore';


const authStore = useAuthStore();

async function logout() {
    await authStore.logout();
}
</script>
