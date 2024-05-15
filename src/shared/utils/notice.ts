import { NoticePriority, type NoticeTypes } from '@/types/common.interface';

export const getNoticeTypeLabel = (tags: NoticeTypes) => {
  const NoticeTypeLabel: Record<NoticeTypes, string> = {
    LXP_CUSTOMER: '고객사',
    LXP_MEMBER_GROUP: '멤버그룹',
    LXP_COURSE: '코스',
  };

  return NoticeTypeLabel[tags] || '전체';
};

export const isPrimaryNotice = (noticePriority: number) => {
  return [
    NoticePriority.ALL_PRIMARY,
    NoticePriority.CUSTOMER_PRIMARY,
    NoticePriority.MEMBER_GROUP_PRIORITY,
    NoticePriority.PRODUCT_PRIMARY,
  ].includes(noticePriority);
};
