import { useQuery } from '@tanstack/react-query';

import { getSupplementList } from '../api/supplement';
import { QUERY_KEYS } from '../policy';

export const useSupplementList = (supplementIds: number[], courseContentId: number) => {
  const { data } = useQuery(QUERY_KEYS.SUPPLEMENT_LIST(courseContentId), () => getSupplementList(supplementIds), {
    enabled: supplementIds.length > 0,
  });

  const supplementList: { type: string; url: string; name?: string }[] = [];

  if (data) {
    data
      .filter((supplement) => supplement.state === 'NORMAL')
      .forEach((supplement) => {
        if (supplement.extras.url) {
          supplementList.push({ type: 'link', url: supplement.extras.url, name: supplement.name });
        }
        if (supplement.extras.files?.length > 0) {
          supplement.extras.files.forEach((file) => {
            supplementList.push({ type: 'file', url: file.url, name: file.name });
          });
        }
      });
  }

  return supplementList;
};
