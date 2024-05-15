import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getHomeContentPage } from '@/shared/api/homeContent';
import { QUERY_KEYS } from '@/shared/policy';

export const useHomeContentPage = () => {
  const params = useParams();
  const pageId = Number(params.pageId);

  return useQuery(QUERY_KEYS.HOME_CONTENT_PAGE(pageId), () => getHomeContentPage(pageId));
};
