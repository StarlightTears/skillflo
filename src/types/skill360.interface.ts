import { Attached, EvaluateState } from './common.interface';
// TODO: exam에서 가져오는 interface들은 별도의 파일로 분리하는 것이 좋을 것 같다.
import { QuestionExampleAnswer, QuestionType, SetQuestion } from './exam.interface';

import { SKILL_CATEGORY_LABELS } from '@/shared/policy';

export type SKILL_CATEGORY = 'TECHNICAL' | 'WORKPLACE' | 'DX_ESSENTIAL';

export type Skill360ColorTheme = 'gray' | 'blue' | 'green' | 'red' | 'accent' | 'success' | 'alert';

export type SkillGapType = 'standard' | 'high' | 'low';

export interface Skill {
  id: number;
  type: SKILL_CATEGORY;
  name: string;
  skillStack: string[];
  description: string; // 스킬에 대한 설명
  standardLevel: number; // 표준 레벨
  questionCount: number;
  passCount: number;
  examId: number; //시험 정보
  memberBaseSkill: {
    baseLevel: number;
    skillRankId: number;
  };
  extras: {
    timeLimit: number; // 시간 제한
  };
}

export interface Assessment {
  id: number;
  state: string;
  type: string;
  flags: number;
  code: string;
  name: string; // 진단지명
  description: string;
  memberGroupId: number;
  beginAt: Date; // 진단검사 오픈일
  endAt: Date; // 진단검사 종료일
  duration: number; // 진단검사 가능 기간 (단위:분)
  extras: {
    type: object;
  };
}

export interface MemberAssessment {
  id: number;
  state: 'READY' | 'NORMAL' | 'COMPLETED'; //전체 진행 상태
  memberId: number;
  assessmentId: number;
  startedAt: Date; //최초 검사일
  completedAt: Date; //전체 진단 완료일
  limitedAt: Date; // 최초 진단 종료일
}

// 멤버의 스킬 완료 정보
export interface SkillCompletion {
  id: number;
  memberAssessmentId: number;
  earnedLevel: number; // 취득 레벨
  earnedAt: Date; // 취득 일자
  skillId: number;
}

// 직무 관리
// TODO: Competency interface 사용하는지 확인 필요
export interface Competency {
  id: number;
  name: string;
  description: string;
  firstJobId: number; // NCS job code 대분류
  secondJobId: number; // NCS job code 중분류
  firstJobName: string; // NCS job code 대분류 이름
  secondJobName: string; // NCS job code 중분류 이름
  imageUrl: string;
  extras: {
    skillIds: [];
    iconImage: {
      url: string;
      name: string;
    };
  };
}

export interface Level {
  id: number;
  level: number;
  skillId: number;
  description: string;
}

export interface Role {
  // 직업분류. roleId 대신 jobId를 쓰는 이유는 이미 member.extras.jobId로 쓰이고 있기 때문
  id: number;
  name: string; // 직업이름
}

export interface SkillDetail {
  skill: Skill;
  duration: number;
  memberAssessment: MemberAssessment;
  skillCompletion: SkillCompletion;
  levels: Level[];
  competencies: string[];
}

export interface SkillExamResult {
  memberAssessment: MemberAssessment;
  skills: Skill[];
  skillCompletions: SkillCompletion[];
  levels: Level[];
  meta: {
    count: number;
  };
}
export interface AssessmentQuestion {
  id: number;
  type: QuestionType;
  // name: string; // * extras.question과 동일한 값
  extras: {
    level: number;
    question: string;
    answerCount: number;
    isShuffle: boolean;
    exampleAnswers: QuestionExampleAnswer[];
    additionalQuestion: string;
    attachedImages?: Attached[];
    evaluateState: EvaluateState;
  };
}

export interface AssessmentProgress {
  questions: AssessmentQuestion[];
  exam: {
    id: number;
    name: string;
    state: string;
    type: string;
    extras: {
      canSolvedCount: number;
      timeLimit: number;
      setQuestion: SetQuestion[];
      description: string;
      isAutoMark: boolean;
      isRetry: boolean;
    };
  };
  progress: {
    endAt: string | undefined;
  };
  group: unknown;
}

// * 사용하지 않는 프로퍼티는 우선 주석처리를 했습니다.
export interface AssessmentExamResult {
  // id: number;
  // name: string;
  extras: {
    // canSolvedCount: number;
    // category: string;
    // description: string;
    // earnedScore: number;
    isCompleted: boolean;
    // solvedProgress: number;
    // submittedQuestion: number;
    // timeLimit: number;
    // totalQuestion: number;
    // totalScore: number;
  };
}

export interface HomeData {
  assessment: Assessment;
  memberAssessment: MemberAssessment;
  competency: Competency;
  skills: Skill[];
  skillCompletions: SkillCompletion[];
  skillCompletionProgress: number;
  levels: Level[];
}

export interface CoworkerCount {
  memberCountInMemberGroup: number;
  NormalOrCompletedMemberCount: number;
}

export interface SkillType {
  name: (typeof SKILL_CATEGORY_LABELS)[SKILL_CATEGORY];
  description: string;
}
