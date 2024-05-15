import type { InterestsSkill } from './interests.interface';
import type { Note } from '@/types/common.interface';

export type CourseState = 'STAY' | 'ACCEPT' | 'COMPLETE';

export interface LearningRecord {
  create_at: string;
  learningTime: number;
}

export interface CourseProgress {
  id: number;
  courseTitle: string;
  productTitle: string;
  categoryName: string;
  clips: number[];
  thumbnailUrl: string;
  learningTime: number;
  totalTime: number;
  closeAt: string;
  requiredCloseAt: string;
  isRequired: boolean;
  state: CourseState;
}

export interface CourseNote {
  id: number;
  courseTitle: string;
  productTitle: string;
  categoryName: string;
  clips: number[];
  thumbnailUrl: string;
  noteList: Note[];
}

export interface UpdateUserInfoBody {
  phone: string;
  account: AccountExtras;
}

export interface PhoneCertificationBody {
  phone: string;
  code?: string;
}

export interface AccountExtras {
  originPassword?: string;
  password?: string;
  marketingAgreeStatus?: boolean;
  marketingEmailAgreeStatus?: boolean;
  marketingPhoneAgreeStatus?: boolean;
  mainJobId?: number;
  subJobId?: number;
  rankId?: number;
  career: string; //학력
  skills: Array<Skill>; //관심스킬 object array max 9개
  isInterestsNextTime: boolean;
}

export interface Job {
  main: string; //직무(대분류)
  sub: string; //직무(중분류)
}

export interface Skill {
  skill: InterestsSkill; //학습 희망 지식/스킬
  level: string; // 현재 지식 수준
  goalLevel: string; // 목표 지식 수준
}
