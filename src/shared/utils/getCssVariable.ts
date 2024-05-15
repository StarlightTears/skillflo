export const getCssVariable = (varName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName);
};
