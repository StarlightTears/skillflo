import { css } from '@emotion/react';
import React from 'react';

import { Checkbox as FCCheckbox } from '@fastcampus/fastcomponents';
import type { CheckboxProps } from '@fastcampus/fastcomponents';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const defaultCheckboxStyle = css`
  display: flex;
  align-items: center;
  cursor: pointer;

  input[type='checkbox'] {
    width: 1.6rem;
    height: 1.6rem;
    margin: 0.4rem;
    cursor: pointer;
  }

  span {
    ${legacyTypographyMixin('body2')}
    margin-left: 0.4rem;
    font-weight: 400;
  }
`;

const Checkbox = ({ label, checked, setChecked, ...restProps }: CheckboxProps) => {
  return (
    <FCCheckbox css={defaultCheckboxStyle} label={label} checked={checked} setChecked={setChecked} {...restProps} />
  );
};

export default Checkbox;
