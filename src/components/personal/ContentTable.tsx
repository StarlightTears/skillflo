import styled from '@emotion/styled';
import React from 'react';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface PersonalInfoContentTableProps {
  tableContent: TableContent[];
}

interface TableContent {
  usagePurpose: string;
  collectItem: string;
  period?: string;
}

const Table = styled.table`
  margin-bottom: 0.8rem;

  tr {
    display: table;
    width: 100%;
    table-layout: fixed;

    th,
    td {
      ${legacyTypographyMixin('caption')}
      display: table-cell;
      border: 0.05rem solid var(--legacy-color-gray-100);
    }

    th {
      padding: 0.6rem;
      background-color: var(--legacy-color-gray-50);
      font-weight: 700;
      color: var(--legacy-color-gray-800);
      text-align: center;
    }

    td {
      padding: 0.8rem 0.8rem 1.2rem;
      color: var(--legacy-color-gray-700);

      &:nth-of-type(3) {
        font-weight: 700;
      }
    }
  }
`;

const PersonalInfoContentTable = ({ tableContent }: PersonalInfoContentTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>이용목적</th>
          <th>수집항목</th>
          <th>보유기간</th>
        </tr>
      </thead>
      <tbody>
        {tableContent.map((content, index) => {
          return (
            <tr key={index}>
              <td>{content.usagePurpose}</td>
              <td>{content.collectItem}</td>
              <td>{content.period ? content.period : '동의 철회 및 기업고객 서비스 계약 종료 후 30일까지'}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PersonalInfoContentTable;
