import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useRef } from 'react';

import { TextArea as FCTextArea } from '@fastcampus/fastcomponents';
import type { TextAreaProps as FCTextAreaProps } from '@fastcampus/fastcomponents';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface TextAreaProps extends FCTextAreaProps {
  label?: string;
  autoresize?: boolean;
}

const TextAreaBlock = styled.div`
  label {
    ${legacyTypographyMixin('caption')}
    font-weight: 700;
    color: var(--legacy-color-gray-400);
  }
`;

const defaultTextAreaStyle = css`
  width: 100%;
  padding: 1.6rem;
  border: 0.1rem solid var(--legacy-color-gray-100);
  border-radius: 0.6rem;

  &::placeholder {
    ${legacyTypographyMixin('body2')}
    color: var(--legacy-color-gray-200);
  }

  &:focus {
    outline: 0.1rem solid var(--color-blue-600);
  }
`;

const getTextAreaStyle = (autoresize: boolean | undefined) => {
  return css`
    ${defaultTextAreaStyle};
    ${autoresize &&
    css`
      overflow-y: hidden;
      resize: none;
    `}
  `;
};

const TextArea = ({
  label,
  className,
  placeholder,
  value,
  onChange,
  maxLength,
  minLength,
  autoresize,
  ...restProps
}: TextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <TextAreaBlock>
      {label && <label>{label}</label>}
      <FCTextArea
        css={getTextAreaStyle(autoresize)}
        ref={textAreaRef}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={() => {
          if (autoresize && textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight / 10 + 'rem';
            textAreaRef.current.parentElement?.scrollTo(0, textAreaRef.current.parentElement.scrollHeight);
          }
        }}
        maxLength={maxLength}
        minLength={minLength}
        {...restProps}
      />
    </TextAreaBlock>
  );
};

export default TextArea;
