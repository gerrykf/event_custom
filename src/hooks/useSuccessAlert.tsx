import { createVNode, render } from "vue";
import AlertWrapper from "@/components/AlertWrapper.vue";

interface ConfirmAlertOptions {
  bonus: string;
  /**
   * 确认按钮点击事件
   * @description 点击确认按钮后执行的回调函数
   * @returns 
   */
  onConfirm: () => void;
}

/**
 * 显示成功抽奖弹窗
 * @description 显示一个成功抽奖的弹窗，包含奖金信息和确认按钮
 * @param options 
 */
export function showSuccessAlert(options: ConfirmAlertOptions) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const { bonus, onConfirm } = options;

  const vnode = createVNode(
    AlertWrapper,
    {
      hideCancel: true,
      confirmText: "确认",
      onConfirm: () => {
        onConfirm();
        close();
      },
      onCancel: close,
    },
    {
      content: () => (
        <div>
          <div class="alert-content">
            <div class="award-title">获得奖金</div>
            <div class="award-amount">{bonus}</div>
            <div class="award-account">会员帐号 guest@bbin</div>
            <div class="prepare-hint">此为活动体验流程，奖金不会真实派发</div>
          </div>
        </div>
      ),
    }
  );

  render(vnode, container);

  function close() {
    render(null, container);
    container.remove();
  }
}
