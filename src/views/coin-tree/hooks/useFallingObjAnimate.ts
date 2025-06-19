import { onUnmounted } from "vue";
import type { Ref } from "vue";

/**
 * 掉落物体的数据结构
 */
interface FallingItem {
  /** X 坐标位置（像素） */
  x: number;
  /** Y 坐标位置（像素） */
  y: number;
  /** 掉落类型：金币、红包、元宝 */
  type: "coin" | "hongbao" | "yuanbao";
  /** 当前显示的帧索引 */
  frameIndex: number;
  /** 总帧数（仅金币有效） */
  frameCount: number;
  /** 每帧的变化速度 */
  frameDelta: number;
  /** 当前帧在播放序列中的位置索引 */
  sequenceIndex: number;
  /** 播放的帧序列数组 */
  sequence: number[];
  /** 起始角度偏移（模拟角度不同） */
  startOffset: number;
  /** 垂直下落速度 */
  speedY: number;
  /** 缩放比例 */
  scale: number;
  /** 当前旋转角度（红包/元宝） */
  rotation: number;
  /** 旋转速度（红包/元宝） */
  rotationSpeed: number;
}

/**
 * 掉落物体各类的概率占比
 */
interface DropRate {
  /** 金币数量占比 */
  coin: number;
  /** 红包数量占比 */
  hongbao: number;
  /** 元宝数量占比 */
  yuanbao: number;
}

