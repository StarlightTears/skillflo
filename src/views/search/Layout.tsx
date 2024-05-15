import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CourseView, EmptyNoteBlue } from '@/components';
import EmptyPlaceholder from '@/components/mypage/EmptyPlaceholder';
import withSuspense from '@/shared/hocs/withSuspense';
import { useSearch } from '@/shared/hooks/search';
import { SUSPENSE_LOADING_SPINNER_CLASS } from '@/shared/policy';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

const SearchResultBlock = styled.section`
  padding-bottom: 6rem;

  & h1 {
    padding-top: 2.4rem;
    ${legacyTypographyMixin('headline4')}
  }

  & p {
    padding-top: 1.6rem;
    ${legacyTypographyMixin('body1')}
  }

  ${media('large')} {
    display: grid;
    grid-template-columns: 26.2rem 83.4rem;
    gap: 2.4rem;
    margin-bottom: 9.6rem;
    padding: 2rem 0 0;

    & h1 {
      padding-top: 0;
      ${legacyTypographyMixin('headline4')}
    }

    & p {
      padding-top: 0;
      ${legacyTypographyMixin('headline4')}
    }

    .empty-placeholder {
      margin: 2rem 0 0;
    }
  }
`;

const SearchLayout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('keyword')) {
      navigate('/');
    }
  }, []);

  return (
    <SearchResultBlock>
      <h1>검색 결과</h1>
      <SearchQueryPresentor />
    </SearchResultBlock>
  );
};

const SearchQueryFallbackBlock = styled.div`
  box-sizing: border-box;
  padding: 8rem 0;

  .${SUSPENSE_LOADING_SPINNER_CLASS} {
    height: 9.2rem;
  }
`;

const SearchQueryPresentor = withSuspense(() => {
  const [searchParams] = useSearchParams();
  const { data: courseList } = useSearch(searchParams.get('keyword') || '');

  return (
    <div>
      <p>
        <strong>&#34;{searchParams.get('keyword')}&#34;</strong>에 대한 <strong>{(courseList || []).length}</strong>
        건의 검색결과입니다.
      </p>
      <CourseView
        courseList={courseList || []}
        grid={3}
        emptyLayout={
          <EmptyPlaceholder className="empty-placeholder">
            <EmptyNoteBlue />
            등록된 강의가 없습니다.
          </EmptyPlaceholder>
        }
      />
    </div>
  );
}, SearchQueryFallbackBlock);

export default SearchLayout;
