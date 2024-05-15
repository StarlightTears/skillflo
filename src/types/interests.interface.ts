import type { LabelValue } from './common.interface';
import type { Category } from '@/types/category.interface';
export interface InterestsExtras {
  career: LabelValue[];
  skills: string[];
  level: LabelValue[];
  goalLevel: LabelValue[];
  rank: string[];
  job: Job[];
}
export interface Job {
  main: string;
  sub: string[];
}

export interface InterestListItem {
  skill: {
    depth1st: Category;
    depth2nd?: Category;
  };
  level: LabelValue;
  goalLevel: LabelValue;
}

export interface InterestsSkill {
  depth1stId: number;
  depth2ndId?: number;
}
