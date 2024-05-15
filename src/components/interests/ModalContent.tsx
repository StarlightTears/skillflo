import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

import type { LabelValue } from '@/types/common.interface';
import type { InterestListItem } from '@/types/interests.interface';
import type { InterestsSkill as InterestsSkillType } from '@/types/interests.interface';

import { InterestsContentLayout, InterestsSkill, InterestsPosition } from '@/components';
import { getInterestsInfo } from '@/shared/api/operation-config';
import { useNcsMainJob, useNcsSubJob, useRole } from '@/shared/hooks';
import { useExposedCategory } from '@/shared/hooks/category';
import { ROLE_TYPE } from '@/shared/policy';
import { getLogger } from '@/shared/utils/logger';
import { media } from '@/styles/legacy-mixins';
const logger = getLogger('components', 'InterestsModal');

interface InterestsModalProps {
  existingMainJobId?: number;
  existingSubJobId?: number;
  existingRankId?: number;
  existingCareer?: string;
  existingSkills?: {
    goalLevel: string;
    level: string;
    skill: InterestsSkillType;
  }[];
  setInterests: (param: {
    rankId: number;
    career: string;
    mainJobId: number;
    subJobId: number;
    skills: {
      goalLevel: string;
      level: string;
      skill: InterestsSkillType;
    }[];
  }) => void;
}

const InterestsModalContentBlock = styled.div`
  & .interests-content-layout {
    flex-direction: column;

    & aside {
      margin-bottom: 2.4rem;
    }
  }
`;

const skillContentLayoutStyle = css`
  margin-bottom: 4rem;

  ${media('large')} {
    margin-bottom: 10.8rem;
  }
`;

const skillContent = {
  badge: 'STEP1',
  badgeDescription: '관심있던 분야/스킬을 선택하고, \n질문에 답해주세요 :)',
};

const positionContent = {
  badge: 'STEP2',
  badgeDescription: '현재 어떤 업무를 하고계신가요?',
};

const InterestsModalContent = ({
  existingMainJobId,
  existingSubJobId,
  existingRankId,
  existingCareer,
  existingSkills,
  setInterests,
}: InterestsModalProps) => {
  const { data: ExposedCategory } = useExposedCategory();
  const [levelList, setLevelList] = useState<LabelValue[]>([]);
  const [goalLevelList, setGoalLevelList] = useState<LabelValue[]>([]);
  const [careerList, setCareerList] = useState<LabelValue[]>([]);

  const [interestList, setInterestList] = useState<InterestListItem[]>([]);
  const [mainJobId, setMainJobId] = useState<number>(existingMainJobId || 0);
  const [subJobId, setSubJobId] = useState<number>(existingSubJobId || 0);
  const [career, setCareer] = useState('');
  const [rankId, setRankId] = useState<number>(existingRankId || 0);
  const { options: mainJobList } = useNcsMainJob();
  const { options: subJobList } = useNcsSubJob(mainJobId);
  const { options: rankList } = useRole({ type: ROLE_TYPE.NCS_RANK });

  const setInterestsData = async () => {
    try {
      const { data: interestsData } = await getInterestsInfo({});
      setCareerList(interestsData.extras.career);
      setLevelList(interestsData.extras.level);
      setGoalLevelList(interestsData.extras.goalLevel);
    } catch (error) {
      const err = error as Error;
      logger.info(err.message, err);
    }
  };

  useEffect(() => {
    setInterestsData();
  }, [ExposedCategory]);

  useEffect(() => {
    setInterests({
      mainJobId,
      subJobId,
      career,
      rankId,
      skills: interestList.map((item) => {
        return {
          skill: {
            depth1stId: item.skill.depth1st.id as number,
            depth2ndId: item.skill.depth2nd?.id,
          },
          goalLevel: item.goalLevel.value as string,
          level: item.level.value as string,
        };
      }),
    });
  }, [mainJobId, subJobId, career, rankId, interestList]);

  return (
    <InterestsModalContentBlock>
      <InterestsContentLayout
        className="interests-content-layout"
        css={skillContentLayoutStyle}
        asideContent={skillContent}
      >
        <InterestsSkill
          existingSkills={existingSkills}
          interestList={interestList}
          setInterestList={(value: InterestListItem[]) => {
            setInterestList(value);
          }}
          levelList={levelList}
          goalLevelList={goalLevelList}
        />
      </InterestsContentLayout>
      <InterestsContentLayout className="interests-content-layout" asideContent={positionContent}>
        <InterestsPosition
          career={existingCareer}
          careerList={careerList}
          setCareer={(value) => {
            setCareer(value);
          }}
          rankId={rankId}
          rankList={rankList}
          setRankId={(value) => {
            setRankId(value);
          }}
          mainJobList={mainJobList}
          subJobList={subJobList}
          mainJobId={mainJobId}
          setMainJobId={(value) => {
            setMainJobId(value);
          }}
          subJobId={subJobId}
          setSubJobId={(value) => {
            setSubJobId(value);
          }}
        />
      </InterestsContentLayout>
    </InterestsModalContentBlock>
  );
};

export default InterestsModalContent;
