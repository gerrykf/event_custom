import { computed, onMounted, ref } from "vue";
import { useFallingObjAnimate } from "../hooks/useFallingObjAnimate";
import { useTreeAnimate } from "../hooks/useTreeAnimate";
import { showConfirmAlert } from "@/hooks/useConfirmAlert";
import { formatAmount } from "@/utils/tools";
import { startCoinExplosion } from "@/hooks/useCoinExplosion";
import { showSuccessAlert } from "@/hooks/useSuccessAlert";
import { useShakeTreeAnimate } from "../hooks/useStartAnimate";
import { useAppStore } from "@/store";
import { storeToRefs } from "pinia";
import { useSwitchLevelAnimation } from "../hooks/useSwitchLevelAnimate";

export const useCoinTreeHook = () => {
  const appStore = useAppStore();
  const { levelList, userInfo } = storeToRefs(appStore);
  const { runTreeAnimation, stopTreeAnimation } = useTreeAnimate();

  const fallingObjCanvasRef = ref<HTMLCanvasElement | null>(null);
  const { start: startFalling, stop: stopFalling } =
    useFallingObjAnimate(fallingObjCanvasRef);

  const coinFrames = [
    "https://d3ezwcpy5gysd4.cloudfront.net/E10/coin_1.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/E10/coin_2.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/E10/coin_3.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/E10/coin_4.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/E10/coin_5.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/E10/coin_6.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/E10/coin_7.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/E10/coin_8.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/E10/coin_9.png",
  ];

  const goal = computed(() => {
    return (
      userInfo.value.deposit >= currentLevelData.value?.deposit &&
      userInfo.value.bet >= currentLevelData.value?.bet
    );
  });

  const thresholdContainerRef = ref<HTMLElement | null>(null);

  const { switchToLevel } = useSwitchLevelAnimation();
  /**
   * 切换当前级别数据
   * @param level 级别（1, 2, 3）
   */
  const switchLevelData = (level: number, direction: "prev" | "next") => {
    console.log(`切换到第 ${level} 级数据，方向：${direction}`);

    if (!thresholdContainerRef.value) return;

    switchToLevel(thresholdContainerRef.value, level);

    const levelData = levelList.value.find((item) => item.level === level);
    if (levelData) {
      currentLevelData.value = levelData;
    }
  };

  const prevLevel = () => {
    if (currentLevelData.value.level <= 1) return;

    const currentLevel = currentLevelData.value.level;
    switchLevelData(currentLevel - 1, "prev");
  };

  const nextLevel = () => {
    if (currentLevelData.value.level >= levelList.value.length) return;

    const currentLevel = currentLevelData.value.level;
    switchLevelData(currentLevel + 1, "next");
  };

  const currentLevelData = ref(levelList.value[1]); // 默认使用第一个级别的数据
  const { runShakeTree, stopShakeTree } = useShakeTreeAnimate();

  const isAnimating = ref(false);
  const onStart = () => {
    if (isAnimating.value) return;
    showConfirmAlert({
      deposit: formatAmount(currentLevelData.value.deposit),
      bet: formatAmount(currentLevelData.value.bet),
      onConfirm: async () => {
        isAnimating.value = true;

        stopTreeAnimation();
        stopFalling();

        runShakeTree();
        startFalling(true, 2000).then(() => {
          runTreeAnimation();
          isAnimating.value = false;

          stopShakeTree();

          startCoinExplosion(coinFrames);
          showSuccessAlert({
            bonus: formatAmount(currentLevelData.value.award),
            onConfirm: () => {
              console.log("确认按钮被点击");

              startFalling();
            },
          });
        });
      },
    });
  };

  onMounted(() => {
    switchToLevel(thresholdContainerRef.value, currentLevelData.value.level);
    runTreeAnimation();
    startFalling();
  });

  return {
    currentLevelData,
    fallingObjCanvasRef,
    thresholdContainerRef,
    goal,
    prevLevel,
    nextLevel,
    onStart,
  };
};
