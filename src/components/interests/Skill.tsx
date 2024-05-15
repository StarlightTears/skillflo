import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import type { Category } from '@/types/category.interface';
import type { LabelValue } from '@/types/common.interface';
import type { InterestListItem } from '@/types/interests.interface';
import type { InterestsSkill } from '@/types/interests.interface';

import { Badge, Button, Close, Select, InterestsSelectLevel, InterestsRadioGroup } from '@/components';
import { useViewport } from '@/shared/hooks';
import { useExposedCategory } from '@/shared/hooks/category';
import { INTERESTS_LIST_MAX_LENGTH } from '@/shared/policy';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

const InterestsSkillContentBlock = styled.section`
  padding-top: 2.4rem;

  .skills-wrapper {
    padding: 0 0.1rem;
  }

  ${media('large')} {
    padding-top: 0;

    .skills-wrapper {
      display: flex;

      .interest-select + .interest-select {
        margin-top: 2rem;
        margin-left: 0.8rem;
      }
    }
  }

  ${media('medium', 'small')} {
    .skills-wrapper {
      .interest-select + .interest-select {
        margin-top: 0.8rem;
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 2.4rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;

  ${media('large')} {
    padding-right: 1.6rem;
    padding-left: 1.6rem;
  }
`;

const InterestsListBlock = styled.div`
  margin-top: 4rem;
`;

const InterestsListContent = styled.div`
  margin-top: 1.2rem;
`;

const InterestsEmptyList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6.4rem;
  border-radius: 0.6rem;
  background-color: var(--legacy-color-gray-50);

  ${legacyTypographyMixin('caption')}
  font-weight: 700;
  color: var(--legacy-color-gray-400);
`;

const InterestCardWrapper = styled.div`
  ${media('large')} {
    display: grid;
    grid-template-columns: repeat(3, 16.7rem);
    gap: 1.6rem 2.4rem;
    place-items: center start;
  }
`;

const InterestCardMore = styled.div`
  ${legacyTypographyMixin('caption')}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9.4rem;
  height: 3.2rem;
  margin-top: 3.2rem;
  margin-left: auto;
  border: 0.1rem solid var(--color-blue-600);
  border-radius: 0.4rem;
  font-weight: 700;
  color: var(--color-blue-600);
  cursor: pointer;

  ${media('large')} {
    width: 3.6rem;
    height: 3.2rem;
    margin: 0;
  }
`;

const InterestCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 8.4rem;
  padding: 1.2rem;
  border-radius: 0.6rem;
  box-shadow: 0.6rem 0.6rem 4rem rgb(0 0 0 / 10%);

  ${media('large')} {
    width: 16.7rem;
  }

  &:not(:last-child) {
    margin-bottom: 1.2rem;

    ${media('large')} {
      margin-bottom: 0;
    }
  }

  header {
    display: flex;
    margin-bottom: 0.4rem;

    .title {
      width: 12.3rem;
      font-weight: 700;
      ${legacyTypographyMixin('body2')}
      color: var(--color-blue-600);
    }

    svg {
      margin: 0.6rem 0.4rem 0.6rem auto;
      cursor: pointer;
    }
  }

  div {
    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-600);

    span {
      margin-right: 0.8rem;
      font-weight: bold;
    }
  }
`;

const INTEREST_LIST_MAX_LENGTH = 9;

interface SkillProps {
  interestList: InterestListItem[];
  levelList: LabelValue[];
  goalLevelList: LabelValue[];
  existingSkills?: {
    goalLevel: string | number;
    level: string | number;
    skill: InterestsSkill;
  }[];
  setInterestList: (value: InterestListItem[]) => void;
}

