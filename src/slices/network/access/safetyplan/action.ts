import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Network } from 'types/network';
import moment from 'moment';
import { fetchSafetySharedList } from 'slices/safety/action';

export const shareSafetyPlan = (
  network: Network
): AppThunk => async dispatch => {
  try {
    await callSafetyPlanShareCreateApi(network);
    await callSafetyPlanUpdateApi(network);

    await dispatch(fetchSafetySharedList());
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const callSafetyPlanShareCreateApi = (network: Network) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const requestContent = {
    SharedWithNetworkContactId: network.Id,
    SharedWithNetworkName: network.Name,
    SharedOnDate: moment().format('YYYY-MMM-DD')
  };
  return axios.post(
    `/SafetyPlanShare/Create/${sessionStorage.getItem('SafetyPlanId')}`,
    requestContent
  );
};

export const callSafetyPlanUpdateApi = (network: Network) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const requestContent = {
    Id: sessionStorage.getItem('SafetyPlanId'),
    Name: network.Name,
    VisibleTo: 'SpecificPeople'
  };

  return axios.post('/SafetyPlan/Update', requestContent);
};

export const stopSharingSafetyPlan = (
  network: Network
): AppThunk => async dispatch => {
  try {
    await callSafetyPlanShareDeleteApi(network.Id);

    await dispatch(fetchSafetySharedList());
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const callSafetyPlanShareDeleteApi = (networkId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.delete(
    `/SafetyPlanShare/Delete/${sessionStorage.getItem(
      'SafetyPlanId'
    )}/${networkId}`
  );
};
