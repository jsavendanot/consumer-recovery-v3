import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import { Network } from 'types/network';
import moment from 'moment';
import { fetchContactSharedList } from 'slices/network/action';

//** ASYNC FUNCS */

export const startSharingContact = (
  network: Network
): AppThunk => async dispatch => {
  try {
    await callNetworkShareCreateApi(network);
    await dispatch(fetchContactSharedList());
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const stopSharingContact = (
  network: Network
): AppThunk => async dispatch => {
  try {
    await callNetworkShareDeleteApi(network.Id);
    await dispatch(fetchContactSharedList());
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

const callNetworkShareCreateApi = (network: Network) => {
  const requestContent = {
    SharedWithNetworkContactId: network.Id,
    SharedWithNetworkName: network.Name,
    SharedOnDate: moment().format('YYYY-MMM-DD')
  };
  return axios.post(`/NetworkShare/Create`, requestContent);
};

export const callNetworkShareDeleteApi = (networkId: string) => {
  return axios.delete(`/NetworkShare/Delete/${networkId}`);
};
