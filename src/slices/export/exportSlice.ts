import { createSlice } from '@reduxjs/toolkit';
import { ExportRootType } from 'types/export';

const initialState: ExportRootType = {
  loading: false
};

const exportSlice = createSlice({
  name: 'export',
  initialState: initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const { startLoading, stopLoading } = exportSlice.actions;
export default exportSlice.reducer;
