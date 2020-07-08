import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StepShareNetwork, GoalShareNetwork } from 'types/goal';

export interface GoalShareRootType {
  stepsShare: StepShareNetwork[];
  goalsShare: GoalShareNetwork[];
}

const initialState: GoalShareRootType = {
  stepsShare: [],
  goalsShare: []
};

const shareSlice = createSlice({
  name: 'goal/share',
  initialState: initialState,
  reducers: {
    readSteps(
      state,
      action: PayloadAction<{ stepsShare: StepShareNetwork[] }>
    ) {
      const { stepsShare } = action.payload;
      state.stepsShare = stepsShare;
    },
    readGoals(
      state,
      action: PayloadAction<{ goalsShare: GoalShareNetwork[] }>
    ) {
      const { goalsShare } = action.payload;
      state.goalsShare = goalsShare;
    },
    shareGoal(
      state,
      action: PayloadAction<{
        goalShares: GoalShareNetwork[];
      }>
    ) {
      const { goalShares } = action.payload;
      const updatedShares = state.goalsShare.concat(goalShares);
      state.goalsShare = updatedShares;
    },
    shareStep(
      state,
      action: PayloadAction<{
        stepShares: StepShareNetwork[];
      }>
    ) {
      const { stepShares } = action.payload;
      const updatedShares = state.stepsShare.concat(stepShares);
      state.stepsShare = updatedShares;
    },
    stopGoalShare(
      state,
      action: PayloadAction<{ goalShares: GoalShareNetwork[] }>
    ) {
      const { goalShares } = action.payload;
      const updatedGoalsShare = state.goalsShare.filter(
        item => !goalShares.some(share => share.GoalId === item.GoalId)
      );
      state.goalsShare = updatedGoalsShare;
    },
    stopStepShare(
      state,
      action: PayloadAction<{ stepShares: StepShareNetwork[] }>
    ) {
      const { stepShares } = action.payload;
      const updatedShare = state.stepsShare.filter(
        item => !stepShares.some(share => share.StepId === item.StepId)
      );
      state.stepsShare = updatedShare;
    }
  }
});

export const {
  shareGoal,
  shareStep,
  stopGoalShare,
  stopStepShare,
  readSteps,
  readGoals
} = shareSlice.actions;
export default shareSlice.reducer;
