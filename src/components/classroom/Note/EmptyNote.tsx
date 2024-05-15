import styled from '@emotion/styled';
import React from 'react';

import { EmptyNote } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const ClassroomEmptyNoteBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 24.8rem;
  margin-top: 2rem;
  border-radius: 0.6rem;
  background-color: var(--legacy-color-gray-800);

  svg {
    margin-bottom: 0.8rem;
  }

  div {
    ${legacyTypographyMixin('body2')}
    font-weight: 700;
  }
`;

const ClassroomEmptyNote = () => {
  return (
    <ClassroomEmptyNoteBlock>
      <EmptyNote />
      <div>나만의 강의 노트를</div>
      <div>작성해 보세요</div>
    </ClassroomEmptyNoteBlock>
  );
};

export default ClassroomEmptyNote;
