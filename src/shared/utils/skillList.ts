import { SKILL_CATEGORY } from '@/types/skill360.interface';
import { Skill, SkillCompletion } from '@/types/skill360.interface';

const sortSkillsByCompletionStatus = (skills: Skill[], skillCompletions: SkillCompletion[]) => {
  const skillsWithEarnedAt = skills.filter((skill) =>
    skillCompletions.find((completion) => completion.skillId === skill.id)
  );
  const skillsWithoutEarnedAt = skills.filter(
    (skill) => !skillCompletions.find((completion) => completion.skillId === skill.id)
  );

  return [...skillsWithEarnedAt, ...skillsWithoutEarnedAt];
};

const sortSkillsByCompletionStatusReverse = (skills: Skill[], skillCompletions: SkillCompletion[]) => {
  const skillsWithEarnedAt = skills.filter((skill) =>
    skillCompletions.find((completion) => completion.skillId === skill.id)
  );
  const skillsWithoutEarnedAt = skills.filter(
    (skill) => !skillCompletions.find((completion) => completion.skillId === skill.id)
  );

  return [...skillsWithoutEarnedAt, ...skillsWithEarnedAt];
};

const typeOrder: Record<SKILL_CATEGORY, number> = {
  TECHNICAL: 1,
  WORKPLACE: 2,
  DX_ESSENTIAL: 3,
};

export const compareSkillType = (a: SKILL_CATEGORY, b: SKILL_CATEGORY) => {
  return typeOrder[a] - typeOrder[b];
};

export const compareSkillTitle = (a: string, b: string) => {
  return a.localeCompare(b);
};

export const sortSkillsByTitleAndType = (skills: Skill[]) => {
  return skills.toSorted((a, b) => {
    const typeComparison = compareSkillType(a.type, b.type);
    return typeComparison === 0 ? compareSkillTitle(a.name, b.name) : typeComparison;
  });
};

export const sortSkills = (skills: Skill[], skillCompletions: SkillCompletion[]) => {
  const sortedSkillsByTitleAndType = sortSkillsByTitleAndType(skills);
  return sortSkillsByCompletionStatus(sortedSkillsByTitleAndType, skillCompletions);
};

export const sortCoreSkills = (skills: Skill[], skillCompletions: SkillCompletion[]) => {
  const sortedSkillsByTitleAndType = sortSkillsByTitleAndType(skills);
  return sortSkillsByCompletionStatusReverse(sortedSkillsByTitleAndType, skillCompletions);
};

export const getUncompletedSkills = (skills: Skill[], skillCompletions: SkillCompletion[]) => {
  return skills.filter((skill) => !skillCompletions.find((completion) => completion.skillId === skill.id));
};

export const getCompletedSkills = (skills: Skill[], skillCompletions: SkillCompletion[]) => {
  return skills.filter((skill) => skillCompletions.find((completion) => completion.skillId === skill.id));
};
