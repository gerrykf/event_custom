<script setup lang="ts">
import { useAppStore } from "@/store";
import { storeToRefs } from "pinia";

defineOptions({
  name: "CustomWarn",
});

const appStore = useAppStore();
const { eventInfo } = storeToRefs(appStore);
</script>
<template>
  <div class="custom-warning-wrap">
    <div class="title">营运红包</div>
    <div class="slogan">{{ eventInfo?.name }}</div>
  </div>
</template>
<style scoped lang="scss">
.custom-warning-wrap {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 5px 30px;
  text-align: center;
  line-height: 1.5;
  background-color: #ffffffe6;
  border-radius: 50px;
  z-index: 12;
  box-shadow: 1px 1px 10px #0009;

  .title {
    font-size: 1.1rem;
    font-weight: bolder;
    color: #2b2b2b;
  }

  .slogan {
    font-size: 0.9rem;
    font-weight: bolder;
    color: red;
  }
}

@media (min-width: 576px) {
  .custom-warning-wrap {
    left: calc((100% - 576px) / 2 + 20px);
  }
}
</style>
