import type { Ref } from "vue";
import { useDeviceType } from "@/hooks/useDeviceType";

export const useWaveBackground = (
  canvasRef: Ref<HTMLCanvasElement | null>,
  bgUrl: string
) => {
  const { isMobileDevice } = useDeviceType();

  let ctx: CanvasRenderingContext2D | null = null;
  let image: HTMLImageElement | null = null;
  let waveOffset = 0;
  let animationFrameId: number | null = null;

  const waveAmplitude = 1;
  const waveSpeed = 0.05;
  const waveFrequency = 100;

  const drawWaveBackground = () => {
    if (!ctx || !image) return;

    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.max(
      canvas.width / image.width,
      canvas.height / image.height
    );
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const baseX = (canvas.width - drawWidth) / 2;
    const baseY = (canvas.height - drawHeight) / 2;
    const sliceHeight = 1;

    for (let y = 0; y < drawHeight; y += sliceHeight) {
      const progress = y / drawHeight;
      const offsetX =
        Math.sin(waveOffset * 2 + progress * waveFrequency) * waveAmplitude +
        Math.sin(waveOffset * 3 + progress * waveFrequency * 0.8) *
          waveAmplitude *
          0.6 +
        (Math.random() - 0.5) * 0.1;

      ctx.drawImage(
        image,
        0,
        (y / drawHeight) * image.height,
        image.width,
        (sliceHeight / drawHeight) * image.height,
        baseX + offsetX,
        baseY + y,
        drawWidth,
        sliceHeight
      );
    }

    waveOffset += waveSpeed;
    animationFrameId = requestAnimationFrame(drawWaveBackground);
  };

  const resizeCanvas = () => {
    if (!ctx) return;
    const canvas = ctx.canvas;
    canvas.width = isMobileDevice.value ? 480 : 576;
    canvas.height = 1040;
  };

  const start = async () => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    resizeCanvas();

    image = new Image();
    image.src = bgUrl;

    await new Promise<void>((resolve) => {
      image!.onload = () => resolve();
    });

    stop();
    animationFrameId = requestAnimationFrame(drawWaveBackground);
  };

  const stop = () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  return {
    start,
    stop,
  };
};
