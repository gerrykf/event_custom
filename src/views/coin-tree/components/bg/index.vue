<script setup lang="ts"></script>
<template>
  <div class="bg-wrap">
    <div
      class="bg-mobile"
      style="
        background-image:
          url(&quot;https://d3ezwcpy5gysd4.cloudfront.net/E10/bg_m.jpg?v=1749884879082&quot;),
          url(&quot;https://d3ezwcpy5gysd4.cloudfront.net/E10/bg_repeat.png?v=1749884879082&quot;);
      "
    ></div>
    <div
      class="bg-pc"
      style="
        background-image: url(&quot;https://d3ezwcpy5gysd4.cloudfront.net/E10/bg.jpg?v=1749884879082&quot;);
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
    width: 100%;
    height: 100%;
    background-position: center top;
    background-repeat: no-repeat, repeat;
    background-size:
      100% auto,
      100%;
    transform: translate(-50%);
    z-index: 2;
  }

  .bg-pc {
    position: absolute;
    top: 0;
    left: 50%;
    display: none;
    width: 100%;
    height: 100%;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
    transform: translate(-50%);
    z-index: 1;
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

    .bg-pc {
      display: block;
    }
  }
}
</style>
