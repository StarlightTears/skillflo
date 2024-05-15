import styled from '@emotion/styled';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { ObjectUtil } from '@day1co/pebbles';
import { isValidPassword } from '@day1co/redstone-policy';
import { Radio as FCRadio } from '@fastcampus/fastcomponents';

import type { HttpClientError } from '@/types/api.interface';

import {
  Input,
  Button,
  InterestsContentLayoutModal,
  MarketingIntroModal,
  PasswordInput,
  Modal,
  MypageSubPageWrapper,
} from '@/components';
import { useValidation, useViewport, useMemberRole, useCurrentMemberGroup } from '@/shared/hooks';
import { useUserInfoForm, useUserInfo, usePhoneCertification } from '@/shared/hooks/mypage';
import { getLogger } from '@/shared/utils/logger';
import { isValidPasswordAgain } from '@/shared/utils/validation';
import { legacyTypographyMixin, media } from '@/styles/legacy-mixins';
const logger = getLogger('components', 'MyPageInfo');

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  & .fc-button {
    width: 50%;
    ${legacyTypographyMixin('body1')}
  }

  ${media('large')} {
    justify-content: flex-end;

    & .fc-button {
      width: auto;
      outline: none;

      &:last-of-type {
        width: 32.8rem;
      }
    }
  }
`;

const InfoList = styled.ul`
  ${media('small')} {
    margin: 0 1.6rem;
  }

  & li {
    padding: 1.6rem;
    border-bottom: 0.1rem solid var(--legacy-color-gray-100);

    ${media('small', 'medium')} {
      &:first-of-type {
        padding-top: 0;
      }
    }

    &:last-of-type {
      padding-bottom: 4.6rem;
      border-bottom: none;
    }

    ${media('large')} {
      display: flex;
      padding: 2rem 0;
    }

    & .info-title {
      ${legacyTypographyMixin('body2')}
      color: var(--legacy-color-gray-500);
      line-height: 2.8rem;

      ${media('large')} {
        width: 16.7rem;
        margin-right: 2.4rem;
        line-height: 4rem;
      }
    }

    & .info-content {
      ${legacyTypographyMixin('body2')}
      font-weight: 700;
      color: var(--legacy-color-gray-900);

      & .description {
        margin-bottom: 1rem;

        ${legacyTypographyMixin('body2')}
        font-weight: 400;
        color: var(--legacy-color-gray-900);

        & .description-link {
          display: inline-block;
          margin-top: 1rem;
          color: var(--legacy-color-gray-500);
          text-decoration: underline;
          cursor: pointer;
        }
      }

      &.space-between {
        display: flex;
        flex-grow: 1;
        justify-content: space-between;
      }

      /* stylelint-disable-next-line no-descending-specificity */
      & .fc-button {
        width: auto;

        ${legacyTypographyMixin('caption')}

        &.form-opener {
          ${media('large')} {
            outline: none;
          }
        }

        ${media('large')} {
          ${legacyTypographyMixin('button')}
        }
      }

      & .fc-radio {
        font-weight: 400;
      }

      & .radio-group {
        display: flex;
        margin-bottom: 1.6rem;

        & .radio-group-label {
          margin-right: 2.8rem;
        }

        & .fc-radio {
          display: flex;
          align-items: center;

          input {
            margin-top: 0;
          }

          input + span {
            display: inline-block;
            width: 6rem;
          }
        }

        ${media('small', 'medium')} {
          display: flex;

          .radio-group-label {
            flex: 1 1 auto;
          }
        }
      }

      & .form-content {
        width: 100%;

        & .input-wrapper {
          margin-bottom: 2.4rem;

          &:last-of-type {
            margin-bottom: 0;
          }
        }

        & .fc-button {
          width: 100%;
        }

        &.phone {
          & .fc-input {
            margin-bottom: 1.6rem;
          }
        }
      }

      & .radio-group-wrapper {
        &.disabled {
          color: var(--legacy-color-gray-300);

          .radio-group-label {
            color: var(--legacy-color-gray-400);
          }
        }
      }

      ${media('large')} {
        & .form-content {
          width: 100%;

          & .input-wrapper {
            display: flex;
            align-items: flex-end;
            margin-bottom: 1.6rem;

            &:last-of-type {
              margin-bottom: 0;
            }
          }

          & .fc-input {
            width: 26.2rem;
          }

          & .fc-button {
            width: auto;
          }

          &.phone {
            & .fc-input {
              margin-right: 1rem;
              margin-bottom: 0;
            }
          }
        }

        & .radio-group-wrapper {
          display: flex;
          gap: 3.2rem;
        }
      }
    }

    .content-text {
      line-height: 2.8rem;

      &.large {
        ${media('small', 'medium')} {
          line-height: 3.2rem;
        }
      }

      ${media('large')} {
        line-height: 4rem;
      }
    }

    &.customer-course {
      display: flex;
      justify-content: space-between;

      .info-title {
        ${media('small', 'medium')} {
          line-height: 3.2rem;
        }
      }
    }
  }
