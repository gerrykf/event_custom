import type { Ref } from "vue";
import { useDeviceType } from "@/hooks/useDeviceType";

/**
 * 表示每个金币的动画状态
 */
interface Coin {
  /** 金币当前的 x 坐标位置 */
  x: number;
  /** 金币当前的 y 坐标位置 */
  y: number;
  /** 金币垂直方向上的下落速度（单位：像素/帧） */
  speed: number;
  /** 缩放比例，用于将金币图像缩放为适配尺寸 */
  scale: number;
  /** 当前帧索引（用于在旋转帧数组中选择对应图像） */
  frameIndex: number;
  /** 每帧增加的动画帧索引增量，用于控制旋转速度 */
  frameDelta: number;
  /** 当前金币的旋转角度（单位：度） */
  rotation: number;
  /** 每帧增加的旋转角度（单位：度/帧），控制旋转速度 */
  rotationSpeed: number;
}

/**
 * 使用金币掉落动画逻辑
 * @param canvasRef - Canvas DOM 引用
 * @param coinAngleArray - 金币旋转帧图 URL 数组
 */
export function useFallingCoins(
  canvasRef: Ref<HTMLCanvasElement | null>,
  coinAngleArray: string[]
) {
  const { isMobileDevice } = useDeviceType();

  /** Canvas 2D 渲染上下文 */
  let ctx: CanvasRenderingContext2D | null = null;

  /** requestAnimationFrame 的 ID */
  let animationFrameId: number | null = null;

  /** 定时生成金币的计时器 */
  let coinTimer: NodeJS.Timeout | null = null;

  /** 所有旋转帧图像的缓存数组 */
  let coinImages: HTMLImageElement[] = [];

  /** 当前在画布上的金币列表 */
  let coins: Coin[] = [];

  /**
   * 加载所有金币旋转角度图像
   * @param urls - 图像 URL 数组
   * @returns 解析后的 HTMLImageElement 列表
   */
  const loadAllImages = (urls: string[]): Promise<HTMLImageElement[]> => {
    return Promise.all(
      urls.map(
        (url) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = reject;
          })
      )
    );
  };

  /**
   * 适配设备尺寸，调整 Canvas 宽高
   */
  const resizeCanvas = () => {
    if (!ctx) return;
    const canvas = ctx.canvas;
    canvas.width = isMobileDevice.value ? 480 : 576;
    canvas.height = 1040;
  };

  /**
   * 创建一个新的金币实例，并加入动画列表
   */
  const createCoin = () => {
    if (!ctx || coinImages.length === 0) return;

    const canvas = ctx.canvas;
    const baseImage = coinImages[0]; // 假设所有帧尺寸一致
    const targetSize = isMobileDevice.value ? 60 : 85;
    const scale = targetSize / baseImage.width;

    coins.push({
      x: Math.random() * canvas.width,
      y: -baseImage.height * scale,
      speed: 3,
      scale,
      frameIndex: Math.floor(Math.random() * coinImages.length),
      frameDelta: 0.2 + Math.random() * 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: 2,
    });
  };

  /**
   * 渲染所有金币，并更新它们的位置和动画状态
   */
  const drawCoins = () => {
    if (!ctx || coinImages.length === 0) return;
    const canvas = ctx.canvas;

    coins.forEach((coin) => {
      // 更新金币状态
      coin.y += coin.speed;
      coin.frameIndex = (coin.frameIndex + coin.frameDelta) % coinImages.length;
      coin.rotation += coin.rotationSpeed;

      const image = coinImages[Math.floor(coin.frameIndex)];

      ctx.save();
      ctx.translate(coin.x, coin.y);
      ctx.rotate((coin.rotation * Math.PI) / 180);
      ctx.scale(coin.scale, coin.scale);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
      ctx.restore();
    });

    // 移除已掉出画布的金币
    coins = coins.filter(
      (coin) => coin.y < canvas.height + coinImages[0].height * coin.scale
    );
  };

  /**
   * 动画主循环，递归 requestAnimationFrame
   */
  const animate = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawCoins();
    animationFrameId = requestAnimationFrame(animate);
  };

  /**
   * 启动金币掉落动画
   */
  const start = async () => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    resizeCanvas();

    // 加载图像资源
    coinImages = await loadAllImages(coinAngleArray);

    stop(); // 防止重复启动

    animationFrameId = requestAnimationFrame(animate);
    coinTimer = setInterval(createCoin, 500); // 每 500ms 创建一个新金币
  };

  /**
   * 停止金币动画和定时器
   */
  const stop = () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    if (coinTimer !== null) {
      clearInterval(coinTimer);
      coinTimer = null;
    }
  };

  return {
    start,
    stop,
  };
}
