import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { Select as FCSelect, Value } from '@fastcampus/fastcomponents';
import type { SelectProps as FCSelectProps } from '@fastcampus/fastcomponents';

import { Union } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

type selectType = 'small' | 'normal';

interface SelectProps<T> extends FCSelectProps<T> {
  label?: string;
  type?: selectType;
  errorMsg?: string | null;
}

const SelectCss = (type: selectType, open: boolean, label?: string, disabled?: boolean) => css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
  ${disabled ? 'opacity: 0.3' : ''};

  .fc-select-wrapper {
    position: relative;
    border-radius: 0.6rem;
    ${open ? 'outline: 0.1rem solid var(--color-select-selected-border)' : ''};
  }

  .fc-select {
    flex: 1;

    .preview {
      display: flex;
      align-items: center;

      width: 100%;
      height: 100%;
      padding: 1.4rem 0.9rem 1.4rem 1.6rem;
      font-weight: 600;
      color: var(--color-select-member-color);
      ${legacyTypographyMixin('body2')}

      cursor: pointer;

      &.open,
      &:focus {
        background-color: var(--color-select-focus-background);
      }
    }

    .options {
      top: calc(100% - 6rem);
      right: 0;
      overflow-y: auto;
      width: 102%;
      max-height: 28.8rem;
      margin: 0 -1%;
      padding: 0.8rem;
      border-radius: 1rem;
      background-color: var(--color-white);
      box-shadow:
        0 0.4rem 2rem -0.6rem rgba(0 0 0 / 15%),
        0 0.1rem 0.2rem rgba(95 101 109 / 8%),
        inset 0 0 0 0.05rem #e2e5e7;

      > div {
        width: 100%;
        margin-bottom: 0.8rem;
        padding: 1.2rem 1.6rem;
        border-radius: 0.6rem;
        font-weight: 500;
        color: var(--color-select-member-color);
        ${legacyTypographyMixin('body2')};
        cursor: pointer;

        &:last-child {
          margin-bottom: 0;
        }

        :hover,
        &.selected {
          background-color: var(--color-select-member-selected-background);
        }
      }
    }
  }

  .arrow-down-icon {
    position: absolute;
    top: 50%;
    right: 0.9rem;

    transform: translateY(-50%);
  }

  .label {
    ${legacyTypographyMixin('caption')}
    margin-bottom: 0.4rem;
    padding: 1.4rem 0.9rem 1.4rem 1.6rem;
    font-weight: 600;
    color: var(--color-select-member-color);
  }
`;

const DivineBlock = styled.div`
  width: calc(100% - 1.5rem);
  height: 1px;
  margin: auto;
  border-bottom: 1px solid var(--color-select-member-border);
`;

function SelectGroupMember<T = Value>({
  label,
  className,
  options,
  initialSelectedValue,
  setValue,
  nativeSelect,
  multiple,
  size,
  selectAll,
  setSelectAll,
  type = 'normal',
  disabled,
  ...restProps
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSelect = () => {
    if (disabled) return;
    setIsOpen((s) => !s);
  };
  return (
    <div className={className} css={SelectCss(type, isOpen, label, disabled)}>
      {label && (
        <div className="label" onClick={toggleSelect}>
          {label}
        </div>
      )}
      <DivineBlock />
      <div className="fc-select-wrapper">
        <FCSelect
          isOpen={isOpen}
          setIsOpen={toggleSelect}
          options={options}
          initialSelectedValue={initialSelectedValue}
          setValue={setValue}
          nativeSelect={nativeSelect}
          multiple={multiple}
          size={size}
          selectAll={selectAll}
          setSelectAll={setSelectAll}
          {...restProps}
        />
        <Union className="arrow-down-icon" onClick={toggleSelect} />
      </div>
    </div>
  );
}

export default SelectGroupMember;
