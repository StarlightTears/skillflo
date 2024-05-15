interface JSONObject {
  [key: string]: JSONValue;
}

type JSONValue = string | number | boolean | Date | JSONObject | Array<JSONValue> | object; // XXX: object 타입은 Part타입 위해

export enum DataState {
  READY = 'READY',
  PENDING = 'PENDING',
  ONGOING = 'ONGOING',
  NORMAL = 'NORMAL',
  HIDDEN = 'HIDDEN',
  FAILED = 'FAILED',
  DISCLAIMED = 'DISCLAIMED',
  DELETED = 'DELETED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

type MemberExtras = {
  accountId: string;
  name: string;
  groupId: string;
  groupName: string;
  customerId: string;
  customerName: string;
  connectCompanyMemberId: string;
  email: string;
  password: string;
  phone: string;
  subPhoneNumber?: string;
  role?: string;
  major?: string;
  division?: string;
  grade?: string;
  lastSignInDate?: string;
  bookmarks?: { courseId: number; productId: number }[];
  job?: string;
  rank?: string;
  jobId?: number;
  skillJobId?: number;
  rankId?: number;
  skillRankId?: number;
  goalTime?: string;
};

export interface Member {
  id: number;
  type: string;
  state: DataState;
  flags?: number;
  code?: string;
  name?: string;
  description?: string;
  updated_at?: Date;
  created_at?: Date;
  extras: MemberExtras;
}

export interface MemberGroup {
  id: number;
  type: string;
  state: string;
  name: string;
  updated_at?: Date;
  created_at?: Date;
  extras: {
    isAssociated?: boolean;
    isLoginAssoiciated?: boolean;
    associationCode?: string;
    screenAccessControl?: {
      all?: boolean;
      classroom?: boolean;
    };
    customerId: number;
    contractId?: number;
    domain?: {
      isUse: boolean;
      name?: string;
    };
    points: {
      total: number;
      progress: number;
      exam: number;
      task: number;
      survey: number;
    };
    criteriaForCompletion: {
      total: number;
      progress: number;
      exam: number;
      task: number;
      survey: number;
    };
    footNote?: string;
    sendNotification?: boolean;
    siteEnter: string;
    setNotifications?: {
      feedbackId: number;
      isUse: boolean;
    }[];
    isShowCertificationButton?: boolean;
    recSearchIds?: number[];
    isChannelTalk?: boolean;
    isResultExposed?: boolean;
    channelTalkPluginKey?: string;
    // ! 임시 프로퍼티
    isDiagnosisGroupTemporary?: boolean;
    tags?: string[];
  };
}

export interface MemberTotalLearningTime {
  data: number;
}
