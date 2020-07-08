import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SuggestionRootType,
  NotificationSetting,
  AccountSetting
} from 'types/settings';

const initialState: SuggestionRootType = {
  notifSettings: [],
  loading: false,
  accountSettings: {} as AccountSetting
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    readNotifSettings(
      state,
      action: PayloadAction<{ notifSettings: NotificationSetting[] }>
    ) {
      const { notifSettings } = action.payload;
      state.notifSettings = notifSettings;
    },
    readAccountSettings(
      state,
      action: PayloadAction<{ accountSettings: AccountSetting }>
    ) {
      const { accountSettings } = action.payload;
      state.accountSettings = accountSettings;
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
  readNotifSettings,
  readAccountSettings,
  startLoading,
  stopLoading
} = settingsSlice.actions;
export default settingsSlice.reducer;
