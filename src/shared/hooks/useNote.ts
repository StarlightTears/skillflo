import { useQuery } from '@tanstack/react-query';

import { getNoteList, getNoteListByProductCourseId } from '../api/note';
import { QUERY_KEYS } from '../policy';

export const useCourseListWithNote = () => {
  const { data } = useQuery(QUERY_KEYS.MYPAGE_COURSE_NOTE_LIST(), () => getNoteList());

  return { data: data ? data : [] };
};

export const useNoteList = (productId: number, courseId: number) => {
  return useQuery(QUERY_KEYS.CLASSROOM_COURSE_NOTE_LIST(productId, courseId), () =>
    getNoteListByProductCourseId(productId, courseId)
  );
};
