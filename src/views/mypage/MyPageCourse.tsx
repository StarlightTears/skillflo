import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Option, Tab, TabList, Value } from '@fastcampus/fastcomponents';

import { Checkbox, Select, MypageCourseList, MypageSubPageWrapper } from '@/components';
import { useViewport } from '@/shared/hooks';
import { useCourseProgressList } from '@/shared/hooks/mypage';
import { isRequiredCourse } from '@/shared/utils/course';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

const MyPageCourseBlock = styled.div`
  ${media('small')} {
    margin: 0 1.6rem;
  }

  .tab-filter-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .course-type-tab {
    display: flex;
    gap: 1.6rem;
    margin: 0 0 2rem;
  }

  .tab {
    position: relative;
    padding: 0.8rem 0;

    ${legacyTypographyMixin('body1')}
    font-weight: 700;

    cursor: pointer;

    &.selected {
      &::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        height: 0.2rem;
        background-color: var(--color-blue-600);
      }
    }
  }
`;

const FilterWrapper = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  align-items: center;
  margin-bottom: 2.4rem;
  padding: 1.2rem;
  background-color: var(--color-blue-50);

  ${media('large')} {
    padding: 0;
    background-color: transparent;
  }

  .divider {
    width: 0.1rem;
    height: 1.4rem;
    margin: 0 1.6rem;
    border-radius: 0.2rem;
    background-color: var(--legacy-color-gray-200);
  }

  .select-label {
    ${legacyTypographyMixin('XXSmall')}
    font-weight: 700;
    color: var(--legacy-color-gray-400);
  }
`;

const SelectWrapper = styled.div`
  margin-left: 0.8rem;

  .fc-select {
    width: 16rem;
    height: 3.2rem;
    background-color: var(--color-white);
  }
`;

const courseTabList: Tab[] = [
  {
    name: '수강중인 강의',
    type: 'ONGOING',
  },
  {
    name: '종료된 강의',
    type: 'ENDED',
  },
];

const filterOptions: Option[] = [
  { value: 'all', label: '전체 강의 보기' },
  { value: 'completed', label: '수료 강의 보기' },
  { value: 'notCompleted', label: '미수료 강의 보기' },
];

const MyPageCourse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initCourseTabType = searchParams.get('selectedType')?.toUpperCase() || '';

  const [isRequiredCoursesOnly, setIsRequiredCoursesOnly] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Value[]>(['all']);
  const [selectedCoursetab, changeCourseTab] = useState(
    courseTabList.find((courseTab) => courseTab.type === initCourseTabType) || courseTabList[0]
  );

  const { data: courseProgressList } = useCourseProgressList();
  const { isLargeViewport } = useViewport();

  const currentTabCourses =
    selectedCoursetab.type === 'ONGOING' ? courseProgressList.ongoingCourses : courseProgressList.endedCourses;

  const filteredCourses = currentTabCourses
    .filter((course) => {
      if (isRequiredCoursesOnly) {
        if (selectedCoursetab.type === 'ONGOING') {
          return isRequiredCourse(course);
        }
        return course.requiredCourse ? true : false;
      } else {
        return true;
      }
    })
    .filter((course) => {
      switch (selectedOptions[0]) {
        case 'all':
          return true;
        case 'completed':
          return course.enrollment?.extras?.courseCompletion;
        case 'notCompleted':
          return !course.enrollment?.extras?.courseCompletion;
        default:
          return true;
      }
    });

  useEffect(() => {
    searchParams.delete('selectedType');
    setSearchParams(searchParams, { replace: true });
  }, []);

  return (
    <MypageSubPageWrapper title="수강현황">
      <FilterWrapper isVisible={!isLargeViewport}>
        <Checkbox
          label="필수강의만 보기"
          checked={isRequiredCoursesOnly}
          setChecked={(value) => setIsRequiredCoursesOnly(value)}
        />
        <div className="divider" />
        <SelectWrapper>
          <Select
            options={filterOptions}
            initialSelectedValue={selectedOptions[0]}
            setValue={(v) => setSelectedOptions(v)}
          />
        </SelectWrapper>
      </FilterWrapper>

      <MyPageCourseBlock>
        <div className="tab-filter-wrapper">
          <TabList
            tabList={courseTabList}
            selectedTab={selectedCoursetab}
            onTabClick={changeCourseTab}
            className="course-type-tab"
          />

          <FilterWrapper isVisible={isLargeViewport}>
            <Checkbox
              label="필수강의만 보기"
              checked={isRequiredCoursesOnly}
              setChecked={(value) => setIsRequiredCoursesOnly(value)}
            />
            <div className="divider" />
            <div className="select-label">강의 수료 상태</div>
            <SelectWrapper>
              <Select
                options={filterOptions}
                initialSelectedValue={selectedOptions[0]}
                setValue={(v) => setSelectedOptions(v)}
              />
            </SelectWrapper>
          </FilterWrapper>
        </div>
        <MypageCourseList courseProgressList={filteredCourses} />
      </MyPageCourseBlock>
    </MypageSubPageWrapper>
  );
};

export default MyPageCourse;