`;

const PASSWORD_MESSAGES = {
  INVALLID_PASSWORD: '8자 이상, 숫자와 특수문자 사용을 권장합니다.',
  NOT_CONFIRM_PASSWORD: '새로 설정한 비밀번호와 비밀번호 확인이 일치하지 않습니다.',
};

const MyPageInfo = () => {
  // * query 데이터 hook
  const { data: userInfo } = useUserInfo();
  const { roleNameMap } = useMemberRole(
    [userInfo?.member.extras.jobId, userInfo?.member.extras.rankId].filter((v) => v) as number[]
  );

  // * mutation hook
  const { updateUserInfo } = useUserInfoForm();
  const { send, verify } = usePhoneCertification();

  // * 컴포넌트 렌더링 제어 Hook
  const { isLargeViewport } = useViewport();

  const { isSkill360MemberGroup, isLoading: isCurrentMemberGroupLoading } = useCurrentMemberGroup();

  // * 전화번호 관련 state
  // ** 실제 회원의 현재 전화번호
  const originalPhoneNumber = userInfo?.member.extras.phone;
  // ** 회원이 input에 입력한 전화번호
  const [insertedPhoneNumber, setInsertedPhoneNumber] = useState('');
  // ** 인증을 받은 전화번호.
  const phoneNumberToSubmit = useRef(''); // ? insertedPhoneNumber를 수정하면 빈 문자열로 수정을 할까???
  const [openEditPhoneNumber, setOpenEditPhoneNumber] = useState(false);
  const [phoneCertificationCode, setPhoneCertificationCode] = useState('');

  const sendPhoneCertification = async () => {
    try {
      await send({ phone: insertedPhoneNumber });
      phoneNumberToSubmit.current = '';
    } catch (error) {
      const err = error as Error;
      logger.error('인증번호 발송 실패', { phone: insertedPhoneNumber }, err);
      alert('인증번호 발송 실패');
    }
  };

  const verifyPhoneCertificationCode = async () => {
    try {
      await verify({ phone: insertedPhoneNumber, code: phoneCertificationCode });
      alert('인증되었습니다.');
      phoneNumberToSubmit.current = insertedPhoneNumber;
    } catch (error) {
      const err = error as Error;
      logger.info(err.message, err);
      alert('인증번호가 맞지 않습니다.');
    }
  };

  // * 비밀번호 관련 state
  const [openEditPassword, setOpenEditPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [isNewPasswordValid, newPasswordErrorMessage] = useValidation({
    formState: [newPassword],
    validationList: [
      {
        validMessage: PASSWORD_MESSAGES.INVALLID_PASSWORD,
        validator: isValidPassword,
      },
    ],
  });
  const [isNewPasswordConfirmed, newPasswordConfirmErrorMessage] = useValidation({
    formState: [newPassword, newPasswordConfirm],
    validationList: [
      {
        validMessage: PASSWORD_MESSAGES.NOT_CONFIRM_PASSWORD,
        validator: isValidPasswordAgain,
      },
    ],
  });

  // * 마케팅 수신 동의, 맞춤형 강의
  const [isMarketingAgree, setIsMarketingAgree] = useState(false);
  const [interests, setInterests] = useState<{
    career: string;
    mainJobId: number;
    subJobId: number;
    rankId: number;
    skills: {
      goalLevel: string;
      level: string;
      skill: { depth1stId: number; depth2ndId?: number };
    }[];
  }>({
    rankId: 0,
    career: '',
    mainJobId: 0,
    subJobId: 0,
    skills: [],
  });
  const [isOpenMarketingIntroModal, setOpenMarketingIntroModal] = useState(false);

  // * 이메일/SMS 수신 동의
  const [isMarketingEmailAgree, setIsMarketingEmailAgree] = useState(false);
  const [isMarketingPhoneAgree, setIsMarketingPhoneAgree] = useState(false);
  const [isOpenInterestModal, setOpenInterestModal] = useState(false);

  const [isOpenInvalidMarketingAgreePopup, setOpenInvalidMarketingAgreePopup] = useState(false);

  const isSetInterests =
    interests.career && interests.mainJobId && interests.rankId && interests.subJobId && interests.skills.length > 0;

  const updateUserInfoByNewData = async () => {
    try {
      if (newPassword && !isNewPasswordValid) {
        alert(`비밀번호 수정에서 에러가 발생했습니다. ${PASSWORD_MESSAGES.INVALLID_PASSWORD}`);
        return;
      }

      if (newPassword && !isNewPasswordConfirmed) {
        alert(`비밀번호 수정에서 에러가 발생했습니다. ${PASSWORD_MESSAGES.NOT_CONFIRM_PASSWORD}`);
        return;
      }

      if (isMarketingAgree && !isMarketingEmailAgree && !isMarketingPhoneAgree) {
        setOpenInvalidMarketingAgreePopup(true);
        return;
      }

      await updateUserInfo({
        phone: phoneNumberToSubmit.current || (originalPhoneNumber as string),
        account: {
          originPassword: currentPassword || undefined,
          password: newPassword || undefined,
          marketingAgreeStatus: isMarketingAgree,
          marketingEmailAgreeStatus: isMarketingAgree && isMarketingEmailAgree,
          marketingPhoneAgreeStatus: isMarketingAgree && isMarketingPhoneAgree,
          isInterestsNextTime: isSetInterests ? false : Boolean(userInfo?.account.isInterestsNextTime),
          ...interests,
        },
      });
      setOpenEditPhoneNumber(false);
      setInsertedPhoneNumber('');
      setPhoneCertificationCode('');

      setOpenEditPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
      alert('저장되었습니다.');
    } catch (error) {
      if ((error as HttpClientError).response?.data?.message === 'invalid password') {
        alert('알맞은 현재 비밀번호를 입력해주세요.');
      } else {
        const err = error as Error;
        logger.error('mypage 정보 업데이트 실패', { memberId: userInfo?.member.id }, err);
        alert('업데이트가 실패하였습니다. 잠시후 다시 시도해주세요.');
      }
    }
  };

  const insertValuesByUserInfo = () => {
    if (!ObjectUtil.isEmpty(userInfo)) {
      setIsMarketingAgree(userInfo?.account.marketingAgreeStatus || false);
      setInterests({
        rankId: userInfo?.account.rankId || 0,
        career: userInfo?.account.career || '1',
        mainJobId: userInfo?.account.mainJobId || 0,
        subJobId: userInfo?.account.subJobId || 0,
        skills: userInfo?.account?.skills || [],
      });

      setIsMarketingEmailAgree(userInfo?.account.marketingEmailAgreeStatus || false);
      setIsMarketingPhoneAgree(userInfo?.account.marketingPhoneAgreeStatus || false);
    }
  };

  const resetInfoForm = () => {
    setInsertedPhoneNumber('');
    phoneNumberToSubmit.current = '';
    setOpenEditPhoneNumber(false);
    setPhoneCertificationCode('');

    setOpenEditPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setNewPasswordConfirm('');

    insertValuesByUserInfo();
  };

  const resetInfoFormWithConfim = () => {
    if (!confirm('내 정보 수정을 취소합니다.')) return;

    resetInfoForm();
  };

  useEffect(() => {
    insertValuesByUserInfo();
  }, [userInfo]);

  return (
    <MypageSubPageWrapper title="개인정보 확인/수정">
      <InfoList>
        <li>
          <div className="info-title">이름</div>
          <div className="info-content content-text">{userInfo?.member.extras.name || ''}</div>
        </li>
        <li>
          <div className="info-title">이메일</div>
          <div className="info-content content-text">{userInfo?.member.name || ''}</div>
        </li>
        <li>
          <div className="info-title">휴대폰번호</div>
          <div className="info-content space-between">
            {!openEditPhoneNumber ? (
              <>
                <div className="content">
                  <span className="content-text large">{originalPhoneNumber}</span>
                </div>
                <div className="buttons">
                  <Button
                    theme="outline"
                    size={isLargeViewport ? 'medium' : 'small'}
                    className="form-opener"
                    onClick={() => setOpenEditPhoneNumber(true)}
                  >
                    휴대폰번호 변경
                  </Button>
                </div>
              </>
            ) : (
              <div className="form-content phone">
                <div className="input-wrapper">
                  <Input
                    label="휴대폰 번호 입력/전송 (-없이 입력)"
                    placeholder="예)01012341234"
                    value={insertedPhoneNumber}
                    onChange={(e) => setInsertedPhoneNumber(e.target.value)}
                  />
                  <Button
                    theme="outline"
                    disabled={insertedPhoneNumber.length < 10}
                    size={isLargeViewport ? 'xmedium' : 'large'}
                    onClick={sendPhoneCertification}
                  >
                    인증번호 받기
                  </Button>
                </div>
                <div className="input-wrapper">
                  <Input
                    label="휴대폰 인증하기 (4자리 입력)"
                    placeholder="인증번호"
                    value={phoneCertificationCode}
                    onChange={(e) => setPhoneCertificationCode(e.target.value)}
                  />
                  <Button
                    theme="outline"
                    disabled={!phoneCertificationCode}
                    size={isLargeViewport ? 'xmedium' : 'large'}
                    onClick={verifyPhoneCertificationCode}
                  >
                    확인
                  </Button>
                </div>
              </div>
            )}
          </div>
        </li>
        <li>
          <div className="info-title">비밀번호</div>
          <div className="info-content space-between">
            {!openEditPassword ? (
              <>
                <div className="content content-text large">
                  &#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;
                </div>
                <div className="buttons">
                  <Button
                    theme="outline"
                    size={isLargeViewport ? 'medium' : 'small'}
                    className="form-opener"
                    onClick={() => setOpenEditPassword(true)}
                  >
                    비밀번호 변경
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="form-content password">
                  <div className="input-wrapper">
                    <PasswordInput
                      label="현재 비밀번호 입력"
                      placeholder="현재 비밀번호"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper">
                    <PasswordInput
                      label="새 비밀번호 입력"
                      placeholder="새 비밀번호"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      validation={{
                        isValid: isNewPasswordValid,
                        validationMessage: newPasswordErrorMessage,
                      }}
                    />
                  </div>
                  <div className="input-wrapper">
                    <PasswordInput
                      label={isLargeViewport ? '' : '새 비밀번호 확인'}
                      placeholder="새 비밀번호 확인"
                      value={newPasswordConfirm}
                      onChange={(e) => setNewPasswordConfirm(e.target.value)}
                      validation={{
                        isValid: isNewPasswordConfirmed,
                        validationMessage: newPasswordConfirmErrorMessage,
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </li>
        <li>
          <div className="info-title">직급</div>
          <div className="info-content content-text">{roleNameMap.get(userInfo?.member.extras.rankId) || ''}</div>
        </li>
        <li>
          <div className="info-title">직무</div>
          <div className="info-content content-text">{roleNameMap.get(userInfo?.member.extras.jobId) || ''}</div>
        </li>
        <li>
          <div className="info-title">소속부서/팀</div>
          <div className="info-content content-text">{userInfo?.member.extras.division || ''}</div>
        </li>
        {!isCurrentMemberGroupLoading && !isSkill360MemberGroup && (
          <li className="customer-course">
            <div className="info-title">맞춤형 강의 설정</div>
            <div className="info-content">
              <Button
                theme="primary"
                size={isLargeViewport ? 'medium' : 'small'}
                onClick={() => setOpenInterestModal(true)}
              >
                설정하기
              </Button>
            </div>
          </li>
        )}
        <li>
          <div className="info-title">마케팅 수신 동의</div>
          <div className="info-content">
            <p className="description">
              이용자 맞춤형 서비스와 각종 강의 추천 및 이벤트 알람을 받으시고 혜택을 놓치지 마세요.
              <br />
              <span className="description-link" onClick={() => setOpenMarketingIntroModal(true)}>
                상세 내용 보기
              </span>
            </p>
            <div className="radio-group">
              <FCRadio
                key="marketing-agree"
                label="동의"
                checked={isMarketingAgree}
                name="marketing"
                setValue={() => setIsMarketingAgree(true)}
                value="agree"
              />
              <FCRadio
                key="marketing-disagree"
                label="동의안함"
                checked={!isMarketingAgree}
                name="marketing"
                setValue={() => setIsMarketingAgree(false)}
                value="disagree"
              />
            </div>
          </div>
        </li>
        <li>
          <div className="info-title">이메일/SMS 수신 동의</div>
          <div className="info-content">
            <p className="description">
              * 이메일/SMS 수신 동의를 하시면 다양한 혜택과 이벤트 정보를 받아보실 수 있습니다.
            </p>
            <p className="description">* 수강신청 및 강의 관련 안내 정보는 수신 동의와 상관없이 자동 발송됩니다.</p>
            <div
              className={classNames('radio-group-wrapper', {
                disabled: !isMarketingAgree,
              })}
            >
              <div className="radio-group">
                <span className="radio-group-label">이메일</span>
                <FCRadio
                  key="email-agree"
                  label="수신 동의"
                  checked={isMarketingAgree && isMarketingEmailAgree}
                  disabled={!isMarketingAgree}
                  name="email"
                  setValue={() => setIsMarketingEmailAgree(true)}
                  value="agree"
                />
                <FCRadio
                  key="email-disagree"
                  label="수신 거부"
                  checked={isMarketingAgree && !isMarketingEmailAgree}
                  disabled={!isMarketingAgree}
                  name="email"
                  setValue={() => setIsMarketingEmailAgree(false)}
                  value="disagree"
                />
              </div>
              <div className="radio-group">
                <span className="radio-group-label">SMS</span>
                <FCRadio
                  key="SMS-agree"
                  label="수신 동의"
                  checked={isMarketingAgree && isMarketingPhoneAgree}
                  disabled={!isMarketingAgree}
                  name="SMS"
                  setValue={() => setIsMarketingPhoneAgree(true)}
                  value="agree"
                />
                <FCRadio
                  key="SMS-disagree"
                  label="수신 거부"
                  checked={isMarketingAgree && !isMarketingPhoneAgree}
                  disabled={!isMarketingAgree}
                  name="SMS"
                  setValue={() => setIsMarketingPhoneAgree(false)}
                  value="disagree"
                />
              </div>
            </div>
          </div>
        </li>
      </InfoList>
      <ButtonGroup>
        <Button theme="outline" size={isLargeViewport ? 'xmedium' : 'large'} onClick={resetInfoFormWithConfim}>
          취소
        </Button>
        <Button theme="primary" size={isLargeViewport ? 'xmedium' : 'large'} onClick={updateUserInfoByNewData}>
          저장
        </Button>
      </ButtonGroup>
      {isOpenMarketingIntroModal && (
        <Modal
          title="마케팅 및 광고활용 선택 동의"
          content={<MarketingIntroModal />}
          hasCloseButton
          hasContentHr
          hideCancelButton
          onConfirm={() => setOpenMarketingIntroModal(false)}
          onCloseModal={() => setOpenMarketingIntroModal(false)}
          size="fit"
        />
      )}
      {isOpenInterestModal && (
        <Modal
          title="맞춤형 강의를 추천해드려요!"
          content={
            <InterestsContentLayoutModal
              setInterests={setInterests}
              existingMainJobId={userInfo?.account.mainJobId}
              existingSubJobId={userInfo?.account.subJobId}
              existingCareer={userInfo?.account.career}
              existingSkills={userInfo?.account.skills}
              existingRankId={userInfo?.account.rankId}
            />
          }
          hasCloseButton
          size="fit"
          cancelButtonText="취소"
          confirmButtonText="확인"
          onCloseModal={() => {
            setOpenInterestModal(false);
            setInterests({
              rankId: userInfo?.account.rankId || 0,
              mainJobId: userInfo?.account.mainJobId || 0,
              subJobId: userInfo?.account.subJobId || 0,
              career: userInfo?.account.career || '1',
              skills: userInfo?.account.skills || [],
            });
          }}
          isDisableConfirmButton={!isSetInterests}
          onConfirm={() => setOpenInterestModal(false)}
        />
      )}
      {isOpenInvalidMarketingAgreePopup && (
        <Modal
          title="마케팅 수신 동의 확인"
          content={
            <>
              마케팅 수신 동의시 메일 또는 SMS 최소
              <br />
              한가지는 수신동의 되어야합니다.
            </>
          }
          hideCancelButton
          onConfirm={() => setOpenInvalidMarketingAgreePopup(false)}
        />
      )}
    </MypageSubPageWrapper>
  );
};

export default MyPageInfo;
