import styled from '@emotion/styled';
import React from 'react';

import { CheckFilled, TriangleDownFilled, TriangleUpFilled } from '@/components';
import { getSkillGap } from '@/shared/utils/skillGap';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

type SkillGapBadgeSize = 'small' | 'medium';

interface SkillGapBadgeWrapperProps {
  skillGapColor: string;
  size: SkillGapBadgeSize;
}

const skillGapBadgeDesign = {
  font: {
    small: renewalTypographyMixin('label', 5, true),
    medium: renewalTypographyMixin('label', 4, true),
  },
};

const SkillGapBadgeWrapper = styled.span<SkillGapBadgeWrapperProps>`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.2rem 0.8rem;
  ${({ size }) => skillGapBadgeDesign.font[size]};
  border-radius: 1rem;
  background-color: ${({ skillGapColor }) => skillGapColor};
  color: #fff;
`;

interface SkillGapBadgeProps {
  userLevel: number;
  standardLevel: number;
  size?: SkillGapBadgeSize;
}

const SkillGapBadge = ({ userLevel, standardLevel, size = 'medium' }: SkillGapBadgeProps) => {
  const { gapLevel: skillGap, gapType: skillGapType, colorCode: skillGapColor } = getSkillGap(userLevel, standardLevel);

  return (
    <SkillGapBadgeWrapper skillGapColor={skillGapColor} size={size}>
      {(() => {
        switch (skillGapType) {
          case 'standard':
            return (
              <>
                <CheckFilled />
                적절함
              </>
            );
          case 'high':
            return (
              <>
                <TriangleUpFilled />
                {skillGap}레벨
              </>
            );
          case 'low':
            return (
              <>
                <TriangleDownFilled />
                {skillGap}레벨
              </>
            );
        }
      })()}
    </SkillGapBadgeWrapper>
  );
};

export default SkillGapBadge;
