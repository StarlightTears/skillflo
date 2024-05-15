import styled from '@emotion/styled';
import React from 'react';

import { ClockColored, ContentAccordion, Desktop, Limited, Save, Stair } from '@/components';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const SkillAssessmentCheckListWrapper = styled.div`
  h2 {
    margin: 0 0 0.8rem;
    ${renewalTypographyMixin('body', 2, true)}
  }

  .assessment-check-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const SkillAssessmentCheckList = () => {
  const checkList = [
    {
      icon: <Stair />,
      title: '진단은 최대 5단계, 25문항까지 응시 가능합니다.',
      content:
        '진단은 레벨 1부터 5까지 난이도 순서대로 진행되며, 레벨별 최대 5문항씩 최대 25문항까지 출제됩니다. 과반 수 이상 정답일 경우 다음 레벨 응시가 가능하며, 과반수 미만 정답 시 진단은 종료되고 직전 레벨이 최종 나의 레벨로 진단됩니다.',
    },
    {
      icon: <ClockColored />,
      title: '진단에는 시간 제한이 있으며, 답안 제출을 눌러 진단을 완료해주세요.',
      content:
        '진단 시간은 최대 25문항을 풀었을 때의 총 시간입니다.\n제한 시간 내 답안을 제출하지 않으면 진단 중인 문항은 자동 오답처리되고 진단이 종료됩니다.\n시간 내 답안 제출에 유의해주시기 바랍니다.',
    },
    {
      icon: <Save />,
      title: '제출한 답안은 자동저장되며 수정할 수 없습니다.',
      content:
        '답안 제출 시 정답 여부에 따라 다음 문항/레벨로 넘어가거나 진단이 종료됩니다.\n답안 제출 이후에는 답안을 수정하거나, 이전 문항으로 되돌아갈 수 없으니 주의해주세요.',
    },
    {
      icon: <Desktop />,
      title: '진단은 PC로만 진행 가능합니다.',
      content:
        '진단 특성상 모바일 환경 응시가 불가하여 PC 환경에서 크롬 브라우저로 응시를 권장합니다.\n(엣지, 웨일 가능)\n비정상적으로 진단 페이지를 이탈하거나 종료될 경우, 남은 시간 내에서는 마지막 풀던 문항부터 이어서 재시작이 가능합니다.\n반드시 인터넷 연결이 원활한 환경에서 접속해주시기 바랍니다.',
    },
    {
      icon: <Limited />,
      title: '진단은 스킬당 1회만 응시할 수 있습니다.',
      content: '본 스킬에 대한 진단이 시작되면 재진단이 어려우니 신중하게 진단을 시작해주시기 바랍니다.',
    },
  ];
  return (
    <SkillAssessmentCheckListWrapper>
      <h2 className="caption">진단 시작 전 꼭 확인해주세요!</h2>
      <ul className="assessment-check-list">
        {checkList.map((data) => (
          <ContentAccordion icon={data.icon} title={data.title} content={data.content} key={data.title} />
        ))}
      </ul>
    </SkillAssessmentCheckListWrapper>
  );
};

export default SkillAssessmentCheckList;
