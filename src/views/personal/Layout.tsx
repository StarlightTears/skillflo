import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Logo, PersonalInfoContent, PersonalInfoContentTable, RadioGroup } from '@/components';
import { setPersonalInfoAgree } from '@/shared/api/account';
import { useCurrentMemberGroup, useToast } from '@/shared/hooks';
import { useAccountEffect, useInvalidateAccountQuery } from '@/shared/hooks/useAccount';
import { getLogger } from '@/shared/utils/logger';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';
const logger = getLogger('components', 'PersonalInfoLayout');

const PersonalInfoLayoutBlock = styled.section`
  padding: 2.4rem 0 1.6rem;

  ${media('large')} {
    width: 36rem;
    margin: 0 auto;
  }
`;

const PersonalInfoLayoutHeader = styled.div`
  padding: 0 1.6rem;
`;

const PersonalInfoLayoutTitle = styled.h5`
  ${legacyTypographyMixin('headline5')}
  margin-top: 5.4rem;
  margin-bottom: 3.2rem;
  font-weight: 700;
`;

const Hr = styled.div`
  height: 0.8rem;
  margin-top: 3.6rem;
  margin-bottom: 2.4rem;
  background-color: var(--legacy-color-gray-50);
`;

const ReceiveAgreeTitle = styled.h6`
  ${legacyTypographyMixin('body2')}
  margin-top: 1.6rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
`;

const PersonalInfoLayoutFooter = styled.div`
  padding: 3.2rem 1.6rem 0;

  button {
    ${legacyTypographyMixin('body1')}
    font-weight: 700;
  }
`;

const requireAgreeContent = {
  title: '[필수] 개인정보 수집・이용 동의',
  subInfo: '※ 동의를 거부할 권리가 있습니다. 다만, 필수 동의 거부 시 서비스를 이용할 수 없습니다.',
  tableContent: [
    {
      usagePurpose: '이용자 식별 및 본인 확인(본인 인증)',
      collectItem: '이름, 이메일, 휴대폰 번호',
      period: '서비스 탈퇴 및 기업고객 서비스 계약 종료 후 30일까지',
    },
  ],
};

const marketingAgreeContent = {
  title: '[선택] 마케팅 및 광고활용 동의',
  subInfo:
    '※ 패스트캠퍼스가 제공하는 서비스의 이용과 관련하여 마케팅 및 광고활용 동의에 대하여 거부할 권리가 있으며, 마케팅 동의 여부와 관계없이 서비스를 이용할 수 있습니다. \n\n 다만, 동의 거부 시 상기 목적에 명시된 서비스를 받으실 수 없습니다.',
  tableContent: [
    {
      usagePurpose: '이용자 맞춤형 서비스 강의 추천',
      collectItem: '이름, 이메일, 휴대폰번호, 경력, 직무, 직급, 보유 지식, 희망 지식',
    },
    {
      usagePurpose: '고객혜택과 관련한 광고성 정보 제공, 설문조사를 통한 경품 지급',
      collectItem: '이름, 이메일, 휴대폰 번호',
    },
  ],
};

const receiveAgreeContent = {
  title: '수신방법 선택',
  subInfo:
    '* 마케팅 및 광고 활용이용에 동의하신 경우 수신 받을 방법을 선택해주세요. 이메일/SMS 수신 동의를 하시면 다양한 혜택과 이벤트 정보를 받아보실 수 있습니다.\n\n* 수강신청 및 강의 관련 안내 정보는 수신 동의와 상관없이 자동 발송됩니다.',
};

const radioGroup = [
  { label: '동의함', value: 'agree' },
  { label: '동의안함', value: 'disagree' },
];

const receiveAgreeRadioGroup = [
  { label: '수신', value: 'agree' },
  { label: '수신안함', value: 'disagree' },
];

