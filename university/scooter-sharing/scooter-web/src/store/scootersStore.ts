import { scootersApi } from "@/api";
import type { Scooter, ScooterDto } from "@/api/scooters";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useScootersStore = defineStore('scooters', () => {
    const scooters = ref<Scooter[]|null>(null);
    const error = ref<string>('');

    async function fetchScooters() {

        const response = await scootersApi.getAllScooters();
        const responseData = response.data

        scooters.value = responseData;
    }

    function getScooterById(id: number):Scooter|null {
        const res =  scooters.value?.find(scooter => scooter.id === id);
        return res?res:null;
    }

    async function getMyRent():Promise<ScooterDto|null> {
        try {
            const scooterResponse = await scootersApi.getMyRent();   
            return scooterResponse.data;
        } catch (error) {
            return null
        }
    }

    async function cancelRent() {
        const resp = await scootersApi.cancelRent();
        await fetchScooters();
    }

    return {
        scooters,
        error,
        getScooterById,
        fetchScooters,
        getMyRent,
        cancelRent
    }
})