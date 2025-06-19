import { useAppStore } from "@/store";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { computed, defineAsyncComponent } from "vue";

const CoinTree = defineAsyncComponent(
  () => import("@/views/coin-tree/index.vue")
);
const CatchFish = defineAsyncComponent(
  () => import("@/views/catch-fish/index.vue")
);

const eventMapping = {
  E10: CoinTree,
  E23: CatchFish,
};

export const useEventBaseHook = () => {
  const appStore = useAppStore();
  const { eventInfo } = storeToRefs(appStore);

  const route = useRoute();
  const eventId = route.params.id as string;

  const currentComp = computed(() => {
    return eventMapping[eventId];
  });

  const foundEvent = computed(() => {
    return Object.keys(eventMapping).includes(eventId);
  });

  const setEventData = () => {
    switch (eventId) {
      case "E10":
        appStore.setEventInfo({
          id: "E10",
          name: "摇钱树",
          startTime: "02/27",
          endTime: "03/05",
          endReceiveTime: "03/07",
        });
        break;
      case "E23":
        appStore.setEventInfo({
          id: "E23",
          name: "百万捕鱼",
          startTime: "08/11",
          endTime: "08/16",
          endReceiveTime: "08/17",
        });
        break;
      default:
        appStore.setEventInfo({
          id: "E23",
          name: "百万捕鱼",
          startTime: "08/11",
          endTime: "08/16",
          endReceiveTime: "08/17",
        });
        break;
    }
  };

  const mockLevelList = () => {
    appStore.setLevelList([
      {
        level: 1,
        award: 688,
        deposit: 88,
        bet: 888,
      },
      {
        level: 2,
        award: 888,
        deposit: 188,
        bet: 1888,
      },
      {
        level: 3,
        award: 988,
        deposit: 288,
        bet: 2888,
      },
      {
        level: 4,
        award: 68888,
        deposit: 888,
        bet: 5888,
      },
      {
        level: 5,
        award: 88888,
        deposit: 1888,
        bet: 8888,
      },
      {
        level: 6,
        award: 98888,
        deposit: 2888,
        bet: 18888,
      },
      {
        level: 7,
        award: 688888,
        deposit: 8888,
        bet: 58888,
      },
      {
        level: 8,
        award: 888888,
        deposit: 18888,
        bet: 88888,
      },
      {
        level: 9,
        award: 988888,
        deposit: 28888,
        bet: 188888,
      },
      {
        level: 10,
        award: 68888888,
        deposit: 88888,
        bet: 588888,
      },
    ]);
  };

  return {
    foundEvent,
    eventInfo,
    eventId,
    currentComp,
    setEventData,
    mockLevelList,
  };
};
