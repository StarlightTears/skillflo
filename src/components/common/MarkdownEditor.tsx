import styled from '@emotion/styled';
import React from 'react';

import { TextArea, TextAreaProps as MarkdownEditorProps } from '@fastcampus/fastcomponents';

import type { PropsWithStyle } from '@/types/component.interface';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const MarkdownEditorBlock = styled.div`
  overflow: hidden;
  border: 0.1rem solid var(--legacy-color-gray-100);
  border-radius: 0.4rem;
  background-color: var(--color-white);

  /* .editor-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1rem 0.8rem;
  }

  .header-icon-wrapper {
    display: flex;
    align-items: center;

    &::after {
      content: '';
      width: 0.1rem;
      height: 2.4rem;
      margin: 0 0.8rem;
      background-color: var(--legacy-color-gray-100);
    }
  }

  .icon {
    width: 3.2rem;
    height: 3.2rem;
    background-color: var(--legacy-color-gray-100);
  }

  .preview-button {
    ${legacyTypographyMixin('body2')}
    font-weight: 700;
    color: var(--legacy-color-gray-400);
  } */

  .textarea {
    width: 100%;
    height: 31.8rem;
    padding: 1.2rem 1.6rem;
    border: none;

    ${legacyTypographyMixin('body1')}

    resize: none;
  }

  .editor-footer {
    padding: 1.2rem 1.6rem;

    ${legacyTypographyMixin('body1')}
    color: var(--legacy-color-gray-300);
  }

  .value-length {
    color: var(--legacy-color-gray-900);
  }

  .row + .row {
    border-top: 0.1rem solid var(--legacy-color-gray-100);
  }
`;

const MarkdownEditor = ({
  value,
  placeholder = '마크다운 또는 BBCode, HTML 포맷을 이용할 수 있습니다.',
  maxLength = 20000,
  className,
  ...restProps
}: PropsWithStyle<MarkdownEditorProps>) => {
  return (
    <MarkdownEditorBlock className={className}>
      {/* <div className="editor-header row">
        <div className="header-icon-wrapper">
          <div className="icon" />
          <div className="icon" />
          <div className="icon" />
        </div>
        <div className="header-icon-wrapper">
          <div className="icon" />
          <div className="icon" />
          <div className="icon" />
        </div>
        <div className="header-icon-wrapper">
          <div className="icon" />
        </div>
        <span className="preview-button">미리보기</span>
      </div> */}
      <TextArea placeholder={placeholder} value={value} maxLength={maxLength} className="textarea row" {...restProps} />
      <div className="editor-footer row">
        <span className="value-length">{value?.length || 0}</span> / {maxLength}
      </div>
    </MarkdownEditorBlock>
  );
};

export default MarkdownEditor;
