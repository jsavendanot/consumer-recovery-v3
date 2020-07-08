import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { read } from './staywellSlice';
import { Item } from 'types/safety';
import { startLoading, stopLoading } from '../safetySlice';

//** ASYNC FUNCS */
export const fetchStaywellList = (): AppThunk => async dispatch => {
  try {
    const items = await callStayWellReadApi();
    dispatch(
      read({
        items
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const createStaywell = (items: Item[]): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const valuesData = await callStayWellUpdateApi(items);
    dispatch(
      read({
        items: valuesData
      })
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const callStayWellReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  const items: Item[] = [];
  return axios
    .get(`/StayWell/Read/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      response.data['Items'].forEach((item: string, index: string) => {
        items.push({
          id: index,
          name: item
        });
      });
      return items;
    });
};

const callStayWellUpdateApi = (items: Item[]) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  const requestContent = {
    Items: [
      ...items.map(value => {
        return value.name;
      })
    ]
  };
  return axios.post('/StayWell/Update', requestContent).then(response => {
    return items;
  });
};
