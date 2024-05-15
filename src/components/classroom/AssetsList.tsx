import styled from '@emotion/styled';
import React, { FC, PropsWithChildren } from 'react';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const ClassroomAssetsListBlock = styled.div`
  position: absolute;
  right: 0;
  bottom: 4.8rem;
  overflow-y: scroll;
  width: 28rem;
  max-height: 40rem;
  padding: 0 1.2rem 1.6rem;
  border: 0.1rem solid var(--legacy-color-gray-700);
  border-radius: 0.6rem;
  background-color: var(--legacy-color-gray-900);
  ${legacyTypographyMixin('body2')}

  &::-webkit-scrollbar {
    display: none;
  }

  header {
    position: sticky;
    top: 0;
    margin-bottom: 1.2rem;
    padding-top: 1.6rem;
    padding-bottom: 0.7rem;
    border-bottom: 0.1rem solid var(--legacy-color-gray-700);
    background-color: var(--legacy-color-gray-900);
    font-weight: 700;
  }
`;

const ClassroomAssetsList: FC<PropsWithChildren> = ({ children }) => {
  return <ClassroomAssetsListBlock>{children}</ClassroomAssetsListBlock>;
};

export default ClassroomAssetsList;
