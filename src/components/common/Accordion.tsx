import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ArrowDown, ArrowRight } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { textEllipsis } from '@/styles/mixins';

type AccordionType = 'normal' | 'nav';

interface AccordionItem {
  name: string;
  path?: string;
  children?: AccordionItem[];
}

interface AccordionProps {
  // TODO: 디자인이 나오면서 적절한 용례가 확인되면 타입을 변경하자..
  type?: AccordionType;
  list: AccordionItem[];
  selectedMenu: string;
  setMenu: (menu: string) => void;
  isArrowIconShow?: boolean;
}

interface AccordionItemProps {
  type: AccordionType;
  isChildren?: boolean;
  selected: boolean;
}

const AccordionBlock = styled.ul<{ type: AccordionType; isChildren?: boolean }>`
  width: 26.2rem;
  padding: ${(props) => {
    if (props.isChildren) {
      if (props.type === 'normal') {
        return '0 1.8rem 0 4rem';
      } else {
        return '0 0 0 1.6rem;';
      }
    } else {
      if (props.type === 'normal') {
        return '0 0.8rem';
      } else {
        return '0';
      }
    }
  }};
`;

const selectedItemStyle = (props: AccordionItemProps) => {
  if (props.selected) {
    return css`
      background-color: var(--legacy-color-gray-50);
      color: var(--legacy-color-gray-900);
    `;
  } else return css``;
};

const AccordionList = styled.li<AccordionItemProps>`
  ${(props) => (!props.isChildren ? legacyTypographyMixin('headline6') : legacyTypographyMixin('body2'))}
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => (props.type === 'normal' ? '2rem 0.9rem 2rem 1.6rem' : '1.4rem 0.7rem 1.4rem 1.4rem')};
  border-radius: ${(props) => (props.type === 'normal' ? '1rem' : '0.6rem')};
  font-weight: ${(props) => (!props.isChildren ? 700 : 'normal')};
  color: ${(props) => (props.type === 'normal' ? 'var(--legacy-color-gray-400)' : 'var(--legacy-color-gray-900)')};
  cursor: pointer;

  ${selectedItemStyle}

  &:not(:last-child) {
    margin-bottom: ${(props) => (props.type === 'normal' ? '1.6rem' : '0')};
  }

  & svg {
    color: var(--legacy-color-gray-300);
  }

  p {
    ${textEllipsis()}
  }
`;

const Accordion = ({ type = 'normal', list, selectedMenu, setMenu, isArrowIconShow = false }: AccordionProps) => {
  return (
    <AccordionBlock type={type} className="depth-1 accordion-block">
      {list.map((item) => {
        const { children, name, path } = item;
        return (
          <React.Fragment key={name}>
            <AccordionList
              className={`depth-1 accordion-list ${selectedMenu === name || !!children?.some((child: AccordionItem) => child.name === selectedMenu) ? 'selected' : ''}`}
              type={type}
              selected={
                type === 'normal'
                  ? selectedMenu === name || !!children?.some((child: AccordionItem) => child.name === selectedMenu)
                  : selectedMenu.includes(path ? path : name)
              }
              onClick={() => {
                if (type === 'nav' && children) return;
                setMenu(type === 'nav' ? (path ? path : name) : name);
              }}
            >
              <p>{name}</p>
              {type === 'normal' && children && children.length > 0 && isArrowIconShow ? <ArrowDown /> : null}
              {type === 'nav' && !children && !isArrowIconShow ? <ArrowRight /> : null}
            </AccordionList>

            {children &&
              children.length > 0 &&
              (type === 'nav' ||
                selectedMenu === name ||
                children.find((child: AccordionItem) => child.name === selectedMenu)) && (
                <AccordionBlock type={type} isChildren={true} className="depth-2 accordion-block">
                  {children.map((childItem) => (
                    <AccordionList
                      className={`depth-2 accordion-list ${selectedMenu === childItem.name ? 'selected' : ''}`}
                      type={type}
                      isChildren={true}
                      selected={selectedMenu === childItem.name}
                      key={childItem.name}
                      onClick={() =>
                        setMenu(type === 'nav' ? (childItem.path ? childItem.path : childItem.name) : childItem.name)
                      }
                    >
                      <p>{childItem.name}</p>
                      {type === 'nav' && !isArrowIconShow ? <ArrowRight /> : null}
                    </AccordionList>
                  ))}
                </AccordionBlock>
              )}
          </React.Fragment>
        );
      })}
    </AccordionBlock>
  );
};

export default Accordion;
