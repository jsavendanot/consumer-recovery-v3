import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { readDiff, readStr } from './warningSlice';
import { Item } from 'types/safety';
import { stopLoading, startLoading } from '../safetySlice';

//** ASYNC FUNCS */
export const fetchWarnDiffList = (): AppThunk => async dispatch => {
  try {
    const items = await callWarningSignReadApi();
    dispatch(
      readDiff({
        items
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchWarnStrList = (): AppThunk => async dispatch => {
  try {
    const items = await callCopingStrategyReadApi();
    dispatch(
      readStr({
        items
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const createWarningSignDiff = (
  items: Item[]
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const itemsData = await callWarningSignUpdateApi(items);
    dispatch(
      readDiff({
        items: itemsData
      })
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const createWarningSignStr = (
  items: Item[]
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const itemsData = await callCopingStrategyUpdateApi(items);
    dispatch(
      readStr({
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
const callWarningSignReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/WarningSign/Read/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      const difficulties: Item[] = [];
      response.data['Items'].forEach((item: string, index: string) => {
        difficulties.push({ id: index, name: item });
      });
      return difficulties;
    });
};

const callCopingStrategyReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/CopingStrategy/Read/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      const strategies: Item[] = [];
      response.data['Items'].forEach((item: string, index: string) => {
        strategies.push({
          id: index,
          name: item
        });
      });
      return strategies;
    });
};

const callWarningSignUpdateApi = (difficulties: Item[]) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const difficultiesRequest = {
    Items: [
      ...difficulties.map(value => {
        return value.name;
      })
    ]
  };
  return axios
    .post('/WarningSign/Update', difficultiesRequest)
    .then(response => {
      return difficulties;
    });
};

const callCopingStrategyUpdateApi = (strategies: Item[]) => {
  const strategiesRequest = {
    Items: [
      ...strategies.map(value => {
        return value.name;
      })
    ]
  };
  return axios
    .post('/CopingStrategy/Update', strategiesRequest)
    .then(response => {
      return strategies;
    });
};
