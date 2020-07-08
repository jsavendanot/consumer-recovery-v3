import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from 'types/safety';

export interface StressRootType {
  items: Item[];
}

const initialState: StressRootType = {
  items: []
};

const stressSlice = createSlice({
  name: 'safety/stress',
  initialState: initialState,
  reducers: {
    read(state, action: PayloadAction<{ items: Item[] }>) {
      const { items } = action.payload;
      state.items = items;
    }
  }
});

export const { read } = stressSlice.actions;
export default stressSlice.reducer;
