import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Unwell } from 'types/safety';

export interface UnwellRootType {
  pleaseDo: Unwell[];
  doNotDo: Unwell[];
}

const initialState: UnwellRootType = {
  pleaseDo: [],
  doNotDo: []
};

const unwellSlice = createSlice({
  name: 'safety/unwell',
  initialState: initialState,
  reducers: {
    fetchUnwellHappen(state, action: PayloadAction<{ values: Unwell[] }>) {
      const { values } = action.payload;
      state.pleaseDo = values;
    },
    fetchUnwellNotHappen(state, action: PayloadAction<{ values: Unwell[] }>) {
      const { values } = action.payload;
      state.doNotDo = values;
    }
  }
});

export const { fetchUnwellHappen, fetchUnwellNotHappen } = unwellSlice.actions;
export default unwellSlice.reducer;
