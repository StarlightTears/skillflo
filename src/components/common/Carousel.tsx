import styled from '@emotion/styled';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { SlidePause, SlidePlay, SlideLeft, SlideRight } from '..';

import PaginationBar from './PaginationBar';

import type { PropsWithStyle } from '@/types/component.interface';

import { CAROUSEL_AUTO_PLAY_INTERVAL } from '@/shared/policy';
import { openLink } from '@/shared/utils/link';
import { homeMedia } from '@/styles/mixins';

interface CarouselProps {
  imageList: {
    url: string;
    name: string;
    type: string;
    redirectUrl: string;
  }[];
}

const CarouselBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .disable {
    visibility: hidden;
  }

  .slide-btn {
    position: absolute;
    z-index: var(--z-carousel-slide-btn);
    cursor: pointer;

    &:last-child {
      right: 0;
    }

    ${homeMedia('large', 'xlarge')} {
      position: static;
    }
  }

  &:hover {
    .slide-btn {
      path {
        fill-opacity: 1;
      }
    }

    .slide-controller {
      background: linear-gradient(180deg, rgba(20 20 20 / 0%) 0%, rgba(20 20 20 / 60%) 100%);
    }
  }
`;

const CarouselSlide = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
  height: calc(100vw * (10 / 9));

  ${homeMedia('medium')} {
    height: calc(100vw * (3 / 7));
  }

  ${homeMedia('large', 'xlarge')} {
    width: var(--home-carousel-slide-xlarge-width);
    height: var(--home-carousel-slide-xlarge-height);
    border-radius: 1.2rem;
  }
`;

const CarouselSlideImageList = styled.ul<{ currentSlideIndex: number }>`
  display: flex;
  flex-flow: column wrap;

  transition: transform 0.3s ease-out;
  ${({ currentSlideIndex }) => `transform: translate(calc(-100% * ${currentSlideIndex}))`};

  li {
    width: 100%;

    img {
      cursor: pointer;
    }
  }
`;

const CarouselSlideController = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 1.2rem;
  padding-left: 6rem;

  svg {
    margin: 1.2rem;
  }

  ${homeMedia('small')} {
    padding-right: 0.8rem;
    padding-left: 3.2rem;
  }
`;

const Carousel = ({ className, imageList }: PropsWithStyle<CarouselProps>) => {
  const disableSlide = imageList.length <= 1;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const autoPlayInterval = useRef<null | ReturnType<typeof setInterval>>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(!disableSlide);
  const LAST_SLIDE_INDEX = imageList.length - 1;

  const moveSlide = (direction: 'prev' | 'next', isCallByInterval?: boolean) => {
    if (autoPlayInterval.current && !isCallByInterval) {
      clearAutoPlay();
      setAutoPlay();
    }

    setCurrentSlideIndex((currentSlideIndex) => {
      if (direction === 'prev') {
        return currentSlideIndex === 0 ? LAST_SLIDE_INDEX : currentSlideIndex - 1;
      }
      return currentSlideIndex === LAST_SLIDE_INDEX ? 0 : currentSlideIndex + 1;
    });
  };

  const setAutoPlay = () => {
    if (autoPlayInterval.current) return;

    autoPlayInterval.current = setInterval(() => {
      moveSlide('next', true);
    }, CAROUSEL_AUTO_PLAY_INTERVAL);

    setIsAutoPlay(true);
  };

  const clearAutoPlay = () => {
    if (!autoPlayInterval.current) return;

    clearInterval(autoPlayInterval.current);
    autoPlayInterval.current = null;

    setIsAutoPlay(false);
  };

  useEffect(() => {
    if (!imageList.length || autoPlayInterval.current || !isAutoPlay) return;

    setAutoPlay();
  }, [imageList]);

  return (
    <CarouselBlock className={className}>
      <SlideLeft className={classNames(['slide-btn', { disable: disableSlide }])} onClick={() => moveSlide('prev')} />
      <CarouselSlide>
        <CarouselSlideImageList currentSlideIndex={currentSlideIndex}>
          {imageList.map((image, index) => {
            return (
              <li key={`${index}-${image.name}`}>
                <img
                  src={image.url}
                  alt={image.name}
                  width="100%"
                  height="100%"
                  onClick={() => openLink(image.redirectUrl)}
                />
              </li>
            );
          })}
        </CarouselSlideImageList>
        <CarouselSlideController className={classNames(['slide-controller', { disable: disableSlide }])}>
          <PaginationBar barLength={imageList.length} selectedBarIndex={currentSlideIndex} />
          {isAutoPlay ? <SlidePause onClick={clearAutoPlay} /> : <SlidePlay onClick={setAutoPlay} />}
        </CarouselSlideController>
      </CarouselSlide>
      <SlideRight className={classNames(['slide-btn', { disable: disableSlide }])} onClick={() => moveSlide('next')} />
    </CarouselBlock>
  );
};

export default Carousel;