const PersonalInfoLayout = () => {
  useAccountEffect();
  const navigate = useNavigate();
  const { invalidateAccountQuery } = useInvalidateAccountQuery();
  const { isSkill360MemberGroup } = useCurrentMemberGroup();
  const { openToast } = useToast();

  const [requireAgree, setRequireAgree] = useState('');
  const [marketingAgreeStatus, setMarketingAgreeStatus] = useState('');
  const [marketingPhoneAgreeStatus, setMarketingPhoneAgreeStatus] = useState('');
  const [marketingEmailAgreeStatus, setMarketingEmailAgreeStatus] = useState('');

  const savePersonalInfo = async () => {
    // 마케팅 이용 동의시, 수신 동의를 최소 한가지는 선택하여야만 한다.
    if (
      marketingAgreeStatus === 'agree' &&
      marketingPhoneAgreeStatus !== 'agree' &&
      marketingEmailAgreeStatus !== 'agree'
    ) {
      openToast({
        content: '수신방법(문자메세지, 이메일) 중\n한가지 이상에 수신을 체크해주세요.',
      });
      return;
    }
    try {
      await setPersonalInfoAgree({
        marketingAgreeStatus: marketingAgreeStatus === 'agree',
        marketingPhoneAgreeStatus: marketingPhoneAgreeStatus === 'agree',
        marketingEmailAgreeStatus: marketingEmailAgreeStatus === 'agree',
      });
      await invalidateAccountQuery();
      if (isSkill360MemberGroup) {
        navigate('/skills');
        return;
      }
      navigate('/interests');
    } catch (err) {
      const error = err as Error;
      logger.error('fail to save personal info', {}, error);
    }
  };

  return (
    <PersonalInfoLayoutBlock>
      <PersonalInfoLayoutHeader>
        <Logo />
        <PersonalInfoLayoutTitle>개인정보 수집•이용 동의</PersonalInfoLayoutTitle>
      </PersonalInfoLayoutHeader>
      <PersonalInfoContent title={requireAgreeContent.title} subInfo={requireAgreeContent.subInfo}>
        <PersonalInfoContentTable tableContent={requireAgreeContent.tableContent}></PersonalInfoContentTable>
        <RadioGroup
          radioGroup={radioGroup}
          name="require-agree"
          selectedValue={requireAgree}
          setValue={(value) => {
            if (value === 'disagree') {
              alert('개인정보 미동의시 서비스를 이용할 수 없습니다.');
            }
            setRequireAgree(value);
          }}
          data-e2e="require-agree"
        />
      </PersonalInfoContent>
      <Hr />
      <PersonalInfoContent title={marketingAgreeContent.title} subInfo={marketingAgreeContent.subInfo}>
        <PersonalInfoContentTable tableContent={marketingAgreeContent.tableContent}></PersonalInfoContentTable>
        <RadioGroup
          radioGroup={radioGroup}
          name="marketing-agree"
          selectedValue={marketingAgreeStatus}
          setValue={(value) => {
            setMarketingAgreeStatus(value);
            if (value === 'disagree') {
              setMarketingPhoneAgreeStatus('');
              setMarketingEmailAgreeStatus('');
            }
          }}
          data-e2e="marketing-agree"
        />
      </PersonalInfoContent>
      <Hr />
      <PersonalInfoContent
        title={receiveAgreeContent.title}
        subInfo={receiveAgreeContent.subInfo}
        disabled={marketingAgreeStatus !== 'agree'}
      >
        <ReceiveAgreeTitle>문자메세지 수신 (선택)</ReceiveAgreeTitle>
        <RadioGroup
          radioGroup={receiveAgreeRadioGroup}
          name="text-message-agree"
          selectedValue={marketingPhoneAgreeStatus}
          setValue={(value) => {
            if (marketingAgreeStatus !== 'agree') return;
            setMarketingPhoneAgreeStatus(value);
          }}
          disabled={marketingAgreeStatus !== 'agree'}
          data-e2e="sns-agree"
        />
        <ReceiveAgreeTitle>이메일 수신 (선택)</ReceiveAgreeTitle>
        <RadioGroup
          radioGroup={receiveAgreeRadioGroup}
          name="email-message-agree"
          selectedValue={marketingEmailAgreeStatus}
          setValue={(value) => {
            if (marketingAgreeStatus !== 'agree') return;
            setMarketingEmailAgreeStatus(value);
          }}
          disabled={marketingAgreeStatus !== 'agree'}
          data-e2e="email-agree"
        />
      </PersonalInfoContent>
      <PersonalInfoLayoutFooter>
        <Button
          theme="primary"
          size="large"
          disabled={requireAgree !== 'agree'}
          data-e2e="personal-info-save"
          onClick={savePersonalInfo}
        >
          저장
        </Button>
      </PersonalInfoLayoutFooter>
    </PersonalInfoLayoutBlock>
  );
};

export default PersonalInfoLayout;
