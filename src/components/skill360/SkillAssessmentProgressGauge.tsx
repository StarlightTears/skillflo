import React from 'react';

import { RingProgress } from '@/components';

const SkillAssessmentProgressGauge = ({ progressed, total }: { progressed?: number; total?: number }) => {
  return <RingProgress label="진단 진행 현황" progressedNumber={progressed} totalNumber={total} isTaskMode />;
};

export default SkillAssessmentProgressGauge;
