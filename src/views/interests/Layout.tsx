import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { LabelValue } from '@/types/common.interface';
import type { InterestListItem } from '@/types/interests.interface';

import {
  Button,
  CenterAlignBlock,
  InterestsContentLayout,
  InterestsPosition,
  InterestsSkill,
  Modal,
} from '@/components';
import { setInterests } from '@/shared/api/account';
import { getInterestsInfo } from '@/shared/api/operation-config';
import { useNcsMainJob, useNcsSubJob, useRole } from '@/shared/hooks';
import { ROLE_TYPE } from '@/shared/policy';
import { getLogger } from '@/shared/utils/logger';
import { legacyTypographyMixin, media } from '@/styles/legacy-mixins';
const logger = getLogger('components', 'InterestsLayout');

const InterestsLayoutBlock = styled.section`
  padding-top: 5.5rem;
`;

const InterestsLayoutHeader = styled.header`
  margin-bottom: 6rem;

  ${media('large')} {
    margin-bottom: 7.7rem;
  }
`;

const InterestsLayoutHeaderTitle = styled.div`
  ${legacyTypographyMixin('headline5')}
  margin-bottom: 0.8rem;
  font-weight: 700;

  ${media('large')} {
    ${legacyTypographyMixin('headline3')}
    margin-bottom: 0.4rem;
  }
`;

const InterestsLayoutHeaderSubTitle = styled.div`
  ${legacyTypographyMixin('body2')}
  color: var(--legacy-color-gray-600);

  ${media('large')} {
    ${legacyTypographyMixin('headline6')}
  }
`;

const InterestsLayoutFooter = styled.footer`
  position: sticky;
  bottom: 0;
  margin-top: 5.5rem;
  margin-bottom: 10.2rem;
  padding-top: 0.8rem;
  padding-bottom: 0.7rem;
  background-color: var(--color-white);

  ${media('large')} {
    position: relative;
    margin-right: 28.6rem;
    margin-left: 28.5rem;
    padding-right: 1.6rem;
    padding-left: 1.6rem;
  }
`;

const NextBtn = styled.span`
  color: var(--legacy-color-gray-500);
  text-decoration: underline;
  ${legacyTypographyMixin('body2')}
  cursor: pointer;
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

const InterestsLayout = () => {
  const navigate = useNavigate();

  // 화면 data
  const [levelList, setLevelList] = useState<LabelValue[]>([]);
  const [goalLevelList, setGoalLevelList] = useState<LabelValue[]>([]);
  const [careerList, setCareerList] = useState<LabelValue[]>([]);

  // user 선택 data
  const [interestList, setInterestList] = useState<InterestListItem[]>([]);
  const [mainJobId, setMainJobId] = useState<number>(0);
  const [subJobId, setSubJobId] = useState<number>(0);
  const [career, setCareer] = useState('');
  const [rankId, setRankId] = useState<number>();

  const [isOpenDoNextTimePopup, setOpenDoNextTimePopup] = useState(false);
  const { options: mainJobList } = useNcsMainJob();
  const { options: subJobList } = useNcsSubJob(mainJobId);
  const { options: rankList } = useRole({ type: ROLE_TYPE.NCS_RANK });

  useEffect(() => {
    setInterestsData();
  }, []);

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

  const submitInterest = async () => {
    try {
      const data = {
        mainJobId,
        subJobId,
        rankId,
        career,
        skills: interestList.map((item) => {
          return {
            skill: {
              depth1stId: item.skill.depth1st.id,
              depth2ndId: item.skill.depth2nd?.id,
            },
            level: item.level.value,
            goalLevel: item.goalLevel.value,
          };
        }),
        isInterestsNextTime: false,
      };
      await setInterests(data);
      navigate('/');
    } catch (error) {
      alert('맞춤형 강의 설정이 실패하였습니다. 잠시후 다시 시도해주세요.');
    }
  };

  return (
    <InterestsLayoutBlock>
      <InterestsLayoutHeader>
        <InterestsLayoutHeaderTitle>맞춤형 강의를 추천해드려요!</InterestsLayoutHeaderTitle>
        <InterestsLayoutHeaderSubTitle>
          선택하신 항목에 따라 다양한 강의를 자동으로 추천해드려요!
        </InterestsLayoutHeaderSubTitle>
      </InterestsLayoutHeader>
      <InterestsContentLayout css={skillContentLayoutStyle} asideContent={skillContent}>
        <InterestsSkill
          interestList={interestList}
          setInterestList={(value: InterestListItem[]) => {
            setInterestList(value);
          }}
          levelList={levelList}
          goalLevelList={goalLevelList}
        />
      </InterestsContentLayout>
      <InterestsContentLayout asideContent={positionContent}>
        <InterestsPosition
          careerList={careerList}
          setCareer={(value) => {
            setCareer(value);
          }}
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
      <InterestsLayoutFooter>
        <Button
          css={css`
            margin-bottom: 1.1rem;
          `}
          theme="primary"
          size="large"
          disabled={!(interestList.length > 0 && mainJobId && subJobId && career && rankId)}
          onClick={submitInterest}
        >
          저장하기
        </Button>
        <CenterAlignBlock>
          <NextBtn onClick={() => setOpenDoNextTimePopup(true)}>다음에 할래요</NextBtn>
        </CenterAlignBlock>
      </InterestsLayoutFooter>
      {isOpenDoNextTimePopup && (
        <Modal
          title="알림"
          content="맞춤형 강의를 제공하기 위한 관심분야를 선택하지 않고 이동하시겠어요?"
          onConfirm={async () => {
            try {
              await setInterests({ isInterestsNextTime: true });
              setOpenDoNextTimePopup(false);
              navigate('/');
            } catch (error) {
              alert('맞춤형 강의 설정이 실패하였습니다. 잠시후 다시 시도해주세요.');
              setOpenDoNextTimePopup(false);
            }
          }}
          onCloseModal={() => {
            setOpenDoNextTimePopup(false);
          }}
        />
      )}
    </InterestsLayoutBlock>
  );
};

export default InterestsLayout;
