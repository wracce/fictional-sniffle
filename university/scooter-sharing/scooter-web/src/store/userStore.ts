import { usersApi } from "@/api";
import type { RentScooterDto, RentScooterResponseDto, UserProfileResponseDto } from "@/api/users";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./authStore";
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {
    const authStore = useAuthStore();
    const router = useRouter();

    const user = ref<UserProfileResponseDto | null>(null);
    const error = ref<string>("");


    async function fetchUser() {
        if (!user) {
            return;
        }
        if (!authStore.token) {
            throw new Error("No token available");
        }

        const response = await usersApi.usersControllerGetProfile();
        const responseData = response.data as UserProfileResponseDto;
        user.value = responseData;
    }

    async function makeRequest(value: string) {
        const response = await usersApi.usersControllerCreateRequest({ value }, { validateStatus: () => true });
        
    }


    async function rentScooter(id: string,endDate:string): Promise<string> {
        const response = await usersApi.usersControllerRentScooter(id,{endDate:endDate},{
            validateStatus: () => true
        });
        if (response.status !== 200) {
            throw new Error("Невозможно арендовать самокат, вы уже его арендовливали");
        }

        const responseData = response.data;

        const message = `Аренда успешно оформлена!
        Дата начала: ${responseData.startDate.split('T')[0]}\n
        Дата окончания: ${responseData.endDate.split('T')[0]}\n
        Количество дней: ${responseData.count}\n
        Итоговая сумма: ${responseData.price} ₽`;

        return message;
    }

    return {
        user,
        fetchUser,
        makeRequest,
        rentScooter,

    }
});