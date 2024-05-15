import { css } from '@emotion/react';
import React from 'react';

import { Pagination as FCPagination, PaginationProps as FCPaginationProps } from '@fastcampus/fastcomponents';

import { ArrowLeft, ArrowRight } from '..';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const PaginationStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  ${legacyTypographyMixin('body2')}

  .page-number-list {
    display: flex;
    text-align: center;

    span {
      width: 3.2rem;
      height: 3.2rem;

      line-height: 3.2rem;

      cursor: pointer;

      &.active {
        border-radius: 0.6rem;
        background-color: var(--legacy-color-gray-50);

        font-weight: 700;
        color: var(--legacy-color-gray-900);
      }
    }
  }

  button {
    display: flex;
    padding: 0;
    border: none;

    background-color: transparent;

    cursor: pointer;

    path {
      fill: var(--legacy-color-gray-300);
    }

    &.prev {
      transform: rotate(180deg);
    }

    &:hover {
      path {
        fill: var(--legacy-color-gray-900);
      }
    }

    &.disabled {
      cursor: auto;
      pointer-events: none;

      path {
        fill: var(--legacy-color-gray-100);
      }
    }

    &.first-btn,
    &.last-btn {
      display: none;
    }
  }
`;

const Pagination = ({ ...rest }: FCPaginationProps) => {
  return <FCPagination {...rest} prevIcon={<ArrowLeft />} nextIcon={<ArrowRight />} css={PaginationStyle} />;
};

export default Pagination;
