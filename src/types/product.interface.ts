import { RequiredCourse } from './course.interface';
import { BridgeEnrollment } from './enrollment.interface';

import type { CategoryTemplate, PointCategory } from '@/types/common.interface';

export interface Product {
  id: number;
  type: string;
  state: string;
  flags: number;
  code: string;
  name: string;
  description: string;
  extras: ProductExtras;
}

export interface BridgeProduct extends Product {
  enrollment: BridgeEnrollment;
  requiredCourse?: RequiredCourse;
}

export interface ProductExtras {
  publicName: string;
  originProductId: number;
  memberGroupId: number;
  customerId?: number;
  customerName: string;
  isAutoEnrollment: boolean;
  isImmediateApproval: boolean;
  isEnrollmentCancel: boolean;
  isAutoplayDisabled: boolean;
  enrollmentStartedAt: Date;
  enrollmentEndedAt: Date;
  courseStartedAt: Date;
  courseEndedAt: Date;
  enrollmentCourseNumberLimit: number;
  enrollmentAmount: number;
  cancelAmount: number;
  remainAmount: number;
  totalAmount: number;
  surveyId: number;
  points: PointCategory;
  criteriaForCompletion: PointCategory;
  connectedCourses?: ConnectedCourses[];
  isQnaBoardExposure?: boolean;
}

export interface ConnectedCourses {
  id: number;
  state: string;
  isAssociated?: boolean;
  publicTitle: string;
  isCourseExposure: boolean;
  courseExposedCategory?: CategoryTemplate[];
  externalUrls?: externalUrl[];
}

interface externalUrl {
  courseContentId: number;
  url: string;
}
