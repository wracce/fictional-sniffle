import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { CreateUserDto, RegisterResponseDto, UserProfileResponseDto } from "@/api/users";
import { authApi, usersApi } from "@/api";
import router from "@/router";
import { useUserStore } from "./userStore";

export const useAuthStore = defineStore("auth", () => {
  const userStore = useUserStore()
  const token = ref<string | null>(localStorage.getItem("authToken"));
  const error = ref<string>('');

  const isLoggedIn = computed(() => !!token.value);

  async function login(email: string, password: string) {


    const response = await authApi.authControllerSignIn({ email, password }, { validateStatus: () => true });

    if (response.status == 500) {
      error.value = "Ошибка входа в систему";
      return;
    }
    if (response.status == 401 || response.status == 403) {
      error.value = "Неверный логин или пароль";
      return;
    }
    if (response.status != 200) {
      console.error("Неизвестная ошибка:", response);
      return;
    }

    const responseData = response.data;

    token.value = responseData.access_token;

    localStorage.setItem("authToken", responseData.access_token);

    // await fetchUser();

    error.value = "";

    router.push({ name: "home" });
  }

  async function register(createUserDto: CreateUserDto) {
    const response = await usersApi.usersControllerRegister(createUserDto, { validateStatus: () => true });
    if (response.status === 200 || response.status === 201) {
      error.value = "";
      await login(createUserDto.email, createUserDto.password);
    }
    
    error.value = "Email уже занят попробуйте иной";
  }

  function logout() {
    userStore.user = null;
    token.value = null;
    localStorage.removeItem("authToken");
    router.push({ name: "login" });
  }

  async function restoreSession() {
    if (token.value) {
      try {
        // await fetchUser();
      } catch (error) {
        logout();
      }
    }
  }

  return {
    // user,
    token,
    isLoggedIn,
    error,
    login,
    register,
    logout,
    restoreSession,
  };
});

