import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePrevNextPagination = <T>(
  list: T[] | undefined,
  listLimitLength: number,
  initPaginationDependency?: (string | boolean | number)[]
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isShowPagination, setIsShowPagination] = useState(true);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [sortedList, setSortedList] = useState<T[]>([]);

  const mode = searchParams.get('mode');
  const lastId = Number(searchParams.get('lastId')) || undefined;

  useEffect(() => {
    if (!list) {
      setIsShowPagination(false);
      return;
    }
    if (!lastId && list.length > 0 && list.length <= listLimitLength) setIsShowPagination(false);

    if (mode === 'prev') {
      setIsLastPage(false);
      if (list.length <= listLimitLength) {
        setIsFirstPage(true);
      } else {
        setIsFirstPage(false);
      }
    }
    if (mode === 'next') {
      setIsFirstPage(false);
      if (list.length <= listLimitLength) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    }
    setSortedList(list.slice(0, listLimitLength));
  }, [list]);

  useEffect(() => {
    setIsShowPagination(true);
    setIsFirstPage(true);
    setIsLastPage(false);
    searchParams.delete('mode');
    searchParams.delete('lastId');
    setSearchParams(searchParams);
  }, initPaginationDependency);

  return { isShowPagination, isFirstPage, isLastPage, sortedList };
};
