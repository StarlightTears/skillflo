import styled from '@emotion/styled';
import React from 'react';

import { Radio as FCRadio } from '@fastcampus/fastcomponents';

import type { LabelValue } from '@/types/common.interface';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface InterestsRadioGroupProps {
  list: LabelValue[];
  name: string;
  className?: string;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const InterestsRadioGroupBlock = styled.ul`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const InterestsRadioItem = styled.li`
  ${legacyTypographyMixin('body2')}
  padding: 0 0.8rem;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  label {
    display: flex;
    cursor: pointer;

    input {
      width: 1.6rem;
      height: 1.6rem;
      margin: 0.4rem 1.2rem 0 0;
      cursor: pointer;
    }

    span {
      font-weight: 700;
      color: var(--legacy-color-gray-600);
    }
  }

  div {
    padding-left: 2.8rem;
    color: var(--legacy-color-gray-700);
  }
`;

const InterestsRadioGroup = ({ list, name, className, selectedValue, setSelectedValue }: InterestsRadioGroupProps) => {
  return (
    <InterestsRadioGroupBlock className={className}>
      {list.map((level) => {
        return (
          <InterestsRadioItem key={`radio-${level.value}`} onClick={() => setSelectedValue(level.value as string)}>
            <FCRadio
              label={`LEVEL ${level.value}`}
              checked={selectedValue === level.value}
              name={name}
              setValue={(value) => {
                setSelectedValue(value as string);
              }}
              value={level.value}
            />
            <div>{level.label}</div>
          </InterestsRadioItem>
        );
      })}
    </InterestsRadioGroupBlock>
  );
};

export default InterestsRadioGroup;
