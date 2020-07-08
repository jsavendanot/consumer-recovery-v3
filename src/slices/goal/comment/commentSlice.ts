import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoalComment } from 'types/goal';

export interface GoalCommentRootType {
  comments: GoalComment[];
}

const initialState: GoalCommentRootType = {
  comments: []
};

const commentSlice = createSlice({
  name: 'goal/comment',
  initialState: initialState,
  reducers: {
    read(state, action: PayloadAction<{ comments: GoalComment[] }>) {
      const { comments } = action.payload;
      state.comments = comments;
    }
  }
});

export const { read } = commentSlice.actions;
export default commentSlice.reducer;
