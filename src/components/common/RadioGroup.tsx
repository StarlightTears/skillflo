import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { Radio as FCRadio } from '@fastcampus/fastcomponents';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

type RadioGroupDirection = 'row' | 'column' | 'straight';
interface RadioGroupProps {
  radioGroup: Radio[];
  className?: string;
  direction?: RadioGroupDirection;
  disabled?: boolean;
  name: string;
  selectedValue: string;
  setValue: (value: string) => void;
}
interface Radio {
  label: string;
  value: string;
}

const RadioGroupBlock = styled.div<{ direction: RadioGroupDirection; disabled: boolean }>`
  display: flex;
  padding: 0.2rem 0;
  ${({ direction }) => directionStyle[direction]}

  label {
    display: flex;
    flex: 1;
    align-items: center;
    ${legacyTypographyMixin('body2')}
    ${({ disabled }) => (disabled ? 'cursor: normal' : 'cursor: pointer')};

    input {
      margin: 0 0.8rem 0 0;
    }
  }
`;

const directionStyle: Record<RadioGroupDirection, SerializedStyles> = {
  row: css`
    flex-direction: row;
  `,
  column: css`
    flex-direction: column;
    gap: 2.4rem;
  `,
  straight: css`
    flex-direction: row;
    justify-content: space-between;

    .fc-radio {
      display: flex;
      flex: 0 1 auto;
      flex-direction: column;

      input {
        margin-right: 0;
        margin-bottom: 0.4rem;
      }
    }
  `,
};

const RadioGroup = ({
  radioGroup,
  className,
  direction = 'row',
  disabled = false,
  name,
  selectedValue,
  setValue,
  ...restProps
}: RadioGroupProps) => {
  return (
    <RadioGroupBlock direction={direction} disabled={disabled} className={className} {...restProps}>
      {radioGroup.map((radio) => {
        return (
          <FCRadio
            key={`${name}-${radio.value}`}
            label={radio.label}
            checked={selectedValue === radio.value}
            name={name}
            setValue={() => {
              setValue(radio.value);
            }}
            value={radio.value}
          ></FCRadio>
        );
      })}
    </RadioGroupBlock>
  );
};

export default RadioGroup;
