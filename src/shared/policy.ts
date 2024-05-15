import { QueryKey } from '@tanstack/react-query';

import { getCssVariable } from './utils/getCssVariable';

import type { CustomErrorHandlerContext } from '@/types/api.interface';
import type { VideoInfoPayload } from '@/types/classroom.interface';
import type { SKILL_CATEGORY } from '@/types/skill360.interface';

export enum HomeBreakPoints {
  SMALL_MIN = 320,
  SMALL_MAX = 639,
  MEDIUM_MIN = 640,
  MEDIUM_MAX = 1134,
  LARGE_MIN = 1135,
  LARGE_MAX = 1279,
  XLARGE_MIN = 1280,
}

export enum BreakPoints {
  SMALL_MIN = 360,
  SMALL_MAX = 560,
  MEDIUM_MIN = 561,
  MEDIUM_MAX = 1279,
  LARGE_MIN = 1280,
}

// TODO: SMALL_MAX, MEDIUM_MIN 임의 설정, 실제 값 추후 확인 후 수정 필요
export enum RenewalBreakPoints {
  SMALL_MIN = 360,
  SMALL_MAX = 959,
  MEDIUM_MIN = 960,
  MEDIUM_MAX = 1079,
  LARGE_MIN = 1080,
}

export enum BASE_STATE {
  PENDING = 'PENDING',
  NORMAL = 'NORMAL',
  HIDDEN = 'HIDDEN',
  DELETED = 'DELETED',
}

export enum ClassroomBreakPoints {
  SMALL_MIN = 360,
  SMALL_MAX = 413,
  MEDIUM_MIN = 414,
  MEDIUM_MAX = 839,
  LARGE_MIN = 840,
}

