import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'reducer';

export const makePercentageCompletionSelector = () =>
  createSelector(
    (state: RootState) => state.goalRoot.goal.completionRate,
    (_: any, goalId: string) => goalId,
    (completionRates, goalId) => {
      const selectedItem = completionRates.find(item => item.GoalId === goalId);
      if (selectedItem) {
        return selectedItem.PercentageCompletion;
      } else {
        return null;
      }
    }
  );

export const makeStepsSelector = () =>
  createSelector(
    (state: RootState) => state.goalRoot.goalStep.steps,
    (_: any, goalId: string) => goalId,
    (steps, goalId) => steps.filter(item => item.GoalId === goalId)
  );
