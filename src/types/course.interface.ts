import { OriginEnrollment } from './enrollment.interface';

import type { BridgeProduct, Product } from './product.interface';
import type { ImageFile, Notice, PointCategory } from '@/types/common.interface';

export type COURSE_TYPE = 'MEET' | 'ONLINE' | 'COLLECTIVE';

export interface Course {
  // TODO API연결 후 제거
  name?: string | undefined;
  state?: string | undefined;
  require?: boolean | undefined;
  thumbnailSrc: string;
}

export interface CourseDetail {
  courseDetail: OriginCourse;
  notices: Notice[];
  products: Product[];
  courseScore: CourseScore;
  requiredCourseScore: CourseScore;
}

export interface CoursePart {
  id: string;
  migrateClipGroupId: number;
  sequence: number;
  title: string;
  type: 'PART';
  CHAPTER?: CourseChapter[];
  CONTENT?: CourseContent[];
}

export interface CourseChapter {
  id: string;
  migrateClipGroupId: number;
  sequence: number;
  title: string;
  type: 'CHAPTER';
  CONTENT: CourseContent[];
}

export interface CourseContent {
  sequence: number;
  type: string;
  courseContentId: number;
  courseContentName: string;
  playTime: number;
}

export interface CourseContentDetail {
  id: number;
  name: string;
  extras: {
    url: string;
    keywords: string[];
    playtime: number;
    taskId: number;
    supplementIds?: number[];
    accreditPlaytime: number;
  };
  meeting?: CourseContentMeeting;
}

interface CourseContentMeeting {
  meetingRoomList: {
    roomId: number;
    joinUrl: string;
    startAt: string;
    duration: number;
    password: string;
  }[];
  total: number;
}

export interface OriginCourse {
  // TODO API연결 후 COURSE로 이름 변경
  id: number;
  type: COURSE_TYPE;
  state: string;
  flags: number;
  code: string;
  // name: string; // 관리코스명을 skillflo에서는 사용할 일이 없다고 생각되어 주석처리 하였습니다.
  publicName: string;
  description: string;
  extras: {
    tags?: string[];
    site: string;
    score: string;
    teachers: [];
    descriptionInfo?: string;
    lectureInfo?: string;
    scheduleInfo?: string;
    teacherInfo: string;
    courseHour: string;
    realContents: [];
    contents: CoursePart[];
    fcCourseId?: number;
    exposedCategory: [
      {
        depth1stId: number;
        depth2ndId: number;
        depth3rdId: number;
      },
    ];
    headTeacherName: string;
    managedCategory: {
      depth1stId: number;
      depth2ndId: number;
      depth3rdId: number;
    };
    priorCourseName: string;
    connectedProductIds: number[];
    thumbnail?: ImageFile;
    totalCourseContentCount?: number;
    totalPlayTime?: number;
    isUseCodeRunner: boolean;
    contractBeginAt: string;
    contractEndAt: string;
  };
  created_at: string;
  updated_at: string;
  product: Product;
  periodPermissions: string[];
  enrollment?: OriginEnrollment;
  requiredCourse?: RequiredCourse;
}

export interface CourseBridge {
  courseDetail: OriginCourse;
  notices: Notice[];
  products: BridgeProduct[];
}

export interface RequiredCourse {
  id: number;
  type: string;
  state: string;
  flags?: number;
  code?: string;
  name?: string;
  description?: string;
  member_id?: number;
  product_id?: number;
  course_id?: number;
  extras: RequiredCourseExtras;
}

export interface RequiredCourseExtras {
  managedCategory: {
    depth1stId: number;
    depth2ndId: number;
    depth3rdId: number;
  };
  requiredCourseStartedAt: Date;
  requiredCourseEndedAt: Date;
  isProductPoints: boolean; //평가비율에 대한 과정그룹 기준 적용
  points: PointCategory; //평가비율
  isProductCriteriaForCompletion: boolean; //수료기준에 대한 과정그룹 기준 적용
  criteriaForCompletion: PointCategory; //수료기준
}

export interface CourseScore {
  courseCompletion: boolean;
  examScore: number;
  exchangeExamScore: number;
  exchangeTaskScore: number;
  learningProgress: number;
  learningTime: number;
  taskScore: number;
  total: number;
}
