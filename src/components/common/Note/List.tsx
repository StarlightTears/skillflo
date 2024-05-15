import React, { SetStateAction } from 'react';

import type { Note } from '@/types/note.interface';

import { NoteListItem } from '@/components';

type ListItemTheme = 'black' | 'white';

interface NoteListProps {
  noteList: Note[];
  theme?: ListItemTheme;
  courseId: number;
  productId: number;
  isShowPlayBtn?: boolean;
  setEditNote?: React.Dispatch<SetStateAction<Note | undefined>>;
}

const NoteList = ({ noteList, courseId, productId, isShowPlayBtn, theme, setEditNote }: NoteListProps) => {
  return (
    <ul>
      {noteList.map((item, index) => (
        <NoteListItem
          key={index}
          note={item}
          theme={theme}
          courseId={courseId}
          productId={productId}
          isShowPlayBtn={isShowPlayBtn}
          setEditNote={setEditNote}
        />
      ))}
    </ul>
  );
};

export default NoteList;
