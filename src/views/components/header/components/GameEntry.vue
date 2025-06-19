<script setup lang="ts">
import CoverWrapper from "@/components/CoverWrapper.vue";
defineOptions({
  name: "GameEntry",
});

const emit = defineEmits<{
  close: [];
}>();
</script>
<template>
  <CoverWrapper @close="emit('close')">
    <div class="shared-game">
      <div
        class="title"
        style="
          background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/game_title.png);
        "
      ></div>
      <div class="game-wrap">
        <div class="hall-container">
          <div class="name">BB電子</div>
          <div class="btn">进入大厅 &gt;</div>
        </div>
        <div class="category-container">
          <div class="game-list-title">全产品</div>
          <!---->
        </div>
      </div>
      <div class="game-wrap">
        <div class="hall-container">
          <div class="name">BB捕鱼大师</div>
          <div class="btn">进入大厅 &gt;</div>
        </div>
        <div class="category-container">
          <div class="game-list-title">全产品</div>
          <!---->
        </div>
      </div>
      <div class="game-wrap">
        <div class="hall-container">
          <div class="name">BB体育</div>
          <div class="btn">进入大厅 &gt;</div>
        </div>
        <div class="category-container">
          <div class="game-list-title">全产品</div>
          <!---->
        </div>
      </div>
      <div class="game-wrap">
        <div class="hall-container">
          <div class="name">NBB体育</div>
          <div class="btn">进入大厅 &gt;</div>
        </div>
        <div class="category-container">
          <div class="game-list-title">全产品</div>
          <!---->
        </div>
      </div>
      <div class="game-wrap">
        <div class="hall-container">
          <div class="name">BB视讯</div>
          <div class="btn">进入大厅 &gt;</div>
        </div>
        <div class="category-container">
          <div class="game-list-title">全产品</div>
          <!---->
        </div>
      </div>
      <div class="game-wrap">
        <div class="hall-container">
          <div class="name">BB彩票</div>
          <div class="btn">进入大厅 &gt;</div>
        </div>
        <div class="category-container">
          <div class="game-list-title">全产品</div>
          <!---->
        </div>
      </div>
      <div class="game-wrap">
        <div class="hall-container">
          <div class="name">BB棋牌</div>
          <div class="btn">进入大厅 &gt;</div>
        </div>
        <div class="category-container">
          <div class="game-list-title">全产品</div>
          <!---->
        </div>
      </div>
    </div>
  </CoverWrapper>
</template>
<style scoped lang="scss">
.shared-game {
  position: relative;
  display: flex;
  margin: 0 auto 0.5rem;
  padding: 1rem 4%;
  width: 100%;
  color: var(--rule-text);
  background: var(--game-bg);
  border: 2px solid var(--game-border);
  border-radius: 1rem;
  z-index: 2;
  box-sizing: border-box;
  flex-wrap: wrap;

  .title {
    margin: 0.5rem 0 1.3rem;
    width: 100%;
    height: 1.9rem;
    background-position: left top;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }

  .game-wrap {
    overflow: hidden;
    margin-bottom: 3%;
    width: 100%;
    border: 2px solid var(--game-table);
    border-radius: 1rem;

    .hall-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.4rem 1rem;
      height: 1.58rem;
      background-color: var(--game-table);

      .name {
        width: 50%;
        font-size: 1.4rem;
        font-weight: bolder;
        white-space: nowrap;
        color: var(--game-hall-name);
      }

      .btn {
        position: relative;
        padding: 0.4rem 0.8rem;
        font-size: 1rem;
        font-weight: bolder;
        color: var(--game-table);
        background-color: var(--game-hall-btn-bg);
        border-radius: 2rem;
      }
    }

    .category-container {
      margin: 3% 0 5%;
      padding: 0 0 0 0.86rem;
      width: 100%;
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: var(--game-category);
    }
  }
}
</style>
