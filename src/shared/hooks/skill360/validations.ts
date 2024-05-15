import { useNavigate, useParams } from 'react-router-dom';

import { useViewport } from '../useViewport';

import { useAssessmentQueryById } from './assessment';
import { useSkillQueryOnPage } from './skill';

export type SkillAssessmentValidationModalType =
  | 'viewportNotice'
  | 'initiationAssessmentNotice'
  | 'unavailablePeriodNotice'
  | 'assessmentEndedNotice'
  | 'copyrightNotice';

interface SkillAssessmentValidationInfo {
  isValid: boolean;
  modalType?: SkillAssessmentValidationModalType;
}

export const useSkillAssessmentValidation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const skillId = Number(params.skillId);
  const { isLargeViewport } = useViewport('renewal');
  const { data: skillDetailData, refetch: skillDetailRefetch } = useSkillQueryOnPage();
  const assessmentId = skillDetailData?.memberAssessment?.assessmentId;
  const { data: assessmentData, refetch: assessmentRefetch } = useAssessmentQueryById(assessmentId ?? 0, {
    enabled: !!assessmentId,
  });

  const getDeviceValidationInfo: () => SkillAssessmentValidationInfo = () => {
    if (isLargeViewport) {
      return { isValid: true };
    } else {
      return { isValid: false, modalType: 'viewportNotice' };
    }
  };

  const getAssessmentPeriodValidationInfo: () => Promise<SkillAssessmentValidationInfo> = async () => {
    await assessmentRefetch();
    await skillDetailRefetch();
    const nowDate = new Date();
    const isAssessmentOpened = !!assessmentData?.beginAt && nowDate >= new Date(assessmentData.beginAt);
    const isAssessmentClosed = !!assessmentData?.endAt && nowDate > new Date(assessmentData.endAt);
    const isFirstAssessment = skillDetailData?.memberAssessment?.state === 'READY';

    const isAssessmentDurationValid =
      !!skillDetailData?.memberAssessment.limitedAt && nowDate <= new Date(skillDetailData?.memberAssessment.limitedAt);

    if (isAssessmentOpened && !isAssessmentClosed) {
      if (isFirstAssessment) {
        return { isValid: true, modalType: 'initiationAssessmentNotice' };
      }

      if (isAssessmentDurationValid) {
        return { isValid: true };
      }

      return { isValid: false, modalType: 'unavailablePeriodNotice' };
    } else {
      if (isAssessmentClosed && !isFirstAssessment && isAssessmentDurationValid) {
        return { isValid: true };
      }

      return { isValid: false, modalType: 'unavailablePeriodNotice' };
    }
  };

  const getAssessmentSetValidation: () => SkillAssessmentValidationInfo = () => {
    // TODO: 백엔드에서 에러코드 던져주면 수정
    const isAssessmentSetValid = true;
    if (!isAssessmentSetValid) {
      return { isValid: false, modalType: 'assessmentEndedNotice' };
    }
    return { isValid: true, modalType: undefined };
  };

  const checkValidationAndSetNextStep = async ({
    setValidationModalInfo,
    isFinalValidation = false,
  }: {
    setValidationModalInfo: ({
      isModalOpen,
      modalType,
    }: {
      isModalOpen: boolean;
      modalType: SkillAssessmentValidationModalType | undefined;
    }) => void;
    isFinalValidation?: boolean;
  }) => {
    // 1. 디바이스 유효성 검사 진행
    const { isValid: isDeviceValid, modalType: deviceModalType } = getDeviceValidationInfo();
    if (!isDeviceValid) {
      setValidationModalInfo({ isModalOpen: true, modalType: deviceModalType });
      return;
    }

    // 1번 통과 시 2. 진단 진행여부 유효성 검사 진행
    const { isValid: isAssessmentSetValid, modalType: assessmentSetModalType } = getAssessmentSetValidation();
    if (!isAssessmentSetValid) {
      setValidationModalInfo({ isModalOpen: true, modalType: assessmentSetModalType });
      return;
    }

    // 2번 통과 시 3. 진단 기간 유효성 검사 진행
    const { isValid: isAssessmentPeriodValid, modalType: assessmentModalType } =
      await getAssessmentPeriodValidationInfo();
    if (isAssessmentPeriodValid) {
      if (assessmentModalType && !isFinalValidation) {
        setValidationModalInfo({ isModalOpen: true, modalType: assessmentModalType });
        return;
      }
      navigate(`/skills/${skillId}/assessment`);
      return;
    } else {
      if (assessmentModalType) {
        setValidationModalInfo({ isModalOpen: true, modalType: assessmentModalType });
        return;
      }
    }
  };

  return { checkValidationAndSetNextStep };
};
