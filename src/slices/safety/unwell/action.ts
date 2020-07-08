import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetchUnwellHappen, fetchUnwellNotHappen } from './unwellSlice';
import { Unwell } from 'types/safety';
import { startLoading, stopLoading } from '../safetySlice';

//** ASYNC FUNCS */
export const fetchUnwellList = (): AppThunk => async dispatch => {
  try {
    const values = await callUnwellHappenReadApi();

    dispatch(
      fetchUnwellHappen({
        values
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchUnwellNotList = (): AppThunk => async dispatch => {
  try {
    const values = await callUnwellNotHappenReadApi();

    dispatch(
      fetchUnwellNotHappen({
        values
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const createUnwell = (pleaseDo: Unwell[]): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(startLoading());

    const oldValues = getState().safetyRoot.unwell.pleaseDo;
    for (const unwell of oldValues.filter(
      item => !pleaseDo.find(unwell => unwell.UnwellId === item.UnwellId)
    )) {
      await callUnwellHappenDeleteApi(unwell.UnwellId);
    }

    //** create new unwells items */
    const newUnwells = pleaseDo.filter(
      item => !oldValues.find(unwell => unwell.UnwellId === item.UnwellId)
    );

    for (const unwell of newUnwells) {
      await callUnwellHappenCreateApi(unwell);
    }

    //** update old unwells items */
    const updatedUnwells = pleaseDo.filter(item =>
      oldValues.find(unwell => unwell.UnwellId === item.UnwellId)
    );

    for (const unwell of updatedUnwells) {
      await callUnwellHappenUpdateApi(unwell);
    }

    await dispatch(fetchUnwellList());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const createUnwellNot = (doNotDo: Unwell[]): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(startLoading());

    const oldValues = getState().safetyRoot.unwell.doNotDo;
    for (const unwell of oldValues.filter(
      item => !doNotDo.find(unwell => unwell.UnwellId === item.UnwellId)
    )) {
      await callUnwellNotHappenDeleteApi(unwell.UnwellId);
    }

    //** create new unwells items */
    const newUnwells = doNotDo.filter(
      item => !oldValues.find(unwell => unwell.UnwellId === item.UnwellId)
    );

    for (const unwell of newUnwells) {
      await callUnwellNotHappenCreateApi(unwell);
    }

    //** update old unwells items */
    const updatedUnwells = doNotDo.filter(item =>
      oldValues.find(unwell => unwell.UnwellId === item.UnwellId)
    );

    for (const unwell of updatedUnwells) {
      await callUnwellNotHappenUpdateApi(unwell);
    }

    await dispatch(fetchUnwellNotList());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const callUnwellHappenReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/UnwellHappen/Read/${sessionStorage.getItem('UserId')!}`)
    .then(response => {
      const unwellList: Unwell[] = JSON.parse(JSON.stringify(response.data));
      return unwellList;
    });
};

const callUnwellNotHappenReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/UnwellNotHappen/Read/${sessionStorage.getItem('UserId')!}`)
    .then(response => {
      const unwellList: Unwell[] = JSON.parse(JSON.stringify(response.data));
      return unwellList;
    });
};

const callUnwellHappenCreateApi = (unwell: Unwell) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post('/UnwellHappen/Create', unwell);
};

const callUnwellNotHappenCreateApi = (unwell: Unwell) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post('/UnwellNotHappen/Create', unwell);
};

const callUnwellHappenDeleteApi = (id: string) => {
  return axios.delete(`/UnwellHappen/Delete/${id}`);
};

const callUnwellNotHappenDeleteApi = (id: string) => {
  return axios.delete(`/UnwellNotHappen/Delete/${id}`);
};

const callUnwellHappenUpdateApi = (unwell: Unwell) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post('/UnwellHappen/Update', unwell);
};

const callUnwellNotHappenUpdateApi = (unwell: Unwell) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post('/UnwellNotHappen/Update', unwell);
};
