import { INFORMATIVE_COLOR_PLATTE } from '../policy';

import type { Skill360ColorTheme } from '@/types/skill360.interface';

export const getSkillGapLevel = (userLevel: number, standardLevel: number) => {
  return {
    result: userLevel - standardLevel,
    gapLevel: Math.abs(userLevel - standardLevel),
  };
};

type SkillGapType = 'standard' | 'high' | 'low';

export const getSkillGapType = (userLevel: number, standardLevel: number): SkillGapType => {
  const skillGap = getSkillGapLevel(userLevel, standardLevel).result;
  return skillGap > 0 ? 'high' : skillGap < 0 ? 'low' : 'standard';
};

export const getSkillGapColor = (
  userLevel: number,
  standardLevel: number
): { key: Skill360ColorTheme; code: string } => {
  const skillGapType = getSkillGapType(userLevel, standardLevel);
  switch (skillGapType) {
    case 'high':
      return { key: 'success', code: INFORMATIVE_COLOR_PLATTE.success };
    case 'low':
      return { key: 'alert', code: INFORMATIVE_COLOR_PLATTE.alert };
    case 'standard':
      return { key: 'accent', code: INFORMATIVE_COLOR_PLATTE.accent };
    default:
      return { key: 'gray', code: INFORMATIVE_COLOR_PLATTE.gray };
  }
};

export const getSkillGap = (userLevel: number, standardLevel: number) => {
  const { result, gapLevel } = getSkillGapLevel(userLevel, standardLevel);
  const gapType = getSkillGapType(userLevel, standardLevel);
  const { key: colorKey, code: colorCode } = getSkillGapColor(userLevel, standardLevel);

  return { result, gapLevel, gapType, colorKey, colorCode };
};
