import styled from '@emotion/styled';
import React from 'react';

import { Badge } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const InvalidExamBlock = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InvalidExamCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30.4rem;
  height: 15.2rem;
`;

const InvalidExamCardTitle = styled.div`
  margin-top: 1.6rem;
  ${legacyTypographyMixin('body1')};
  font-weight: 700;
`;

const InvalidExamCardSubInfo = styled.div`
  margin-top: 0.4rem;
  ${legacyTypographyMixin('body2')};
  color: var(--legacy-color-gray-600);
  text-align: center;
`;

const InvalidExam = () => {
  return (
    <InvalidExamBlock>
      <InvalidExamCard>
        <Badge theme="gray" bgColorScale={600}>
          응시불가
        </Badge>
        <InvalidExamCardTitle>모바일 및 패드에선 시험 응시가 불가합니다.</InvalidExamCardTitle>
        <InvalidExamCardSubInfo>
          원활한 시험응시를 위해 PC에서
          <br />
          이용해주시길 바랍니다.
        </InvalidExamCardSubInfo>
      </InvalidExamCard>
    </InvalidExamBlock>
  );
};

export default InvalidExam;
