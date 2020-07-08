import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { SafetyRootType } from 'types/safety';
import staywellReducer from './staywell/staywellSlice';
import stressReducer from './stress/stressSlice';
import warningReducer from './warning/warningSlice';
import unwellReducer from './unwell/unwellSlice';
import supportReducer from './support/supportSlice';
import { ShareNetworkApi } from 'types/network';

const initialState: SafetyRootType = {
  shareList: [],
  loading: false
};

const safetySlice = createSlice({
  name: 'safety',
  initialState: initialState,
  reducers: {
    readShareList(
      state,
      action: PayloadAction<{ shareList: ShareNetworkApi[] }>
    ) {
      const { shareList } = action.payload;
      state.shareList = shareList;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const { startLoading, stopLoading, readShareList } = safetySlice.actions;

const safetyCombinedRootReducer = combineReducers({
  safety: safetySlice.reducer,
  staywell: staywellReducer,
  stress: stressReducer,
  warning: warningReducer,
  unwell: unwellReducer,
  support: supportReducer
});

export default safetyCombinedRootReducer;
