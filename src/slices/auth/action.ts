import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Profile } from 'types/profile';
import { start, end } from './authSlice';
import { acceptConnectRequest } from 'slices/network/invitation/action';

//** ASYNC FUNCS */
export const startSession = (history: any): AppThunk => async dispatch => {
  try {
    await callProfileCheckApi()
      .then(async response => {
        const profileData = await callProfileReadApi();
        dispatch(
          start({
            avatar: '/images/avatars/avatar_0.png',
            gender: profileData.Gender ? profileData.Gender : ''
          })
        );

        dispatch(redirectAction(history));
      })
      .catch(async error => {
        await callProfileSetupApi();

        const profileData = await callProfileReadApi();
        dispatch(
          start({
            avatar: '/images/avatars/avatar_0.png',
            gender: profileData.Gender ? profileData.Gender : ''
          })
        );

        dispatch(redirectAction(history));
      });
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const redirectAction = (history: any): AppThunk => async dispatch => {
  try {
    if (
      sessionStorage.getItem('invitationId') !== null &&
      sessionStorage.getItem('invitationId') !== ''
    ) {
      dispatch(
        acceptConnectRequest(
          sessionStorage.getItem('invitationId')!,
          sessionStorage.getItem('inviterEmail')!,
          sessionStorage.getItem('inviterName')!,
          () => {},
          sessionStorage.getItem('inviterAccountType')! === 'RelatedPerson'
            ? 'Person'
            : sessionStorage.getItem('inviterAccountType')! === 'Practitioner'
            ? 'Organisation'
            : 'Person',
          history
        )
      );
    } else {
      history.push('/goals/current');
    }
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const endSession = (): AppThunk => async dispatch => {
  try {
    authentication.signOut();
    sessionStorage.clear();
    dispatch(end());
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

export const callProfileReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get('/Profile/Read/?contactType=935000000').then(response => {
    const profile: Profile = response.data;
    sessionStorage.setItem('UserId', profile.UserId);
    sessionStorage.setItem('SafetyPlanId', profile.SafetyPlanId);
    sessionStorage.setItem('FirstName', profile.FirstName);
    sessionStorage.setItem('Surname', profile.Surname);
    sessionStorage.setItem('DateOfBirth', profile.DateOfBirth);
    sessionStorage.setItem('UserEmail', profile.UserEmail);
    sessionStorage.setItem(
      'Avatar',
      profile.Image
        ? 'data:image/png;base64,' + profile.Image
        : '/images/avatars/defaultAvatar.svg'
    );
    sessionStorage.setItem('ContactId', profile.ContactId);
    sessionStorage.setItem('RecoveryPlanId', profile.RecoveryPlanId);
    return profile;
  });
};

export const callProfileSetupApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Profile/Setup/935000002');
};

export const callProfileCheckApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/Profile/Check');
};
