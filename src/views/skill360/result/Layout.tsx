import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Dialog } from '../../../components/common-renewal/Dialog';
import RequiredSkillListSection from '../RequiredSkillListSection';

import assessmentFinishedBanner from '@/assets/images/skill360-assessment-finished-banner-section.jpg';
import { DonutChart } from '@/components';
import SkillLevelSection from '@/components/skill360/SkillLevelSection';
import { useCurrentMember } from '@/shared/hooks';
import { useSkillExamResultOnPage } from '@/shared/hooks/skill360/exam';
import { getUncompletedSkills, sortSkillsByTitleAndType } from '@/shared/utils/skillList';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const ResultLayoutBlock = styled.div`
  position: relative;
  padding: 4rem 0 8rem;

  .container {
    width: 60rem;
    margin: 0 auto;

    h1 {
      ${renewalTypographyMixin('title', 2)}
      span {
        color: var(--color-semantic-informative-accent);
      }
    }

    & > hr {
      height: 0.1rem;
      margin: 2.4rem 0;
      border: 0;
      background-color: var(--color-gray-100);
    }
  }

  .assessment-finished-banner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 61.8rem;
    border: 0.1rem solid var(--color-semantic-divider-default);
    border-radius: 0.6rem;
    background: url(${assessmentFinishedBanner}) no-repeat center;
    background-size: cover;
  }
`;

const ResultLayout = () => {
  const { member } = useCurrentMember();
  const { data, error, isSuccess } = useSkillExamResultOnPage();
  const { levels, skillCompletions, skills } = data || {};
  const navigate = useNavigate();
  const params = useParams();
  const skillId = parseInt(params.skillId ?? '');
  const isCompleted = skillCompletions?.find((completion) => completion.skillId === skillId);

  useEffect(() => {
    if (error) {
      alert('유효하지 않은 진단 결과입니다.');
      navigate('/skills');
    }
  }, [error]);

  if (isSuccess && !isCompleted) {
    alert('진단을 먼저 완료해주세요.');
    navigate(`/skills/${skillId}`);
    return <></>;
  }

  const userName = member?.extras.name ?? '회원';
  const currentSkillInfo = skills?.find((skill) => skill.id === skillId);
  const currentSkillLevelDescriptions = levels?.map((level) => level.description) ?? [];
  const currentSkillCompletionInfo = skillCompletions?.find((completion) => completion.skillId === skillId);

  const uncompletedSkills = getUncompletedSkills(skills ?? [], skillCompletions ?? []);
  const sortedUncompletedSkills = sortSkillsByTitleAndType(uncompletedSkills);
  const requiredSkillList = sortedUncompletedSkills.map((skill) => ({
    id: skill.id,
    skillName: skill.name,
    skillCategory: skill.type,
    completedAt: skillCompletions?.find((completion) => completion.skillId === skill.id)?.earnedAt.toString() ?? '',
  }));

  return (
    <ResultLayoutBlock>
      <div className="container">
        <h1>
          <span>{currentSkillInfo?.name}</span> 진단 결과
        </h1>
        <hr />
        <SkillLevelSection
          userName={userName}
          userLevel={currentSkillCompletionInfo?.earnedLevel}
          standardLevel={currentSkillInfo?.memberBaseSkill?.baseLevel}
          skillLevelDescriptions={currentSkillLevelDescriptions}
        />
        <hr />
        {uncompletedSkills.length > 0 ? (
          <RequiredSkillListSection userName={userName} requiredSkillList={requiredSkillList} />
        ) : (
          <div className="assessment-finished-banner-container">
            <Dialog
              prefixIcon={<DonutChart />}
              title="모든 진단이 완료되었습니다."
              description="핵심 스킬 분석 결과를 확인해주세요"
              buttonText="나의 결과 확인"
              onClickButton={() => {
                navigate('/skills?skill=analysis');
              }}
            />
          </div>
        )}
      </div>
    </ResultLayoutBlock>
  );
};

export default ResultLayout;
