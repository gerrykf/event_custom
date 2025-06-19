import { useDeviceType } from "@/hooks/useDeviceType";

interface Coin {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  frameIndex: number;
  frameTimer: number;
}

/**
 * 金币爆炸效果
 * @param coinFrameUrls 金币帧图像 URL 数组
 * @description 在页面中心生成金币爆炸效果，金币从中心向外飞散
 * @returns
 */
export async function startCoinExplosion(coinFrameUrls: string[]) {
  const { isMobileDevice } = useDeviceType();

  const gravity = 0.8;
  const frameInterval = 50;
  const totalCoins = isMobileDevice.value ? 30 : 100;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let rafId = 0;

  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "9999",
    pointerEvents: "none",
  });
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 预加载所有帧图像
  const coinFrames: HTMLImageElement[] = await Promise.all(
    coinFrameUrls.map(
      (url) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.error("图片加载失败: ", url);
          };
        })
    )
  );

  const coins: Coin[] = [];

  // 生成金币
  const spawnCoins = () => {
    const centerX = width / 2;
    const centerY = height / 2 - (isMobileDevice.value ? 200 : 300);
    const spread = isMobileDevice.value ? Math.PI / 2 : Math.PI;
    const angleStep = spread / totalCoins;

    for (let i = 0; i < totalCoins; i++) {
      const baseAngle = Math.PI / 2 - spread / 2 + i * angleStep;
      const angle = baseAngle + (Math.random() - 0.5) * angleStep * 0.5;
      const speed = 16 + Math.random() * 4;

      coins.push({
        x: centerX + (Math.random() - 0.5) * (isMobileDevice.value ? 50 : 200),
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
      coin.scale += 0.01;
      coin.frameTimer += delta;
      if (coin.frameTimer >= frameInterval) {
        coin.frameIndex = (coin.frameIndex + 1) % coinFrames.length;
        coin.frameTimer = 0;
      }
    }
  };

  const draw = () => {
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

  spawnCoins();
  animate();

  // 自动销毁 canvas（例如 3s 后）
  setTimeout(() => {
    cancelAnimationFrame(rafId);
    canvas.remove();
  }, 3000);
}
