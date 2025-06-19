<script setup lang="ts">
import CoverWrapper from "@/components/CoverWrapper.vue";
import { useAppStore } from "@/store";
import { storeToRefs } from "pinia";
import { computed } from "vue";
defineOptions({
  name: "Record",
});

const emit = defineEmits<{
  close: [];
}>();

const appStore = useAppStore();
const { eventImages } = storeToRefs(appStore);

const images = computed(() => eventImages.value?.cover);
</script>
<template>
  <CoverWrapper @close="emit('close')">
    <div class="record-container">
      <div
        class="record-top"
        :style="`
          background-image: url(${images?.top});
        `"
      >
        <div
          class="record-title"
          :style="`
            background-image: url(${images?.title});
          `"
        ></div>
      </div>
      <div
        class="record-body"
        :style="`
          background-image: url(${images?.body});
        `"
      >
        <div class="record-content">
          <div class="amount-title text-center">您已获得的奖金总额</div>
          <div class="amount-text">0</div>
          <div class="log-table">
            <div class="log-table-head">
              <div class="d-flex">
                <div class="col-12">领奖时间</div>
                <div class="col-12">领奖金额</div>
              </div>
            </div>
            <div class="log-table-body">
              <div class="d-flex table-rows">
                <div class="col-12">--</div>
                <div class="col-12">--</div>
              </div>
              <div class="d-flex table-rows">
                <div class="col-12">--</div>
                <div class="col-12">--</div>
              </div>
              <div class="d-flex table-rows">
                <div class="col-12">--</div>
                <div class="col-12">--</div>
              </div>
              <div class="d-flex table-rows">
                <div class="col-12">--</div>
                <div class="col-12">--</div>
              </div>
              <div class="d-flex table-rows">
                <div class="col-12">--</div>
                <div class="col-12">--</div>
              </div>
            </div>
          </div>
          <div
            class="idx-1 record-coin"
            style="
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/record_coin_1.png);
            "
          ></div>
          <div
            class="idx-2 record-coin"
            style="
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/record_coin_2.png);
            "
          ></div>
          <div
            class="idx-3 record-coin"
            style="
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/record_coin_3.png);
            "
          ></div>
          <div
            class="idx-4 record-coin"
            style="
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/record_coin_4.png);
            "
          ></div>
          <div
            class="idx-5 record-coin"
            style="
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/record_coin_5.png);
            "
          ></div>
        </div>
        <div class="record-buttons">
          <div
            class="default-btn null"
            style="
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_btn_null.png);
            "
          >
            <div class="text">上一页</div>
          </div>
          <div
            class="default-btn null"
            style="
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_btn_null.png);
            "
          >
            <div class="text">下一页</div>
          </div>
        </div>
      </div>
      <div
        class="record-bottom"
        :style="`
          background-image: url(${images?.bottom});
        `"
      ></div>
      <div
        class="light"
        style="
          background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/record_light.png);
        "
      ></div>
    </div>
  </CoverWrapper>
</template>
<style scoped lang="scss">
.record-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: 50px;
  width: 80%;
  min-width: 384px;
  z-index: 2;
  flex-direction: column;

  .record-top {
    margin-top: 30px;

    .record-title {
      position: absolute;
      top: 0;
      left: 0;
      padding-bottom: 22.792022792%;
      width: 100%;
      transform: translateY(-68%);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  .record-body {
    position: relative;
    margin-top: -10px;
    width: 100%;
    font-size: 1.25rem;
    text-align: center;
    line-height: 2.2rem;
    color: #fff;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 3;

    .record-buttons {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }

    .amount-title {
      font-size: 1.2rem;
      font-weight: bolder;
      color: var(--recode-title);
    }

    .amount-text {
      margin: 5px auto 20px;
      padding: 0.2rem 1.6rem;
      width: 240px;
      font-size: 1.5rem;
      font-weight: bolder;
      color: var(--record-title-text);
      background-color: var(--record-title-bg);
      border: 2px solid var(--record-title-border);
      border-radius: 2rem;
    }

    .log-table {
      overflow: hidden;
      margin: 0 auto 10px;
      width: 90%;
      max-width: 360px;
      border: 2px solid var(--record-table-border);
      border-radius: 12px;

      .log-table-head {
        background-color: var(--record-table-title-bg);
        border-bottom: 1px solid var(--record-table-border);
      }

      .log-table-body .col-12 {
        width: 50%;
        font-size: 1.1rem;
        color: var(--record-table-text);
      }

      .d-flex {
        display: flex;
        color: var(--record-table-title);
        flex-wrap: wrap;

        .col-12 {
          padding: 0.3rem 0;
          width: 50%;
          font-weight: bolder;
          &:not(:last-child) {
            border-right: 1px solid var(--record-table-border);
          }
        }
      }

      .d-flex:not(:last-child) {
        border-bottom: 1px solid var(--record-table-border);
      }

      .d-flex.table-rows:nth-child(even) {
        background-color: var(--record-table-bg-even);
      }

      .d-flex.table-rows:nth-child(odd) {
        background-color: var(--record-table-bg-odd);
      }
    }

    .record-coin {
      position: absolute;
      width: 60px;
      height: 60px;
      background-repeat: no-repeat;
      background-size: 100% 100%;

      &.idx-1 {
        top: 50%;
        left: -50px;
      }

      &.idx-2 {
        top: 12%;
        left: -30px;
      }

      &.idx-3 {
        top: -60px;
        right: 15%;
      }

      &.idx-4 {
        top: 28%;
        right: -70px;
      }

      &.idx-5 {
        right: 5%;
        bottom: -50px;
      }
    }

    .record-buttons {
      display: flex;
      justify-content: center;
      margin-top: 16px;
    }
  }

  .record-bottom {
    margin-top: -1px;
  }

  .record-top,
  .record-bottom {
    position: relative;
    padding-bottom: 15.6695156695%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: 100% auto;
    z-index: 2;
  }
}

.default-btn {
  position: relative;
  margin: 0 0.25rem;
  padding: 4px 4px 55.5984555985px;
  width: 150px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 5rem;

  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 1.4rem;
    font-weight: bolder;
    white-space: nowrap;
    color: var(--record-btn-null);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
}

.light {
  position: absolute;
  top: 50%;
  left: 49%;
  padding-bottom: 636.6598778004px;
  width: 600px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.3;
  z-index: 1;
  transform: translate(-50%, -50%);
  animation: sparkle-2aaed488 6s 0.5s linear infinite;
  pointer-events: none;
}

@media (min-width: 576px) {
  .record-container {
    width: 480px;
  }

  .light {
    padding-bottom: 742.7698574338px;
    width: 700px;
  }
}
</style>
