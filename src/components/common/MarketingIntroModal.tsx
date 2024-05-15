import styled from '@emotion/styled';
import React from 'react';

import { Table } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const MarketingIntroModalBlock = styled.div`
  padding: 2rem 0;

  .intro-text {
    margin: 0 0 2.4rem;

    ${legacyTypographyMixin('body2')}
    color: var(--legacy-color-gray-600);
  }

  .intro-table {
    ${legacyTypographyMixin('caption')}
    .fc-table {
      border-collapse: collapse;
      border-radius: 0;

      thead {
        font-weight: 700;
        color: var(--legacy-color-gray-800);

        th {
          padding: 0.6rem 0;
          border: 0.1rem solid var(--legacy-color-gray-100);
        }
      }

      tbody {
        color: var(--legacy-color-gray-700);

        td {
          padding: 0.8rem;
          border: 0.1rem solid var(--legacy-color-gray-100);
          text-align: left;
        }

        .period-column {
          font-weight: 700;
        }
      }
    }
  }
`;

const MarketingIntroModal = () => {
  return (
    <MarketingIntroModalBlock>
      <p className="intro-text">
        ※ 패스트캠퍼스가 제공하는 서비스의 이용과 관련하여 마케팅 및 광고활용 동의에 대하여 거부할 권리가 있으며, 마케팅
        동의 여부와 관계없이 서비스를 이용할 수 있습니다.
        <br />
        <br />
        다만, 동의 거부 시 상기 목적에 명시된 서비스를 받으실 수 없습니다.
      </p>
      <Table
        theme="lightgray"
        className="intro-table"
        head={
          <>
            <th>이용목적</th>
            <th>수집항목</th>
            <th>보유기간</th>
          </>
        }
        body={
          <>
            <tr>
              <td>이용자 맞춤형 서비스 강의 추천</td>
              <td>이름, 이메일, 휴대폰번호, 경력, 직무, 직급, 보유 지식, 희망 지식</td>
              <td className="period-column">동의 철회 및 기업고객 서비스 계약 종료 후 30일까지</td>
            </tr>
            <tr>
              <td>고객혜택과 관련한 광고성 정보 제공, 설문조사를 통한 경품 지급</td>
              <td>이름, 이메일, 휴대폰 번호</td>
              <td className="period-column">동의 철회 및 기업고객 서비스 계약 종료 후 30일까지</td>
            </tr>
          </>
        }
      />
    </MarketingIntroModalBlock>
  );
};

export default MarketingIntroModal;
