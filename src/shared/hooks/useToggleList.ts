import { Dispatch, SetStateAction, useState } from 'react';

export const useToggleList = <T>(initialValues: T[] = []): [T[], (value: T) => void, Dispatch<SetStateAction<T[]>>] => {
  const [list, setTogglelist] = useState(initialValues);
  const toggle = (checkValue: T) => {
    setTogglelist((prevToggleList) =>
      prevToggleList.includes(checkValue)
        ? prevToggleList.filter((value) => value !== checkValue)
        : [...prevToggleList, checkValue]
    );
  };

  return [list, toggle, setTogglelist];
};
