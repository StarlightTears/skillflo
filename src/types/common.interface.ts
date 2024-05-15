export interface Attached {
  url: string;
  name: string;
}

export interface LabelValue {
  label: string;
  value: string | number;
}

export interface ImageFile {
  name: string;
  url: string;
  size?: number;
  type?: 'PC' | 'MOBILE';
}

export interface Item {
  id: number;
  name: string;
}

export interface Notice {
  id: number;
  name: string;
  state: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  extras: {
    content: string;
    exposedEndedAt: string;
    exposedStartedAt: string;
    priority: number;
    tags: NoticeTypes;
    attached: Attached[];
  };
}

/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export const enum NoticePriority {
  ALL_PRIMARY = 1000,
  ALL_NORMAL = 999,
  CUSTOMER_PRIMARY = 100,
  CUSTOMER_NORMAL = 99,
  MEMBER_GROUP_PRIORITY = 100,
  MEMBER_GROUP_NORMAL = 99,
  PRODUCT_PRIMARY = 100,
  PRODUCT_NORMAL = 99,
}
/* eslint-enable @typescript-eslint/no-duplicate-enum-values */

export type NoticeTypes = 'LXP_CUSTOMER' | 'LXP_MEMBER_GROUP' | 'LXP_COURSE';

export interface Note {
  partIndex: number;
  partTitle: string;
  gradeTitle: string;
  title: string;
  content: string;
}

export type PointCategory = {
  total: number;
  progress: number;
  exam: number;
  task: number;
};

export interface CategoryTemplate {
  id: number;
  name: string;
  depth?: number;
  order?: number;
}

export type EvaluateState = 'CORRECT' | 'INCORRECT' | 'UNEVALUATED' | 'NONE';

export type ProgressStatus = 'READY' | 'ONGOING' | 'EXPIRED' | 'COMPLETE';
