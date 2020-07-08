import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationItem, NotificationRootType } from 'types/notification';

const initialState: NotificationRootType = {
  notifications: [],
  loading: false
};

const notificationsSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    readNotifications(
      state,
      action: PayloadAction<{ notifications: NotificationItem[] }>
    ) {
      const { notifications } = action.payload;
      state.notifications = notifications;
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
  readNotifications,
  startLoading,
  stopLoading
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
