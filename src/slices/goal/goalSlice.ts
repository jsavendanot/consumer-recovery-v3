import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { GoalRootType, GoalCompletion, Goal } from 'types/goal';
import goalShareReducer from './share/shareSlice';
import goalCommentReducer from './comment/commentSlice';
import goalStepReducer from './step/stepSlice';

const initialState: GoalRootType = {
  goals: [],
  completionRate: [],
  loading: false
};

const goalSlice = createSlice({
  name: 'goal',
  initialState: initialState,
  reducers: {
    read(state, action: PayloadAction<{ goals: Goal[] }>) {
      const { goals } = action.payload;
      state.goals = goals;
    },
    update(state, action: PayloadAction<{ updatedGoal: Goal }>) {
      const { updatedGoal } = action.payload;
      const goals = state.goals.map(goal => {
        if (goal.Id === updatedGoal.Id) return updatedGoal;
        else return goal;
      });
      state.goals = goals;
    },
    progress(
      state,
      action: PayloadAction<{ goalsCompletion: GoalCompletion[] }>
    ) {
      const { goalsCompletion } = action.payload;
      state.completionRate = goalsCompletion;
    },
    remove(state, action: PayloadAction<{ goalId: string }>) {
      const { goalId } = action.payload;
      const updatedGoals = state.goals.filter(item => item.Id !== goalId);
      state.goals = updatedGoals;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const {
  read,
  progress,
  startLoading,
  stopLoading,
  remove,
  update
} = goalSlice.actions;

const goalCombinedRootReducer = combineReducers({
  goal: goalSlice.reducer,
  goalShare: goalShareReducer,
  goalComment: goalCommentReducer,
  goalStep: goalStepReducer
});

export default goalCombinedRootReducer;
