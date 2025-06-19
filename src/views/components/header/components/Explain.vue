<script setup lang="ts">
import CoverWrapper from "@/components/CoverWrapper.vue";

defineOptions({
  name: "Explain",
});

const emit = defineEmits<{
  close: [];
}>();
</script>
<template>
  <CoverWrapper @close="emit('close')">
    <div class="shared-rule">
      <div class="rule-head">
        <div class="title">
          <div
            class="content"
            style="
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_title.png);
            "
          ></div>
        </div>
        <div class="condition-wrap">
          <div class="condition-container">
            <div class="headline">活动时间:</div>
            <div class="condition">美东 2024/08/11~2024/08/16</div>
          </div>
          <div class="condition-container">
            <div class="headline">累计时间:</div>
            <div class="condition">美东 2024/08/11~2024/08/16</div>
          </div>
          <div class="condition-container">
            <div class="headline">领奖时间:</div>
            <div class="condition">延至美东 2024/8/17 止</div>
          </div>
        </div>
      </div>
      <div class="rule-body">
        <div class="reward-step">
          <div class="title-wrap">
            <div
              class="icon"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_step_1.png);
              "
            ></div>
            <div class="text">领奖步骤</div>
          </div>
          <div class="text">
            开奖完成后，奖金于一小时内<span class="highlight">自动入帐</span
            >，<span class="highlight">免打码</span>即可申请出款
          </div>
          <div class="step-container">
            <div class="step-one">
              <div class="title">步骤ㄧ</div>
              <div
                class="content"
                style="
                  background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_step_1_content_1.png);
                "
              >
                <div class="text">点数符合资格</div>
              </div>
            </div>
            <div
              class="arrow"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_step_1_arrow.png);
              "
            ></div>
            <div class="step-two">
              <div class="title">步骤二</div>
              <div
                class="content"
                style="
                  background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_step_1_content_2.png);
                "
              >
                <div class="text">领奖金</div>
              </div>
            </div>
          </div>
        </div>
        <div class="reward-amount">
          <div class="title-wrap">
            <div
              class="icon"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_step_2.png);
              "
            ></div>
            <div class="text">活动奖金</div>
          </div>
          <!---->
          <div class="text">开奖后，您的点数将依所需点数进行扣除</div>
          <!---->
          <div class="table-title-container">
            <div class="table-title-text">普通会员</div>
            <div class="tooltip">普通会员</div>
          </div>
          <div class="table">
            <div class="bottom-container">
              <div class="left">
                <span class="threshold-title">LV 1</span>
                <div class="max-amount-title">最高奖金</div>
                <div class="max-amount reward-highlight">688</div>
              </div>
              <div class="right">
                <div class="right-title">所需条件</div>
                <div class="split-line"></div>
                <div class="condition-container">
                  <div class="condition-title">存款</div>
                  <div class="amount reward-highlight">88</div>
                </div>
                <div class="condition-container">
                  <div class="condition-title">打码</div>
                  <div class="amount reward-highlight">888</div>
                </div>
              </div>
            </div>
          </div>
          <div class="table">
            <div class="bottom-container">
              <div class="left">
                <span class="threshold-title">LV 2</span>
                <div class="max-amount-title">最高奖金</div>
                <div class="max-amount reward-highlight">1,088</div>
              </div>
              <div class="right">
                <div class="right-title">所需条件</div>
                <div class="split-line"></div>
                <div class="condition-container">
                  <div class="condition-title">存款</div>
                  <div class="amount reward-highlight">288</div>
                </div>
                <div class="condition-container">
                  <div class="condition-title">打码</div>
                  <div class="amount reward-highlight">2,888</div>
                </div>
              </div>
            </div>
          </div>
          <div class="table">
            <div class="bottom-container">
              <div class="left">
                <span class="threshold-title">LV 3</span>
                <div class="max-amount-title">最高奖金</div>
                <div class="max-amount reward-highlight">16,888</div>
              </div>
              <div class="right">
                <div class="right-title">所需条件</div>
                <div class="split-line"></div>
                <div class="condition-container">
                  <div class="condition-title">存款</div>
                  <div class="amount reward-highlight">888</div>
                </div>
                <div class="condition-container">
                  <div class="condition-title">打码</div>
                  <div class="amount reward-highlight">5,888</div>
                </div>
              </div>
            </div>
          </div>
          <div class="table">
            <div class="bottom-container">
              <div class="left">
                <span class="threshold-title">LV 4</span>
                <div class="max-amount-title">最高奖金</div>
                <div class="max-amount reward-highlight">68,888</div>
              </div>
              <div class="right">
                <div class="right-title">所需条件</div>
                <div class="split-line"></div>
                <div class="condition-container">
                  <div class="condition-title">存款</div>
                  <div class="amount reward-highlight">8,888</div>
                </div>
                <div class="condition-container">
                  <div class="condition-title">打码</div>
                  <div class="amount reward-highlight">8,888</div>
                </div>
              </div>
            </div>
          </div>
          <div class="table-bottom"></div>
        </div>
        <div
          class="deco-2"
          style="
            background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_decoration_2.png);
          "
        ></div>
        <div class="cumulative section-count-1">
          <div class="title-wrap">
            <div
              class="icon"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_step_3.png);
              "
            ></div>
            <div class="text">点数累计方式</div>
          </div>
          <div class="cumulative-wrap">
            <div class="cumulative-container">
              <div class="title">存款1元=累积存款1点</div>
            </div>
            <div class="cumulative-container">
              <div class="title">有效投注1元=累积打码1点</div>
              <div class="split-line"></div>
              <div class="detail-container">
                <div
                  class="icon"
                  style="
                    background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_step_3_icon_cumulative_bet.png);
                  "
                ></div>
                <div class="detail">
                  会员于活动期间投注指定游戏 <br /><span class="highlight"
                    >有效投注</span
                  >金额 1,000 获得打码点数 1,000
                </div>
              </div>
            </div>
          </div>
          <div
            class="deco-3"
            style="
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_decoration_3.png);
            "
          ></div>
        </div>
        <div class="note section-1">
          <div class="title-wrap">
            <div
              class="icon"
              style="
                background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_step_4.png);
              "
            ></div>
            <div class="text">注意事项</div>
          </div>
          <div class="contents">
            <div class="group group-1">
              <div class="content content-1">
                <div>
                  点数<span class="highlight">每30分钟更新一次</span
                  >，因网速差异未立即更新，请稍待
                </div>
              </div>
              <div class="content content-1">
                <div>开奖过程如遇操作中断，系统将自动为您开奖及派送奖金</div>
              </div>
              <div class="content content-1">
                <div>领奖截止后，若剩馀投注点数未进行开奖，将视同放弃资格</div>
              </div>
            </div>
            <div class="group group-2">
              <div class="content content-1">
                <div>如不可抗因素导致注销注单，该注单不列入本活动投注点数</div>
              </div>
              <div class="content content-1">
                <div>如使用不当手段或任何无风险投注，将取消获奖资格</div>
              </div>
              <div class="content content-1">
                <div>活动将保有执行、修正、解释与终止等权力</div>
              </div>
              <!---->
            </div>
          </div>
          <div
            class="deco-4"
            style="
              background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_decoration_4.png);
            "
          ></div>
        </div>
      </div>
      <div
        class="deco-1"
        style="
          background-image: url(https://d3ezwcpy5gysd4.cloudfront.net/E23/rule_decoration_1.png);
        "
      ></div>
    </div>
  </CoverWrapper>
</template>
<style scoped lang="scss">
.shared-rule {
  position: relative;
  margin-top: 4rem;
  width: 100%;
  border: 2px solid var(--rule-border);
  z-index: 2;
  box-sizing: border-box;

  .rule-head {
    position: absolute;
    top: -4rem;
    left: 50%;
    display: flex;
    justify-content: center;
    width: 89%;
    border: 2px solid var(--rule-border);
    z-index: 2;
    transform: translate(-50%);

    .title {
      position: relative;
      width: 25%;
      background-color: var(--rule-bg-second);
      border-right: 2px solid var(--rule-border);
      box-sizing: border-box;

      .content {
        position: absolute;
        top: 50%;
        left: 50%;
        padding-bottom: 55.7692307692px;
        width: 50px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% auto;
        transform: translate(-50%, -50%);
      }
    }

    .condition-wrap {
      padding: 5% 1rem;
      width: 75%;
      background-color: var(--rule-bg-first);

      .condition-container {
        display: flex;
        margin: 1% 0;
        width: 100%;
        font-size: 0.8rem;
        white-space: nowrap;

        .headline {
          margin-right: 0.2rem;
          color: var(--rule-text);
        }

        .condition {
          color: var(--rule-highlight);
        }
      }
    }
  }

  .rule-body {
    position: relative;
    display: flex;
    width: 100%;
    font-weight: 700;
    color: var(--rule-text);
    z-index: 1;
    flex-wrap: wrap;

    .reward-step {
      margin: 0 auto;
      padding: 3.5rem 6% 1.5rem;
      width: 100%;
      background-color: var(--rule-bg-first);

      .title-wrap {
        display: flex;
        align-items: center;
        margin-top: 0.1rem;

        .icon {
          margin-right: 0.5rem;
          width: 1.75rem;
          height: 1.75rem;
          background-position: left top;
          background-repeat: no-repeat;
          background-size: auto 100%;
        }
      }

      .text {
        margin: 0.5rem 0 0.7rem;
        line-height: 1.5rem;
      }

      .step-container {
        display: flex;
        align-items: center;

        .step-one,
        .step-two {
          width: 45.75%;
          text-align: center;
          border: 2px solid var(--rule-step-border);

          .title {
            padding: 8px 0;
            color: var(--rule-step-title);
            background-color: var(--rule-step-border);
          }

          .content {
            position: relative;
            padding-bottom: 55.3156146179%;
            width: 100%;
            background-size: 100% auto;

            .text {
              position: absolute;
              top: -8px;
              left: 50%;
              white-space: nowrap;
              transform: translate(-50%);
            }
          }
        }

        .arrow {
          margin: 0 2%;
          padding-bottom: 5.7162162162%;
          width: 4.5%;
          background-repeat: no-repeat;
          background-size: 100% auto;
        }
      }
    }

    .reward-amount {
      padding: 0 6%;
      padding-top: 1rem;
      width: 100%;
      background-color: var(--rule-bg-second);

      .title-wrap {
        display: flex;
        align-items: center;
        margin-top: 0.1rem;

        .icon {
          margin-right: 0.5rem;
          width: 1.75rem;
          height: 1.75rem;
          background-position: left top;
          background-repeat: no-repeat;
          background-size: auto 100%;
        }
      }

      .text {
        margin: 0.5rem 0 0.7rem;
        text-align: left;
        line-height: 1.5rem;
      }

      .table-title-container {
        position: relative;
        width: 100%;

        &:hover {
          cursor: pointer;
        }

        &:hover .tooltip {
          display: block;
        }

        .table-title-text {
          overflow: hidden;
          padding: 2.5% 5%;
          max-width: 479px;
          font-size: 1.4rem;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--rule-reward-title);
          background-color: var(--rule-reward-border);
          border-radius: 1.5rem 1.5rem 0 0;
        }

        .tooltip {
          position: absolute;
          top: 55%;
          left: 55%;
          display: none;
          padding: 1%;
          max-width: 50%;
          background-color: #ffffffb3;
        }
      }

      .table {
        text-align: center;
        color: var(--rule-reward-text);
        border-right: 2px solid var(--rule-reward-border);
        border-bottom: 2px solid var(--rule-reward-border);
        border-left: 2px solid var(--rule-reward-border);

        .bottom-container {
          display: flex;
          width: 100%;
          height: 100%;

          .left {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            background-color: var(--rule-reward-bg-left);
            flex-direction: column;

            .threshold-title {
              display: inline;
              letter-spacing: 0.8px;
              margin: 0 0 5% 0.8px;
              padding: 8px 7%;
              color: var(--rule-reward-level-text);
              background-color: var(--rule-reward-level-bg);
              border-radius: 16px;
            }

            .max-amount-title {
              margin-bottom: 3%;
              margin-left: 0.3rem;
              font-size: 1.1rem;
              font-weight: 400;
              text-align: center;
              letter-spacing: 0.3rem;
            }

            .max-amount {
              width: 100%;
              font-size: 24px;
              text-align: center;
            }
          }

          .right {
            width: 50%;
            background-color: var(--rule-reward-bg-right);

            .right-title {
              margin-top: 5%;
              margin-left: 0.3rem;
              font-size: 1.1rem;
              font-weight: 400;
              letter-spacing: 0.3rem;
            }

            .split-line {
              margin: 5% auto;
              width: 80%;
              height: 2px;
              background-color: var(--rule-reward-border);
            }

            .condition-container {
              display: flex;
              margin: 7% 0 7% 10%;
              width: 80%;

              .condition-title {
                width: 30%;
                font-weight: 400;
                letter-spacing: 0.1rem;
                text-align: left;
              }

              .amount {
                width: 70%;
                text-align: left;
              }
            }
          }

          .reward-highlight {
            color: var(--rule-reward-highlight);
          }
        }
      }

      .table-bottom {
        margin-bottom: 27px;
        padding: 3% 0;
        background-color: var(--rule-reward-border);
        border-radius: 0 0 24px 24px;
      }
    }

    .deco-2 {
      position: absolute;
      top: 10rem;
      left: -3rem;
      padding-bottom: 5rem;
      width: 5rem;
      background-repeat: no-repeat;
      background-size: 100% auto;
    }

    .cumulative {
      padding: 1rem 6%;
      width: 100%;
      background-color: var(--rule-bg-first);

      .cumulative-wrap {
        .cumulative-container:first-child {
          margin: 1rem 0;
        }

        .cumulative-container {
          overflow: hidden;
          margin-bottom: 1rem;
          border: 2px solid var(--rule-cumulative-border);
          border-radius: 1rem;

          .title {
            padding: 1.2rem 0;
            font-size: 1.3rem;
            text-align: center;
            background-color: var(--rule-cumulative-bg-title);
            letter-spacing: 0.1rem;
          }

          .split-line {
            height: 1px;
            background-color: var(--rule-cumulative-border);
          }

          .detail-container {
            display: flex;
            align-items: center;
            padding: 1rem 0;
            background-color: var(--rule-cumulative-bg-content);

            .icon {
              position: relative;
              width: 20%;
              height: 3rem;
              background-position: center;
              background-repeat: no-repeat;
              background-size: 3rem auto;
            }

            .detail {
              padding-right: 1%;
              width: 80%;
              font-size: 1rem;
              font-weight: lighter;
              line-height: 1.5rem;
              letter-spacing: 0.05rem;
            }
          }
        }
      }

      .deco-3 {
        position: absolute;
        top: 33rem;
        right: -2rem;
        padding-bottom: 5rem;
        width: 5rem;
        background-size: 100% auto;
      }
    }

    .title-wrap {
      display: flex;
      align-items: center;
      margin-top: 0.1rem;

      .icon {
        margin-right: 0.5rem;
        width: 1.75rem;
        height: 1.75rem;
        background-position: left top;
        background-repeat: no-repeat;
        background-size: auto 100%;
      }

      .text {
        font-size: 1.4rem;
      }
    }

    .note {
      padding: 1rem 2% 1rem 6%;
      width: 100%;
      background-color: var(--rule-bg-second);

      .contents {
        display: flex;
        margin-top: 1rem;
        width: 100%;
        flex-direction: column;

        .content {
          display: flex;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.2rem;

          &:before {
            display: block;
            margin-right: 1rem;
            content: "\25ce";
          }
        }
      }

      .deco-4 {
        position: absolute;
        bottom: 17rem;
        left: -2rem;
        padding-bottom: 5rem;
        width: 5rem;
        background-size: 100% auto;
      }
    }
  }

  .deco-1 {
    position: absolute;
    top: -4.5rem;
    right: -1rem;
    padding-bottom: 5rem;
    width: 5rem;
    background-repeat: no-repeat;
    background-size: 100% auto;
    z-index: 3;
  }
}

.shared-rule * {
  user-select: text;
}

.shared-rule .highlight {
  color: var(--rule-highlight) !important;
}

@media (min-width: 576px) {
  .shared-rule {
    .rule-head .condition-wrap .condition-container {
      font-size: 0.9rem;
    }

    .rule-body {
      .cumulative .cumulative-wrap .cumulative-container {
        .title {
          font-size: 1.5rem;
        }

        .detail-container .detail {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
