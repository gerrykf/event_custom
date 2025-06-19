<script setup lang="ts">
import EventWrapper from "@/views/components/event-wrapper/index.vue";
import BG from "./components/bg/index.vue";
import { useCoinTreeHook } from "./utils/useCoinTreeHook";
import { padZero, formatAmount } from "@/utils/tools";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store";

defineOptions({
  name: "CoinTree",
});

const { levelList } = storeToRefs(useAppStore());

const {
  currentLevelData,
  fallingObjCanvasRef,
  thresholdContainerRef,
  goal,
  prevLevel,
  nextLevel,
  onStart,
} = useCoinTreeHook();
</script>
<template>
  <EventWrapper>
    <BG />
    <div class="main-content-wrap">
      <!-- 活动标题 -->
      <div class="event-title-wrap">
        <div
          class="title image-setting"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/activity_title.png);
          "
        >
          <div class="date">
            <div
              class="date-bg-left image-setting"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/date_bg_left.png);
              "
            ></div>
            <div
              class="date-bg-center image-setting"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/date_bg_center.png);
              "
            >
              02/27-03/05
              <span class="hint"> 领奖截止：03/07</span>
            </div>
            <div
              class="date-bg-right image-setting"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/date_bg_right.png);
              "
            ></div>
          </div>
        </div>
      </div>

      <!-- 活动树 -->
      <div class="tree-wrap">
        <!-- 树后的光源 -->
        <div
          class="halo image-setting"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/halo_yellow.png);
            translate: none;
            rotate: none;
            scale: none;
          "
        ></div>
        <!-- 树下的金币 -->
        <div
          class="trunk-deco-bg image-setting"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/trunk_bg_deco.png);
          "
        ></div>
        <!-- 树干 -->
        <div
          class="trunk image-setting"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/trunk.png);
            translate: none;
            rotate: none;
            scale: none;
          "
        ></div>
        <div
          class="trunk-deco-fg image-setting"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/trunk_fg_deco.png);
          "
        ></div>
        <div class="falling-obj-wrap">
          <canvas
            ref="fallingObjCanvasRef"
            id="fallingObjCanvas"
            class="falling-obj-canvas"
            width="576"
            height="559"
            style="touch-action: none; cursor: inherit"
          ></canvas>
        </div>
        <!-- 中奖信息弹窗 -->
        <!-- <div class="popup-text-bubble-wrap">
          <div
            class="text-bubble-container"
            style="
              top: 21%;
              left: 8%;
              translate: none;
              rotate: none;
              scale: none;
              opacity: 1;
              transform: translate(0px, 0px);
            "
          >
            <div
              class="left image-setting"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/text_bubble_left.png);
              "
            ></div>
            <div
              class="center"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/text_bubble_center.png);
              "
            >
              恭喜 bbi*** 获得 168 元
            </div>
            <div
              class="right image-setting"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/text_bubble_right.png);
              "
            ></div>
            <div
              class="triangle image-setting"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/text_bubble_triangle.png);
              "
            ></div>
          </div>
        </div> -->
        <div
          class="tree-layer image-setting tree-layer-1"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/tree_layer_1.png);
            translate: none;
            rotate: none;
            scale: none;
            transform: translate(0px, 0px);
          "
        ></div>
        <div
          class="tree-layer image-setting tree-layer-2"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/tree_layer_2.png);
            translate: none;
            rotate: none;
            scale: none;
            transform: translate(0px, 0px);
          "
        ></div>
        <div
          class="tree-layer image-setting tree-layer-3"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/tree_layer_3.png);
            translate: none;
            rotate: none;
            scale: none;
            transform: translate(0px, 0px);
          "
        ></div>
        <div
          class="tree-layer image-setting tree-layer-4"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/tree_layer_4.png);
            translate: none;
            rotate: none;
            scale: none;
            transform: translate(0px, 0px);
          "
        ></div>
        <div
          class="tree-layer-5-deco image-setting tree-layer-5-deco-1"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/tree_layer_5_deco_1.png);
            translate: none;
            rotate: none;
            scale: none;
            transform: translate(0px, 0px);
            transform-origin: 50% 60%;
          "
        ></div>
        <div
          class="tree-layer-5-deco image-setting tree-layer-5-deco-2"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/tree_layer_5_deco_2.png);
            translate: none;
            rotate: none;
            scale: none;
            transform: translate(1.3997%, -2.3329%) translate3d(0px, 0px, 0px)
              rotate(2.3329deg);
          "
        ></div>
        <div
          class="tree-layer-5-deco image-setting tree-layer-5-deco-3"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/tree_layer_5_deco_3.png);
            translate: none;
            rotate: none;
            scale: none;
            transform: translate(1.3997%, -2.3329%) translate3d(0px, 0px, 0px)
              rotate(0.9332deg);
          "
        ></div>
        <div class="sparkle-wrap">
          <canvas
            id="sparkleCanvas"
            class="sparkle-canvas"
            width="576"
            height="559"
            style="touch-action: none; cursor: inherit"
          ></canvas>
        </div>
      </div>
    </div>

    <div class="foreground-wrap">
      <div
        class="foreground"
        style="
          background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/threshold_bg.png);
        "
      ></div>
    </div>

    <!-- 开奖按钮&当前等级信息 -->
    <div class="info-board-wrap">
      <div class="info-board-container">
        <div
          class="times-board-container image-setting"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/times_board.png);
          "
        >
          <div class="remain-time-text remain-time-text-1">不限制</div>
          <div class="remain-time-text remain-time-text-2">不限制</div>
        </div>
        <div class="info-point-container">
          <div class="info-point">
            <div
              class="info-point-bg image-setting goal"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/info_deposit.png);
              "
            >
              <div class="text-amount">888</div>
            </div>
            <div
              class="info-point-bg image-setting goal"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/info_bet.png);
              "
            >
              <div class="text-amount">5,888</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-bet-container" @click="onStart">
        <div
          v-if="goal"
          class="bet-bg image-setting"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/btn_bet_bg.png);
          "
        >
          <div
            class="bet-energy image-setting"
            :style="`
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/btn_bet_energy.png);
              height: ${currentLevelData.level * 10}%;
            `"
          ></div>
          <div
            :class="['bet-fg', 'image-setting']"
            style="
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/btn_bet_fg.png);
            "
          ></div>
        </div>
        <div
          v-else
          class="bet-lock image-setting"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/btn_bet_lock.png);
          "
        ></div>
        <div class="text-level-container">
          <div class="text-level">LV{{ padZero(currentLevelData.level) }}</div>
        </div>
      </div>
    </div>

    <!-- 等级列表信息 -->
    <div class="threshold-wrap">
      <div
        ref="thresholdContainerRef"
        class="threshold-container"
        style="
          translate: none;
          rotate: none;
          scale: none;
          transform: translate(0px, 0px);
        "
      >
        <div
          v-for="item in levelList"
          :class="[
            'threshold-board',
            'image-setting',
            { goal: item.level === currentLevelData.level && goal },
          ]"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/threshold_board.png);
          "
        >
          <div class="text-level">LV{{ padZero(item.level) }}</div>
          <div class="text-max-award">{{ formatAmount(item.award) }}</div>
          <div class="threshold-info-container">
            <div
              class="threshold-point-bg image-setting"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/threshold_deposit.png);
              "
            >
              <div class="text-point">{{ formatAmount(item.deposit) }}</div>
            </div>
            <div
              class="threshold-point-bg image-setting"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/threshold_bet.png);
              "
            >
              <div class="text-point">{{ formatAmount(item.bet) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="dust-wrap">
        <canvas
          id="dustCanvas"
          class="dust-canvas"
          width="374"
          height="130"
          style="touch-action: none; cursor: inherit"
        ></canvas>
      </div>
      <div class="btn-switch-container">
        <div
          :class="[
            'btn-switch',
            'image-setting',
            { disable: currentLevelData.level === 1 },
          ]"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/btn_switch_left.png);
          "
          @click="prevLevel"
        ></div>
        <div
          :class="[
            'btn-switch',
            'image-setting',
            { disable: currentLevelData.level === levelList.length },
          ]"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E10/btn_switch_right.png);
          "
          @click="nextLevel"
        ></div>
      </div>
    </div>
  </EventWrapper>
</template>
<style scoped lang="scss">
@use "./index.scss" as *;
</style>
