import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUiStore = defineStore('ui', () => {
  const _isLoaderVisible = ref(false);

  /* Loader */
  const isLoaderVisible = computed(() => _isLoaderVisible.value);

  function showLoader() {
    _isLoaderVisible.value = true;
  }

  function hideLoader() {
    _isLoaderVisible.value = false;
  }

  return {
    showLoader,
    hideLoader,
    isLoaderVisible
  };
});