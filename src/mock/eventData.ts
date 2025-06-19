export type EventImagesType = {
  alert: {
    top: string;
    title: string;
    body: string;
    bottom: string;
  };
  cover: {
    top: string;
    title: string;
    body: string;
    bottom: string;
  };
  btns: {
    btn: string;
    btnHignlight: string;
  };
};

const CoinTreeImage: EventImagesType = {
  alert: {
    top: "https://d3ezwcpy5gysd4.cloudfront.net/E10/alert_board_top.png",
    title: "https://d3ezwcpy5gysd4.cloudfront.net/E10/alert_title_confirm.png",
    body: "https://d3ezwcpy5gysd4.cloudfront.net/E10/alert_board_body.png",
    bottom: "https://d3ezwcpy5gysd4.cloudfront.net/E10/alert_board_bottom.png",
  },
  cover: {
    top: "https://d3ezwcpy5gysd4.cloudfront.net/E10/alert_board_top.png",
    title: "https://d3ezwcpy5gysd4.cloudfront.net/E10/record_title.png",
    body: "https://d3ezwcpy5gysd4.cloudfront.net/E10/alert_board_body.png",
    bottom: "https://d3ezwcpy5gysd4.cloudfront.net/E10/alert_board_bottom.png",
  },
  btns: {
    btn: "https://d3ezwcpy5gysd4.cloudfront.net/E10/alert_btn.png",
    btnHignlight: "https://d3ezwcpy5gysd4.cloudfront.net/E10/alert_btn.png",
  },
};

const CatchFishImage: EventImagesType = {
  alert: {
    top: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_board_top.png",
    title: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_title_confirm.png",
    body: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_board_body.png",
    bottom: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_board_bottom.png",
  },
  cover: {
    top: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_board_top.png",
    title: "https://d3ezwcpy5gysd4.cloudfront.net/E23/record_title.png",
    body: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_board_body.png",
    bottom: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_board_bottom.png",
  },
  btns: {
    btn: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_btn.png",
    btnHignlight: "https://d3ezwcpy5gysd4.cloudfront.net/E23/alert_btn.png",
  },
};

/**
 * 根据活动 ID 获取对应的一套图片资源
 * @param eventId
 * @returns
 */
export const getEventImages = (eventId: string) => {
  switch (eventId) {
    case "E10":
      return CoinTreeImage;
    case "E23":
      return CatchFishImage;
    default:
      return CatchFishImage; // 默认返回 CatchFishImage
  }
};
