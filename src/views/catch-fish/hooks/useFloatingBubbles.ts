import { onMounted, onUnmounted } from "vue";
import { useDeviceType } from "@/hooks/useDeviceType";

/**
 * 泡泡往上浮动的效果
 * @param canvasRef
 * @param bubbleImageUrl
 * @param options
 */
export function useFloatingBubbles(
  canvasRef: any,
  bubbleImageUrl: string,
  options: {
    maxBubbles?: number;
    spawnInterval?: number;
    speedRange?: [number, number];
    sizeRange?: [number, number];
    horizontalAmplitude?: number;
    horizontalFrequency?: number;
  } = {}
) {
  const { isMobileDevice } = useDeviceType();

  let ctx: CanvasRenderingContext2D | null = null;
  let bubbleImg: HTMLImageElement | null = null;
  let animationId: number | null = null;
  let bubbleTimer: number | null = null;

  const bubbles: any[] = [];

  const {
    maxBubbles = 20,
    spawnInterval = 500,
    speedRange = [1.0, 2.0],
    sizeRange = [10, 40],
    horizontalAmplitude = 20,
    horizontalFrequency = 0.07, // 加快左右摆动频率
  } = options;

  const spawnBubble = (canvas: HTMLCanvasElement) => {
    if (!bubbleImg || bubbles.length >= maxBubbles) return;

    const speed =
      Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
    const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
    const x = Math.random() * canvas.width;
    const bottomOffset = isMobileDevice.value ? 200 : 0;
    const y = canvas.height - bottomOffset;

    bubbles.push({
      x,
      y,
      speed,
      size,
      angle: Math.random() * Math.PI * 2,
    });
  };

  const draw = () => {
    if (!ctx || !bubbleImg) return;
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach((b) => {
      b.y -= b.speed;
      b.angle += horizontalFrequency;
      const offsetX = Math.sin(b.angle) * horizontalAmplitude;
      ctx.drawImage(
        bubbleImg,
        b.x + offsetX - b.size / 2,
        b.y - b.size / 2,
        b.size,
        b.size
      );
    });

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const maxRise = 240;
      const bottomOffset = isMobileDevice.value ? 200 : 0;
      if (bubbles[i].y < canvas.height - bottomOffset - maxRise) {
        bubbles.splice(i, 1);
      }
    }

    animationId = requestAnimationFrame(draw);
  };

  const start = () => {
    if (!ctx || !bubbleImg) return;
    animationId = requestAnimationFrame(draw);
    bubbleTimer = window.setInterval(() => {
      spawnBubble(ctx!.canvas);
    }, spawnInterval);
  };

  const stop = () => {
    if (animationId) cancelAnimationFrame(animationId);
    if (bubbleTimer) clearInterval(bubbleTimer);
  };

  onMounted(() => {
    const canvas = canvasRef.value as HTMLCanvasElement;
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    if (!ctx) return;

    bubbleImg = new Image();
    bubbleImg.src = bubbleImageUrl;
    bubbleImg.onload = () => {
      start();
    };

    window.addEventListener("resize", () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
  });

  onUnmounted(() => {
    stop();
    window.removeEventListener("resize", () => {});
  });
}
