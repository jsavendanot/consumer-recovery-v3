import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { startLoading, stopLoading, readShareList } from './safetySlice';
import { ShareNetworkApi } from 'types/network';
import { fetchStaywellList, createStaywell } from './staywell/action';
import { fetchStressList, createStress } from './stress/action';
import {
  fetchWarnDiffList,
  fetchWarnStrList,
  createWarningSignDiff,
  createWarningSignStr
} from './warning/action';
import {
  fetchUnwellList,
  fetchUnwellNotList,
  createUnwell,
  createUnwellNot
} from './unwell/action';
import {
  fetchEmergencyContacts,
  deleteAllEmergencyContacts
} from './support/action';

//** ASYNC FUNCS */
export const fetchSafetyPlanServices = (): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const stayWellLen = getState().safetyRoot.staywell.items.length;

    stayWellLen === 0 && dispatch(startLoading());

    await dispatch(fetchStaywellList());
    await dispatch(fetchStressList());
    await dispatch(fetchWarnDiffList());
    await dispatch(fetchWarnStrList());
    await dispatch(fetchUnwellList());
    await dispatch(fetchUnwellNotList());
    await dispatch(fetchEmergencyContacts());

    stayWellLen === 0 && dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const resetAllSafetyPlanServices = (): AppThunk => async dispatch => {
  try {
    await dispatch(createStaywell([]));
    await dispatch(createStress([]));
    await dispatch(createWarningSignDiff([]));
    await dispatch(createWarningSignStr([]));
    await dispatch(createUnwell([]));
    await dispatch(createUnwellNot([]));
    await dispatch(deleteAllEmergencyContacts());
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchSafetySharedList = (): AppThunk => async dispatch => {
  try {
    const shareList = await callSafetyPlanShareListApi();
    dispatch(readShareList({ shareList }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

export const callSafetyPlanShareListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/SafetyPlanShare/List/${sessionStorage.getItem('SafetyPlanId')!}`)
    .then(response => {
      const sharedSafetyList: ShareNetworkApi[] = JSON.parse(
        JSON.stringify(response.data)
      );
      return sharedSafetyList;
    });
};
