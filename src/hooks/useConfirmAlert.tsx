import { createVNode, render } from "vue";
import AlertWrapper from "@/components/AlertWrapper.vue";

interface ConfirmAlertOptions {
  deposit: string;
  bet: string;
  /** 
   * 确认按钮点击事件
   * @description 点击确认按钮后执行的回调函数
   */
  onConfirm: () => void;
}

/**
 * 显示确认抽奖弹窗
 * @param options
 */
export function showConfirmAlert(options: ConfirmAlertOptions) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const { deposit, bet, onConfirm } = options;

  const vnode = createVNode(
    AlertWrapper,
    {
      confirmText: "立即开奖",
      onConfirm: () => {
        onConfirm();
        close();
      },
      onCancel: close,
    },
    {
      content: () => (
        <div>
          抽奖后您的点数将<span class="highlight">扣除</span>
          <br />
          存款 {deposit} 点
          <br />
          打码 {bet} 点
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
