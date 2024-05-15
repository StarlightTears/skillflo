import styled from '@emotion/styled';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import CurrentStatusCard from './CurrentStatusCard';
import OnboardingModal from './OnboardingModal';
import SkillAnalysisTabList from './SkillAnalysisTabList';
import SkillAssessmentTabList from './SkillAssessmentTabList';
import UserJobInfo from './UserJobInfo';
import UserProfile from './UserProfile';

import TabList from '@/components/common-renewal/TabList';
import { useUserInfo } from '@/shared/hooks/mypage';
import { useAssessmentHomeQueries } from '@/shared/hooks/skill360/home';
import { useOnboardingModal } from '@/shared/hooks/skill360/onboardingModal';
import { useSkillTypes } from '@/shared/hooks/skill360/skillType';

const Skill360HomeBlock = styled.section`
  display: flex;
  gap: 4.8rem;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 4.8rem 0 8rem;

  .content-section {
    border: 0.1rem solid var(--color-semantic-divider-default);
    border-radius: 0.6rem;
  }
`;

const MainContentWrapper = styled.section`
  max-width: 81.2rem;
`;

const AsideWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 34rem;

  .aside-content-wrapper {
    padding: 2rem 1.6rem;
  }
`;

const Skill360HomeLayout = () => {
  const coreSkillTabs = [
    { name: '핵심 스킬 진단', id: 'assessment' },
    { name: '핵심 스킬 분석', id: 'analysis' },
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCoreSkillTab = coreSkillTabs.find((skillTab) => skillTab.id === searchParams.get('skill'));

  const { isOnboardingModalOpen, closeOnboardingModal, isOnboardingDataFetchingSuccess } = useOnboardingModal();

  const [{ data: homeData }, { data: coworkerCount }] = useAssessmentHomeQueries({
    enabled: isOnboardingDataFetchingSuccess,
  });
  const { data: userInfo } = useUserInfo();
  const { data: skillTypes } = useSkillTypes();

  const userName = userInfo?.member.extras.name || '';
  const jobName = homeData?.competency.name || '';

  return (
    <Skill360HomeBlock>
      {isOnboardingModalOpen && <OnboardingModal startClickHandler={() => closeOnboardingModal()} />}
      {homeData && userInfo && (
        <>
          <MainContentWrapper className="content-section">
            {coworkerCount && (
              <CurrentStatusCard
                data={homeData.assessment}
                memberAssessment={homeData.memberAssessment}
                totalCount={homeData.skills.length}
                skillCompletionProgress={homeData.skillCompletions.length}
                coworkerCount={coworkerCount}
              />
            )}
            <div>
              {homeData?.skills && (
                <>
                  <TabList
                    tabList={coreSkillTabs}
                    selectedTab={selectedCoreSkillTab || coreSkillTabs[0]}
                    onTabClick={(tab) => {
                      setSearchParams({ skill: tab.id });
                    }}
                  />
                  <section className="core-skill-section">
                    {selectedCoreSkillTab === undefined || selectedCoreSkillTab.id === coreSkillTabs[0].id ? (
                      <SkillAssessmentTabList
                        skillTypes={skillTypes || []}
                        data={homeData.skills}
                        skillCompletions={homeData.skillCompletions}
                        jobName={jobName}
                      />
                    ) : (
                      <SkillAnalysisTabList
                        skillTypes={skillTypes || []}
                        skills={homeData?.skills || []}
                        skillCompletions={homeData?.skillCompletions || []}
                        userName={userName}
                        levels={homeData?.levels || []}
                      />
                    )}
                  </section>
                </>
              )}
            </div>
          </MainContentWrapper>
          <AsideWrapper>
            <UserProfile member={userInfo?.member} jobName={jobName} />
            {homeData?.competency && <UserJobInfo data={homeData.competency} coreSkills={homeData.skills} />}
          </AsideWrapper>
        </>
      )}
    </Skill360HomeBlock>
  );
};

export default Skill360HomeLayout;
