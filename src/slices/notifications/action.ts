import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import {
  readNotifications,
  startLoading,
  stopLoading
} from './notificationsSlice';
import { NotificationItem } from 'types/notification';

//** ASYNC FUNCS */

export const fetchNotifications = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const notifications = await callNotificationReadApi();
    const pinnedNotifs = notifications.filter(item => item.IsPinned);
    const unreadNotifs = notifications.filter(item => !item.IsPinned);

    dispatch(
      readNotifications({
        notifications: pinnedNotifs.concat(unreadNotifs)
      })
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const deleteNotification = (id: string): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await callNotificationDeleteApi(id);
    dispatch(fetchNotifications());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const markAsReadNotification = (
  id: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await callNotificationMarkAsReadApi(id);
    dispatch(fetchNotifications());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const PinNotification = (
  id: string,
  value: boolean
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await callNotificationPinApi(id, value);
    dispatch(fetchNotifications());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

export const callNotificationReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Notification/Read').then(async response => {
    const notifications: NotificationItem[] = JSON.parse(
      JSON.stringify(response.data)
    );
    return notifications;
  });
};

const callNotificationDeleteApi = (id: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.delete(`/Notification/Delete/${id}`);
};

const callNotificationMarkAsReadApi = (id: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post(`/Notification/MarkAsRead/${id}`);
};

const callNotificationPinApi = (id: string, value: boolean) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post(`/Notification/Pin/${id}/${value}`);
};
