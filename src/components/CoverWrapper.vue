<script setup lang="ts">
defineOptions({
  name: "CoverWrapper",
});

const emit = defineEmits<{
  close: [];
}>();
</script>
<template>
  <Transition name="fade-slide">
    <div class="cover-wrap" style="">
      <div class="cover-container" style="" @click="emit('close')">
        <svg
          id="_圖層_1"
          data-name="圖層 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64.93 64.93"
          class="cover-cancel-btn rule"
          @click="emit('close')"
        >
          <circle class="cls-1" cx="32.46" cy="32.46" r="30.91"></circle>
          <g>
            <path
              class="cls-2"
              d="m32.46,0C14.56,0,0,14.56,0,32.46s14.56,32.46,32.46,32.46,32.46-14.56,32.46-32.46S50.36,0,32.46,0Zm0,58.93c-14.59,0-26.46-11.87-26.46-26.46S17.87,6,32.46,6s26.46,11.87,26.46,26.46-11.87,26.46-26.46,26.46Z"
            ></path>
            <path
              class="cls-2"
              d="m44.76,20.17c-1.17-1.17-3.07-1.17-4.24,0l-8.05,8.05-8.05-8.05c-1.17-1.17-3.07-1.17-4.24,0-1.17,1.17-1.17,3.07,0,4.24l8.05,8.05-8.05,8.05c-1.17,1.17-1.17,3.07,0,4.24.59.59,1.35.88,2.12.88s1.54-.29,2.12-.88l8.05-8.05,8.05,8.05c.59.59,1.35.88,2.12.88s1.54-.29,2.12-.88c1.17-1.17,1.17-3.07,0-4.24l-8.05-8.05,8.05-8.05c1.17-1.17,1.17-3.07,0-4.24Z"
            ></path>
          </g>
        </svg>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>
<style scoped lang="scss">
.cover-wrap {
  position: absolute;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100vh;
  background-color: #000000a6;
  z-index: 12;
  scroll-behavior: smooth;

  .cover-container {
    position: absolute;
    padding: 50px 5% 150px;
    width: 100%;
    z-index: 1;
  }

  .cover-cancel-btn {
    position: fixed;
    top: 1.5rem;
    right: calc(5% - 25px);
    width: 50px;
    height: 50px;
    background-position: left top;
    background-repeat: no-repeat;
    background-size: 100% auto;
    z-index: 3;
    cursor: pointer;

    .cls-1 {
      fill: var(--cancel-btn-bg);
    }

    .cls-2 {
      fill: var(--cancel-btn-line);
    }
  }
}

/* 动画 */
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(600px);
}
.fade-slide-enter-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
}
.fade-slide-leave-active {
  transition: opacity 0.4s ease;
}
.fade-slide-leave-to {
  opacity: 0;
}

// 不显示滚动条
.cover-wrap::-webkit-scrollbar {
  display: none;
}
</style>
