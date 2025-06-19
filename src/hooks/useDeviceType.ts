import { ref } from "vue";

export function useDeviceType() {
  const isMobileDevice = ref(window.innerWidth < 576);

  const handleResize = () => {
    isMobileDevice.value = window.innerWidth < 576;
    console.log(
      "当前设备类型:",
      isMobileDevice.value ? "移动设备" : "桌面设备"
    );
  };

  window.addEventListener("resize", handleResize);

  return { isMobileDevice };
}
