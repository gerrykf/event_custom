import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 可选配置
NProgress.configure({
  showSpinner: false, // 不显示右上角 loading 圈
  trickleSpeed: 50, // 自动递增间隔（毫秒）
});

export const startProgress = () => NProgress.start();
export const doneProgress = () => NProgress.done();
