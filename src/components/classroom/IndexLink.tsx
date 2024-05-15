import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import {
  PartCourseContent,
  PartCourseContentActive,
  PartCourseContentComplete,
  PartCourseContentCompleteActive,
  PartMeet,
  PartExam,
  PartExamActive,
  PartExamComplete,
  PartExamCompleteActive,
  PartMeetActive,
} from '..';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { textEllipsis } from '@/styles/mixins';

const IndexLinkBlock = styled.div<{ isSelected: boolean }>`
  display: flex;
  height: 6.4rem;
  padding: 1.2rem;
  border-radius: 0.6rem;
  cursor: pointer;

  ${({ isSelected }) => {
    return isSelected
      ? css`
          background-color: var(--color-blue-600);
        `
      : css`
          background-color: var(--legacy-color-gray-800);

          &:hover {
            background-color: var(--legacy-color-gray-700);
          }
        `;
  }}

  &.is-meet-content {
    height: auto;
    padding: 2rem 1.2rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  margin-right: 0.8rem;
`;

const DataInfo = styled.div`
  width: 100%;

  .info-title {
    width: calc(100% - 2.8rem);
    ${legacyTypographyMixin('body2')}
    font-weight: 500;
  }

  .content-data {
    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-400);
  }

  &:not(.is-meet-content) {
    .info-title {
      margin-bottom: 0.4rem;
      ${textEllipsis()}
    }
  }
`;

const getIcon = (type: string, isCompleted: boolean, isSelected: boolean) => {
  switch (type) {
    case 'CONTENT':
      if (isSelected) {
        return isCompleted ? <PartCourseContentCompleteActive /> : <PartCourseContentActive />;
      }
      return isCompleted ? <PartCourseContentComplete /> : <PartCourseContent />;
    case 'EXAM':
      if (isSelected) {
        return isCompleted ? <PartExamCompleteActive /> : <PartExamActive />;
      }
      return isCompleted ? <PartExamComplete /> : <PartExam />;
    case 'URL':
      return <PartExam />;
    case 'MEET':
      return isSelected ? <PartMeetActive /> : <PartMeet />;
    default:
      return <></>;
  }
};

interface ClassroomIndexLinkProps {
  title: string;
  type: 'CONTENT' | 'EXAM' | 'MEET' | 'URL';
  isCompleted?: boolean;
  isSelected?: boolean;
  dataText?: string;
  onClickLink: () => void;
}

const ClassroomIndexLink = ({
  title,
  type,
  isCompleted = false,
  isSelected = false,
  dataText,
  onClickLink,
}: ClassroomIndexLinkProps) => {
  const isMeetCourseContent = ['MEET', 'URL'].includes(type);

  return (
    <IndexLinkBlock
      isSelected={isSelected}
      onClick={onClickLink}
      className={isMeetCourseContent ? 'is-meet-content' : ''}
      data-e2e="index-link"
    >
      <IconWrapper>{getIcon(type, isCompleted, isSelected)}</IconWrapper>
      <DataInfo className={isMeetCourseContent ? 'is-meet-content' : ''}>
        <div className="info-title">{title}</div>
        <div className="content-data">{dataText}</div>
      </DataInfo>
    </IndexLinkBlock>
  );
};

export default ClassroomIndexLink;
