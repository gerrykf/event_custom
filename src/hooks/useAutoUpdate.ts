import { showDialog } from "./useAlertDialog";
import { createVersionPolling } from "version-polling";

/**
 * 自动更新
 * @returns
 */
export const useAutoUpdate = () => {
  /**
   * 检查版本
   */
  const checkVersion = async () => {
    createVersionPolling({
      pollingInterval: 30 * 1000, // 30秒检测一次
      silent: process.env.NODE_ENV === "development", // 开发环境下不检测
      onUpdate: (self) => {
        showDialog({
          title: "更新提示",
          message: "发现新版本，立即更新？",
          confirmText: "更新",
          hideCancel: true,
        }).then(() => {
          self.onRefresh();
        });
      },
    });
  };

  return {
    checkVersion,
  };
};
