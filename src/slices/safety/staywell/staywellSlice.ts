import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from 'types/safety';

export interface StayWellRootType {
  items: Item[];
}

const initialState: StayWellRootType = {
  items: []
};

const staywellSlice = createSlice({
  name: 'safety/staywell',
  initialState: initialState,
  reducers: {
    read(state, action: PayloadAction<{ items: Item[] }>) {
      const { items } = action.payload;
      state.items = items;
    }
  }
});

export const { read } = staywellSlice.actions;
export default staywellSlice.reducer;
