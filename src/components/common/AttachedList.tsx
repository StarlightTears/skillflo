import styled from '@emotion/styled';
import React from 'react';

import { saveFile } from '@day1co/browser-util';

import { Badge, ClassroomLink, Download } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface AttachedListProps {
  fileList?: string[];
  linkList?: string[];
  hideLabel?: boolean;
}

const AttachedListBlock = styled.div`
  margin-top: 2rem;

  ul {
    margin-top: 0.8rem;

    li {
      display: flex;
      padding: 0.8rem 0.4rem;
      cursor: pointer;

      svg {
        margin-right: 0.4rem;
      }

      span {
        width: calc(100% - 2.4rem);
        ${legacyTypographyMixin('body2')}
        font-weight: 500;
        word-break: break-all;
      }

      &:not(:last-of-type) {
        margin-bottom: 0.4rem;
      }
    }
  }
`;

// TODO: 파일과 링크를 분리해도 괜찮을 것 같다.
const AttachedList = ({ fileList, linkList, hideLabel }: AttachedListProps) => {
  return (
    <>
      {fileList && fileList.length > 0 && (
        <AttachedListBlock>
          {!hideLabel && (
            <Badge theme="gray" bgColorScale={50} colorScale={400}>
              파일
            </Badge>
          )}
          <ul>
            {fileList.map((file, index) => (
              <li
                key={index}
                onClick={() => {
                  saveFile(file, file.split('/').pop());
                }}
              >
                <Download />
                <span>{file.split('/').pop()}</span>
              </li>
            ))}
          </ul>
        </AttachedListBlock>
      )}
      {linkList && linkList.length > 0 && (
        <AttachedListBlock>
          {!hideLabel && (
            <Badge theme="gray" bgColorScale={50} colorScale={400}>
              참고 링크
            </Badge>
          )}
          <ul>
            {linkList.map((link, index) => (
              <li
                key={index}
                onClick={() => {
                  window.open(link, '_blank');
                }}
              >
                <ClassroomLink />
                <span>{link}</span>
              </li>
            ))}
          </ul>
        </AttachedListBlock>
      )}
    </>
  );
};

export default AttachedList;
