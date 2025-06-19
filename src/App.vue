<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfigHooks } from "./hooks/useConfig";
import Layout from "./layout/index.vue";
import { useAppStore } from "./store";
import LoadingWrapper from "./components/LoadingWrapper.vue";

defineOptions({
  name: "App",
});

const appStore = useAppStore();
const { loading } = storeToRefs(appStore);

useConfigHooks();
</script>

<template>
  <LoadingWrapper v-if="loading" />
  <Layout v-else />
</template>
