import styled from '@emotion/styled';
import React from 'react';

import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const SkillAssessmentFooterBlock = styled.footer`
  padding: 0.2rem 0 2rem;
  text-align: center;

  .copyright {
    color: var(--color-gray-300);
    ${renewalTypographyMixin('caption', 2)}
  }
`;

const SkillAssessmentFooter = () => {
  return (
    <SkillAssessmentFooterBlock>
      <span className="copyright">Copyright &copy; 2024 (주) 데이원컴퍼니. All rights reserved.</span>
    </SkillAssessmentFooterBlock>
  );
};

export default SkillAssessmentFooter;
