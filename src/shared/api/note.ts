import type { ApiData } from '@/types/api.interface';
import type { CourseNote, MyNote } from '@/types/note.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const createNote = (payload: unknown) => {
  return CrudClientInstance.post('/my-note', {}, payload);
};

export const getNoteListByProductCourseId = async (productId: number, courseId: number) => {
  const response = await CrudClientInstance.get<ApiData<MyNote>>(
    `/my-note/course/${courseId}/product/${productId}`,
    {}
  );

  return response.data.data;
};

export const getNoteList = async () => {
  const response = await CrudClientInstance.get<ApiData<CourseNote[]>>(`/my-note`);

  return response.data.data;
};
