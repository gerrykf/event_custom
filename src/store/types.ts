import type { EventImagesType } from "@/mock/eventData";

export interface EventInfo {
  id: string;
  /** 活动名称 */
  name: string;
  /** 开始时间 */
  startTime: string;
  /** 结束时间 */
  endTime: string;
  /** 领奖截止时间 */
  endReceiveTime: string;
}

/**
 * 等级类型定义
 */
export type LevelType = {
  /** 等级 */
  level: number;
  /** 奖励 */
  award: number;
  /** 存款 */
  deposit: number;
  /** 打码 */
  bet: number;
};

export type AppStoreType = {
  /** 全局 loading 状态 */
  loading: boolean;
  /** 当前活动 ID */
  eventId?: string;
  /** 活动信息 */
  eventInfo?: EventInfo;
  /** 等级列表 */
  levelList: LevelType[];
  userInfo: {
    /** 用户存款 */
    deposit: number;
    /** 用户打码 */
    bet: number;
  };
  eventImages?: EventImagesType;
};
