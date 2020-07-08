import { AppThunk } from 'store';
import { fetchEmergency } from './supportSlice';
import { stopLoading, startLoading } from '../safetySlice';
import {
  callNetworkContactListApi,
  callNetworkContactUpdateApi,
  callNetworkContactCreateApi
} from 'slices/network/action';
import { Network } from 'types/network';

//** ASYNC FUNCS */
export const fetchEmergencyContacts = (): AppThunk => async dispatch => {
  try {
    const networks = await callNetworkContactListApi();

    const emergencyNetworks = networks.filter(
      item => item.CallForSupport === true
    );
    sessionStorage.setItem('emergency', JSON.stringify(emergencyNetworks));

    dispatch(
      fetchEmergency({
        emergencyNetworks
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const updateEmergencyContacts = (
  emergencyContacts: Network[]
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    const oldContacts = await callNetworkContactListApi();

    for (const network of oldContacts.filter(
      item => !emergencyContacts.find(contact => contact.Id === item.Id)
    )) {
      const updatedNetwork = {
        ...network,
        CallForSupport: false
      };
      await callNetworkContactUpdateApi(updatedNetwork);
    }

    for (const network of emergencyContacts.filter(item => item.Id !== '')) {
      const updatedNetwork = {
        ...network,
        CallForSupport: true
      };
      await callNetworkContactUpdateApi(updatedNetwork);
    }

    for (const network of emergencyContacts.filter(item => item.Id === '')) {
      await callNetworkContactCreateApi(network);
    }

    await dispatch(fetchEmergencyContacts());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const deleteAllEmergencyContacts = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    const allContacts = await callNetworkContactListApi();

    for (const network of allContacts) {
      const updatedNetwork = {
        ...network,
        CallForSupport: false
      };
      await callNetworkContactUpdateApi(updatedNetwork);
    }

    await dispatch(fetchEmergencyContacts());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};
