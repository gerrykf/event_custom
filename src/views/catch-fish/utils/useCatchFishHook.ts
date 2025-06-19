import { showConfirmAlert } from "@/hooks/useConfirmAlert";
import { useDeviceType } from "@/hooks/useDeviceType";
import { formatAmount } from "@/utils/tools";
import { computed, ref } from "vue";
import { useBulletAnimation } from "../hooks/useBulletAnimation";
import { startCoinExplosion } from "@/hooks/useCoinExplosion";
import { showSuccessAlert } from "@/hooks/useSuccessAlert";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store";

export const useCatchFishHook = () => {
  const appStore = useAppStore();
  const { levelList, userInfo } = storeToRefs(appStore);
  const coinFrames = [
    "https://d3ezwcpy5gysd4.cloudfront.net/default/coin_1.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/default/coin_2.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/default/coin_3.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/default/coin_4.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/default/coin_5.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/default/coin_6.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/default/coin_7.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/default/coin_8.png",
    "https://d3ezwcpy5gysd4.cloudfront.net/default/coin_9.png",
  ];
  const eventMainObjUrl = [
    {
      level: 1,
      mainObjUrl: "https://d3ezwcpy5gysd4.cloudfront.net/E23/main_obj_1.png",
    },
    {
      level: 2,
      mainObjUrl: "https://d3ezwcpy5gysd4.cloudfront.net/E23/main_obj_2.png",
    },
    {
      level: 3,
      mainObjUrl: "https://d3ezwcpy5gysd4.cloudfront.net/E23/main_obj_3.png",
    },
    {
      level: 4,
      mainObjUrl: "https://d3ezwcpy5gysd4.cloudfront.net/E23/main_obj_4.png",
    },
    {
      level: 5,
      mainObjUrl: "https://d3ezwcpy5gysd4.cloudfront.net/E23/main_obj_5.png",
    },
    {
      level: 6,
      mainObjUrl: "https://d3ezwcpy5gysd4.cloudfront.net/E23/main_obj_6.png",
    },
    {
      level: 7,
      mainObjUrl: "https://d3ezwcpy5gysd4.cloudfront.net/E23/main_obj_7.png",
    },
    {
      level: 8,
      mainObjUrl: "https://d3ezwcpy5gysd4.cloudfront.net/E23/main_obj_8.png",
    },
    {
      level: 9,
      mainObjUrl: "https://d3ezwcpy5gysd4.cloudfront.net/E23/main_obj_9.png",
    },
    {
      level: 10,
      mainObjUrl: "https://d3ezwcpy5gysd4.cloudfront.net/E23/main_obj_10.png",
    },
  ];

  const currentLevelData = ref(levelList.value[1]); // 默认使用第一个级别的数据
  const currentMainObjUrl = computed(() => {
    const levelData = eventMainObjUrl.find(
      (item) => item.level === currentLevelData.value?.level
    );
    return levelData ? levelData.mainObjUrl : "";
  });
  const showPrevButton = computed(() => currentLevelData.value?.level > 1);
  const showNextButton = computed(
    () => currentLevelData.value?.level < levelList.value.length
  );

  const goal = computed(() => {
    return (
      userInfo.value.deposit >= currentLevelData.value?.deposit &&
      userInfo.value.bet >= currentLevelData.value?.bet
    );
  });

  const mainObjContainerRef = ref<HTMLElement | null>(null);

  /**
   * 切换当前级别数据
   * @param level 级别（1, 2, 3）
   */
  const switchLevelData = (level: number, direction: "prev" | "next") => {
    const el = mainObjContainerRef.value;
    if (!el) return;

    const { isMobileDevice } = useDeviceType();
    const translateX = isMobileDevice.value ? 100 : 161;

    // 离场动画：当前等级向左或向右缩小+透明
    const exitTransform =
      direction === "prev"
        ? `translate(${translateX}px, 0) scale(0.2)` // 向右
        : `translate(-${translateX * 3}px, 0) scale(0.2)`; // 向左

    el.style.transition = "transform 0.3s ease, scale 0.3s ease";
    el.style.transform = exitTransform;

    setTimeout(() => {
      const levelData = levelList.value.find((item) => item.level === level);
      if (levelData) {
        currentLevelData.value = levelData;
      }

      // 初始化新等级的位置：从另一侧远一点进来
      const enterFrom =
        direction === "prev"
          ? `translate(-${translateX * 2}px, 0) scale(0.2)` // 从左边飞入
          : `translate(${translateX * 2}px, 0) scale(0.2)`; // 从右边飞入

      el.style.transition = "none";
      el.style.transform = enterFrom;

      // 强制 reflow，确保动画执行
      void el.offsetWidth;

      // 进入动画目标样式：居中并放大
      const finalTransform = `translate(-${translateX}px, 0) scale(1)`;
      el.style.transition = "transform 0.3s ease, scale 0.3s ease";
      el.style.transform = finalTransform;
    }, 300); // 等待旧动画结束
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

  const bulletRef = ref<HTMLDivElement | null>(null);
  const explosionRef = ref<HTMLDivElement | null>(null);
  const mainObjRef = ref<HTMLDivElement | null>(null);
  const treasureBoxRef = ref<HTMLDivElement | null>(null);
  const { startAnimation: startBulletAnimation } = useBulletAnimation(
    bulletRef,
    explosionRef,
    mainObjRef,
    treasureBoxRef
  );
  const isAnimating = ref(false);

  /**
   * 开始抽奖
   * @returns
   */
  const onStart = async () => {
    if (!goal.value || isAnimating.value) return;

    showConfirmAlert({
      deposit: formatAmount(currentLevelData.value.deposit),
      bet: formatAmount(currentLevelData.value.bet),
      onConfirm: () => {
        isAnimating.value = true;
        startBulletAnimation().then(() => {
          isAnimating.value = false;

          startCoinExplosion(coinFrames);

          showSuccessAlert({
            bonus: formatAmount(currentLevelData.value.award),
            onConfirm: () => {
              console.log("确认按钮被点击");
            },
          });
        });
      },
    });
  };

  return {
    mainObjContainerRef,
    bulletRef,
    explosionRef,
    mainObjRef,
    treasureBoxRef,
    coinFrames,
    currentMainObjUrl,
    currentLevelData,
    showPrevButton,
    showNextButton,
    goal,
    switchLevelData,
    prevLevel,
    nextLevel,
    onStart,
  };
};
