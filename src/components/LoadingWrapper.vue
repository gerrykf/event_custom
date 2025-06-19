<script setup lang="ts">
defineOptions({
  name: "LoadingWrapper",
});
</script>
<template>
  <div class="loader-wrap">
    <div class="loader-page-publish">
      <div class="loading-wrap">
        <div class="logo">
          <div class="white-gradient-for-loading"></div>
        </div>
        <div class="text">loading...</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.loader-wrap {
  .loader-page-publish {
    position: relative;
    overflow: hidden;
    background: rgb(245, 247, 250);
    z-index: 1;

    .loading-wrap {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: wait;
      flex-direction: column;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;

      .loading-wrap > .logo {
        position: relative;
      }

      .logo {
        position: relative;
        margin-bottom: 6px;
        font-size: 32px;
        color: #ca2821;

        .white-gradient-for-loading {
          position: absolute;
          top: -45px;
          left: -60px;
          width: 60px;
          height: 160px;
          background: linear-gradient(
            to right,
            rgba(245, 247, 250, 0) 0%,
            rgba(245, 247, 250, 0) 1%,
            rgb(255, 255, 255) 50%,
            rgba(245, 247, 250, 0) 100%
          );
          transform: rotate(45deg);
          animation: flash-animate 2s infinite;
          z-index: 10;
        }
      }

      .text {
        color: #ca2821;
        font-size: 16px;
      }

      .loading-wrap > .text {
        font-family:
          "\5FAE\8EDF\6B63\9ED1\9AD4", "Microsoft JhengHei", "微软雅黑", arial,
          helvetica, sans-serif;
        color: #ca2821;
      }
    }
  }
}

@keyframes flash-animate {
  0% {
    left: -80px;
  }

  100% {
    left: 80px;
  }
}
</style>
