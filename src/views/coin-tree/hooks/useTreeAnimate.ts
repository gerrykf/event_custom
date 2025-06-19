/**
 * 树动画钩子
 * @returns
 */
export const useTreeAnimate = () => {
  let animationFrameId = 0; // 保存动画帧 ID，便于取消

  /**
   * 获取正弦插值 eased 值（0 → 1 → 0）
   * @param timestamp 当前时间戳（由 requestAnimationFrame 提供）
   * @param duration 每轮动画持续时间（毫秒）
   * @returns 介于 0~1 之间的 eased 值
   */
  const getSharedEased = (timestamp: number, duration: number) => {
    const angle = ((timestamp % duration) / duration) * 2 * Math.PI;
    return (Math.sin(angle - Math.PI / 2) + 1) / 2;
  };

  /**
   * 启动整棵树的缓动动画（统一调度器）
   * 光源动画使用 4 秒周期，树干/树叶/装饰使用 5 秒周期
   */
  const runTreeAnimation = () => {
    // 获取光源、树干 DOM 元素
    const halo = document.querySelector(".halo") as HTMLElement;
    const trunk = document.querySelector(".trunk") as HTMLElement;

    // 获取 4 层树叶节点（每层可能多个 DOM）
    const leafLayers = Array.from(
      { length: 4 },
      (_, i) =>
        document.querySelectorAll(
          `.tree-layer-${i + 1}`
        ) as NodeListOf<HTMLElement>
    );

    // 获取 3 层装饰节点（每层可能多个 DOM）
    const decoLayers = Array.from(
      { length: 3 },
      (_, i) =>
        document.querySelectorAll(
          `.tree-layer-5-deco-${i + 1}`
        ) as NodeListOf<HTMLElement>
    );

    // 设置两个不同的动画周期（毫秒）
    const haloDuration = 4000; // 光源动画：4 秒一轮
    const treeDuration = 5000; // 树体类动画（树干/树叶/装饰）：5 秒一轮

    /**
     * 主动画循环（每帧执行）
     */
    const animate = (timestamp: number) => {
      const haloEased = getSharedEased(timestamp, haloDuration); // 光源节奏（0~1~0）
      const treeEased = getSharedEased(timestamp, treeDuration); // 树体节奏（0~1~0）
      const treeReverse = 1 - treeEased; // 树体动画方向反转（与光源反向）

      /** 光源动画（放大 + 变亮） */
      if (halo) {
        const opacity = 0.5 + 0.5 * haloEased;
        const scale = 1 + 0.75 * haloEased;
        halo.style.opacity = opacity.toFixed(2);
        halo.style.transform = `translate3d(0, 0, 0) scale(${scale.toFixed(3)})`;
      }

      /** 树干动画（缩小 + 下移 + 旋转） */
      if (trunk) {
        const translateY = -0.9995 * treeReverse;
        const rotate = -0.9995 * treeReverse;
        const scaleX = 1.075 - 0.075 * treeReverse;
        trunk.style.transform = `translate(0%, ${translateY}%) rotate(${rotate}deg) scale(${scaleX}, 1)`;
      }

      /** 树叶动画（缩小 + 上浮） */
      leafLayers.forEach((layer, index) => {
        const delay = index * 100; // 每层延迟，增加错落感
        const localTreeEased = getSharedEased(timestamp - delay, treeDuration);
        const easedRev = 1 - localTreeEased;

        const translateY = -1.75 * easedRev;
        const scaleX = 1 + 0.074 * easedRev;

        layer.forEach((el) => {
          el.style.transform = `translate(0%, ${translateY}%) scale(${scaleX}, 1)`;
        });
      });

      /** 树叶装饰动画（缩小 + 上浮 + 轻微旋转） */
      decoLayers.forEach((deco, index) => {
        const delay = index * 100; // 每层装饰延迟
        const localTreeEased = getSharedEased(timestamp - delay, treeDuration);
        const easedRev = 1 - localTreeEased;

        const translateX = -3 * easedRev;
        const translateY = -5 * easedRev;
        const rotate = -4 * easedRev;

        deco.forEach((el) => {
          el.style.transform = `translate(${translateX}%, ${translateY}%) rotate(${rotate}deg)`;
        });
      });

      animationFrameId = requestAnimationFrame(animate); // 下一帧动画
    };

    animationFrameId = requestAnimationFrame(animate); // 启动循环
  };

  /**
   * 停止整棵树的缓动动画
   */
  const stopTreeAnimation = () => {
    cancelAnimationFrame(animationFrameId);
  };

  return {
    runTreeAnimation,
    stopTreeAnimation,
  };
};
