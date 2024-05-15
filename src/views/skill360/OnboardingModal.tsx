import styled from '@emotion/styled';
import React from 'react';

import onboardingImage from '@/assets/images/skill360-onboarding.jpg';
import { ColumnChart, Portal, SectionMessage, Stair } from '@/components';
import Button from '@/components/common-renewal/Button';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const OnboardingModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;

  .dim {
    width: 100vw;
    height: 100vh;
    background-color: var(--color-gray-900);
    opacity: 0.8;
  }
`;

const Modal = styled.div`
  position: absolute;
  z-index: var(--z-modal);
  overflow: hidden;
  max-width: 56rem;
  border-radius: 0.6rem;
  background-color: #fff;
  text-align: center;

  .image-container {
    width: 56rem;
    height: 35rem;
    background: url(${onboardingImage}) no-repeat;
    background-size: cover;
  }

  .bottom-container {
    padding: 3.2rem 4rem 4rem;

    h2 {
      margin: 0 0 0.2rem;
      ${renewalTypographyMixin('title', 2)}
    }

    p {
      margin: 0 0 1.6rem;
      color: var(--color-semantic-informative-primary-low);
      ${renewalTypographyMixin('body', 3)};
    }

    .section-message {
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;
      gap: 0.8rem;
      align-items: center;
      justify-content: center;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 4rem;
      margin: 3.2rem 0 0;
      padding: 0 1rem;
      border: none;
      border-radius: 0.4rem;
      background-color: var(--color-semantic-informative-accent);
      color: var(--color-semantic-informative-label);
      cursor: pointer;
      ${renewalTypographyMixin('label', 3, true)};
    }
  }
`;

interface OnboardingModalProps {
  startClickHandler: () => void;
}

const OnboardingModal = ({ startClickHandler }: OnboardingModalProps) => {
  return (
    <Portal>
      <OnboardingModalWrapper>
        <Modal>
          <div className="image-container"></div>
          <div className="bottom-container">
            <h2>Skill Match</h2>
            <p>
              전문 연구진이 체계적으로 설계한 표준 스킬 DB를 토대로
              <br /> 개인의 스킬을 객관적으로 진단/분석해 드립니다.
            </p>
            <div className="section-message">
              <SectionMessage prefixIcon={<ColumnChart />} description={'직무 핵심 스킬별 나의 현재 위치 확인'} />
              <SectionMessage prefixIcon={<Stair />} description={'나만의 강점과 성장 기회 확인'} />
            </div>
            <Button onClick={startClickHandler} theme={'primary'} size={'medium'}>
              진단 시작
            </Button>
          </div>
        </Modal>
        <div className="dim"></div>
      </OnboardingModalWrapper>
    </Portal>
  );
};

export default OnboardingModal;
