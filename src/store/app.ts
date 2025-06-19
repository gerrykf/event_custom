import { defineStore } from "pinia";
import type { AppStoreType } from "./types";
import { startProgress, doneProgress } from "@/plugins/nprogress";
import router from "@/router";

export const useAppStore = defineStore("app", {
  state: (): AppStoreType => ({
    loading: false,
    eventId: undefined,
    eventInfo: undefined,
    levelList: [],
    userInfo: {
      deposit: 888,
      bet: 5888,
    },
    eventImages: {
      alert: {
        top: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_board_top.png",
        title:
          "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_title_confirm.png",
        body: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_board_body.png",
        bottom:
          "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_board_bottom.png",
      },
      cover: {
        top: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_board_top.png",
        title: "https://d3ezwcpy5gysd4.cloudfront.net/E23/record_title.png",
        body: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_board_body.png",
        bottom:
          "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_board_bottom.png",
      },
      btns: {
        btn: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_btn.png",
        btnHignlight: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_btn.png",
      },
    },
  }),
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;

      if (loading) {
        startProgress();
      } else {
        doneProgress();
      }
    },
    setEventId(id: string) {
      this.eventId = id;
      router.push({
        name: "Event",
        params: { id },
      });
    },
    setEventInfo(eventInfo: AppStoreType["eventInfo"]) {
      this.eventInfo = eventInfo;
      if (eventInfo) {
        this.setEventId(eventInfo.id);
      }
    },
    setLevelList(levelList: AppStoreType["levelList"]) {
      this.levelList = levelList;
    },
    setUserInfo(userInfo: AppStoreType["userInfo"]) {
      this.userInfo = userInfo;
    },

    setEventImages(eventImageList: AppStoreType["eventImages"]) {
      this.eventImages = eventImageList;
    },
  },
});
