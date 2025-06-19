import { useDeviceType } from "@/hooks/useDeviceType";
import type { Ref } from "vue";

/**
 * 炮弹打击动画逻辑封装
 * @param bulletRef 炮弹元素
 * @param explosionRef 爆炸元素
 * @param mainObjRef 主体目标元素
 * @param treasureboxRef 宝箱元素（动画结束时展示）
 */
export function useBulletAnimation(
  bulletRef: Ref<HTMLElement | null>,
  explosionRef: Ref<HTMLElement | null>,
  mainObjRef: Ref<HTMLElement | null>,
  treasureboxRef: Ref<HTMLElement | null>
) {
  const { isMobileDevice } = useDeviceType();
  let animationFrame: number | null = null;
  let timeoutHandler: number | null = null;

  /**
   * 开始动画
   * @param durationMs 动画持续时间，默认3000毫秒
   * @returns
   *
   * @description 启动动画，动画执行 durationMs 后自动执行 endAnimation
   */
  const startAnimation = (durationMs = 1000): Promise<void> => {
    return new Promise((resolve) => {
      const bullet = bulletRef.value;
      const explosion = explosionRef.value;
      const mainObj = mainObjRef.value;

      if (!bullet || !explosion || !mainObj) {
        resolve();
        return;
      }

      let bulletX = isMobileDevice.value ? 18 : 25;
      let bulletY = 60;
      let explosionScale = 0.1;
      let phase: "fire1" | "exploding" = "fire1";

      bullet.style.display = "block";
      bullet.style.transform = `translate(-${bulletX}px, ${bulletY}px)`;

      explosion.style.display = "none";
      explosion.style.transform = "translate(-50%, -50%) scale(0.1)";
      explosion.style.opacity = "0.7";

      mainObj.style.transition =
        "transform 0.12s ease-out, filter 0.12s ease-out";

      const animate = () => {
        if (phase === "fire1") {
          bulletY -= 20;
          bullet.style.transform = `translate(-${bulletX}px, ${bulletY}px)`;

          if (bulletY <= -150) {
            bullet.style.display = "none";
            phase = "exploding";

            explosionScale = 0.1;
            explosion.style.display = "block";
            explosion.style.opacity = "0.7";
            explosion.style.transform = `translate(-50%, -50%) scale(${explosionScale})`;

            mainObj.style.filter = "brightness(1.5)";
            bulletY = 60;
            bullet.style.display = "block";
          }
        } else if (phase === "exploding") {
          explosionScale += 0.12;
          explosion.style.transform = `translate(-50%, -50%) scale(${explosionScale})`;
          explosion.style.opacity = `${Math.min(1, explosionScale)}`;

          const mainObjScale = Math.max(0.9, 1 - (explosionScale - 0.1) * 0.1);
          mainObj.style.scale = `${mainObjScale}`;

          const percent = (explosionScale - 0.1) / (1.0 - 0.1);
          bulletY = 60 - (60 + 150) * percent;
          bullet.style.transform = `translate(-${bulletX}px, ${bulletY}px)`;

          if (explosionScale >= 1.1) {
            explosion.style.display = "none";
            bullet.style.display = "none";
            mainObj.style.scale = "1";
            mainObj.style.filter = "none";

            // ✅ 重置为下一轮
            bulletY = 60;
            explosionScale = 0.1;
            phase = "fire1";

            bullet.style.display = "block";
          }
        }

        animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);

      timeoutHandler = window.setTimeout(() => {
        endAnimation();
        resolve();
      }, durationMs);
    });
  };

  /**
   * 结束动画（带宝箱效果）
   */
  const endAnimation = () => {
    const bullet = bulletRef.value;
    const explosion = explosionRef.value;
    const mainObj = mainObjRef.value;
    const treasure = treasureboxRef.value;

    if (!bullet || !explosion || !mainObj || !treasure) return;

    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }

    if (timeoutHandler !== null) {
      clearTimeout(timeoutHandler);
      timeoutHandler = null;
    }

    const resetStyles = () => {
      bullet.style.display = "none";
      bullet.style.transform = "";
      explosion.style.display = "none";
      explosion.style.transform = "";
      explosion.style.opacity = "0";

      mainObj.style.transition = "filter 0.05s ease";
      mainObj.style.filter = "brightness(20)";
      mainObj.style.transform = "scale(1)";
      mainObj.style.opacity = "1";
    };

    resetStyles();

    setTimeout(() => {
      mainObj.style.transition = "opacity 0.3s ease-out, filter 0.3s ease-out";
      mainObj.style.opacity = "0";
      mainObj.style.filter = "brightness(1)";
    }, 50);

    treasure.style.display = "block";
    treasure.style.opacity = "0";
    treasure.style.transform = "scale(0.1)";
    treasure.style.transition =
      "transform 0.4s ease-out, opacity 0.3s ease-out";

    setTimeout(() => {
      treasure.style.opacity = "1";
      treasure.style.transform = "scale(1)";
    }, 100);

    setTimeout(() => {
      setTimeout(() => {
        treasure.style.opacity = "0";
        treasure.style.transform = "scale(0)";
      }, 100);
      resetStyles();
      mainObj.style.filter = "none";
    }, 400);
  };

  return {
    startAnimation,
    endAnimation,
  };
}
