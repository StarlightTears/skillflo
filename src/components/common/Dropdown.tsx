import styled from '@emotion/styled';
import React from 'react';

import { useCloseClickOutside } from '@/shared/hooks/useCloseClickOutside';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const DropdownBlock = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
`;

const DropdownContentBlock = styled.ul<{ isContentAlignCenter: boolean; isFixHeight: boolean }>`
  position: absolute;
  top: calc(100% + 0.8rem);
  z-index: var(--z-dropdown);
  width: 100%;
  min-width: 18rem;
  padding: 0.4rem;
  border-radius: 0.4rem;
  background-color: var(--color-dropdown-background);
  box-shadow:
    0 0.4rem 2rem -0.6rem rgba(0 0 0 / 15%),
    0 0.1rem 0.2rem rgba(95 101 109 / 8%),
    inset 0 0 0 0.05rem #e2e5e7;

  ${({ isContentAlignCenter }) =>
    isContentAlignCenter &&
    `
    left: 50%;
    transform: translateX(-50%);
  `}

  ${({ isFixHeight }) =>
    isFixHeight &&
    `
    overflow-y: auto;
    max-height: 28.8rem;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;

const DropdownContent = styled.li`
  width: 100%;
  margin-bottom: 0.4rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.6rem;

  ${legacyTypographyMixin('body2')}
  cursor: pointer;

  :hover {
    background-color: var(--color-dropdown-background-hover);
  }

  &.title-content {
    position: relative;
    margin-bottom: 0.8rem;
    font-weight: 700;

    cursor: default;

    :hover {
      background-color: var(--color-white);
    }

    ::after {
      content: '';
      position: absolute;
      top: calc(100% + 0.35rem);
      left: 0;

      width: calc(100% - 0.6rem - 0.6rem);
      margin: 0 0.6rem;
      border-bottom: 0.1rem solid var(--legacy-color-gray-50);
    }

    .sub-title {
      margin-top: 0.6rem;
      font-weight: 400;
      color: var(--legacy-color-gray-400);
    }
  }
`;

export interface DropdownContent {
  text: string;
  isTitle?: boolean;
  onClick: () => void;
}

interface DropdownProps {
  className: string;
  children: React.ReactNode;
  dropdownContents: DropdownContent[];
  contentTitle?: string;
  contentSubTitle?: string;
  isContentAlignCenter?: boolean;
  isFixHeight?: boolean;
}

const Dropdown = ({
  className,
  children,
  dropdownContents,
  contentTitle,
  contentSubTitle,
  isContentAlignCenter = false,
  isFixHeight = false,
}: DropdownProps) => {
  const [elementRef, isOpen, setIsOpen] = useCloseClickOutside<HTMLDivElement>();

  return (
    <DropdownBlock className={className} ref={elementRef} onClick={() => setIsOpen((state) => !state)}>
      <div>{children}</div>
      {isOpen && (
        <DropdownContentBlock isContentAlignCenter={isContentAlignCenter} isFixHeight={isFixHeight}>
          {contentTitle && (
            <DropdownContent className="title-content">
              {contentTitle}
              {contentSubTitle && <div className="sub-title">{contentSubTitle}</div>}
            </DropdownContent>
          )}
          {dropdownContents.map((dropdownContent) => {
            return (
              <DropdownContent key={dropdownContent.text} onClick={dropdownContent.onClick}>
                {dropdownContent.text}
              </DropdownContent>
            );
          })}
        </DropdownContentBlock>
      )}
    </DropdownBlock>
  );
};

export default Dropdown;
