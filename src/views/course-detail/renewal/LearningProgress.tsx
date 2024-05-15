import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { Badge } from '@/components';
import { homeMedia, typographyMixin } from '@/styles/mixins';

interface LearningProgressProps {
  title?: string;
  label?: string;
  currentMemberScore: number;
  criteriaForCompletion: number;
  isEnrollmentApplying: boolean;
  isExpiredCourseEndedAt: boolean;
  isWeekBeforeCourseEndedAt: boolean;
  examTaskTotalLength?: number;
  examTaskCompletionLength?: number;
  usePercentUnit?: boolean;
  isExam?: boolean;
}

type LearningProgressTheme = 'none' | 'normal' | 'completion' | 'warning' | 'expire';

const ThemeStyleMap = new Map<LearningProgressTheme, SerializedStyles>();

ThemeStyleMap.set(
  'none',
  css`
    .member-score {
      color: var(--color-gray-600);
    }

    .goal {
      border: 0.2rem solid var(--color-primary-700);
    }

    .percent {
      background-color: var(--color-gray-100);
    }
  `
);
ThemeStyleMap.set(
  'normal',
  css`
    .member-score {
      color: var(--color-primary-700);
    }

    .goal {
      border: 0.2rem solid var(--color-primary-700);
    }

    .percent {
      background-color: var(--color-primary-700);
    }
  `
);
ThemeStyleMap.set(
  'completion',
  css`
    .member-score {
      color: var(--color-semantic-green);
    }

    .goal {
      border: 0.2rem solid var(--color-semantic-green);
    }

    .percent {
      background-color: var(--color-semantic-green);
    }
  `
);
ThemeStyleMap.set(
  'warning',
  css`
    .member-score {
      color: var(--color-semantic-red);
    }

    .goal {
      border: 0.2rem solid var(--color-semantic-red);
    }

    .percent {
      background-color: var(--color-semantic-red);
    }
  `
);
ThemeStyleMap.set(
  'expire',
  css`
    .member-score {
      color: var(--color-gray-300);
    }

    .goal {
      border: 0.2rem solid var(--color-gray-300);
    }

    .percent {
      background-color: var(--color-gray-300);
    }
  `
);

const LearningProgressBlock = styled.div<{
  theme: LearningProgressTheme;
  criteriaForCompletion: number;
  currentMemberScore: number;
}>`
  display: flex;
  height: 10rem;

  .info {
    display: flex;
    flex: 4.9rem 0 0;
    flex-direction: column;
    margin-right: 0.4rem;
    color: var(--color-gray-600);

    .title {
      margin-bottom: 1.2rem;
      ${typographyMixin('p2', 'bold')};
    }

    .label {
      ${typographyMixin('p3')};
    }

    .member-score {
      ${typographyMixin('h6')};
    }
  }

  .state {
    flex: 5.6rem 0 0;

    .badge {
      margin-top: 5.4rem;
    }

    ${homeMedia('large', 'xlarge')} {
      margin-right: 0.8rem;
    }
  }

  .progress {
    display: flex;
    flex: 1 0 0;

    .progress-bar {
      width: 100%;

      .bar {
        position: relative;
        width: 100%;
        height: 0.8rem;
        margin-top: 6.2rem;
        border-radius: 0.4rem;
        background-color: var(--color-gray-100);

        .goal {
          position: absolute;
          top: -0.2rem;
          left: ${({ criteriaForCompletion }) => `${criteriaForCompletion}%`};
          display: flex;
          justify-content: center;
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 0.6rem;
          background-color: var(--color-white);

          .float {
            position: absolute;
            top: -5rem;
            width: 4.2rem;

            span {
              display: flex;
              justify-content: center;
            }

            .label {
              color: var(--color-gray-600);
              ${typographyMixin('p3')};
            }

            .completion-criteria {
              ${typographyMixin('p2')};
            }
          }
        }

        .percent {
          width: ${({ currentMemberScore }) => `${currentMemberScore}%`};
          height: 100%;
          border-radius: 0.4rem;
        }
      }

      .exam-task-solved {
        margin-top: 1.4rem;
        color: var(--color-gray-400);
        ${typographyMixin('p3')};
      }
    }

    .total-score {
      display: flex;
      flex: 4rem 0 0;
      justify-content: center;
      margin-left: 0.4rem;
      padding-top: 5.4rem;
      color: var(--color-gray-500);
      ${typographyMixin('p2')};
      ${homeMedia('large', 'xlarge')} {
        margin-left: 1.6rem;
      }
    }
  }

  ${({ theme }) => ThemeStyleMap.get(theme)};
`;

const LearningProgress = ({
  title,
  label,
  currentMemberScore,
  criteriaForCompletion,
  isEnrollmentApplying,
  isExpiredCourseEndedAt,
  isWeekBeforeCourseEndedAt,
  examTaskTotalLength,
  examTaskCompletionLength,
  usePercentUnit,
  isExam,
}: LearningProgressProps) => {
  const getThemeByState = (): LearningProgressTheme => {
    const isCompletion = currentMemberScore >= criteriaForCompletion;
    if (isEnrollmentApplying) return 'none';
    if (isCompletion) return 'completion';
    if (isWeekBeforeCourseEndedAt) return 'warning';
    if (isExpiredCourseEndedAt) return 'expire';
    if (!currentMemberScore) return 'none';
    return 'normal';
  };
  const theme = getThemeByState();

  return (
    <LearningProgressBlock
      theme={theme}
      criteriaForCompletion={criteriaForCompletion}
      currentMemberScore={currentMemberScore}
    >
      <div className="info">
        <h6 className="title">{title}</h6>
        <span className="label">{label}</span>
        <span className="member-score">
          {currentMemberScore}
          {usePercentUnit ? '%' : '점'}
        </span>
      </div>
      <div className="state">
        <Badge className="badge" theme={theme === 'completion' ? 'lightgreen' : 'gray'} size="medium" colorScale={500}>
          {theme === 'completion' ? '수료' : '수료 전'}
        </Badge>
      </div>
      <div className="progress">
        <div className="progress-bar">
          <div className="bar">
            <div className="percent" />
            <div className="goal">
              <div className="float">
                <span className="label">수료기준</span>
                <span className="completion-criteria">
                  {criteriaForCompletion}
                  {usePercentUnit ? '%' : '점'}
                </span>
              </div>
            </div>
          </div>
          {examTaskTotalLength && examTaskTotalLength > 0 ? (
            <p className="exam-task-solved">
              {examTaskCompletionLength}건 {isExam ? '응시' : '제출'} / 총 {examTaskTotalLength}건
            </p>
          ) : null}
        </div>
        <div className="total-score">100{usePercentUnit ? '%' : '점'}</div>
      </div>
    </LearningProgressBlock>
  );
};

export default LearningProgress;
