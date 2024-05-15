import type { InterestsSkill } from './interests.interface';

export interface Account {
  id: number;
  name: string;
  state: string;
  type: string;
  extras: AccountExtras;
}

export interface AccountExtras {
  marketingAgreeStatus: boolean;
  marketingAgreeUpdateAt: string;
  marketingEmailAgreeStatus: boolean;
  marketingEmailAgreeUpdateAt: string;
  marketingPhoneAgreeStatus: boolean;
  marketingPhoneAgreeUpdateAt: string;
  personalInfoAgreedAt: string;
  mainJobId: number;
  subJobId: number;
  rankId: number;
  career: string;
  skills: {
    goalLevel: string;
    level: string;
    skill: InterestsSkill;
  }[];
  isInterestsNextTime: boolean;
}
