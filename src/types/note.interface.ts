import type { OriginCourse } from './course.interface';

export interface CourseNote extends OriginCourse {
  myNote: MyNote;
}

export interface MyNote {
  id: number;
  type: string;
  extras: {
    note: Note[];
  };
}

export interface Note {
  partIndex: number | undefined;
  partTitle: string | undefined;
  chapterTitle: string | undefined;
  chapterIndex: number | undefined;
  courseContentId: number;
  courseContentTitle: string | undefined;
  title: string;
  content: string;
  position: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}
