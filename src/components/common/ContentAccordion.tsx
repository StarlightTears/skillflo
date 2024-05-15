import styled from '@emotion/styled';
import React, { ReactNode, useState } from 'react';

import { ChevronDown, ChevronUp } from '@/components';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

type ContentAccordionTheme = 'default' | 'accent' | 'success' | 'alert';

interface ContentAccordionWrapperProps {
  isOpen: boolean;
  type: ContentAccordionTheme;
}

const contentAccordionColors: { [key: string]: { primary: string; highlight: string } } = {
  default: { primary: '#E5E8EB50', highlight: 'var(--color-gray-200)' },
  accent: { primary: '#266BFF12', highlight: '#266BFF' },
  success: { primary: '#12B76A12', highlight: '#12B76A' },
  alert: { primary: '#F0443812', highlight: '#F04438' },
};

const ContentAccordionWrapper = styled.li<ContentAccordionWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
  border: 0.1rem solid ${({ type }) => contentAccordionColors[type].primary};
  border-radius: 0.6rem;
  background-color: ${({ type }) => contentAccordionColors[type].primary};
  cursor: pointer;

  :hover {
    border: 0.1rem solid ${({ type }) => contentAccordionColors[type].highlight};
  }

  h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${renewalTypographyMixin('body', 3, true)}

    div {
      display: flex;
      gap: 0.6rem;

      svg {
        margin-top: 0.15rem;
      }
    }
  }

  hr {
    width: 100%;
    height: 0.1rem;
    border: 0;
    background-color: ${({ type }) => contentAccordionColors[type].primary};
  }

  pre {
    ${renewalTypographyMixin('body', 3)}
    white-space: pre-wrap;
  }
`;

const ContentAccordion = ({
  icon,
  title,
  content,
  defaultIsOpen = false,
  type = 'default',
}: {
  icon?: ReactNode;

  title: string;
  content: string | ReactNode;
  defaultIsOpen?: boolean;
  type?: ContentAccordionTheme;
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  return (
    <ContentAccordionWrapper isOpen={isOpen} type={type} onClick={() => setIsOpen((prev) => !prev)}>
      <h3>
        <div>
          {icon && <React.Fragment> {icon}</React.Fragment>}
          {title}
        </div>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </h3>
      {isOpen && <hr />}
      {isOpen && (
        <div>
          <pre>{content}</pre>
        </div>
      )}
    </ContentAccordionWrapper>
  );
};

export default ContentAccordion;
