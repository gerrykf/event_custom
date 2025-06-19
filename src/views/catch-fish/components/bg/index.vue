<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useWaveBackground } from "./hooks/useWaveBackground";
import { useFallingCoins } from "./hooks/useFallingCoins";
defineOptions({
  name: "Background",
});

const bgCanvasRef = ref<HTMLCanvasElement | null>(null);
const coinCanvasRef = ref<HTMLCanvasElement | null>(null);

const coinAngleArray = [
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_1.png",
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_2.png",
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_3.png",
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_4.png",
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_5.png",
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_6.png",
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_7.png",
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_8.png",
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_9.png",
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_10.png",
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_11.png",
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_12.png",
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_13.png",
];

const bgImageUrl = "https://d3ezwcpy5gysd4.cloudfront.net/E23/bg_m.jpg";
const coinImageUrl =
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/dropping_coin_1.png";

const { start: startWave } = useWaveBackground(bgCanvasRef, bgImageUrl);
const { start: startCoins } = useFallingCoins(coinCanvasRef, coinAngleArray);

onMounted(() => {
  startWave();
  startCoins();
});
</script>
<template>
  <div class="bg-wrap">
    <div class="bg-mobile">
      <canvas
        ref="bgCanvasRef"
        id="backgroundWaveCanvas"
        class="bg-canvas"
        style="touch-action: none; cursor: inherit"
      ></canvas>
      <canvas ref="coinCanvasRef" class="coin-canvas"></canvas>
    </div>
    <div
      class="bg-pc"
      style="
        background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/bg.jpg);
      "
    ></div>
  </div>
</template>
<style scoped lang="scss">
.bg-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;

  .bg-mobile {
    position: absolute;
    top: 0;
    left: 50%;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-position: center top;
    background-repeat: no-repeat, repeat;
    background-size:
      100% auto,
      100%;
    z-index: 2;
    transform: translate(-50%);
  }

  .bg-canvas,
  .coin-canvas {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%);
  }

  .bg-canvas {
    z-index: 3;
    pointer-events: none;
  }
  .coin-canvas {
    z-index: 4;
    pointer-events: none;
  }

  .bg-pc {
    position: fixed;
    top: 0;
    left: 50%;
    display: none;
    width: 100%;
    height: 100%;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 1;
    transform: translate(-50%);
  }
}

@media (min-width: 576px) {
  .bg-wrap {
    .bg-mobile {
      width: 576px;
      box-shadow:
        0 0 20px #0000004d,
        0 0 30px #0000004d;
    }
    .background-wave-canvas {
      width: 576px;
    }

    .bg-pc {
      display: block;
    }
  }
}
</style>
