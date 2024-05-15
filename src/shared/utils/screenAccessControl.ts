import type { MemberGroup } from '@/types/member.interface';

export const hasAccessPermissionForAllPage = (memberGroup: MemberGroup): boolean => {
  if (memberGroup.extras.isAssociated) {
    return !memberGroup.extras.screenAccessControl || Boolean(memberGroup.extras.screenAccessControl?.all);
  } else {
    return true;
  }
};
