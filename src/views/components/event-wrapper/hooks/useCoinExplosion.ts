import { useDeviceType } from "@/hooks/useDeviceType";
import { onUnmounted, type Ref } from "vue";

interface Coin {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  frameIndex: number;
  frameTimer: number;
}

export function useCoinExplosion(
  canvasRef: Ref<HTMLCanvasElement | null>,
  coinFrameUrls: string[]
) {
  const { isMobileDevice } = useDeviceType();

  console.log("useCoinExplosion", isMobileDevice.value, coinFrameUrls);

  let ctx: CanvasRenderingContext2D | null = null;
  let coins: Coin[] = [];
  let rafId = 0;
  let width = 0;
  let height = 0;

  const gravity = 0.8;
  const frameInterval = 50; // ms
  const totalCoins = isMobileDevice.value ? 30 : 100;

  const coinFrames: HTMLImageElement[] = [];
  let imagesLoaded = false;

  const preloadImages = async () => {
    if (imagesLoaded) return;
    const promises = coinFrameUrls.map(
      (url) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.error("图片加载失败: ", url);
          };
        })
    );
    const imgs = await Promise.all(promises);
    coinFrames.push(...imgs);
    imagesLoaded = true;
  };

  const spawnCoins = () => {
    // const topOffset = height * 0.4; // 初始化在屏幕高度 30%
    coins = [];
    const centerX = width / 2;
    const centerY = height / 2 - (isMobileDevice.value ? 200 : 300); // 初始位置在屏幕中心偏上
    const spread = isMobileDevice.value ? Math.PI / 2 : Math.PI; // PC 展开 180 度，移动端只展开 90 度
    const angleStep = spread / totalCoins;

    for (let i = 0; i < totalCoins; i++) {
      // 让角度均匀分布在 spread 范围内，并增加随机扰动
      const baseAngle = Math.PI / 2 - spread / 2 + i * angleStep;
      const angle = baseAngle + (Math.random() - 0.5) * angleStep * 0.5;
      const speed = 16 + Math.random() * 4; // 初始化蹦跳高度

      coins.push({
        x: centerX + (Math.random() - 0.5) * (isMobileDevice.value ? 50 : 200), // 初始轻微错位
        y: centerY + (Math.random() - 0.5) * (isMobileDevice.value ? 10 : 100),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * -speed,
        scale: 0.1 + Math.random() * 0.05,
        frameIndex: Math.floor(Math.random() * coinFrames.length),
        frameTimer: 0,
      });
    }
  };

  const update = (delta: number) => {
    for (const coin of coins) {
      coin.vy += gravity;
      coin.x += coin.vx;
      coin.y += coin.vy;
      coin.scale += 0.01; // 缓慢放大

      coin.frameTimer += delta;
      if (coin.frameTimer >= frameInterval) {
        coin.frameIndex = (coin.frameIndex + 1) % coinFrames.length;
        coin.frameTimer = 0;
      }
    }
  };

  const draw = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    for (const coin of coins) {
      const img = coinFrames[coin.frameIndex];
      const w = img.width * coin.scale;
      const h = img.height * coin.scale;
      ctx.drawImage(img, coin.x - w / 2, coin.y - h / 2, w, h);
    }
  };

  const animate = (lastTime = performance.now()) => {
    const now = performance.now();
    const delta = now - lastTime;
    update(delta);
    draw();
    rafId = requestAnimationFrame(() => animate(now));
  };

  const reset = () => {
    cancelAnimationFrame(rafId);
    rafId = 0;
    coins = [];
    ctx?.clearRect(0, 0, width, height);
  };

  const start = async () => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    reset(); // 清理上一次的动画状态

    // 设置 canvas 样式为固定在最顶层
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      zIndex: "9999",
      pointerEvents: "none",
    });

    canvas.width = width = window.innerWidth;
    canvas.height = height = window.innerHeight;
    ctx = canvas.getContext("2d");
    if (!ctx) return;

    await preloadImages();
    spawnCoins();
    animate();
  };

  onUnmounted(() => {
    cancelAnimationFrame(rafId);
  });

  return { start };
}
