<script setup lang="ts">
import { useAppStore } from "@/store";
import { storeToRefs } from "pinia";
import { computed } from "vue";

defineOptions({
  name: "AlertWrapper",
});

const props = withDefaults(
  defineProps<{
    title?: string;
    hideCancel?: boolean;
    hideConfirm?: boolean;
    cancelText?: string;
    confirmText?: string;
  }>(),
  {
    hideCancel: false,
    hideConfirm: false,
    cancelText: "取消",
    comfirmText: "确定",
  }
);

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "confirm"): void;
}>();

const appStore = useAppStore();
const { eventImages } = storeToRefs(appStore);

const images = computed(() => eventImages.value?.alert);
const btnsImages = computed(() => eventImages.value?.btns);

const handleCancel = () => {
  console.log("取消按钮被点击");
  emit("cancel");
};
const handleConfirm = () => {
  emit("confirm");
};
</script>
<template>
  <div class="alert-wrap" style="opacity: 1">
    <div
      class="alert-container"
      style="
        translate: none;
        rotate: none;
        scale: none;
        opacity: 1;
        transform: translate(0px, 0px);
      "
    >
      <div
        class="alert-top"
        :style="`
          background-image: url(${images?.top});
        `"
      >
        <div
          :class="['alert-title-img', { 'alert-title': props.title }]"
          :style="`${props.title ? '' : `background-image: url(${images?.title});`}`"
        >
          {{ props.title }}
        </div>
      </div>
      <div
        class="alert-body"
        :style="`
          background-image: url(${images?.body});
        `"
      >
        <div class="alert-content">
          <slot name="content"></slot>
        </div>
        <div class="alert-buttons">
          <div
            v-if="!props.hideCancel"
            class="default-btn highlight"
            :style="`
              background-image: url(${btnsImages?.btnHignlight});
            `"
            @click="handleCancel"
          >
            <!---->
            <div class="text">{{ props.cancelText }}</div>
          </div>
          <div
            v-if="!props.hideConfirm"
            class="default-btn"
            :style="`
              background-image: url(${btnsImages?.btn});
            `"
            @click="handleConfirm"
          >
            <!---->
            <div class="text">{{ props.confirmText }}</div>
          </div>
        </div>
        <!---->
      </div>
      <div
        class="alert-bottom"
        :style="`
          background-image: url(${images?.bottom});
        `"
      ></div>
      <!---->
    </div>
    <div
      class="light"
      style="
        background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/record_light.png);
      "
    ></div>
    <div class="mask"></div>
  </div>
</template>
<style scoped lang="scss">
.alert-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 13;

  .alert-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 80%;
    height: 100%;
    z-index: 3;
    pointer-events: none;
    flex-direction: column;

    .alert-top {
      pointer-events: visible;
      position: relative;
      padding-bottom: 15.6695156695%;
      width: 100%;
      background-repeat: no-repeat;
      background-size: 100% auto;
      z-index: 1;

      .alert-title {
        text-align: center;
        margin-top: 30px;
        font-size: 24px;
      }

      .alert-title-img {
        position: absolute;
        top: 0;
        left: 0;
        padding-bottom: 15.6695156695%;
        width: 100%;
        background-repeat: no-repeat;
        background-size: 100% auto;
      }
    }

    .alert-body {
      position: relative;
      margin-top: -1px;
      padding: 30px 1px 1px;
      width: 100%;
      font-size: 20px;
      text-align: center;
      line-height: 35px;
      color: var(--alert-text);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      z-index: 2;
      pointer-events: visible;

      .alert-content {
        padding: 0 5%;
        transform: translateY(-10px);

        .award-title {
          margin-bottom: 16px;
          font-size: 24px;
          color: var(--alert-text);
        }

        .award-amount {
          margin-bottom: 16px;
          font-size: 40px;
          color: var(--alert-text-highlight);
        }

        .award-account {
          font-size: 16px;
          font-weight: 700;
          color: var(--alert-text);
        }

        .prepare-hint {
          font-size: 14px;
          font-weight: 700;
          line-height: 1.85;
          color: var(--alert-text);
        }
      }

      .alert-buttons {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        margin-top: 16px;

        .default-btn {
          position: relative;
          margin-right: 8px;
          margin-left: 8px;
          padding-bottom: 50px;
          width: 150px;
          background-size: 100% auto;
          border-radius: 80px;
          cursor: pointer;
          pointer-events: visible;

          &:hover {
            transform: translate(-1px, -1px);
            box-shadow: 1px 1px #00000080;
          }

          &:only-child .text {
            padding: 3px 48px;
          }

          .text {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 22px;
            font-weight: bolder;
            white-space: nowrap;
            color: var(--alert-btn);
            transform: translate(-50%, -50%);
            pointer-events: none;
          }
        }
      }
    }

    .alert-bottom {
      position: relative;
      margin-top: -5px;
      padding-bottom: 15.6695156695%;
      width: 100%;
      background-repeat: no-repeat;
      background-size: 100% auto;
      z-index: 1;
      pointer-events: visible;
    }
  }

  .light {
    position: fixed;
    top: 50%;
    left: 50%;
    padding-bottom: 583.6048879837px;
    width: 550px;
    background-repeat: no-repeat;
    background-size: 100% auto;
    opacity: 0.3;
    z-index: 2;
    transform: translate(-50%, -50%);
    animation: sparkle 6s 0.5s linear infinite;
    pointer-events: none;
  }

  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000000a6;
    z-index: 1;
  }
}

@media (min-width: 576px) {
  .alert-container {
    width: 480px !important;
  }

  .light {
    padding-bottom: 689.7148676171px;
    width: 650px;
  }
}

@keyframes sparkle {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
