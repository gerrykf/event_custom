import { ref, onUnmounted } from "vue";

/**
 * 用于切换 translateX 百分比动画的 Hook
 * @returns {switchToLevel} 触发动画的函数
 */
export const useSwitchLevelAnimation = () => {
  const animationFrameId = ref<number | null>(null);

  /**
   * 获取当前 transform: translateX 百分比值
   * @param el DOM 元素
   */
  const getCurrentTranslateX = (el: HTMLElement): number => {
    const style = getComputedStyle(el);
    const matrixMatch = style.transform.match(
      /matrix\(.*?,.*?,.*?,.*?,\s*(-?\d+\.?\d*),.*?\)/
    );
    if (matrixMatch) {
      const px = parseFloat(matrixMatch[1]);
      const parentWidth = el.parentElement?.offsetWidth || 1;
      return (px / parentWidth) * 100;
    } else if (style.transform.includes("translate")) {
      const percentMatch = style.transform.match(/translate\((-?\d+\.?\d*)%,/);
      return percentMatch ? parseFloat(percentMatch[1]) : 0;
    }
    return 0;
  };

  /**
   * 使用 requestAnimationFrame 实现的平滑过渡动画
   * @param el 目标元素
   * @param toX 目标 translateX 百分比
   * @param duration 动画时长（默认 1000ms）
   */
  const animateTranslateX = (el: HTMLElement, toX: number, duration = 1000) => {
    const fromX = getCurrentTranslateX(el);
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const currentX = fromX + (toX - fromX) * progress;
      el.style.transform = `translate(${currentX}%, 0%)`;

      if (progress < 1) {
        animationFrameId.value = requestAnimationFrame(step);
      }
    };

    if (animationFrameId.value !== null) {
      cancelAnimationFrame(animationFrameId.value);
    }

    animationFrameId.value = requestAnimationFrame(step);
  };

  /**
   * 对外暴露的动画触发方法
   * @param el 容器元素
   * @param level 当前级别
   */
  const switchToLevel = (el: HTMLElement, level: number, duration = 300) => {
    const toX = level === 1 ? 0 : -66.5 * (level - 1);
    animateTranslateX(el, toX, duration);
  };

  onUnmounted(() => {
    if (animationFrameId.value !== null) {
      cancelAnimationFrame(animationFrameId.value);
    }
  });

  return {
    switchToLevel,
  };
};
