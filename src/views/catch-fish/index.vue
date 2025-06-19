<script setup lang="ts">
import { ref } from "vue";
import { useFloatingBubbles } from "./hooks/useFloatingBubbles";
import EventWrapper from "@/views/components/event-wrapper/index.vue";
import BG from "./components/bg/index.vue";
import { useCatchFishHook } from "./utils/useCatchFishHook";
import { padZero, formatAmount } from "@/utils/tools";

defineOptions({
  name: "CatchFish",
});

const bubbleCanvasRef = ref<HTMLCanvasElement | null>(null);

useFloatingBubbles(
  bubbleCanvasRef,
  "https://d3ezwcpy5gysd4.cloudfront.net/E23/bubble.png"
);

const {
  mainObjContainerRef,
  bulletRef,
  explosionRef,
  mainObjRef,
  treasureBoxRef,
  currentMainObjUrl,
  currentLevelData,
  showPrevButton,
  showNextButton,
  goal,
  prevLevel,
  nextLevel,
  onStart,
} = useCatchFishHook();
</script>
<template>
  <EventWrapper>
    <BG />

    <div class="main-content-wrap">
      <!-- 活动标题 -->
      <div class="activity-title-wrap">
        <div
          class="title"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/activity_title.png);
          "
        >
          <div class="date" style="background-image: url(activity_date_bg.png)">
            08/11-08/16
            <span class="hint"> 领奖截止：08/17</span>
          </div>
        </div>
      </div>

      <div class="threshold-wrap">
        <div ref="mainObjContainerRef" class="main-obj-container">
          <!-- 主体对象 -->
          <div
            ref="mainObjRef"
            class="main-obj"
            :style="`
              background-image: url(${currentMainObjUrl});
              filter: none;
              opacity: 1;
            `"
          >
            <!-- 炮弹命中 -->
            <div
              ref="explosionRef"
              class="explosion"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/explosion.png);
                translate: none;
                rotate: none;
                scale: none;
                opacity: 0.7;
                transform: translate(-80.6328px, -79.8984px);
                display: none;
              "
            ></div>
          </div>

          <!-- 宝箱 -->
          <div
            ref="treasureBoxRef"
            class="treasure-box"
            style="
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/treasure_box.png);
              transform: scale(0, 0);
              translate: none;
              rotate: none;
              scale: none;
              opacity: 0;
              transform-origin: 50% 50%;
            "
          ></div>
        </div>
        <!-- 等级信息 -->
        <div
          class="threshold-board"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/threshold_wrap.png);
          "
        >
          <div class="level">
            <div class="level-text">
              Lv {{ padZero(currentLevelData?.level) }}
            </div>
            <div class="level-frame">
              Lv {{ padZero(currentLevelData?.level) }}
            </div>
          </div>
          <div class="amount">
            <div class="amount-text">
              {{ formatAmount(currentLevelData?.award) }}
            </div>
            <div class="amount-frame">
              {{ formatAmount(currentLevelData?.award) }}
            </div>
          </div>
          <div class="condition-list">
            <div
              class="condition deposit"
              :style="`
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rank_condition${goal ? '_goal' : ''}.png);
            `"
            >
              <span class="condition-amount goal">{{
                formatAmount(currentLevelData?.deposit)
              }}</span>
            </div>
            <div
              class="condition bet"
              :style="`
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rank_condition${goal ? '_goal' : ''}.png);
              `"
            >
              <span class="condition-amount goal">{{
                formatAmount(currentLevelData?.bet)
              }}</span>
            </div>
          </div>
          <div class="btn-switch" style="">
            <div
              :class="['btn', 'btn-left', { disabled: !showPrevButton }]"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/switch_btn_left.png);
              "
              @click="prevLevel"
            >
              <div
                class="btn-halo"
                style="
                  background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/switch_btn_halo.png);
                "
              ></div>
            </div>
            <div
              :class="['btn', 'btn-right', { disabled: !showNextButton }]"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/switch_btn_right.png);
              "
              @click="nextLevel"
            >
              <div
                class="btn-halo"
                style="
                  background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/switch_btn_halo.png);
                "
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="winner-list-wrap">
        <div
          class="winner-list-bg"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/winner_list_bg.png);
          "
        ></div>
        <div class="award-container">
          <span
            class="award"
            style="
              translate: none;
              rotate: none;
              scale: none;
              opacity: 1;
              transform: translate(0px, 0px);
            "
            >恭喜 biz*** 获得 2,115.74 元</span
          >
        </div>
      </div>

      <div class="bet-wrap">
        <div
          class="fort active"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/fort.png);
            translate: none;
            rotate: none;
            scale: none;
            transform: translate(-50%, 0%) translate(-0.1953px, -74.5875px);
          "
        ></div>
        <!-- 炮弹 -->
        <div
          ref="bulletRef"
          class="bullet"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/bullet.png);
            translate: none;
            rotate: none;
            scale: none;
            transform: translate(-24px, -20px);
            display: none;
          "
        ></div>
        <!-- 开奖 -->
        <div
          :class="['bet-btn', { active: goal }]"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/bet.png);
          "
          @click="onStart"
        ></div>
      </div>

      <div
        class="user-title-wrap"
        style="
          background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/user_info_board.png);
        "
      >
        <div class="user-title-apply">
          <p class="activity-remain-time remain-time">不限制</p>
          <p class="daily-remain-time remain-time">不限制</p>
        </div>
        <div class="user-title-condition">
          <div class="deposit condition">
            <div
              class="label"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/threshold_title_condition.png);
              "
            ></div>
            <div class="amount">888</div>
          </div>
          <div class="bet condition">
            <div
              class="label"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/threshold_title_condition.png);
              "
            ></div>
            <div class="amount">5,888</div>
          </div>
        </div>
        <div
          class="bg-repeat"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/bg_repeat.jpg);
          "
        ></div>
      </div>

      <div class="bubble-wrap">
        <canvas
          ref="bubbleCanvasRef"
          id="bubbleCanvas"
          class="bubble-canvas"
          width="576"
          height="958"
          style="touch-action: none; cursor: inherit"
        ></canvas>
      </div>
    </div>
  </EventWrapper>
</template>
<style scoped lang="scss">
@use "./index.scss" as *;
</style>
