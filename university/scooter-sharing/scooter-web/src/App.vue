<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Header from './components/Header.vue';
import Loader from './components/Loader.vue';
import { useUiStore } from './store/uiStore';

const route = useRoute()
const ui = useUiStore()

</script>

<template>
  <Header v-if="!route.meta.hideHeader" class="h-[72px]" />
  <div
    :class="[!route.meta.hideHeader ? 'h-[calc(100vh-72px)]' : 'h-full', 'main-container', 'relative', 'overflow-hidden','']">
    <RouterView />
  </div>
  <Loader v-if="ui.isLoaderVisible" />
</template>