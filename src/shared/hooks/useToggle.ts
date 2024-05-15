import { Dispatch, SetStateAction, useState } from 'react';

export const useToggle = (initialValue = false): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [state, setState] = useState(initialValue);

  const toggle = () => setState(!state);

  return [state, toggle, setState];
};
