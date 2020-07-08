import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Profile } from 'types/profile';
import { fetch, verify, startLoading, stopLoading } from './profileSlice';
import moment from 'moment';

export const fetchProfile = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const profile = await callProfileReadApi();
    dispatch(
      fetch({
        profile: {
          ...profile,
          DateOfBirth: moment(profile.DateOfBirth).format('DD/MM/YYYY')
        }
      })
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const verifyProfile = (): AppThunk => async dispatch => {
  try {
    dispatch(verify());
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const createProfile = (
  updatedProfile: Profile
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callProfileUpdateApi(updatedProfile);
    const profile = await callProfileReadApi();
    dispatch(
      fetch({
        profile: {
          ...profile,
          DateOfBirth: moment(profile.DateOfBirth).format('DD/MM/YYYY')
        }
      })
    );
    sessionStorage.setItem('FirstName', profile.FirstName);
    sessionStorage.setItem('Surname', profile.Surname);
    sessionStorage.setItem('DateOfBirth', profile.DateOfBirth);
    sessionStorage.setItem(
      'Avatar',
      profile.Image
        ? 'data:image/png;base64,' + profile.Image
        : '/images/avatars/defaultAvatar.svg'
    );

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const editProfile = (
  history: any,
  updatedProfile: Profile
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callProfileUpdateApi(updatedProfile);

    const profile = await callProfileReadApi();
    dispatch(
      fetch({
        profile: {
          ...profile,
          DateOfBirth: moment(profile.DateOfBirth).format('DD/MM/YYYY')
        }
      })
    );

    sessionStorage.setItem(
      'Avatar',
      profile.Image
        ? 'data:image/png;base64,' + profile.Image
        : '/images/avatars/defaultAvatar.svg'
    );

    sessionStorage.setItem('FirstName', profile.FirstName);
    sessionStorage.setItem('Surname', profile.Surname);

    dispatch(stopLoading());
    history.push(`/profile/${profile.FirstName}`);
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const callProfileUpdateApi = (profile: Profile) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Profile/Update', profile);
};

export const callProfileReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get('/Profile/Read/?contactType=935000000').then(response => {
    const profile: Profile = response.data;
    return profile;
  });
};
