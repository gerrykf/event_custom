<script setup lang="ts">
import Warning from "../components/Warning.vue";
import { onMounted } from "vue";
import { useAppStore } from "@/store";
import { useEventBaseHook } from "./utils/useEventBaseHook";
import { getEventImages } from "@/mock/eventData";
import { useAutoUpdate } from "@/hooks/useAutoUpdate";

defineOptions({
  name: "EventBase",
});

const appStore = useAppStore();

const {
  foundEvent,
  eventInfo,
  eventId,
  currentComp,
  setEventData,
  mockLevelList,
} = useEventBaseHook();

const { checkVersion } = useAutoUpdate();

onMounted(() => {
  mockLevelList();
  setEventData();

  appStore.setEventId(eventId || eventInfo.value.id);

  const eventImages = getEventImages(eventId || eventInfo.value.id);
  appStore.setEventImages(eventImages);

  checkVersion();
});
</script>
<template>
  <div class="event-base-wrap">
    <component v-if="foundEvent" :is="currentComp" />
    <Warning v-else></Warning>
  </div>
</template>
<style scoped lang="scss">
.event-base-wrap {
  position: relative;
  min-width: 480px;
  min-height: 100vh;
  overflow: hidden;
}
</style>
