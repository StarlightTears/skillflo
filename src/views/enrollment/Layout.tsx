import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import type { OriginCourse } from '@/types/course.interface';

import { Accordion, Chip, CourseView, LoadingSpinner } from '@/components';
import { useViewport } from '@/shared/hooks';
import { useExposedCategory } from '@/shared/hooks/category';
import { useRegistrableCourses } from '@/shared/hooks/enrollment';
import { EXTRAS_TAGS } from '@/shared/policy';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { homeMedia } from '@/styles/mixins';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

interface EnrollmentLayoutProps {
  is2depthCateOpen: boolean;
}

const EnrollmentLayoutBlock = styled.section<EnrollmentLayoutProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 9.6rem;

  .empty-placeholder {
    ${legacyTypographyMixin('body1')}
    padding-top: 14.8rem;
    font-weight: 700;
    color: var(--legacy-color-gray-300);
    text-align: center;

    ${homeMedia('large', 'xlarge')} {
      padding-top: 17.2rem;
    }
  }

  ${homeMedia('xlarge')} {
    flex-direction: row;
    gap: 2.4rem;
  }

  .course-view {
    ${homeMedia('small', 'medium', 'large')} {
      margin-top: ${({ is2depthCateOpen }) => (is2depthCateOpen ? '11.3rem' : '7.3rem')};
    }

    ${homeMedia('xlarge')} {
      margin-top: 4rem;
    }
  }

  .banner-loading-spinner {
    width: calc(100vw * (3 / 7));
    height: 40vh;

    ${homeMedia('medium', 'large')} {
      width: calc(100vw * (5 / 7));
    }

    ${homeMedia('small')} {
      width: auto;
      margin-top: var(--layout-enrollment-mobile-header-height);
    }
  }
`;

const CourseCategorySection = styled.div`
  .depth-1 {
    &.accordion-block {
      position: sticky;
      top: 13.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      overflow: hidden scroll;
      max-height: calc(100vh - 15.2rem);
      margin-top: 4rem;
      padding: 0 4rem 0 0;

      &::-webkit-scrollbar {
        width: 0.4rem;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 1rem;
        background: var(--color-gray-200);
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }
    }

    &.accordion-list {
      ${renewalTypographyMixin('body', 2, true)}
      min-height: 4.2rem;
      margin-bottom: 0;
      padding: 0 1.6rem;
      border-radius: 0.6rem;
      color: var(--color-semantic-informative-primary);

      &:hover {
        background-color: var(--color-semantic-paper-surface-default);
      }

      &.selected {
        &:hover {
          background-color: var(--color-semantic-status-gray-hover);
        }
      }
    }
  }

  .depth-2 {
    &.accordion-block {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0;
    }

    &.accordion-list {
      ${renewalTypographyMixin('body', 3, true)}
      min-height: 3.4rem;
      margin-bottom: 0;
      padding: 0 1.6rem 0 3.2rem;
      color: var(--color-semantic-informative-teritary);

      &.selected {
        background-color: unset;
        color: var(--color-semantic-informative-primary);
      }

      &:hover {
        color: var(--color-semantic-informative-primary);
      }
    }
  }
`;

const MobileHeader = styled.header`
  position: fixed;
  left: 0;
  width: 100vw;
  background-color: var(--color-white);
