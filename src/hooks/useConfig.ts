import { useAppStore } from "@/store";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";

export const useConfigHooks = () => {
  const route = useRoute();
  const { setLoading } = useAppStore();

  const setHtmlTheme = () => {
    const activityTheme = (route.params.id as string)?.toLowerCase();
    document.documentElement.setAttribute("data-theme", activityTheme);
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  watchEffect(() => {
    setHtmlTheme();

    setLoading(true);
    delay(1000).then(() => {
      setLoading(false);
    });
  });

  return {};
};
