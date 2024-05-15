import styled from '@emotion/styled';
import React from 'react';

import { Table as FCTable } from '@fastcampus/fastcomponents';
import type { TableProps as FCTableProps } from '@fastcampus/fastcomponents';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

type TableTheme = 'lightblue' | 'lightgray';

interface TableProps extends FCTableProps {
  label?: string;
  theme?: TableTheme;
}

const getTableThemeStyle = (theme: TableTheme) => {
  switch (theme) {
    case 'lightblue':
      return 'var(--color-blue-50)';
    case 'lightgray':
      return 'var(--legacy-color-gray-50)';
  }
};

const TableBlock = styled.div<{ theme?: TableTheme }>`
  .table-title {
    margin-bottom: 1.6rem;
    ${legacyTypographyMixin('body1')};
    font-weight: 700;
  }

  .fc-table {
    width: 100%;
    border: 0.1rem solid var(--legacy-color-gray-100);
    border-collapse: separate;
    border-radius: 0.6rem;
    table-layout: fixed;
    ${legacyTypographyMixin('body2')}

    thead {
      border-bottom: 0.1rem solid var(--legacy-color-gray-100);
      background-color: ${({ theme }) => getTableThemeStyle(theme)};
    }

    th,
    td {
      vertical-align: center;
      padding: 1.6rem 0;
      text-align: center;
    }
  }
`;

const Table = ({ label, theme, head, body, className }: TableProps) => {
  return (
    <TableBlock className={className} theme={theme}>
      {label && <div className="table-title">{label}</div>}
      <FCTable head={head} body={body}></FCTable>
    </TableBlock>
  );
};

export default Table;