`;

const MobileChipList = styled.div`
  display: flex;
  gap: 0.6rem;
  overflow: auto;
  padding: 0.6rem 1.6rem;
  border-bottom: 0.1rem solid var(--color-semantic-divider-default);
  white-space: nowrap;

  .common-chip {
    padding: 0.8rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  &.depth-1 {
    .common-chip {
      color: var(--color-semantic-informative-primary);
    }

    .focus {
      :hover {
        background-color: var(--color-semantic-status-gray-hover);
      }
    }
  }

  &.depth-2 {
    .common-chip {
      background-color: unset;
      color: var(--color-semantic-informative-teritary);

      &:hover {
        color: var(--color-semantic-informative-primary);
      }

      &.focus {
        color: var(--color-semantic-informative-primary);
      }
    }
  }
`;
interface Category {
  id: number;
  name: string;
  order: number;
  children: Category[];
}

const initialCategoryList: Category[] = [{ id: -1, name: '전체 카테고리', children: [], order: -1 }];

const EnrollmentLayout = () => {
  const { data: categoryData } = useExposedCategory();
  const { data: categoryCourseList, isLoading } = useRegistrableCourses();

  const categoryMap: { [id: number]: Category } = {};
  categoryData?.forEach((category) => {
    const { id, name, extras } = category;
    const isCategoryHasCourse = !!categoryCourseList?.some((categoryCourse) => categoryCourse.category.id === id);

    if (!isCategoryHasCourse) return;

    if (category.extras?.depth === 1) {
      categoryMap[id] = {
        id,
        name: name ?? '',
        order: extras?.order ?? 0,
        children: [...(categoryMap[id] && categoryMap[id].children ? categoryMap[id].children : [])],
      };
    } else if (category.extras?.depth === 2) {
      const parentId = extras?.parentId ?? 0;
      categoryMap[parentId] = {
        ...categoryMap[parentId],
        children: [
          ...(categoryMap[parentId] && categoryMap[parentId].children ? categoryMap[parentId].children : []),
          {
            id,
            name: name ?? '',
            order: extras?.order ?? 0,
            children: [],
          },
        ],
      };
    }
  });

  const categoryList = [
    ...initialCategoryList,
    ...Object.values(categoryMap)
      .map((category) => ({ ...category, children: category.children.sort((a, b) => a.order - b.order) }))
      .sort((a, b) => a.order - b.order),
  ];

  const [selectedMainCategory, setSelectedMainCategory] = useState(initialCategoryList[0]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryList[0].name);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory]);

  const { isLargeViewport } = useViewport();

  const courseList = (() => {
    if (!categoryCourseList?.length) return [];
    if (selectedCategory !== initialCategoryList[0].name) {
      const category = categoryCourseList?.find((categoryCourse) => categoryCourse.category.name === selectedCategory);

      return category?.courses || [];
    }

    const courseMap = new Map<string, OriginCourse>();

    const sortCourseList = (a: OriginCourse, b: OriginCourse) => {
      let tagComparison = 0;

      if (
        a.extras.tags?.includes(EXTRAS_TAGS.COMPLETION_CERTIFICATE) &&
        !b.extras.tags?.includes(EXTRAS_TAGS.COMPLETION_CERTIFICATE)
      ) {
        tagComparison = -1;
      } else if (
        !a.extras.tags?.includes(EXTRAS_TAGS.COMPLETION_CERTIFICATE) &&
        b.extras.tags?.includes(EXTRAS_TAGS.COMPLETION_CERTIFICATE)
      ) {
        tagComparison = 1;
      }

      if (tagComparison === 0) {
        return a.id - b.id;
      }

      return tagComparison;
    };

    for (const course of categoryCourseList.flatMap(({ courses }) => courses).sort(sortCourseList)) {
      const courseKey = `${course.id}:${course.product.id}`;
      if (courseMap.has(courseKey)) continue;
      courseMap.set(courseKey, course);
    }

    return [...courseMap.values()];
  })();

  return (
    <EnrollmentLayoutBlock is2depthCateOpen={selectedMainCategory.children.length > 0}>
      {isLargeViewport ? (
        <CourseCategorySection>
          <Accordion
            list={categoryList}
            selectedMenu={selectedCategory}
            setMenu={(menu) => {
              setSelectedMainCategory((prev) => categoryList.find((category) => category.name === menu) ?? prev);
              setSelectedCategory(menu);
            }}
          />
        </CourseCategorySection>
      ) : (
        <MobileHeader>
          <MobileChipList className="depth-1">
            {categoryList.map((category) => {
              return (
                <Chip
                  key={category.id}
                  className={category.name === selectedMainCategory.name ? 'focus' : ''}
                  onClick={(event) => {
                    event.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center' });
                    setSelectedMainCategory(category);
                    setSelectedCategory(category.name);
                  }}
                >
                  {category.name}
                </Chip>
              );
            })}
          </MobileChipList>
          {selectedMainCategory.children.length > 0 && (
            <MobileChipList className="depth-2">
              {selectedMainCategory.children.map((category) => {
                return (
                  <Chip
                    key={category.id}
                    className={category.name === selectedCategory ? 'focus' : ''}
                    onClick={(event) => {
                      event.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center' });
                      setSelectedCategory(category.name);
                    }}
                  >
                    {category.name}
                  </Chip>
                );
              })}
            </MobileChipList>
          )}
        </MobileHeader>
      )}
      {isLoading ? (
        <LoadingSpinner className="banner-loading-spinner" />
      ) : (
        <CourseView
          categoryTitle={selectedCategory}
          courseList={courseList}
          emptyLayout={
            <div className="empty-placeholder">
              수강신청 가능한 강의가 없습니다.
              <br />
              담당자에게 문의해주세요.
            </div>
          }
        />
      )}
    </EnrollmentLayoutBlock>
  );
};

export default EnrollmentLayout;
