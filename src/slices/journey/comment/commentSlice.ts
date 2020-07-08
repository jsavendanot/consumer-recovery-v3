import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JournalComment } from 'types/journey';

export interface JourneyCommentRootType {
  comments: JournalComment[];
}

const initialState: JourneyCommentRootType = {
  comments: []
};

const commentSlice = createSlice({
  name: 'journey/comment',
  initialState: initialState,
  reducers: {
    read(state, action: PayloadAction<{ comments: JournalComment[] }>) {
      const { comments } = action.payload;
      state.comments = comments;
    }
  }
});

export const { read } = commentSlice.actions;
export default commentSlice.reducer;
