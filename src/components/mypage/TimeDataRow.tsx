import React from 'react';

import { DateUtil } from '@day1co/pebbles';

import { MypageDataRow, MypageSummaryDataText } from '@/components';

interface MypageTimeDataRowProps {
  title: string;
  value: number;
}

const MypageTimeDataRow = ({ title, value }: MypageTimeDataRowProps) => {
  const [hourString, minuteString] = DateUtil.getTimeStringFromSeconds(value).split(':');

  return (
    <MypageDataRow
      title={title}
      value={
        <>
          <MypageSummaryDataText value={hourString} suffix="시간" />
          &nbsp;
          <MypageSummaryDataText value={minuteString} suffix="분" />
        </>
      }
    />
  );
};

export default MypageTimeDataRow;
