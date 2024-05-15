import styled from '@emotion/styled';
import React from 'react';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface InfoProps {
  list: { title: string; content: string; subContent?: { useDivider: boolean; value: string } }[];
}

const InfoContainer = styled.ul`
  display: flex;
`;

const InfoItem = styled.li`
  .title {
    ${legacyTypographyMixin('XXSmall')}
    color: var(--legacy-color-gray-600);
  }

  .content {
    display: flex;
    ${legacyTypographyMixin('Large')}

    .main {
      font-weight: 700;
    }

    .sub {
      color: var(--legacy-color-gray-400);

      span {
        margin: 0 0.9rem;
      }
    }
  }
`;

const VerticalLine = styled.div`
  margin: 0 3.6rem;
  border-left: 0.1rem solid var(--legacy-color-gray-100);
`;

const InfoList = ({ list }: InfoProps) => {
  return (
    <InfoContainer>
      {list.map((item, index) => (
        <React.Fragment key={index}>
          <InfoItem>
            <div className="title">{item.title}</div>
            <div className="content">
              <div className="main">{item.content}</div>
              {item.subContent && (
                <div className="sub">
                  {item.subContent?.useDivider && <span>/</span>}
                  {item.subContent.value}
                </div>
              )}
            </div>
          </InfoItem>
          {list.length - 1 !== index && <VerticalLine />}
        </React.Fragment>
      ))}
    </InfoContainer>
  );
};

export default InfoList;
