import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { putBookmark as putBookmarkApi, deleteBookmark as deleteBookmarkApi } from '../api/member';
import { getBookmarkCourseList } from '../api/mypage';
import { QUERY_KEYS } from '../policy';

import { useClassroomParams } from './classroom';
import { useCurrentMember } from './useCurrentMember';

export const useBookmark = () => {
  const queryClient = useQueryClient();
  const { courseId, productId } = useClassroomParams();
  const [isBookmarkCourse, setIsBookmarkCourse] = useState(false);

  const { member } = useCurrentMember();
  const bookmarkCourseList = member?.extras.bookmarks || [];

  useEffect(() => {
    const foundCourse = bookmarkCourseList.find(
      (bookmarkCourse) => bookmarkCourse.courseId === courseId && bookmarkCourse.productId === productId
    );

    if (foundCourse) {
      setIsBookmarkCourse(true);
    } else {
      setIsBookmarkCourse(false);
    }
  }, [member, courseId, productId]);

  const putBookmarkMutation = useMutation(() => putBookmarkApi(courseId, productId));
  const deleteBookmarkMutation = useMutation(() => deleteBookmarkApi(courseId, productId));

  const toggleBookmark = async () => {
    if (isBookmarkCourse) {
      await deleteBookmarkMutation.mutateAsync();
    } else {
      await putBookmarkMutation.mutateAsync();
    }
    queryClient.invalidateQueries(QUERY_KEYS.CURRENT_MEMBER());
  };

  return {
    isBookmarkCourse,
    toggleBookmark,
  };
};

export const useBookmarkCourseList = () => {
  const { data: courseListByCategory } = useQuery(['BOOKMARK_COURSE_LIST'], () =>
    getBookmarkCourseList().then((data) => {
      return data.data.data.bookmarkCourses;
    })
  );

  return {
    categoryList: [{ id: -1, name: '전체 강의' }, ...(courseListByCategory?.map((item) => item.category) || [])],
    courseListByCategory,
  };
};
