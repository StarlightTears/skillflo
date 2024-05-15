import styled from '@emotion/styled';
import React, { PropsWithChildren, useRef } from 'react';

import type { PropsWithStyle } from '@/types/component.interface';

import { SlideLeft, SlideRight } from '@/components';
import { useSlider } from '@/shared/hooks/useSlider';
import { homeMedia, invisibleScrollBar } from '@/styles/mixins';

interface CardSliderProps {
  cardGap?: number;
  cardLength?: number;
}

const CardSliderBlock = styled.div<{ cardGap: number; currentSlidePosition: number }>`
  display: flex;
  align-items: center;

  .slide-btn {
    flex-shrink: 0;
    width: var(--home-carousel-slide-btn-width-height);
    height: var(--home-carousel-slide-btn-width-height);

    svg {
      cursor: pointer;
    }

    &:hover {
      path {
        fill-opacity: 1;
      }
    }

    ${homeMedia('small', 'medium')} {
      display: none;
    }
  }

  .slide-wrapper {
    overflow: hidden;
    width: 100%;
  }

  .slide {
    display: flex;
    flex-wrap: nowrap;
    gap: ${({ cardGap }) => `${cardGap / 10}rem`};
    transform: ${({ currentSlidePosition }) => `translateX(${currentSlidePosition / 10}rem)`};

    & * {
      flex-shrink: 0;
    }

    ${homeMedia('small', 'medium')} {
      overflow-y: scroll;
      width: 100%;
      ${invisibleScrollBar()}
    }

    ${homeMedia('small')} {
      padding: 0 2rem;
    }

    ${homeMedia('medium')} {
      padding: 0 4rem;
    }

    ${homeMedia('large', 'xlarge')} {
      transition: transform 0.3s ease-out;
    }
  }
`;

const CardSlider = ({
  className,
  cardGap = 16,
  cardLength,
  children,
}: PropsWithStyle<PropsWithChildren<CardSliderProps>>) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const { isFirstSlide, isLastSlide, moveSlider, currentSlidePosition } = useSlider({
    slideRef,
    cardGap,
    cardLength,
  });

  return (
    <CardSliderBlock className={className} cardGap={cardGap} currentSlidePosition={currentSlidePosition}>
      <div className="slide-btn">{!isFirstSlide && <SlideLeft onClick={() => moveSlider('prev')} />}</div>
      <div className="slide-wrapper">
        <div className="slide" ref={slideRef}>
          {children}
        </div>
      </div>
      <div className="slide-btn">{!isLastSlide && <SlideRight onClick={() => moveSlider('next')} />}</div>
    </CardSliderBlock>
  );
};

export default CardSlider;
