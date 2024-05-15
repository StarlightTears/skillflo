import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';

import initFcLayouts from '@day1co/layouts/runtime';

interface ComposerViewProps {
  template: string;
}

const cssVariablesForComposer = css`
  :root {
    --layout-gnb-margin-bottom: 0rem;
  }
`;

const ComposerViewBlock = styled.section`
  position: relative;
  z-index: var(--z-composer-view);
`;

const ComposerView = ({ template }: ComposerViewProps) => {
  useEffect(() => {
    initFcLayouts();
  }, [template]);

  return (
    <>
      <Global styles={cssVariablesForComposer} />
      <ComposerViewBlock className="composer-view" dangerouslySetInnerHTML={{ __html: template }} />
    </>
  );
};

export default ComposerView;
