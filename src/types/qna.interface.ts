import { Member } from './member.interface';

import { BASE_STATE } from '@/shared/policy';

interface CommentRow {
  id: number;
  name: string;
  state: BASE_STATE;
  type: 'COMMENT';
  extras: {
    content: string;
    createdAt: string;
    updatedAt: string;
    commentCount: number;
    likeCount: number;
    viewCount: number;
    isLiked: boolean;
  };
}

interface QuestionRow {
  extras: {
    commentCount: number;
    content: string;
    courseId: number;
    courseContentId?: number;
    courseContentName?: string;
    createdAt: string;
    // TODO: file은 별도의 interface로 분리할까??
    file: {
      name: string;
      url: string;
    }[];
    keywords: string[];
    likeCount: number;
    updatedAt: string;
    viewCount: number;
    isLiked: boolean;
  };
  id: number;
  name: string;
  state: BASE_STATE;
  type: 'QUESTION';
}

export interface QnaBoard {
  id: number;
  courseId: number;
  qnaTags: string[];
}

export interface Comment {
  comment: CommentRow;
  member: Member;
}

export interface Question {
  qna: QuestionRow;
  member: Member;
}

export interface QuestionPayload {
  name: string;
  productId: number;
  courseId: number;
  courseContentId?: number;
  content: string;
  keywords: string[];
  filePayloadList: QuestionFilePayload[];
}

export interface QuestionFilePayload {
  gcpUrl: string;
  file: File;
}
