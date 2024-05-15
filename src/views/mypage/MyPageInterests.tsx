import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import type { CategoryTemplate, Item } from '@/types/common.interface';
import type { OriginCourse } from '@/types/course.interface';

import { ChipList, CourseView, EmptyNoteBlue, MypageSubPageWrapper } from '@/components';
import EmptyPlaceholder from '@/components/mypage/EmptyPlaceholder';
import { useViewport } from '@/shared/hooks';
import { useBookmarkCourseList } from '@/shared/hooks/useBookmark';
import { media } from '@/styles/legacy-mixins';

const emptyPlaceholderStyle = css`
  ${media('large')} {
    margin: 3.2rem 0 0;
  }
`;

const MyPageInterestsContent = styled.div`
  display: flex;
  flex-direction: column;

  ${media('small', 'medium')} {
    padding: 0 1.6rem;
  }

  .category-list {
    display: flex;
    gap: 1.6rem 0.4rem;
    padding-top: 1.2rem;

    ${media('large')} {
      flex-wrap: wrap;
    }

    ${media('small', 'medium')} {
      overflow: auto;
      padding-top: 0.8rem;
      padding-bottom: 0.4rem;
      white-space: nowrap;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .course-view {
    ${media('large')} {
      margin-top: 0.4rem;
    }
  }
`;

const initialCategoryList = [{ name: '전체강의', id: -1 }];

const MyPageInterests = () => {
  const { courseListByCategory } = useBookmarkCourseList();
  const [courseList, setCourseList] = useState<OriginCourse[]>([]);
  const [filteredData, setFilteredData] = useState<{ category: CategoryTemplate; courses: OriginCourse[] }[]>();
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryList[0]);
  const [categoryList, setCategoryList] = useState(initialCategoryList);
  const { isLargeViewport } = useViewport();

  const getAllCourses = () => {
    if (filteredData && filteredData.length > 0) {
      const flattenCourses = filteredData.map((response) => response.courses).flat();
      const uniqueIds: string[] = [];
      return flattenCourses.filter((course) => {
        const isDuplicated = uniqueIds.includes(`${course.id}:${course.product.id}`);

        if (!isDuplicated) {
          uniqueIds.push(`${course.id}:${course.product.id}`);
          return true;
        }
        return false;
      });
    }
    return [];
  };

  useEffect(() => {
    setFilteredData(courseListByCategory?.filter((res) => res.category.depth === 1) || []);
  }, [courseListByCategory]);

  useEffect(() => {
    setCategoryList([
      initialCategoryList[0],
      ...(filteredData?.map((response) => ({ name: response.category.name, id: response.category.id })) || []),
    ]);

    setCourseList(getAllCourses());
  }, [filteredData]);

  useEffect(() => {
    if (selectedCategory.id === initialCategoryList[0].id) {
      setCourseList(getAllCourses());
      return;
    }
    const foundCourses = filteredData?.find((response) => response.category.id === selectedCategory.id);
    setCourseList(foundCourses?.courses || []);
  }, [selectedCategory]);

  const clickChipList = (chip: Item, event: React.MouseEvent) => {
    if (!isLargeViewport) {
      event.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
    setSelectedCategory(chip);
  };

  return (
    <MypageSubPageWrapper title="나의 관심강의">
      <MyPageInterestsContent>
        {courseList.length > 0 && (
          <ChipList
            className="category-list"
            chipList={categoryList}
            selectedChip={selectedCategory}
            onClick={clickChipList}
          />
        )}
        <CourseView
          courseList={courseList}
          grid={3}
          isShowExceptOngoingCourse={false}
          emptyLayout={
            <EmptyPlaceholder css={emptyPlaceholderStyle}>
              <EmptyNoteBlue />
              즐겨찾기 등록한 강의가 없습니다.
            </EmptyPlaceholder>
          }
        />
      </MyPageInterestsContent>
    </MypageSubPageWrapper>
  );
};

export default MyPageInterests;
