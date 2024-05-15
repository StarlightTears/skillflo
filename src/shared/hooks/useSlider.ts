import { useEffect, useState, RefObject, useCallback } from 'react';

interface SliderHookProps {
  slideRef?: RefObject<HTMLElement>;
  cardGap?: number;
  cardLength?: number;
}

const getSlidePosition = ({
  direction,
  slideEl,
  cardGap,
  prevPosition,
}: {
  direction: 'prev' | 'next';
  slideEl: HTMLElement;
  cardGap: number;
  prevPosition: number;
}) => {
  const slideWidth = slideEl.clientWidth;
  const slideScrollWidth = slideEl.scrollWidth;

  let movePosition = 0;
  let isFirstSlide = false;
  let isLastSlide = false;

  if (direction === 'next') {
    const nextSlideWidth = slideScrollWidth - Math.abs(prevPosition) - slideWidth - cardGap;

    if (nextSlideWidth > slideWidth) {
      isLastSlide = false;
      movePosition = -(slideWidth + cardGap);
    } else {
      isLastSlide = true;
      movePosition = -(nextSlideWidth + cardGap);
    }
  }

  if (direction === 'prev') {
    const prevSlideWidth = Math.abs(prevPosition) - cardGap;

    if (prevSlideWidth > slideWidth) {
      isFirstSlide = false;
      movePosition = slideWidth + cardGap;
    } else {
      isFirstSlide = true;
      movePosition = prevSlideWidth + cardGap;
    }
  }

  return { isFirstSlide, isLastSlide, movePosition };
};

export const useSlider = ({ slideRef, cardGap = 0, cardLength }: SliderHookProps) => {
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(true);
  const [currentSlidePosition, setCurrentSlidePosition] = useState(0);

  const moveSlider = useCallback(
    (direction: 'prev' | 'next') => {
      if (!slideRef || !slideRef.current) return;

      const slideEl = slideRef.current;
      setCurrentSlidePosition((prevPosition) => {
        const { isFirstSlide, isLastSlide, movePosition } = getSlidePosition({
          direction,
          slideEl,
          cardGap,
          prevPosition,
        });
        setIsFirstSlide(isFirstSlide);
        setIsLastSlide(isLastSlide);
        return prevPosition + movePosition;
      });
    },
    [slideRef]
  );

  useEffect(() => {
    if (!slideRef || !slideRef.current) return;

    setIsLastSlide(slideRef.current.scrollWidth <= slideRef.current.clientWidth);
  }, [slideRef, cardLength]);

  return { isFirstSlide, isLastSlide, moveSlider, currentSlidePosition };
};
