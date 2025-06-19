import { onUnmounted } from "vue";

/**
 * 自定义钩子：用于控制树的摇晃动画
 * @returns
 */
export const useShakeTreeAnimate = () => {
  let animationFrameId = 0;

  /**
   * 启动树的摇晃动画（基于 duration 时间的无限过渡动画）
   * @param duration 每轮动画时长（默认 300 毫秒）
   */
  const runShakeTree = (duration = 300) => {
    // 获取光源和树干 DOM 元素
    const halo = document.querySelector(".halo") as HTMLElement;
    const trunk = document.querySelector(".trunk") as HTMLElement;

    // 获取 4 层树叶节点
    const leafLayers1 = document.querySelectorAll(
      ".tree-layer-1"
    ) as NodeListOf<HTMLElement>;
    const leafLayers2 = document.querySelectorAll(
      ".tree-layer-2"
    ) as NodeListOf<HTMLElement>;
    const leafLayers3 = document.querySelectorAll(
      ".tree-layer-3"
    ) as NodeListOf<HTMLElement>;
    const leafLayers4 = document.querySelectorAll(
      ".tree-layer-4"
    ) as NodeListOf<HTMLElement>;

    // 获取装饰品节点
    const deco1 = document.querySelectorAll(
      ".tree-layer-5-deco-1"
    ) as NodeListOf<HTMLElement>;
    const deco2 = document.querySelectorAll(
      ".tree-layer-5-deco-2"
    ) as NodeListOf<HTMLElement>;
    const deco3 = document.querySelectorAll(
      ".tree-layer-5-deco-3"
    ) as NodeListOf<HTMLElement>;

    const start = performance.now();

    const loop = (now: number) => {
      const t = ((now - start) % duration) / duration;
      const direction = t < 0.5 ? t * 2 : (1 - t) * 2; // 0 -> 1 -> 0

      // 光源保持缩小和低亮度
      if (halo) {
        halo.style.transform = `scale(0,0)`;
        halo.style.opacity = `0.5`;
      }

      // 树干动画
      const trunkRotate = (-1 + 1.9 * direction).toFixed(2);
      const trunkScaleY = (0.93 + 0.07 * direction).toFixed(2);
      if (trunk) {
        trunk.style.transform = `rotate(${trunkRotate}deg) scale(1, ${trunkScaleY})`;
      }

      // 统一处理树叶过渡
      const animateLeaves = (
        leaves: NodeListOf<HTMLElement>, // 每层树叶
        rotateFrom: number, // 起始旋转角度
        rotateTo: number, // 结束旋转角度
        scaleFrom: number, // 起始缩放比例
        scaleTo: number // 结束缩放比例
      ) => {
        const rotate = (
          rotateFrom +
          (rotateTo - rotateFrom) * direction
        ).toFixed(2);
        const scaleY = (scaleFrom + (scaleTo - scaleFrom) * direction).toFixed(
          3
        );
        leaves.forEach((leaf) => {
          leaf.style.transform = `rotate(${rotate}deg) scale(1, ${scaleY})`;
        });
      };

      // 处理装饰品过渡
      const animateDeco = (
        elements: NodeListOf<HTMLElement>, // 装饰品元素
        rotateFrom: number, // 起始旋转角度
        rotateTo: number, // 结束旋转角度
        scaleFrom: number, // 起始缩放比例
        scaleTo: number, // 结束缩放比例
        origin: string // 变换原点
      ) => {
        const rotate = (
          rotateFrom +
          (rotateTo - rotateFrom) * direction
        ).toFixed(2);
        const scaleY = (scaleFrom + (scaleTo - scaleFrom) * direction).toFixed(
          3
        );
        elements.forEach((el) => {
          el.style.transformOrigin = origin;
          el.style.transform = `rotate(${rotate}deg) scale(1, ${scaleY})`;
        });
      };

      animateLeaves(leafLayers1, 0, 0.9, 1, 0.93);
      animateLeaves(leafLayers2, 0.08, 3, 1, 0.97);
      animateLeaves(leafLayers3, -2.1, -4, 1, 0.92);
      animateLeaves(leafLayers4, 1.95, 3.4, 0.975, 0.957);

      animateDeco(deco1, -4.3, -0.8, 0.97, 0.99, "50% 60%");
      animateDeco(deco2, 3, 0.096, 0.95, 0.99, "50% 70%");
      animateDeco(deco3, 4.91, 0.001, 0.97, 0.97, "20% 70%");

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
  };

  /**
   * 停止树的摇晃动画
   */
  const stopShakeTree = () => {
    cancelAnimationFrame(animationFrameId);
  };

  onUnmounted(() => {
    stopShakeTree();
  });

  return {
    runShakeTree,
    stopShakeTree,
  };
};