// 掉落动画 Hook
export function useFallingObjAnimate(
  canvasRef: Ref<HTMLCanvasElement | null>,
  dropRate: DropRate = { coin: 6, hongbao: 2, yuanbao: 1 },
  density: "sparse" | "normal" | "dense" = "dense"
) {
  const items: FallingItem[] = [];

  let ctx: CanvasRenderingContext2D | null = null;
  let animationFrameId = 0;

  const coinImgs: HTMLImageElement[] = [];
  const hongbaoImg = new Image();
  const yuanbaoImg = new Image();

  const dropIntervalMap = {
    sparse: 10,
    normal: 5,
    dense: 2,
  };
  let dropCounter = 0;
  const dropEveryNFrames = dropIntervalMap[density];

  // 预加载图片资源
  (() => {
    for (let i = 1; i <= 9; i++) {
      const img = new Image();
      img.src = `https://d3ezwcpy5gysd4.cloudfront.net/E10/coin_${i}.png`;
      coinImgs.push(img);
    }
    hongbaoImg.src =
      "https://d3ezwcpy5gysd4.cloudfront.net/E10/rule_decoration_1.png";
    yuanbaoImg.src =
      "https://d3ezwcpy5gysd4.cloudfront.net/E10/rule_decoration_2.png";
  })();

  // 创建一个新的掉落物体
  const createItem = (type: FallingItem["type"]): FallingItem => {
    const frameCount = type === "coin" ? coinImgs.length : 1;
    const baseSequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1];
    const startOffset = Math.floor(Math.random() * frameCount);

    const canvasWidth = canvasRef.value!.width;
    const margin = 50;
    const minX = margin;
    const maxX = canvasWidth - margin - 50;

    return {
      x: minX + Math.random() * (maxX - minX), // 限制掉落起始横坐标在左右 50px 内边距范围内
      y: canvasRef.value!.height / 2 - 50, // 掉落起始纵坐标（从画布中部偏上 50px）
      type, // 掉落物体类型："coin" | "hongbao" | "yuanbao"
      frameIndex: 0, // 当前帧索引（用于渲染图像帧）
      frameCount, // 总帧数（金币为 9，其他为 1）
      frameDelta: 0.25, // 每帧动画增长速度（控制翻转快慢）
      sequenceIndex: 0, // 当前帧在动画序列中的位置
      sequence: baseSequence, // 动画播放序列（例如 0~8~0 往返循环）
      startOffset, // 帧偏移起点（随机角度启动翻转）
      speedY:
        type === "coin"
          ? 3 // 金币下落速度略快（1~3 px/frame）
          : 2, // 红包/元宝下落速度（2~3 px/frame）
      scale: 0.5, // 缩放比（统一 50%）
      rotation: 0, // 当前旋转角度，仅红包/元宝有效
      rotationSpeed:
        type === "hongbao"
          ? 0.03 + Math.random() * 0.01 // 红包旋转速度较慢
          : 0.05 + Math.random() * 0.1, // 元宝旋转较快
    };
  };

  // 根据占比生成随机掉落类型
  const getRandomType = (): FallingItem["type"] => {
    const pool: FallingItem["type"][] = [];
    for (let i = 0; i < dropRate.coin; i++) pool.push("coin");
    for (let i = 0; i < dropRate.hongbao; i++) pool.push("hongbao");
    for (let i = 0; i < dropRate.yuanbao; i++) pool.push("yuanbao");
    return pool[Math.floor(Math.random() * pool.length)];
  };

  /**
   * 更新动画状态
   * @param allowMixed 是否允许混合掉落类型（默认 false）
   * @returns
   */
  const update = (allowMixed = false) => {
    if (!ctx || !canvasRef.value) return;

    const canvas = canvasRef.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dropCounter++;
    if (dropCounter >= dropEveryNFrames) {
      dropCounter = 0;
      const existingTypes = new Set(items.map((i) => i.type));

      if (
        allowMixed ||
        (!existingTypes.has("coin") &&
          !existingTypes.has("hongbao") &&
          !existingTypes.has("yuanbao"))
      ) {
        const nextType = getRandomType();
        items.push(createItem(nextType));
      }
    }

    // 当最近一个物体快要掉出画面时提前触发新掉落
    const lastItem = items[items.length - 1];
    if (lastItem && lastItem.y + 80 >= canvasRef.value!.height) {
      const existingTypes = new Set(items.map((i) => i.type));

      if (
        allowMixed ||
        (!existingTypes.has("coin") &&
          !existingTypes.has("hongbao") &&
          !existingTypes.has("yuanbao"))
      ) {
        const nextType = getRandomType();
        items.push(createItem(nextType));
      }
    }

    items.forEach((item) => {
      item.y += item.speedY;

      if (item.type === "coin") {
        item.sequenceIndex += item.frameDelta;
        if (item.sequenceIndex >= item.sequence.length) {
          item.sequenceIndex = 0;
        }
        const seqIdx = Math.floor(item.sequenceIndex) % item.sequence.length;
        item.frameIndex =
          (item.sequence[seqIdx] + item.startOffset) % item.frameCount;
      } else {
        item.rotation += item.rotationSpeed;
      }

      let img: HTMLImageElement;
      if (item.type === "coin") {
        img = coinImgs[Math.floor(item.frameIndex)];
      } else if (item.type === "hongbao") {
        img = hongbaoImg;
      } else {
        img = yuanbaoImg;
      }

      const imgWidth = img.width * item.scale;
      const imgHeight = img.height * item.scale;
      const centerX = item.x + imgWidth / 2;
      const centerY = item.y + imgHeight / 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      if (item.type !== "coin") {
        ctx.rotate(item.rotation);
      }
      ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
      ctx.restore();
    });

    for (let i = items.length - 1; i >= 0; i--) {
      if (items[i].y > canvasRef.value!.height) {
        items.splice(i, 1);
      }
    }

    animationFrameId = requestAnimationFrame(() => update(allowMixed));
  };

  /**
   * 启动掉落动画
   * @param allowMixed 是否允许混合掉落类型（默认 false）
   * @param durationMs 持续时间（毫秒），到期后自动停止动画
   * @returns Promise<void>
   */
  const start = (allowMixed = false, durationMs?: number): Promise<void> => {
    const canvas = canvasRef.value;
    if (!canvas) return Promise.resolve();
    ctx = canvas.getContext("2d");
    if (!ctx) return Promise.resolve();
    animationFrameId = requestAnimationFrame(() => update(allowMixed));

    if (durationMs != null && durationMs > 0) {
      return new Promise((resolve) => {
        setTimeout(() => {
          stop();
          resolve();
        }, durationMs);
      });
    } else {
      return Promise.resolve();
    }
  };

  // 停止动画并清空
  const stop = () => {
    cancelAnimationFrame(animationFrameId);
    items.length = 0;
    ctx?.clearRect(0, 0, canvasRef.value?.width, canvasRef.value?.height);
  };

  onUnmounted(() => stop());

  return {
    start,
    stop,
  };
}
