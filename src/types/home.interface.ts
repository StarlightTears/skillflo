import type { Notice } from '@/types/common.interface';
import type { OriginCourse } from '@/types/course.interface';

export interface BannerImage {
  url: string;
  name: string;
  type: string;
}
export interface Banner {
  id: number;
  name: string;
  state: string;
  type: string;
  extras: {
    exposedEndedAt: string;
    exposedStartedAt: string;
    url: string;
    attached: BannerImage[];
    priority: number;
  };
}

export interface RecommendedCourse {
  id: number;
  // name: string; // * 실존하는 프로퍼티이지만 skillflo에서는 사용하지 않기 때문에 주석처리를 해놓았습니다.
  extras: {
    customers: {
      id: number;
      name: string;
    }[];
    customerIds: number[];
    publicName: string;
    recommendJob: {
      sub: string;
      main: string;
    };
    isCustomerJob: boolean;
    recommendRank: string;
    connectedCourses: {
      state: string;
      courseId: number;
      publicTitle: string;
      isAssociated: boolean;
    }[];
  };
  courses: OriginCourse[];
}

export interface CurationResponse {
  data: {
    recentCourses: OriginCourse[];
    requiredCourses: OriginCourse[];
    recommendCourses: RecommendedCourse[];
    banners: Banner[];
    notices: Notice[];
  };
}
