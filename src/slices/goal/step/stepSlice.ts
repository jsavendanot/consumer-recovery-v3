import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Step } from 'types/goal';

export interface GoalStepRootType {
  steps: Step[];
}

const initialState: GoalStepRootType = {
  steps: []
};

const stepSlice = createSlice({
  name: 'goal/step',
  initialState: initialState,
  reducers: {
    read(state, action: PayloadAction<{ steps: Step[] }>) {
      const { steps } = action.payload;
      state.steps = steps;
    },
    update(state, action: PayloadAction<{ updatedSteps: Step[] }>) {
      const { updatedSteps } = action.payload;
      const totalUpdatedSteps = state.steps.map(step => {
        const element = updatedSteps.find(item => item.Id === step.Id);
        if (element) {
          return element;
        } else {
          return step;
        }
      });
      state.steps = totalUpdatedSteps;
    }
  }
});

export const { read, update } = stepSlice.actions;
export default stepSlice.reducer;
