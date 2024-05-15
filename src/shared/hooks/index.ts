import { useHomeContentPage } from '@/shared/hooks/homeContent';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useBpoQuery, useBpoMutation } from '@/shared/hooks/useBpoApi';
import { useCourse, useCourseContentList } from '@/shared/hooks/useCourse';
import { useCurrentAccount } from '@/shared/hooks/useCurrentAccount';
import { useCurrentMember } from '@/shared/hooks/useCurrentMember';
import { useCurrentMemberGroupList, useCurrentMemberGroup } from '@/shared/hooks/useCurrentMemberGroupList';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useExamTaskList } from '@/shared/hooks/useExamTaskList';
import { useExternalChanel } from '@/shared/hooks/useExternalAuthorize';
import { useInterval } from '@/shared/hooks/useInterval';
import { useModal } from '@/shared/hooks/useModal';
import { useCourseListWithNote } from '@/shared/hooks/useNote';
import { useMemberRole, useNcsMainJob, useNcsSubJob, useRole, useRoleListByIds } from '@/shared/hooks/useRole';
import { useToast } from '@/shared/hooks/useToast';
import { useToggle } from '@/shared/hooks/useToggle';
import { useToggleList } from '@/shared/hooks/useToggleList';
import { useToken } from '@/shared/hooks/useToken';
import { useValidation } from '@/shared/hooks/useValidation';
import { useViewport } from '@/shared/hooks/useViewport';

export {
  useInterval,
  useAppDispatch,
  useAppSelector,
  useToken,
  useValidation,
  useViewport,
  useCurrentAccount,
  useCurrentMember,
  useCurrentMemberGroupList,
  useCurrentMemberGroup,
  useToggle,
  useToggleList,
  useModal,
  useCourse,
  useCourseContentList,
  useCourseListWithNote,
  useExamTaskList,
  useErrorHandler,
  useBpoQuery,
  useBpoMutation,
  useToast,
  useHomeContentPage,
  useMemberRole,
  useNcsMainJob,
  useNcsSubJob,
  useRole,
  useRoleListByIds,
  useExternalChanel,
};
