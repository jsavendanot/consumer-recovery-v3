import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { read } from './stressSlice';
import { Item } from 'types/safety';
import { stopLoading, startLoading } from '../safetySlice';

//** ASYNC FUNCS */
export const fetchStressList = (): AppThunk => async dispatch => {
  try {
    const items = await callStressMeReadApi();
    dispatch(
      read({
        items
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const createStress = (items: Item[]): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const itemsData = await callStressMeUpdateApi(items);
    dispatch(
      read({
        items: itemsData
      })
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const callStressMeReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  const items: Item[] = [];
  return axios
    .get(`/StressMe/Read/${sessionStorage.getItem('UserId')}`)
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

const callStressMeUpdateApi = (items: Item[]) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  const requestContent = {
    Items: [
      ...items.map(value => {
        return value.name;
      })
    ]
  };
  return axios.post('/StressMe/Update', requestContent).then(response => {
    return items;
  });
};