const Skill = ({ interestList, setInterestList, levelList, goalLevelList, existingSkills }: SkillProps) => {
  const { data: ExposedCategory } = useExposedCategory();
  const [depth1CategoryList, setDepth1CategoryList] = useState<LabelValue[]>([]);
  const [depth2CategoryList, setDepth2CategoryList] = useState<LabelValue[]>([]);

  const [selectedDepth1Category, setSelectedDepth1Category] = useState(NaN);
  const [selectedDepth2Category, setSelectedDepth2Category] = useState(NaN);
  const [level, setLevel] = useState('');
  const [goalLevel, setGoalLevel] = useState('');
  const { isLargeViewport } = useViewport();

  const addInterestList = () => {
    const foundDepth1Category = ExposedCategory?.find((item) => item.id === selectedDepth1Category) as Category;
    const foundDepth2Category = ExposedCategory?.find((item) => item.id === selectedDepth2Category) as Category;

    const foundLevel = levelList.find((item) => String(item.value) === level) as LabelValue;
    const foundGoalLevel = goalLevelList.find((item) => String(item.value) === goalLevel) as LabelValue;
    const filteredList = interestList.filter(
      (item) =>
        !(item.skill.depth1st.id === selectedDepth1Category && item.skill.depth2nd?.id === selectedDepth2Category)
    );
    filteredList.push({
      skill: {
        depth1st: foundDepth1Category,
        depth2nd: foundDepth2Category,
      },
      level: foundLevel,
      goalLevel: foundGoalLevel,
    });
    setInterestList(filteredList);

    setSelectedDepth1Category(NaN);
    setSelectedDepth2Category(NaN);
    setLevel('');
    setGoalLevel('');
  };

  const removeInterestListItem = (selectedItem: InterestListItem) => {
    const filteredList = interestList.filter((item) => item !== selectedItem);
    setInterestList(filteredList);
  };

  const scrollToInterestSelect = () => {
    document.querySelector('.interest-select')?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    if (existingSkills && existingSkills.length > 0 && ExposedCategory && ExposedCategory.length > 0) {
      setInterestList(
        existingSkills.map((skill) => {
          return {
            skill: {
              depth1st: ExposedCategory?.find((category) => category.id === skill.skill.depth1stId) as Category,
              depth2nd: ExposedCategory?.find((category) => category.id === skill.skill.depth2ndId) as Category,
            },
            level: { label: skill.level as string, value: skill.level },
            goalLevel: { label: skill.goalLevel as string, value: skill.goalLevel },
          };
        })
      );
    }
  }, [existingSkills, ExposedCategory]);

  useEffect(() => {
    if (ExposedCategory) {
      setDepth1CategoryList(
        ExposedCategory.filter((category) => category.extras?.depth === 1)
          .sort((a, b) => {
            return (a.extras?.order as number) > (b.extras?.order as number) ? 1 : -1;
          })
          .map((category) => {
            return { label: category.name || '', value: category.id };
          })
      );
    }
  }, [ExposedCategory]);

  useEffect(() => {
    if (selectedDepth1Category && ExposedCategory) {
      setSelectedDepth2Category(NaN);
      setDepth2CategoryList(
        ExposedCategory.filter(
          (category) => category.extras?.depth === 2 && category.extras?.parentId === selectedDepth1Category
        )
          .sort((a, b) => {
            return (a.extras?.order as number) > (b.extras?.order as number) ? 1 : -1;
          })
          .map((category) => {
            return { label: category.name || '', value: category.id };
          })
      );
    }
  }, [ExposedCategory, selectedDepth1Category]);

  return (
    <InterestsSkillContentBlock>
      <div className="skills-wrapper">
        <Select
          className="interest-select"
          label="분야/스킬"
          options={depth1CategoryList}
          setValue={(value) => {
            setSelectedDepth1Category(value[0] as number);
          }}
          placeholder="대분류를 선택해주세요."
          value={selectedDepth1Category}
        />
        <Select
          className="interest-select"
          options={depth2CategoryList}
          setValue={(value) => {
            setSelectedDepth2Category(value[0] as number);
          }}
          placeholder="중분류를 선택해주세요."
          value={selectedDepth2Category}
          disabled={depth2CategoryList.length === 0}
        />
      </div>
      <InterestsSelectLevel label="Q1." title="선택한 분야/스킬의 역량은 현재 어느정도인가요?">
        <InterestsRadioGroup
          name="ability-select"
          list={levelList}
          selectedValue={level}
          setSelectedValue={(value) => {
            setLevel(value);
          }}
        />
      </InterestsSelectLevel>
      <InterestsSelectLevel label="Q2." title="선택한 분야/스킬을 어떻게 활용하고 싶으신가요?">
        <InterestsRadioGroup
          name="uses-select"
          list={goalLevelList}
          selectedValue={goalLevel}
          setSelectedValue={(value) => {
            setGoalLevel(value);
          }}
        />
      </InterestsSelectLevel>
      <ButtonWrapper>
        <Button
          theme="outline"
          size="large"
          disabled={
            !(
              selectedDepth1Category &&
              (depth2CategoryList.length > 0 ? selectedDepth2Category : true) &&
              level &&
              goalLevel &&
              Number(level) < Number(goalLevel) &&
              interestList.length < INTERESTS_LIST_MAX_LENGTH
            )
          }
          onClick={addInterestList}
        >
          관심분야 등록
        </Button>
      </ButtonWrapper>
      <InterestsListBlock>
        <Badge theme="gray" colorScale={400}>
          관심분야
        </Badge>
        <InterestsListContent>
          {interestList.length === 0 ? (
            <InterestsEmptyList>관심분야를 등록해주세요 :)</InterestsEmptyList>
          ) : (
            <InterestCardWrapper>
              {interestList.map((item) => {
                return (
                  <InterestCard key={`${item.skill.depth1st?.id}_${item.skill.depth2nd?.id}`}>
                    <header>
                      <div className="title">
                        {item.skill.depth1st?.name || ''}
                        {item.skill.depth2nd && ` > ${item.skill.depth2nd.name}`}
                      </div>
                      <Close
                        onClick={() => {
                          removeInterestListItem(item);
                        }}
                      />
                    </header>
                    <div>
                      현재 : <span>{`레벨${item.level.value}`}</span>
                      목표 : <span>{`레벨${item.goalLevel.value}`}</span>
                    </div>
                  </InterestCard>
                );
              })}
              {interestList.length < INTEREST_LIST_MAX_LENGTH && (
                <InterestCardMore onClick={scrollToInterestSelect}>
                  +{isLargeViewport ? '' : ' 더 등록하기'}
                </InterestCardMore>
              )}
            </InterestCardWrapper>
          )}
        </InterestsListContent>
      </InterestsListBlock>
    </InterestsSkillContentBlock>
  );
};

export default Skill;
