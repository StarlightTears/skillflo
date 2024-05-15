import type { AccountExtras } from '@/types/account.interface';
import type { ApiData } from '@/types/api.interface';
import type { BookmarkCategory } from '@/types/category.interface';
import type { Notice } from '@/types/common.interface';
import type { OriginCourse } from '@/types/course.interface';
import type { Member } from '@/types/member.interface';
import type { LearningRecord, UpdateUserInfoBody, PhoneCertificationBody } from '@/types/mypage.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getLearningRecordList = () => {
  return CrudClientInstance.get<ApiData<{ learningRecordList: LearningRecord[] }>>('/mypage/my-course');
};

export const getCourseProgressList = () => {
  return CrudClientInstance.get<ApiData<{ ongoingCourses: OriginCourse[]; endedCourses: OriginCourse[] }>>(
    '/mypage/course-progress'
  );
};

export const getRecentCourseList = () => {
  return CrudClientInstance.get<ApiData<{ recentCourses: OriginCourse[] }>>('/mypage/recent-course');
};

export const getNoticeList = () => {
  return CrudClientInstance.get<ApiData<{ noticeList: Notice[] }>>('/mypage/my-course');
};

export const getMypageNoticeList = (params: { limit?: number; offset?: number }) => {
  return CrudClientInstance.get<{ data: Notice[]; meta: { total: number } }>('/mypage/notice', params);
};

export const getNotice = (noticeId: number) => {
  return getMypageNoticeList({ offset: 0, limit: 999999 }).then((result) => ({
    data: {
      data: result.data.data.find((notice) => notice.id === noticeId),
    },
  }));
};

export const getMemberInfo = () => {
  return CrudClientInstance.get<ApiData<{ member: Member; account: AccountExtras }>>('/mypage/member');
};

export const updateUserInfo = (params: unknown, data: UpdateUserInfoBody) => {
  return CrudClientInstance.put('/mypage/member', params, data);
};

export const sendPhoneCertification = (params: unknown, data: PhoneCertificationBody) => {
  return CrudClientInstance.post('/mypage/phone-send-code', params, data);
};

export const verifyPhoneCode = (params: unknown, data: PhoneCertificationBody) => {
  return CrudClientInstance.post('/mypage/phone-verify-code', params, data);
};

export const getBookmarkCourseList = () => {
  return CrudClientInstance.get<
    ApiData<{ bookmarkCourses: { category: BookmarkCategory; courses: OriginCourse[] }[] }>
  >('/mypage/bookmark-course');
};
