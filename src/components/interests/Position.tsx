import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import type { LabelValue } from '@/types/common.interface';

import { Select } from '@/components';
import { useViewport } from '@/shared/hooks';
import { media } from '@/styles/legacy-mixins';

interface PositionProps {
  careerList: LabelValue[];
  rankList: LabelValue[];
  mainJobList: LabelValue[];
  subJobList: LabelValue[];
  mainJobId?: number;
  subJobId?: number;
  career?: string;
  rankId?: number;
  setCareer: (value: string) => void;
  setRankId: (value: number) => void;
  setMainJobId: (value: number) => void;
  setSubJobId: (value: number) => void;
}

const InterestsPositionContentBlock = styled.section`
  padding: 0 0.1rem;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 3.2rem;
  }

  .select {
    margin-bottom: 2.4rem;
  }

  ${media('large')} {
    flex-direction: row;
    justify-content: space-between;

    .select {
      width: 26.2rem;
    }
  }
`;

const Position = ({
  mainJobList,
  subJobList,
  careerList,
  rankList,
  mainJobId,
  subJobId,
  career,
  rankId,
  setMainJobId,
  setSubJobId,
  setCareer,
  setRankId,
}: PositionProps) => {
  const { isLargeViewport } = useViewport();

  return (
    <InterestsPositionContentBlock>
      <Select
        css={css`
          margin-bottom: 1.6rem;

          ${media('large')} {
            margin-bottom: 3.2rem;
          }
        `}
        label={isLargeViewport ? '직무 대분류' : '직무'}
        options={mainJobList}
        initialSelectedValue={mainJobId}
        placeholder="대분류를 선택해주세요."
        setValue={(value) => {
          setMainJobId(value[0] as number);
          setSubJobId(0);
        }}
      />
      <Select
        css={css`
          margin-bottom: 2.4rem;

          ${media('large')} {
            margin-bottom: 3.2rem;
          }
        `}
        label={isLargeViewport ? '직무 중분류' : ''}
        options={subJobList}
        initialSelectedValue={subJobId}
        placeholder="중분류를 선택해주세요."
        setValue={(value) => {
          setSubJobId(value[0] as number);
        }}
        disabled={!subJobList.length}
      />
      <SelectWrapper>
        <Select
          className="select"
          label="직급"
          options={rankList}
          placeholder="직급을 선택해주세요."
          initialSelectedValue={rankId}
          setValue={(value) => {
            setRankId(value[0] as number);
          }}
        />
        <Select
          className="select"
          label="경력수준"
          options={careerList}
          placeholder="연차를 선택해주세요."
          initialSelectedValue={career}
          setValue={(value) => {
            setCareer(value[0] as string);
          }}
        />
      </SelectWrapper>
    </InterestsPositionContentBlock>
  );
};

export default Position;
