<script setup lang="ts">
import Header from "../header/index.vue";
import CustomWarn from "@/layout/components/CustomWarn.vue";

defineOptions({
  name: "EventWrapper",
});
</script>
<template>
  <div class="event-wrap">
    <!-- <CustomWarn /> -->

    <Header />

    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.event-wrap {
  position: relative;
  min-width: 480px;
  min-height: 100vh;
  overflow: hidden;
}
</style>