export const BREAK_POINTS_MAP = {
  classroom: ClassroomBreakPoints,
  home: HomeBreakPoints,
  default: BreakPoints,
  renewal: RenewalBreakPoints,
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const QUERY_KEYS = {
  ACCOUNT: (accessToken: string, memberToken: string) => ['ACCOUNT', accessToken, memberToken],
  PING: () => ['ping'],
  PRODUCT: (productId: number) => ['PRODUCT', productId],
  CURRENT_MEMBER: () => ['current_member'],
  MEMBER_GROUP_LIST: (memberGroupIdList: number[]) => ['MEMBER_GROUP_LIST', ...memberGroupIdList],
  COURSE: (courseId: number) => ['COURSE', courseId],
  COURSE_BRIDGE: (courseId: number) => ['COURSE_BRIDGE', courseId],
  CHECK_COURSE_QNA: (courseId: number) => ['CHECK_COURSE_QNA', courseId],
  COURSE_CONTENT_LIST: (courseId: number) => ['COURSE_CONTENT_LIST', courseId],
  COMPLETED_CONTENT_LIST: (productId: number, courseId: number) => ['COMPLETED_CONTENT_LIST', productId, courseId],
  MYPAGE_SUMMARY_LEARNING_RECORD: () => ['MYPAGE_SUMMARY_LEARNING_RECORD'],
  MYPAGE_SUMMARY_COURSE_PROGRESS_LIST: (isSummaryPageList: boolean) => [
    'MYPAGE_SUMMARY_COURSE_PROGRESS_LIST',
    isSummaryPageList,
  ],
  MYPAGE_RECENT_COURSE_PROGRESS_LIST: () => ['MYPAGE_RECENT_COURSE_PROGRESS_LIST'],
  MYPAGE_NOTICE_LIST: (offset: number) => ['MYPAGE_NOTICE_LIST', offset],
  MYPAGE_FAVORIT_COURSE: () => ['MYPAGE_FAVORIT_COURSE'],
  NOTICE_LIST: (isSummaryPageList = false) => ['NOTICE_LIST', isSummaryPageList],
  NOTICE_VIEW: (noticeId: number) => ['NOTICE_VIEW', noticeId],
  MYPAGE_MEMBER_INFO: () => ['MYPAGE_MEMBER_INFO'],
  MYPAGE_COURSE_NOTE_LIST: () => ['MYPAGE_COURSE_NOTE_LIST'],
  CLASSROOM_COURSE_NOTE_LIST: (productId: number, courseId: number) => [
    'CLASSROOM_COURSE_NOTE_LIST',
    productId,
    courseId,
  ],
  QNA_BOARD_QUESTION_LIST: (
    productId: number,
    courseId: number,
    title: string,
    showOnlyMyQuestions: boolean,
    mode: string,
    lastId: number | undefined
  ) => ['QNA_BOARD_QUESTION_LIST', courseId, title, showOnlyMyQuestions, mode, lastId],
  QNA_BOARD_COURSE: () => ['QNA_BOARD_COURSE'],
  QNA_BOARD_QUESTION_COMMENT: (questionId: number) => ['QNA_BOARD_QUESTION_COMMENT', questionId],
  QNA_BOARD_QUESTION: (questionId: number) => ['QNA_BOARD_QUESTION', questionId],
  HOME_CURATION: () => ['HOME_CURATION'],
  WHOLE_HOME_CONTENTS: () => ['WHOLE_HOME_CONTENTS'],
  HOME_CONTENT_PAGE: (pageId: number) => ['HOME_CONTENT_PAGE', pageId],
  VIDEO_INFO: ({ productId, courseId, courseContentId, deviceType }: VideoInfoPayload) => [
    'VIDEO_INFO',
    productId,
    courseId,
    courseContentId,
    deviceType,
  ],
  RECOMMENDED_CATEGORY: () => ['RECOMMENDED_CATEGORY'],
  EXPOSED_CATEGORY: () => ['EXPOSED_CATEGORY'],
  SEARCH: (keyword: string) => ['SEARCH', keyword],
  COURSE_DETAIL: (courseId: number, productId: number) => ['COURSE_DETAIL', courseId, productId],
  CLASSROOM_COURSE_LEARNING_PROGRESS_TIME: (productId: number, courseId: number) => [
    'CLASSROOM_COURSE_LEARNING_PROGRESS_TIME',
    productId,
    courseId,
  ],
  EXAM_RESULT: (courseId: number) => ['EXAM_RESULT', courseId],
  REGISTRABLE_COURSES: () => ['REGISTRABLE_COURSES'],
  COURSE_CONTENT: (courseContentId: number) => ['COURSE_CONTENT', courseContentId],
  COURSE_CONTENT_TASK: (taskId: number | undefined, productId: number, courseId: number, courseContentId: number) => [
    'TASK',
    taskId,
    productId,
    courseId,
    courseContentId,
  ],
  EXAM_TASK_LIST: (productId: number, courseId: number, offset: number, limit: number) => [
    'EXAM_TASK_LIST',
    productId,
    courseId,
    offset,
    limit,
  ],
  EXAM_QUESTION_RESULT: (productId: number, courseId: number, examId: number) => [
    'EXAM_QUESTION_RESULT',
    productId,
    courseId,
    examId,
  ],
  EXAM_QUESTION: (courseId: number, examId: number) => ['EXAM_QUESTION', courseId, examId],
  EXAM_INFO: (productId: number, examId: number) => ['EXAM_INFO', productId, examId],
  SUPPLEMENT_LIST: (courseContentId: number) => ['SUPPLEMENT_LIST', courseContentId],
  CUSTOMER: (customerId: number) => ['CUSTOMER', customerId],
  MEMBER_CLIP_PROGRESS_LIST: (
    productId: number,
    courseId: number,
    courseContentId: number,
    memberId: number | undefined
  ) => ['MEMBER_CLIP_PROGRESS_LIST', productId, courseId, courseContentId, memberId],
  PUSH_NOTIFICATAION: (memberId: number) => ['PUSH_NOTIFICATION', memberId],
  MONTHLY_MEMBER_LEARNING_TIME: (memberId: number | undefined, since: string, until: string, courseId?: number[]) => [
    'MONTHLY_MEMBER_LEARNING_TIME',
    memberId,
    since,
    until,
    courseId,
  ],
  MONTHLY_MEMBER_LEARNING_DATE: (since: string, until: string) => ['MONTHLY_MEMBER_LEARNING_DATE', since, until],
  ROLE_MAIN_JOB_LIST: (type: ROLE_TYPE, depth: number) => ['ROLE_MAIN_JOB', type, depth],
  ROLE_SUB_JOB_LIST: (type: ROLE_TYPE, depth: number, parentId: number) => ['ROLE_SUB_JOB', type, depth, parentId],
  ROLE_LIST: (type: ROLE_TYPE) => ['ROLE_NCS_RANK', type],
  ROLE_LIST_BY_IDS: (ids: number[]) => ['ROLE_IDS', ids],
  MEMBER_TOTAL_LEARNING_TIME: () => ['MEMBER_TOTAL_LEARNING_TIME'],
  SURVEY: (token: string) => ['SURVEY', token],
  EXTERNAL_AUTHORIZE: () => ['EXTERNAL_AUTHORIZE'],
  SKILL: (skillId: number) => ['SKILL', skillId],
  SKILL_EXAM_RESULT: (skillId: number) => ['SKILL_EXAM_RESULT', skillId],
  ASSESSMENTS: () => ['ASSESSMENTS'],
  ASSESSMENT: (assessmentId: number) => ['ASSESSMENT', assessmentId],
  MEMBER_ASSESSMENT: (memberAssessmentId: number) => ['MEMBER_ASSESSMENT', memberAssessmentId],
  MEMBER_ASSESSMENTS: (limit, memberId, assessmentId) => ['MEMBER_ASSESSMENTS', limit, memberId, assessmentId],
  SKILL360_HOME: () => ['SKILL360_HOME'],
  SKILL_TYPE: () => ['SKILL_TYPE'],
  COWORKER_COUNT: () => ['COWORKER_COUNT'],
  ASSESSMENT_EXAM_RESULT: (params: { skillId: number; examId: number; memberAssessmentId: number }) => [
    'ASSESSMENT_EXAM_RESULT',
    params,
  ],
  MEMBER_ASSESSMENT_PROGRESS: (params: { skillId: number; examId: number; memberAssessmentId: number }) => [
    'MEMBER_ASSESSMENT_PROGRESS',
    params,
  ],
} satisfies Record<string, (...args: any[]) => QueryKey>;
/* eslint-enable @typescript-eslint/no-explicit-any */
export const CodeEditor = {
  LANGUAGE_OPTIONS: [
    { label: 'Python3', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'Javascript', value: 'javascript' },
    { label: 'C++', value: 'cpp' },
    { label: 'Go', value: 'go' },
    { label: 'Swift', value: 'swift' },
  ],
  EXECUTE_FILE_NAME: {
    cpp: 'main.cpp',
    go: 'main.go',
    java: 'main.java',
    javascript: 'main.js',
    python: 'main.py',
    swift: 'main.swift',
  },
  COMPILED_LANGUAGES: ['cpp', 'java', 'go', 'swift'],
  COMPILED_LANGUAGES_DEFAULT_CODE: {
    cpp: '#include <iostream>\n\nint main() {\n\n}',
    java: 'public class main {\n  public static void main(String[] args) {\n\n  }\n};',
    go: 'package main\n\nfunc main() {\n\n}',
    swift: 'print("Hello, World!")',
  },
  PYTHON_MAJOR_VERSION: 3,
};

export const Enrollment = {
  state: {
    APPLYING: 'APPLYING',
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
  },
  event: {
    PROPOSAL: 'PROPOSAL',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    CANCELED: 'CANCELED',
    AUTO: 'AUTO',
  },
  eventLabel: {
    PROPOSAL: '수강신청 접수',
    APPROVED: '승인',
    REJECTED: '거부',
    CANCELED: '취소',
    AUTO: '승인',
    NONE: '',
  },
};

export const RECENT_KEYWORDS = 'RECENT_KEYWORDS';
export const VideoQualityList = [
  {
    label: '1080p',
    value: 'TYPE_1080P',
  },
  {
    label: '720p',
    value: 'TYPE_720P',
  },
  {
    label: '540p',
    value: 'TYPE_540P',
  },
  {
    label: '360p',
    value: 'TYPE_360P',
  },
  {
    label: '270p',
    value: 'TYPE_270P',
  },
];

interface ErrorObject {
  [key: string]: (context: CustomErrorHandlerContext, error: Error) => void;
}

export const errorObject: ErrorObject = {
  ORGANIZATION_ENROLLMENT_DUPLICATED_ERROR() {
    alert('동일한 강의를 중복하여 신청 할 수 없습니다.');
  },
  Unauthorized({ navigate, dispatch, actions }) {
    dispatch(actions.auth.setAccessToken(''));
    dispatch(actions.auth.setMemberToken(''));
    navigate('/auth/signin');
  },
};

export const INTERESTS_LIST_MAX_LENGTH = 9;
export const COURSE_DETAIL_NOTICE_MAX_LENGTH = 2;
export const NOTIFICATION_LIMIT = 9;
export const NOTIFICATION_REFETCH_INTERVAL = 5 * 60000;
export const RANGE_OF_MONTH = 5;
export const PAGINATAION_COUNT_LIMIT_PER_PAGE = 20;
export const MIN_SECOND_OF_LEARNING_DAY = 600;
export const PLAYER_UPDATE_INTERVAL = 60000;
export const WHOLE_CONTENT_LIST_LIMIT = 10000;

export enum ROLE_TYPE {
  JOB = 'JOB',
  RANK = 'RANK',
  NCS_JOB = 'NCS_JOB',
  NCS_RANK = 'NCS_RANK',
}

export enum EXTRAS_TAGS {
  COMPLETION_CERTIFICATE = '수료인정',
  COMPLETION_CERTIFICATE_EXPOSE = '수료인정학습시간노출',
}

export const SKILL_CATEGORIES: Record<SKILL_CATEGORY, { mainColor: string }> = {
  TECHNICAL: {
    mainColor: '#7D3BE4',
  },
  WORKPLACE: {
    mainColor: '#F74397',
  },
  DX_ESSENTIAL: {
    mainColor: '#1CB8B8',
  },
};

export const SKILL_CATEGORY_LABELS = {
  TECHNICAL: 'Technical',
  WORKPLACE: 'Workplace',
  DX_ESSENTIAL: 'DX Essential',
};

export enum SKILL_LEVEL_LABELS {
  USER_LEVEL = '나의 레벨',
  STANDARD_LEVEL = '표준 레벨',
  JOB_AVG_LEVEL = '직무 평균',
  GROUP_AVG_LEVEL = '조직 평균',
}

export const MAX_SKILL_ASSESSMENT_LEVEL = 5;

export const INFORMATIVE_COLOR_PLATTE = {
  gray: getCssVariable('--color-semantic-informative-primary-low'),
  blue: getCssVariable('--color-semantic-informative-accent'),
  green: getCssVariable('--color-semantic-informative-success'),
  red: getCssVariable('--color-semantic-informative-alert'),
  accent: getCssVariable('--color-semantic-informative-accent'),
  success: getCssVariable('--color-semantic-informative-success'),
  alert: getCssVariable('--color-semantic-informative-alert'),
};

export const CAROUSEL_AUTO_PLAY_INTERVAL = 5000;
export const DEFAULT_PLAYER_VOLUME = 100;
export const DEFAULT_PLAYER_SPEED = 1;

export type ExternalScripts = 'gtm' | 'datadog';

export interface CodeEditorListItem {
  id: number;
  name: string;
  value: string | ArrayBuffer | null;
}

/**
 * @description: withSuspense의 loading spinner의 class
 */
export const SUSPENSE_LOADING_SPINNER_CLASS = 'suspense-spinner';
