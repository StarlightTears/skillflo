import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

import type { PropsWithStyle } from '@/types/component.interface';

import { EyeIcon, EyeIconOff, Input } from '@/components';
import { useToggle } from '@/shared/hooks';

type PasswordInputProps = PropsWithStyle<Omit<ComponentProps<typeof Input>, 'type'>>;

const PasswordInputBlock = styled.div<{ hasLabel: boolean }>`
  position: relative;

  .input {
    width: 100%;
    height: 100%;
  }

  .eye-icon {
    position: absolute;
    top: ${(props) => (props.hasLabel ? '3.4rem' : '1.4rem')};
    right: 1.6rem;

    cursor: pointer;
  }
`;

const PasswordInput = ({ className, ...inputProps }: PasswordInputProps) => {
  const [visiblePassword, toggleVisiblePassword] = useToggle(false);
  const type = visiblePassword ? 'text' : 'password';
  const EyeComponentToRender = visiblePassword ? EyeIconOff : EyeIcon;

  return (
    <PasswordInputBlock className={className} hasLabel={!!inputProps.label}>
      <Input type={type} {...inputProps} className="input" />
      <EyeComponentToRender className="eye-icon" onClick={toggleVisiblePassword} />
    </PasswordInputBlock>
  );
};

export default PasswordInput;
