import React, { useState, useEffect, useRef, RefObject, SetStateAction } from 'react';

export function useCloseClickOutside<T extends HTMLElement>(): [
  RefObject<T>,
  boolean,
  React.Dispatch<SetStateAction<boolean>>,
] {
  const [isOpenElement, setIsOpenElement] = useState(false);

  const ref = useRef<T>(null);

  const closeElement = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpenElement(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', closeElement);

    return function removeCloseElementListener() {
      window.removeEventListener('mousedown', closeElement);
    };
  }, []);

  return [ref, isOpenElement, setIsOpenElement];
}
