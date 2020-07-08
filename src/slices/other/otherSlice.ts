import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OtherRootType, FocusArea } from 'types/other';

const initialState: OtherRootType = {
  focusAreas: []
};

const otherSlice = createSlice({
  name: 'other',
  initialState: initialState,
  reducers: {
    fetchAllAreas(state, action: PayloadAction<{ areas: FocusArea[] }>) {
      const { areas } = action.payload;
      state.focusAreas = areas;
    }
  }
});

export const { fetchAllAreas } = otherSlice.actions;
export default otherSlice.reducer;
