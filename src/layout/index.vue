<script setup lang="ts">
import { useRoute } from "vue-router";

defineOptions({
  name: "Layout",
});

const route = useRoute();
</script>

<template>
  <div class="content-wrap">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component
          :is="Component"
          v-if="route.meta.keepAlive"
          :key="route.name"
        />
      </keep-alive>
      <component v-if="!route.meta.keepAlive" :is="Component" />
    </router-view>
  </div>
</template>

<style lang="scss">
@use "../styles/styles.scss" as *;
</style>
<style lang="scss" scoped>
.content-wrap {
  position: relative;
  width: 100%;
  height: 100%;

  :deep(.van-config-provider) {
    height: 100%;
  }
}
</style>
