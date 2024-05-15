import { useState, useEffect } from 'react';

interface ValidationProps {
  formState: string[];
  validationList: ValidationItem[];
}

interface ValidationItem {
  validMessage: string;
  validator: (...args: string[]) => boolean;
}

type ValidationResult = [boolean, string];

export function useValidation({ formState, validationList }: ValidationProps): ValidationResult {
  const [isAllValid, setIsAllValid] = useState(false);
  const [validMessage, setValidMessage] = useState('');

  useEffect(() => {
    const validation = validationList.every((validationItem) => {
      const isValidItem = validationItem.validator(...formState);
      if (isValidItem) {
        setValidMessage('');
      } else {
        setValidMessage(validationItem.validMessage);
      }
      return isValidItem;
    });
    setIsAllValid(validation);
  }, [formState]);

  return [isAllValid, validMessage];
}
