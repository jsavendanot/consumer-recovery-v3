import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from 'types/safety';

export interface WarningRootType {
  difficulties: Item[];
  strategies: Item[];
}

const initialState: WarningRootType = {
  difficulties: [],
  strategies: []
};

const warningSlice = createSlice({
  name: 'safety/warning',
  initialState: initialState,
  reducers: {
    readDiff(state, action: PayloadAction<{ items: Item[] }>) {
      const { items } = action.payload;
      state.difficulties = items;
    },
    readStr(state, action: PayloadAction<{ items: Item[] }>) {
      const { items } = action.payload;
      state.strategies = items;
    }
  }
});

export const { readDiff, readStr } = warningSlice.actions;
export default warningSlice.reducer;
