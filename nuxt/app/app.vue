<template>
  <NuxtLayout>
    <Loader :visible="loading" />
    <NuxtPage />
    <ErrorModal v-if="error" :message="error"  @retry="handleRetry" @close="clearError" />
  </NuxtLayout>
</template>

<script setup>
import { computed } from "vue";
import uiStore from "./store/ui";
import Loader from "./components/Loader.vue";
import ErrorModal from "./components/ErrorModal.vue";

const loading = computed(() => uiStore.state.loading);
const error = computed(() => uiStore.state.error);
const retryFn = computed(() => uiStore.state.retryFn);

const handleRetry = () => {
  if (retryFn.value) retryFn.value();
};

const clearError = () => uiStore.commit("clearError");
</script>