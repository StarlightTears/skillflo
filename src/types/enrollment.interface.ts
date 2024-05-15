export interface Enrollment {
  state: string;
  enrollmentStartedAt: string;
  enrollmentEndedAt: string;
  courseStartedAt: string;
  courseEndedAt: string;
  isEnrollmentCancel: boolean;
  isImmediateApproval: boolean;
  isAutoEnrollment: boolean;
}

export interface BridgeEnrollment {
  courseId: number;
  created_at: string;
  extras: {
    event: string;
  };
  id: number;
  memberId: number;
  name: string;
  productId: number;
  state: string;
  type: string;
}

export interface EnrollmentPayload {
  memberId: number;
  productId: number;
  courseId: number;
  event: EnrollmentEvent;
}

export type EnrollmentEvent = 'PROPOSAL' | 'APPROVED' | 'REJECTED' | 'CANCELED' | 'AUTO';
export type EnrollmentState = 'PENDING' | 'APPLYING' | 'COMPLETED' | 'NORMAL' | 'DISCLAIMED';

// TODO Enrollment를 지우고 대체해야한다.
export interface OriginEnrollment {
  id: number;
  type: string;
  state: EnrollmentState;
  flags?: number;
  code?: string;
  name?: string;
  description?: string;
  member_id?: number;
  product_id?: number;
  course_id?: number;
  extras?: EnrollmentExtras;
}

export interface EnrollmentExtras {
  event: EnrollmentEvent;
  updatedBy?: number;
  rejectReason?: string;
  enrollmentHistory?: EnrollmentHistory[];
  classroomEnteredAt?: Date;
  totalScore?: number;
  courseCompletion?: boolean;
  progressRate?: number;
}

export interface EnrollmentHistory {
  event: EnrollmentEvent;
  date: Date;
  updatedBy: string;
}
