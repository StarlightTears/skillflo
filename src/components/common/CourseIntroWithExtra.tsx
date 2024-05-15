import styled from '@emotion/styled';
import React, { MouseEventHandler } from 'react';
import { ComponentProps } from 'react';

import CourseIntro from './CourseIntro';

import type { PropsWithStyle, SlotProps } from '@/types/component.interface';

import { media } from '@/styles/legacy-mixins';

type CourseIntroProps = Omit<ComponentProps<typeof CourseIntro>, 'children' | 'css' | 'className'>;

interface CourseIntroWithExtraProps extends CourseIntroProps, SlotProps<'courseIntroSlot' | 'extraSlot'> {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const CourseIntroWithExtraBlock = styled.div`
  display: flex;
  flex-direction: column;

  .intro-column {
    margin: 0;
  }

  ${media('large')} {
    flex-direction: row;
    gap: 2.4rem;

    .intro-column {
      flex: 1 1 auto;
    }

    .extra-column {
      position: relative;
      flex: 0 0 12rem;
    }
  }
`;

const CourseIntroWithExtra = ({
  className,
  courseIntroSlot,
  extraSlot,
  onClick,
  ...restProps
}: PropsWithStyle<CourseIntroWithExtraProps>) => {
  return (
    <CourseIntroWithExtraBlock className={className} onClick={onClick}>
      <CourseIntro className="intro-column" {...restProps}>
        {courseIntroSlot}
      </CourseIntro>
      <div className="extra-column">{extraSlot}</div>
    </CourseIntroWithExtraBlock>
  );
};

export default CourseIntroWithExtra;
