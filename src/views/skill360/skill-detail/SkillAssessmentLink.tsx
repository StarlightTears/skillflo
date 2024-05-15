import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AlertModal, Button, Checkbox, DocumentModal } from '@/components';
import { useSkillQueryOnPage } from '@/shared/hooks/skill360';
import { SkillAssessmentValidationModalType, useSkillAssessmentValidation } from '@/shared/hooks/skill360/validations';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const SkillAssessmentLinkBlock = styled.div`
  position: sticky;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1.6rem;
  border-top: 1px solid var(--color-gray-100);
  background-color: var(--color-white);

  .container {
    width: 60rem;
    margin: 0 auto;
  }

  .caution {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 1.6rem;
  }

  .checkbox-wrapper {
    display: flex;
    align-items: center;

    cursor: pointer;

    .label {
      ${renewalTypographyMixin('body', 3)}
    }
  }

  .waring-policy-modal-opener {
    color: var(--color-semantic-informative-accent);
    ${renewalTypographyMixin('label', 3, true)};

    cursor: pointer;
  }

  .assessment-link {
    height: 4.8rem;
    ${renewalTypographyMixin('label', 2, true)}
  }
`;

const accentStyle = css`
  color: var(--color-semantic-informative-accent);
  ${renewalTypographyMixin('body', 3, true)}
`;

const warningPolicyContents = [
  {
    title: '문항 저작권 보호 및 유출 금지 동의',
    description:
      '본 진단 문항은 저작권의 보호를 받으며, 당사는 진단 문항에 대한 정보를 복제, 공중송신, 배포하거나 2차 저작물을 작성하는 등의 행위를 금합니다. 출제된 문항 내용의 전체 또는 일부를 캡처하거나 복사하는 행위를 금하며, 문항과 관련된 정보 및 본인의 답안을 인터넷상에 게시하거나 타인에게 공유하는 행위를 금합니다.',
  },
  {
    title: '부정행위 처리 동의',
    description:
      '진단 진행 중 기업에서 규정한 명백한 부정행위가 확인되는 경우, 진단 결과 무효 처리 등의 조치가 이루어질 수 있음을 확인하였으며 이에 동의합니다.',
  },
  {
    title: '유의사항 안내 확인 동의',
    description:
      '개인의 응시 환경(네트워크 장애 포함) 및 부주의로 인한 문제와 응시자에게 안내되는 사항을 숙지하지 않아 발생한 불이익은 책임지지 않습니다.',
  },
  { title: '상기 규정을 따르지 않아 발생하는 문제의 책임은 본인에게 있음을 확인하였습니다.' },
];

const SkillAssessmentLink = () => {
  const params = useParams();
  const skillId = Number(params.skillId);
  const { data: skillDetailData } = useSkillQueryOnPage();

  const duration = skillDetailData?.duration || 0;
  const durationByDay = duration ? duration / (24 * 60) : 0;

  const { checkValidationAndSetNextStep } = useSkillAssessmentValidation();
  const [confirmCaution, setConfirmCaution] = useState(false);
  const [validationModalInfo, setValidationModalInfo] = useState<{
    isModalOpen: boolean;
    modalType: SkillAssessmentValidationModalType | undefined;
  }>({ isModalOpen: false, modalType: undefined });

  const modalContents: Record<SkillAssessmentValidationModalType, ReactNode> = {
    initiationAssessmentNotice: (
      <AlertModal
        title="진단 기간 안내"
        description={
          <>
            진단을 시작하면 <span css={accentStyle}>{durationByDay}일 내</span>에 모든 스킬에 대한 진단을 완료해야
            합니다. 진단을 시작하시겠습니까?
          </>
        }
        cancleButtonText="다음에"
        confirmButtonText="진단 시작"
        onClose={() => setValidationModalInfo({ isModalOpen: false, modalType: undefined })}
        onConfirm={async () => {
          checkValidationAndSetNextStep({ setValidationModalInfo, isFinalValidation: true });
        }}
      />
    ),

    unavailablePeriodNotice: (
      <AlertModal
        title="진단 기간 확인 안내"
        description={
          <>
            진단 가능한 기간이 아닙니다.
            <br />
            진단 가능한 기간에 진단을 시작해주세요.
          </>
        }
        confirmButtonText="확인"
        onConfirm={() => setValidationModalInfo({ isModalOpen: false, modalType: undefined })}
      />
    ),
    assessmentEndedNotice: (
      <AlertModal
        title="진단 종료 안내"
        description={
          <>
            진단이 이미 종료된 스킬입니다.
            <br />
            데이터 실반영까지 최대 1시간 정도 소요될 수 있습니다.
          </>
        }
        confirmButtonText="확인"
        onConfirm={() => setValidationModalInfo({ isModalOpen: false, modalType: undefined })}
      />
    ),
    viewportNotice: (
      <AlertModal
        title="PC 이용 안내"
        description={
          <>
            진단은 PC에서만 진행 가능합니다. <br />
            원활한 이용을 위해 PC로 진행해주세요.
          </>
        }
        confirmButtonText="확인"
        onConfirm={() => setValidationModalInfo({ isModalOpen: false, modalType: undefined })}
      />
    ),

    copyrightNotice: (
      <DocumentModal
        title="저작권 보호 및 부정행위 방지 정책 안내"
        documents={warningPolicyContents}
        confirmButtonText="확인"
        onConfirm={() => setValidationModalInfo({ isModalOpen: false, modalType: undefined })}
      />
    ),
  };

  return (
    <SkillAssessmentLinkBlock className="evaluation-link-wrapper">
      <div className="container">
        <div className="caution">
          <div className="checkbox-wrapper" onClick={() => setConfirmCaution(!confirmCaution)}>
            <Checkbox
              checked={confirmCaution}
              setChecked={() => setConfirmCaution(!confirmCaution)}
              label={<span className="label">저작권 보호 및 부정행위 방지 정책, 유의사항 안내 확인에 동의합니다.</span>}
            />
          </div>
          <span
            className="waring-policy-modal-opener"
            onClick={() => setValidationModalInfo({ isModalOpen: true, modalType: 'copyrightNotice' })}
          >
            자세히
          </span>
        </div>
        <Button
          theme="primary"
          onClick={async () => {
            checkValidationAndSetNextStep({ setValidationModalInfo });
          }}
          disabled={!confirmCaution || isNaN(skillId)}
          className="assessment-link"
        >
          진단 시작
        </Button>
      </div>
      {validationModalInfo.modalType && validationModalInfo.isModalOpen && modalContents[validationModalInfo.modalType]}
    </SkillAssessmentLinkBlock>
  );
};

export default SkillAssessmentLink;
