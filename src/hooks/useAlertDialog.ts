import { createVNode, render } from "vue";
import AlertWrapper from "@/components/AlertWrapper.vue"; // 假设组件路径

/**
 * 显示确认弹窗
 * @param options 选项：内容、按钮文案等
 * @returns Promise 在用户点击确认时 resolve，在取消时 reject
 */
export function showDialog(options: {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  hideCancel?: boolean;
  hideConfirm?: boolean;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const vnode = createVNode(
      AlertWrapper,
      {
        title: options.title,
        confirmText: options.confirmText ?? "确定",
        cancelText: options.cancelText ?? "取消",
        hideCancel: options.hideCancel ?? false,
        hideConfirm: options.hideConfirm ?? false,
        onConfirm: () => {
          render(null, container);
          container.remove();
          resolve();
        },
        onCancel: () => {
          render(null, container);
          container.remove();
          reject();
        },
      },
      {
        content: () => options.message,
      }
    );

    render(vnode, container);
  });
}
